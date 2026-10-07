import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getPlan } from "@/lib/data/heatassure-plans";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2025-04-30.basil" });
const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN;

export async function POST(req: NextRequest) {
    try {
        const { planKey, customerEmail, customerName, phone, postcode, address } = await req.json();

        const plan = getPlan(planKey);

        const session = await stripe.checkout.sessions.create({
            mode: "subscription",
            line_items: [{ price: plan.stripePriceId, quantity: 1 }],
            customer_email: customerEmail || undefined,
            metadata: {
                planKey: plan.key,
                planName: plan.name,
                customerName: customerName || "",
                phone: phone || "",
                postcode: postcode || "",
                address: address || "",
            },
            subscription_data: {
                metadata: {
                    planKey: plan.key,
                    planName: plan.name,
                },
            },
            success_url: `${DOMAIN}/heating-cover/checkout/confirmation?plan=${plan.key}&session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${DOMAIN}/heating-cover/checkout/payment?plan=${plan.key}`,
        });

        return NextResponse.json({ url: session.url });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ success: false, error: (e as Error).message }, { status: 500 });
    }
}
