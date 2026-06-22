/**
 * POST /api/stripe/webhook
 * Handles Stripe webhook events for subscription lifecycle.
 *
 * Required env vars:
 *   STRIPE_SECRET_KEY         — sk_live_... or sk_test_...
 *   STRIPE_WEBHOOK_SECRET     — whsec_... (from Stripe dashboard)
 */

import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";
import { getPrisma, hasDatabaseUrl } from "@/lib/prisma";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ received: true, note: "Stripe not configured" });
  }

  const sig = req.headers.get("stripe-signature");
  if (!sig) return NextResponse.json({ error: "No signature" }, { status: 400 });

  const body = await req.text();

  let event: Stripe.Event;

  try {
    const Stripe = (await import("stripe")).default;
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2025-02-24.acacia" });
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error("Stripe webhook verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (!hasDatabaseUrl()) {
    console.log(`Stripe event received (no DB): ${event.type}`);
    return NextResponse.json({ received: true });
  }

  const prisma = getPrisma();

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const { userId, tier } = session.metadata ?? {};

      if (userId && tier) {
        // Create an application record when payment is confirmed
        await prisma.auditEvent.create({
          data: {
            actorId: userId,
            action: `PAYMENT_COMPLETED:${tier}`,
            entityType: "User",
            entityId: userId,
            after: {
              stripeCustomer:
                typeof session.customer === "string" ? session.customer : session.customer?.id ?? null,
              subscription:
                typeof session.subscription === "string"
                  ? session.subscription
                  : session.subscription?.id ?? null,
              tier,
            },
          },
        }).catch(console.error);

        console.log(`Payment confirmed for user ${userId}, tier: ${tier}`);
      }
      break;
    }

    case "customer.subscription.deleted": {
      // Handle subscription cancellation — mark badge as expired, notify admin
      const sub = event.data.object as Stripe.Subscription;
      console.log(`Subscription deleted, tier: ${sub.metadata?.tier}`);
      break;
    }

    case "invoice.payment_failed": {
      // Handle failed renewal — send dunning email, flag credential
      console.log("Invoice payment failed — dunning logic here");
      break;
    }

    default:
      console.log(`Unhandled Stripe event: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
