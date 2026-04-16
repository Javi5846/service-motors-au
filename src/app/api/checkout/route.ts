import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function POST(req: NextRequest) {
  try {
    const { priceId } = await req.json();

    if (!priceId || typeof priceId !== "string") {
      return NextResponse.json({ error: "Invalid price ID" }, { status: 400 });
    }

    const baseUrl =
      process.env.NEXT_PUBLIC_SITE_URL ?? "https://servicemotorsau.com";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${baseUrl}/shop?success=1`,
      cancel_url: `${baseUrl}/shop?cancelled=1`,
      shipping_address_collection: {
        allowed_countries: ["AU"],
      },
      metadata: {
        source: "servicemotorsau.com",
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe checkout error:", err);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
