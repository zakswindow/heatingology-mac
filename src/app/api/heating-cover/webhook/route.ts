import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2025-04-30.basil" });

export async function POST(req: NextRequest) {
    const body = await req.text();
    const sig = req.headers.get("stripe-signature");

    if (!sig) {
        return NextResponse.json({ error: "Missing stripe-signature header" }, { status: 400 });
    }

    let event: Stripe.Event;
    try {
        event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
    } catch (e) {
        console.error("Webhook signature verification failed:", (e as Error).message);
        return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    try {
        switch (event.type) {
            case "checkout.session.completed": {
                const session = event.data.object as Stripe.Checkout.Session;
                if (session.mode !== "subscription") break;

                const subscriptionId = session.subscription as string;
                const subscription = await stripe.subscriptions.retrieve(subscriptionId);
                const planKey = (session.metadata?.planKey ?? subscription.metadata?.planKey ?? "plus") as "essential" | "plus" | "pro";

                await prisma.heatAssureSubscription.upsert({
                    where: { stripeSubscriptionId: subscriptionId },
                    create: {
                        stripeCustomerId: session.customer as string,
                        stripeSubscriptionId: subscriptionId,
                        stripeSessionId: session.id,
                        plan: planKey,
                        status: "ACTIVE",
                        customerEmail: session.customer_email ?? "",
                        customerName: session.metadata?.customerName ?? "",
                        phone: session.metadata?.phone ?? "",
                        postcode: session.metadata?.postcode ?? "",
                        address: session.metadata?.address ?? "",
                        currentPeriodStart: subscription.current_period_start
                            ? new Date(subscription.current_period_start * 1000)
                            : null,
                        currentPeriodEnd: subscription.current_period_end
                            ? new Date(subscription.current_period_end * 1000)
                            : null,
                    },
                    update: {
                        stripeSessionId: session.id,
                        status: "ACTIVE",
                        currentPeriodStart: subscription.current_period_start
                            ? new Date(subscription.current_period_start * 1000)
                            : null,
                        currentPeriodEnd: subscription.current_period_end
                            ? new Date(subscription.current_period_end * 1000)
                            : null,
                    },
                });
                break;
            }

            case "customer.subscription.updated": {
                const subscription = event.data.object as Stripe.Subscription;
                const status = stripeStatusToInternal(subscription.status);
                const planKey = (subscription.metadata?.planKey ?? "plus") as "essential" | "plus" | "pro";

                await prisma.heatAssureSubscription.upsert({
                    where: { stripeSubscriptionId: subscription.id },
                    create: {
                        stripeCustomerId: subscription.customer as string,
                        stripeSubscriptionId: subscription.id,
                        plan: planKey,
                        status,
                        customerEmail: "",
                        currentPeriodStart: new Date(subscription.current_period_start * 1000),
                        currentPeriodEnd: new Date(subscription.current_period_end * 1000),
                    },
                    update: {
                        plan: planKey,
                        status,
                        currentPeriodStart: new Date(subscription.current_period_start * 1000),
                        currentPeriodEnd: new Date(subscription.current_period_end * 1000),
                    },
                });
                break;
            }

            case "customer.subscription.deleted": {
                const subscription = event.data.object as Stripe.Subscription;

                await prisma.heatAssureSubscription.updateMany({
                    where: { stripeSubscriptionId: subscription.id },
                    data: {
                        status: "CANCELLED",
                        cancelledAt: new Date(),
                    },
                });
                break;
            }

            default:
                break;
        }
    } catch (e) {
        console.error("Webhook handler error:", e);
        return NextResponse.json({ error: "Internal error" }, { status: 500 });
    }

    return NextResponse.json({ received: true });
}

function stripeStatusToInternal(status: Stripe.Subscription.Status): "ACTIVE" | "CANCELLED" | "PAST_DUE" | "INCOMPLETE" {
    switch (status) {
        case "active": return "ACTIVE";
        case "canceled": return "CANCELLED";
        case "past_due": return "PAST_DUE";
        case "incomplete":
        case "incomplete_expired":
        case "trialing":
        case "unpaid":
        default:
            return "INCOMPLETE";
    }
}
