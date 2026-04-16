import { redis } from "./redis";
import { products, type Product } from "@/data/products";

const KEY = (id: string) => `stock:${id}`;

export async function getProductsWithStock(): Promise<Product[]> {
  try {
    if (!process.env.UPSTASH_REDIS_REST_URL) return products;
    const keys = products.map((p) => KEY(p.id));
    const values = await redis.mget<(string | null)[]>(...keys);
    return products.map((p, i) => ({
      ...p,
      inStock: values[i] !== null ? values[i] === "true" : p.inStock,
    }));
  } catch {
    return products;
  }
}

export async function getProductWithStock(id: string): Promise<Product | undefined> {
  const product = products.find((p) => p.id === id);
  if (!product) return undefined;
  try {
    if (!process.env.UPSTASH_REDIS_REST_URL) return product;
    const value = await redis.get<string>(KEY(id));
    if (value !== null) return { ...product, inStock: value === "true" };
    return product;
  } catch {
    return product;
  }
}

export async function setStock(id: string, inStock: boolean) {
  await redis.set(KEY(id), inStock ? "true" : "false");
}
