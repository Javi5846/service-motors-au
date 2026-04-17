import { cookies } from "next/headers";
import { login, logout } from "./actions";
import AdminDashboard from "./AdminDashboard";
import { getProductsWithStock } from "@/lib/stock";
import { Settings } from "lucide-react";

export const metadata = {
  title: "Admin | Service Motors AU",
};

export const dynamic = "force-dynamic";

function isAuthenticated(session: string | undefined): boolean {
  return !!session && !!process.env.ADMIN_PASSWORD && session === process.env.ADMIN_PASSWORD;
}

export default async function AdminPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session")?.value;

  if (!isAuthenticated(session)) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-[#DC2626] rounded-xl flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-extrabold text-lg">SM</span>
            </div>
            <h1 className="text-2xl font-extrabold text-[#0A0A0A]">Admin</h1>
            <p className="text-gray-500 text-sm mt-1">Service Motors AU</p>
          </div>
          <form action={login} className="space-y-4">
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              autoFocus
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#DC2626] transition-colors"
            />
            <button
              type="submit"
              className="w-full bg-[#DC2626] hover:bg-[#B91C1C] text-white font-semibold py-3 rounded-lg transition-colors"
            >
              Log in
            </button>
          </form>
        </div>
      </div>
    );
  }

  const products = await getProductsWithStock();
  return (
    <div className="min-h-screen bg-white">
      {/* Page Header */}
      <div className="bg-[#0A0A0A] py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex items-end justify-between">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">ADMIN</h1>
            <div className="flex items-center gap-2">
              <Settings className="w-5 h-5 text-[#DC2626]" />
              <span className="text-[#DC2626] text-xs font-semibold uppercase tracking-widest">
                Stock Manager
              </span>
            </div>
          </div>
          <form action={logout}>
            <button
              type="submit"
              className="text-sm text-gray-400 hover:text-white font-semibold transition-colors"
            >
              Log out
            </button>
          </form>
        </div>
      </div>

      {/* Dashboard */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <AdminDashboard products={products} />
      </div>
    </div>
  );
}
