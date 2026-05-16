// POST /api/stripe/checkout
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@/lib/supabase/server";

const PRICE_IDS: Record<string, string> = {
  creator: process.env.STRIPE_CREATOR_PRICE_ID ?? "",
  studio:  process.env.STRIPE_STUDIO_PRICE_ID  ?? "",
};

export async function POST(req: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "sk_placeholder");

  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { plan } = await req.json();
    const priceId = PRICE_IDS[plan];
    if (!priceId) return NextResponse.json({ error: "Invalid plan" }, { status: 400 });

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      customer_email: user.email,
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/app?upgraded=true`,
      cancel_url:  `${process.env.NEXT_PUBLIC_APP_URL}/pricing`,
      metadata: { userId: user.id, plan },
      subscription_data: { trial_period_days: 14, metadata: { userId: user.id, plan } },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("[stripe/checkout]:", err);
    return NextResponse.json({ error: "Checkout failed" }, { status: 500 });
  }
}
