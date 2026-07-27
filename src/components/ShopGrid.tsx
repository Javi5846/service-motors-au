"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronDown, Search, X, SlidersHorizontal } from "lucide-react";
import type { Product } from "@/data/products";

const CATEGORIES = [
  { label: "All",           value: "all" },
  { label: "Oil Filters",   value: "Oil Filter" },
  { label: "Air Filters",   value: "Air Filter" },
  { label: "Cabin Filters", value: "Cabin Filter" },
  { label: "Oil",           value: "Oil" },
  { label: "Belts & Kits",  value: "Drive Belts" },
  { label: "Other",         value: "Other" },
];

const SORT_OPTIONS = [
  { label: "Sort by",            value: "default" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Name: A → Z",        value: "az" },
  { label: "Name: Z → A",        value: "za" },
];

function getBrand(product: Product): string {
  return product.specs.find((s) => s.label === "Brand")?.value ?? "Other";
}

function normalise(str: string) {
  return str.replace(/[\s\-\/]/g, "").toLowerCase();
}

function matchesSearch(product: Product, query: string): boolean {
  const q = normalise(query);
  if (!q) return true;
  return [product.name, product.shortDescription, product.category, ...product.specs.map((s) => s.value)]
    .some((f) => normalise(f).includes(q));
}

function sortProducts(products: Product[], sort: string): Product[] {
  const copy = [...products];
  switch (sort) {
    case "price-asc":  return copy.sort((a, b) => a.price - b.price);
    case "price-desc": return copy.sort((a, b) => b.price - a.price);
    case "az":         return copy.sort((a, b) => a.name.localeCompare(b.name));
    case "za":         return copy.sort((a, b) => b.name.localeCompare(a.name));
    default:           return copy;
  }
}

interface Props {
  products: Product[];
}

export default function ShopGrid({ products }: Props) {
  const [category, setCategory]       = useState("all");
  const [brands, setBrands]           = useState<string[]>([]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [search, setSearch]           = useState("");
  const [sort, setSort]               = useState("default");
  const [showFilters, setShowFilters] = useState(false);

  const allBrands = useMemo(() => {
    const set = new Set(products.map(getBrand));
    return Array.from(set).sort();
  }, [products]);

  function toggleBrand(brand: string) {
    setBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  }

  function clearFilters() {
    setCategory("all");
    setBrands([]);
    setInStockOnly(false);
    setSearch("");
  }

  const hasActiveFilters = category !== "all" || brands.length > 0 || inStockOnly || search.trim().length > 0;

  const displayed = useMemo(() => {
    let result = products;
    if (search.trim())    result = result.filter((p) => matchesSearch(p, search));
    if (category !== "all") result = result.filter((p) => p.category === category);
    if (brands.length > 0)  result = result.filter((p) => brands.includes(getBrand(p)));
    if (inStockOnly)        result = result.filter((p) => p.inStock);
    return sortProducts(result, sort);
  }, [products, search, category, brands, inStockOnly, sort]);

  const sidebarContent = (
    <div className="space-y-7">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search parts... e.g. HU7002"
          className="w-full pl-9 pr-8 py-2 rounded-lg border border-gray-200 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#DC2626] transition-colors"
        />
        {search && (
          <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#DC2626]">
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Category */}
      <div>
        <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-2">Category</p>
        <ul className="space-y-0.5">
          {CATEGORIES.map((cat) => {
            const count = cat.value === "all"
              ? products.length
              : products.filter((p) => p.category === cat.value).length;
            return (
              <li key={cat.value}>
                <button
                  onClick={() => setCategory(cat.value)}
                  className={`w-full text-left flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                    category === cat.value
                      ? "bg-[#DC2626] text-white font-semibold"
                      : "text-gray-600 hover:bg-gray-100 hover:text-[#DC2626]"
                  }`}
                >
                  <span>{cat.label}</span>
                  <span className={`text-xs ${category === cat.value ? "text-red-100" : "text-gray-400"}`}>
                    {count}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-100" />

      {/* Brand */}
      <div>
        <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-3">Brand</p>
        <ul className="space-y-2.5">
          {allBrands.map((brand) => {
            const count = products.filter((p) => getBrand(p) === brand).length;
            return (
              <li key={brand}>
                <label className="flex items-center gap-2.5 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={brands.includes(brand)}
                    onChange={() => toggleBrand(brand)}
                    className="w-4 h-4 rounded border-gray-300 accent-[#DC2626] cursor-pointer"
                  />
                  <span className="text-sm text-gray-600 group-hover:text-[#DC2626] transition-colors flex-1">
                    {brand}
                  </span>
                  <span className="text-xs text-gray-400">{count}</span>
                </label>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-100" />

      {/* In Stock */}
      <label className="flex items-center gap-2.5 cursor-pointer group">
        <input
          type="checkbox"
          checked={inStockOnly}
          onChange={() => setInStockOnly((v) => !v)}
          className="w-4 h-4 rounded border-gray-300 accent-[#DC2626] cursor-pointer"
        />
        <span className="text-sm font-semibold text-gray-700 group-hover:text-[#DC2626] transition-colors">
          In Stock Only
        </span>
      </label>

      {/* Clear */}
      {hasActiveFilters && (
        <button onClick={clearFilters} className="text-xs text-[#DC2626] hover:underline font-semibold">
          Clear all filters
        </button>
      )}
    </div>
  );

  return (
    <div className="flex gap-10 items-start">

      {/* Sidebar — desktop only */}
      <aside className="hidden lg:block w-52 shrink-0 sticky top-24">
        {sidebarContent}
      </aside>

      {/* Main content */}
      <div className="flex-1 min-w-0">

        {/* Top bar: mobile filter toggle + sort */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => setShowFilters((v) => !v)}
            className="lg:hidden inline-flex items-center gap-2 border border-gray-200 rounded-full px-4 py-2 text-sm font-semibold text-gray-600 hover:border-[#DC2626] hover:text-[#DC2626] transition-colors"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
            {hasActiveFilters && (
              <span className="bg-[#DC2626] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                !
              </span>
            )}
          </button>

          <div className="relative shrink-0 ml-auto">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="appearance-none bg-white border border-gray-200 text-gray-600 text-sm font-semibold rounded-full px-4 py-2 pr-9 cursor-pointer hover:border-[#DC2626] hover:text-[#DC2626] transition-colors focus:outline-none focus:border-[#DC2626]"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Mobile filter panel */}
        {showFilters && (
          <div className="lg:hidden bg-gray-50 border border-gray-100 rounded-xl p-5 mb-6">
            {sidebarContent}
          </div>
        )}

        {/* Results count */}
        <p className="text-sm text-gray-400 mb-6">
          {displayed.length} {displayed.length === 1 ? "product" : "products"}
        </p>

        {/* Grid */}
        {displayed.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-lg font-semibold mb-2">No products found</p>
            <p className="text-sm">Try adjusting your filters or search term.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
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
      </div>
    </div>
  );
}
