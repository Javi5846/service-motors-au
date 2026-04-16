import { redis } from "./redis";
import { products, type Product } from "@/data/products";

const STOCK_KEY = (id: string) => `stock:${id}`;
const PRICE_KEY = (id: string) => `price:${id}`;

export async function getProductsWithStock(): Promise<Product[]> {
  try {
    if (!process.env.UPSTASH_REDIS_REST_URL) return products;
    const stockKeys = products.map((p) => STOCK_KEY(p.id));
    const priceKeys = products.map((p) => PRICE_KEY(p.id));
    const [stockValues, priceValues] = await Promise.all([
      redis.mget<(string | null)[]>(...stockKeys),
      redis.mget<(string | null)[]>(...priceKeys),
    ]);
    return products.map((p, i) => ({
      ...p,
      inStock: stockValues[i] !== null ? stockValues[i] === "true" : p.inStock,
      price: priceValues[i] !== null ? parseFloat(priceValues[i]!) : p.price,
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
    const [stockValue, priceValue] = await Promise.all([
      redis.get<string>(STOCK_KEY(id)),
      redis.get<string>(PRICE_KEY(id)),
    ]);
    return {
      ...product,
      inStock: stockValue !== null ? stockValue === "true" : product.inStock,
      price: priceValue !== null ? parseFloat(priceValue) : product.price,
    };
  } catch {
    return product;
  }
}

export async function setStock(id: string, inStock: boolean) {
  await redis.set(STOCK_KEY(id), inStock ? "true" : "false");
}

export async function setPrice(id: string, price: number) {
  await redis.set(PRICE_KEY(id), price.toString());
}

export async function setAllStock(inStock: boolean) {
  const pipe = redis.pipeline();
  products.forEach((p) => pipe.set(STOCK_KEY(p.id), inStock ? "true" : "false"));
  await pipe.exec();
}
