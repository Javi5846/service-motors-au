import { cookies } from "next/headers";
import NavbarClient from "./NavbarClient";

export default async function Navbar() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session")?.value;
  const isAdmin = !!session && !!process.env.ADMIN_PASSWORD && session === process.env.ADMIN_PASSWORD;

  return <NavbarClient isAdmin={isAdmin} />;
}
