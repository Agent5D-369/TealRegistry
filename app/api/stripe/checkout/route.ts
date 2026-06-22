/**
 * POST /api/stripe/checkout
 * Creates a Stripe Checkout session for credential purchases.
 *
 * Required env vars:
 *   STRIPE_SECRET_KEY      — sk_live_... or sk_test_...
 *   STRIPE_TEAL_VERIFIED   — Stripe Price ID for Teal Verified ($1,200/year)
 *   STRIPE_TEAL_CERTIFIED  — Stripe Price ID for Teal Certified ($3,800/year)
 *   STRIPE_ACCREDITED      — Stripe Price ID for Accredited tiers ($2,400/year)
 *   NEXT_PUBLIC_APP_URL    — Base URL for redirects
 */

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";

const PRICE_MAP: Record<string, string | undefined> = {
  "teal-verified": process.env.STRIPE_TEAL_VERIFIED,
  "teal-certified": process.env.STRIPE_TEAL_CERTIFIED,
  "accredited-training": process.env.STRIPE_ACCREDITED,
  "accredited-implementation": process.env.STRIPE_ACCREDITED,
};

export async function POST(req: NextRequest) {
  // Auth check
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));
  const { tier } = body as { tier?: string };

  if (!tier || !PRICE_MAP[tier]) {
    return NextResponse.json({ error: "Invalid tier" }, { status: 400 });
  }

  const priceId = PRICE_MAP[tier];

  if (!process.env.STRIPE_SECRET_KEY || !priceId) {
    // Dev mode: return a mock URL
    return NextResponse.json({
      url: `/apply?tier=${tier}&dev=1&note=Stripe+not+configured`,
    });
  }

  try {
    const Stripe = (await import("stripe")).default;
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2025-02-24.acacia" });

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://tealregistry.com";

    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      customer_email: session.user.email,
      line_items: [{ price: priceId, quantity: 1 }],
      metadata: {
        userId: (session.user as { id?: string }).id ?? "",
        tier,
      },
      success_url: `${baseUrl}/apply?success=1&tier=${tier}`,
      cancel_url: `${baseUrl}/pricing`,
      subscription_data: {
        metadata: { tier },
        trial_period_days: 0,
      },
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (err) {
    console.error("Stripe checkout error:", err);
    return NextResponse.json({ error: "Payment setup failed" }, { status: 500 });
  }
}
