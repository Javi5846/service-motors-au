import { createClient, type SanityClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import type { Product, Service } from "@/types";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

let _client: SanityClient | null = null;

function getClient(): SanityClient | null {
  if (!projectId) return null;
  if (!_client) {
    _client = createClient({
      projectId,
      dataset,
      apiVersion: "2024-01-01",
      useCdn: true,
    });
  }
  return _client;
}

export function urlFor(source: object) {
  const client = getClient();
  if (!client) {
    // Return a stub that matches the ImageUrlBuilder chain interface
    const stub = {
      url: () => "",
      width: () => stub,
      height: () => stub,
      fit: () => stub,
      auto: () => stub,
      format: () => stub,
    };
    return stub as unknown as ReturnType<
      ReturnType<typeof imageUrlBuilder>["image"]
    >;
  }
  return imageUrlBuilder(client).image(source);
}

// Exposed for Sanity Studio — only used at runtime when projectId is set
export function getSanityClient(): SanityClient {
  const client = getClient();
  if (!client) {
    throw new Error(
      "NEXT_PUBLIC_SANITY_PROJECT_ID is not set. Add it to your .env.local file."
    );
  }
  return client;
}

export async function getProducts(): Promise<Product[]> {
  const client = getClient();
  if (!client) return [];
  try {
    return client.fetch<Product[]>(
      `*[_type == "product"] | order(_createdAt desc) {
        _id, name, slug, price, description, category, inStock, stripePriceId, image
      }`
    );
  } catch {
    return [];
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const client = getClient();
  if (!client) return null;
  try {
    return client.fetch<Product>(
      `*[_type == "product" && slug.current == $slug][0] {
        _id, name, slug, price, description, category, inStock, stripePriceId, image
      }`,
      { slug }
    );
  } catch {
    return null;
  }
}

export async function getServices(): Promise<Service[]> {
  const client = getClient();
  if (!client) return [];
  try {
    return client.fetch<Service[]>(
      `*[_type == "service"] | order(_createdAt asc) {
        _id, title, description, price, duration, icon
      }`
    );
  } catch {
    return [];
  }
}
