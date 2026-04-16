import Stripe from "stripe";

let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (!_stripe) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) {
      throw new Error("Missing STRIPE_SECRET_KEY environment variable");
    }
    _stripe = new Stripe(key, {
      apiVersion: "2026-03-25.dahlia",
    });
  }
  return _stripe;
}

// Convenience export — only call at runtime (not top-level module scope)
export const stripe = {
  checkout: {
    sessions: {
      create: (...args: Parameters<Stripe["checkout"]["sessions"]["create"]>) =>
        getStripe().checkout.sessions.create(...args),
    },
  },
  webhooks: {
    constructEvent: (
      ...args: Parameters<Stripe["webhooks"]["constructEvent"]>
    ) => getStripe().webhooks.constructEvent(...args),
  },
};
