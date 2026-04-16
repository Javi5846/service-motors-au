"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { setStock, setPrice, setAllStock } from "@/lib/stock";

async function requireAuth() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session")?.value;
  if (!session || session !== process.env.ADMIN_PASSWORD) {
    throw new Error("Unauthorized");
  }
}

export async function login(formData: FormData) {
  const password = formData.get("password") as string;
  if (password === process.env.ADMIN_PASSWORD) {
    const cookieStore = await cookies();
    cookieStore.set("admin_session", password, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });
  }
  redirect("/admin");
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_session");
  redirect("/admin");
}

export async function toggleStock(id: string, currentlyInStock: boolean) {
  await requireAuth();
  await setStock(id, !currentlyInStock);
}

export async function updatePrice(id: string, price: number) {
  await requireAuth();
  if (isNaN(price) || price < 0) throw new Error("Invalid price");
  await setPrice(id, price);
}

export async function bulkSetStock(inStock: boolean) {
  await requireAuth();
  await setAllStock(inStock);
}
