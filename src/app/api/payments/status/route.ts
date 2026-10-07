import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2025-04-30.basil" });

export async function GET(req: NextRequest) {
    const sessionId = req.nextUrl.searchParams.get('session_id')!;
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    return NextResponse.json({
        status: session.status,
        customer_email: session.customer_details.email

    });
}
