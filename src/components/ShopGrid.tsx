"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import type { Product } from "@/data/products";

const CATEGORIES = [
  { label: "All", value: "all" },
  { label: "Oil Filters", value: "Oil Filter" },
  { label: "Air Filters", value: "Air Filter" },
  { label: "Cabin Filters", value: "Cabin Filter" },
  { label: "Oil", value: "Oil" },
];

const SORT_OPTIONS = [
  { label: "Sort by", value: "default" },
  { label: "Category", value: "category" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Name: A → Z", value: "az" },
  { label: "Name: Z → A", value: "za" },
];

interface Props {
  products: Product[];
}

function sortProducts(products: Product[], sort: string): Product[] {
  const copy = [...products];
  switch (sort) {
    case "category":   return copy.sort((a, b) => a.category.localeCompare(b.category));
    case "price-asc":  return copy.sort((a, b) => a.price - b.price);
    case "price-desc": return copy.sort((a, b) => b.price - a.price);
    case "az":         return copy.sort((a, b) => a.name.localeCompare(b.name));
    case "za":         return copy.sort((a, b) => b.name.localeCompare(a.name));
    default:           return copy;
  }
}

export default function ShopGrid({ products }: Props) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [sort, setSort] = useState("default");

  const filtered = activeCategory === "all"
    ? products
    : products.filter((p) => p.category === activeCategory);

  const displayed = sortProducts(filtered, sort);

  return (
    <>
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">

        {/* Category pills */}
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`px-4 py-2 rounded-full text-sm font-semibold border transition-colors ${
                activeCategory === cat.value
                  ? "bg-[#DC2626] border-[#DC2626] text-white"
                  : "bg-white border-gray-200 text-gray-600 hover:border-[#DC2626] hover:text-[#DC2626]"
              }`}
            >
              {cat.label}
              {cat.value !== "all" && (
                <span className="ml-1.5 text-xs opacity-60">
                  ({products.filter((p) => p.category === cat.value).length})
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Sort dropdown */}
        <div className="relative shrink-0">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="appearance-none bg-white border border-gray-200 text-gray-600 text-sm font-semibold rounded-full px-4 py-2 pr-9 cursor-pointer hover:border-[#DC2626] hover:text-[#DC2626] transition-colors focus:outline-none focus:border-[#DC2626]"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* Results count */}
      <p className="text-sm text-gray-400 mb-6">
        {displayed.length} {displayed.length === 1 ? "product" : "products"}
      </p>

      {/* Grid */}
      {displayed.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <p className="text-lg font-semibold mb-2">No products in this category yet</p>
          <p className="text-sm">Check back soon or contact us directly.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayed.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-md hover:shadow-xl hover:border-gray-200 transition-all duration-300 flex flex-col"
            >
              <Link href={`/shop/${product.id}`} className="block relative h-56 bg-white overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain p-6 hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-3 left-3 bg-[#DC2626] text-white text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-widest">
                  {product.category}
                </span>
                {product.inStock ? (
                  <span className="absolute top-3 right-3 inline-flex items-center gap-1 bg-green-50 text-green-600 text-[11px] font-bold px-2.5 py-1 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
                    In Stock
                  </span>
                ) : (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="bg-white text-[#DC2626] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                      Out of Stock
                    </span>
                  </div>
                )}
              </Link>

              <div className="p-5 flex flex-col flex-1">
                <Link href={`/shop/${product.id}`}>
                  <h3 className="font-bold text-[#0A0A0A] text-base mb-1 hover:text-[#DC2626] transition-colors">
                    {product.name}
                  </h3>
                </Link>
                <p className="text-gray-400 text-sm mb-5 line-clamp-2 flex-1">
                  {product.shortDescription}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-[#DC2626] font-extrabold text-2xl">
                    ${product.price.toFixed(2)}
                  </span>
                  <Link
                    href={`/shop/${product.id}`}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0A0A0A] hover:text-[#DC2626] transition-colors"
                  >
                    View Details
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
