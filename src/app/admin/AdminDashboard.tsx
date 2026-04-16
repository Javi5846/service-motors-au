"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toggleStock, logout } from "./actions";
import type { Product } from "@/data/products";

export default function AdminDashboard({ products }: { products: Product[] }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleToggle(id: string, currentlyInStock: boolean) {
    startTransition(async () => {
      await toggleStock(id, currentlyInStock);
      router.refresh();
    });
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-extrabold text-[#0A0A0A]">Stock Manager</h1>
            <p className="text-gray-500 text-sm mt-1">Service Motors AU</p>
          </div>
          <form action={logout}>
            <button
              type="submit"
              className="text-sm text-gray-500 hover:text-[#DC2626] font-semibold transition-colors"
            >
              Log out
            </button>
          </form>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 text-center">
            <p className="text-3xl font-extrabold text-green-600">
              {products.filter((p) => p.inStock).length}
            </p>
            <p className="text-sm text-gray-500 mt-1">In Stock</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 text-center">
            <p className="text-3xl font-extrabold text-[#DC2626]">
              {products.filter((p) => !p.inStock).length}
            </p>
            <p className="text-sm text-gray-500 mt-1">Out of Stock</p>
          </div>
        </div>

        {/* Product list */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm divide-y divide-gray-100">
          {products.map((product) => (
            <div key={product.id} className="flex items-center gap-4 px-5 py-4">
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-[#0A0A0A] text-sm truncate">{product.name}</p>
                <p className="text-xs text-gray-400 mt-0.5">{product.category} · ${product.price.toFixed(2)}</p>
              </div>
              <span className={`shrink-0 text-xs font-bold px-2.5 py-1 rounded-full ${
                product.inStock
                  ? "bg-green-50 text-green-600"
                  : "bg-red-50 text-[#DC2626]"
              }`}>
                {product.inStock ? "In Stock" : "Out of Stock"}
              </span>
              <button
                onClick={() => handleToggle(product.id, product.inStock)}
                disabled={isPending}
                className={`shrink-0 text-xs font-semibold px-4 py-2 rounded-lg transition-colors disabled:opacity-40 ${
                  product.inStock
                    ? "bg-[#0A0A0A] hover:bg-[#DC2626] text-white"
                    : "bg-green-600 hover:bg-green-700 text-white"
                }`}
              >
                {product.inStock ? "Set Out of Stock" : "Set In Stock"}
              </button>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          Changes go live on the shop instantly.
        </p>
      </div>
    </div>
  );
}
