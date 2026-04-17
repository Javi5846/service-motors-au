"use client";

import { useState } from "react";
import { toggleStock, updatePrice, bulkSetStock } from "./actions";
import type { Product } from "@/data/products";

export default function AdminDashboard({ products: initial }: { products: Product[] }) {
  const [stockMap, setStockMap] = useState<Record<string, boolean>>(
    Object.fromEntries(initial.map((p) => [p.id, p.inStock]))
  );
  const [priceMap, setPriceMap] = useState<Record<string, number>>(
    Object.fromEntries(initial.map((p) => [p.id, p.price]))
  );
  const [editingPrice, setEditingPrice] = useState<Record<string, string>>({});
  const [pendingStock, setPendingStock] = useState<string | null>(null);
  const [pendingPrice, setPendingPrice] = useState<string | null>(null);
  const [savedPrice, setSavedPrice] = useState<string | null>(null);
  const [bulkPending, setBulkPending] = useState(false);

  const inStockCount = Object.values(stockMap).filter(Boolean).length;
  const outCount = initial.length - inStockCount;

  async function handleToggle(id: string) {
    const current = stockMap[id];
    setPendingStock(id);
    setStockMap((prev) => ({ ...prev, [id]: !current }));
    try {
      await toggleStock(id, current);
    } catch {
      setStockMap((prev) => ({ ...prev, [id]: current }));
    } finally {
      setPendingStock(null);
    }
  }

  async function handleSavePrice(id: string) {
    const raw = editingPrice[id];
    if (raw === undefined) return;
    const parsed = parseFloat(raw);
    if (isNaN(parsed) || parsed < 0) return;
    setPendingPrice(id);
    try {
      await updatePrice(id, parsed);
      setPriceMap((prev) => ({ ...prev, [id]: parsed }));
      setEditingPrice((prev) => { const n = { ...prev }; delete n[id]; return n; });
      setSavedPrice(id);
      setTimeout(() => setSavedPrice(null), 2000);
    } finally {
      setPendingPrice(null);
    }
  }

  async function handleBulk(inStock: boolean) {
    setBulkPending(true);
    try {
      await bulkSetStock(inStock);
      setStockMap(Object.fromEntries(initial.map((p) => [p.id, inStock])));
    } finally {
      setBulkPending(false);
    }
  }

  return (
    <div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 text-center">
            <p className="text-3xl font-extrabold text-green-600">{inStockCount}</p>
            <p className="text-sm text-gray-500 mt-1">In Stock</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 text-center">
            <p className="text-3xl font-extrabold text-[#DC2626]">{outCount}</p>
            <p className="text-sm text-gray-500 mt-1">Out of Stock</p>
          </div>
        </div>

        {/* Bulk actions */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Bulk:</span>
          <button
            onClick={() => handleBulk(true)}
            disabled={bulkPending}
            className="text-xs font-semibold px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white transition-colors disabled:opacity-40"
          >
            Set All In Stock
          </button>
          <button
            onClick={() => handleBulk(false)}
            disabled={bulkPending}
            className="text-xs font-semibold px-4 py-2 rounded-lg bg-[#0A0A0A] hover:bg-[#DC2626] text-white transition-colors disabled:opacity-40"
          >
            Set All Out of Stock
          </button>
        </div>

        {/* Product list */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm divide-y divide-gray-100">
          {initial.map((product) => {
            const inStock = stockMap[product.id];
            const isStockLoading = pendingStock === product.id;
            const currentPrice = priceMap[product.id];
            const editValue = editingPrice[product.id];
            const isDirty = editValue !== undefined;
            const isPriceLoading = pendingPrice === product.id;
            const justSaved = savedPrice === product.id;

            return (
              <div key={product.id} className="flex flex-col sm:flex-row sm:items-center gap-3 px-5 py-4">
                {/* Name + category */}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-[#0A0A0A] text-sm truncate">{product.name}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{product.category}</p>
                </div>

                {/* Price editor */}
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs text-gray-400 font-semibold">$</span>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={isDirty ? editValue : currentPrice.toFixed(2)}
                    onChange={(e) => setEditingPrice((prev) => ({ ...prev, [product.id]: e.target.value }))}
                    className="w-20 border border-gray-200 rounded-lg px-2 py-1.5 text-sm text-center focus:outline-none focus:border-[#DC2626] transition-colors"
                  />
                  {isDirty && (
                    <button
                      onClick={() => handleSavePrice(product.id)}
                      disabled={isPriceLoading}
                      className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-[#DC2626] hover:bg-[#B91C1C] text-white transition-colors disabled:opacity-40"
                    >
                      {isPriceLoading ? "..." : "Save"}
                    </button>
                  )}
                  {!isDirty && justSaved && (
                    <span className="text-xs text-green-600 font-semibold">Saved ✓</span>
                  )}
                  {!isDirty && !justSaved && (
                    <span className="w-[52px]" />
                  )}
                </div>

                {/* Stock badge */}
                <span className={`shrink-0 text-xs font-bold px-2.5 py-1 rounded-full ${
                  inStock ? "bg-green-50 text-green-600" : "bg-red-50 text-[#DC2626]"
                }`}>
                  {inStock ? "In Stock" : "Out of Stock"}
                </span>

                {/* Toggle button */}
                <button
                  onClick={() => handleToggle(product.id)}
                  disabled={isStockLoading || pendingStock !== null}
                  className={`shrink-0 text-xs font-semibold px-4 py-2 rounded-lg transition-colors disabled:opacity-40 ${
                    inStock
                      ? "bg-[#0A0A0A] hover:bg-[#DC2626] text-white"
                      : "bg-green-600 hover:bg-green-700 text-white"
                  }`}
                >
                  {isStockLoading ? "Saving..." : inStock ? "Set Out of Stock" : "Set In Stock"}
                </button>
              </div>
            );
          })}
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          Changes go live on the shop instantly.
        </p>
    </div>
  );
}
