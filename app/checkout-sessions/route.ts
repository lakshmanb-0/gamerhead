// app/checkout-sessions/route.ts
import { stripe } from "@/lib/stripe";
import { TSingleGameData } from "@/types";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: Request) {
    const body = await req.json();
    const origin = "https://gamerhead.vercel.app";

    // cart info 
    const lineItems = body.map((item: TSingleGameData) => ({

        price_data: {
            currency: "inr",
            unit_amount: item?.price_overview?.final ?? 0,
            product_data: {
                name: item?.name,
                images: [item?.header_image],
            },
        },
        quantity: 1,
    }));

    try {
        const session = await stripe.checkout.sessions.create({
            mode: "payment",
            line_items: lineItems,
            success_url: `${origin}/thankYou/?sessionId={CHECKOUT_SESSION_ID}`,
            cancel_url: `${origin}/cart`,
        });
        return NextResponse.json(session);

    } catch (error) {
        if (error instanceof Stripe.errors.StripeError) {
            const { message } = error;
            return NextResponse.json({ message }, { status: error.statusCode });
        }
    }
}
