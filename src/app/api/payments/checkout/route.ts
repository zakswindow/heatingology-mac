import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2025-04-30.basil" });
const YOUR_DOMAIN = `${process.env.NEXT_PUBLIC_DOMAIN}/status`;

export async function POST(req: NextRequest) {
    try {

        const body = await req.json();
        const { products, quoteId } = body;

        if (!products) {
            throw new Error("Invalid purchase.");
        }

        const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = products.map((item) => {
            return {
                price_data: {
                    currency: "gbp",
                    product_data: { name: item.model },
                    unit_amount: item.price * 100  // amount in pence
                },
                quantity: 1
            };
        });

        const session = await stripe.checkout.sessions.create({
            ui_mode: "custom",
            line_items: lineItems,
            mode: "payment",
            return_url: `${YOUR_DOMAIN}/${quoteId}?session_id={CHECKOUT_SESSION_ID}`
        });

        return NextResponse.json({ clientSecret: session.client_secret?.trim() });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ 
            success: false,
            error: (e as Error).message
        });

    }
}