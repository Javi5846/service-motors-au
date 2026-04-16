"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { setStock } from "@/lib/stock";

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
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session")?.value;
  if (!session || session !== process.env.ADMIN_PASSWORD) {
    throw new Error("Unauthorized");
  }
  await setStock(id, !currentlyInStock);
}
