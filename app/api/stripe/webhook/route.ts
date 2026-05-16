// POST /api/stripe/webhook
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@/lib/supabase/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "sk_placeholder");

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig  = req.headers.get("stripe-signature") ?? "";

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET ?? "");
  } catch (err) {
    console.error("[stripe/webhook] signature verify failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const supabase = await createClient();

  switch (event.type) {
    case "customer.subscription.created":
    case "customer.subscription.updated": {
      const sub = event.data.object as Stripe.Subscription;
      const userId = (sub.metadata as Record<string, string>).userId;
      if (userId) {
        await supabase.from("subscriptions").upsert({
          user_id:                userId,
          stripe_customer_id:     sub.customer as string,
          stripe_subscription_id: sub.id,
          plan:                   (sub.metadata as Record<string, string>).plan ?? "creator",
          status:                 sub.status,
          current_period_end:     new Date((sub as unknown as { current_period_end: number }).current_period_end * 1000).toISOString(),
          cancel_at_period_end:   sub.cancel_at_period_end,
        });
      }
      break;
    }
    case "customer.subscription.deleted": {
      const sub = event.data.object as Stripe.Subscription;
      await supabase.from("subscriptions").update({ status: "canceled" }).eq("stripe_subscription_id", sub.id);
      break;
    }
  }

  return NextResponse.json({ received: true });
}
