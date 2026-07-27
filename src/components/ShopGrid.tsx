"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronDown, Filter, Droplets, Cog, Package, LayoutGrid, Search, X } from "lucide-react";
import type { Product } from "@/data/products";

type GroupId = "all" | "filters" | "oil" | "belts" | "other";

const GROUPS: Array<{
  id: GroupId;
  label: string;
  Icon: React.ElementType;
  categories: string[] | null;
  sub: string;
}> = [
  { id: "all",     label: "All",          Icon: LayoutGrid, categories: null,                                          sub: "All products" },
  { id: "filters", label: "Filters",      Icon: Filter,     categories: ["Oil Filter", "Air Filter", "Cabin Filter"], sub: "Oil · Air · Cabin" },
  { id: "oil",     label: "Oil",          Icon: Droplets,   categories: ["Oil"],                                       sub: "Engine & synthetic" },
  { id: "belts",   label: "Belts & Kits", Icon: Cog,        categories: ["Drive Belts"],                               sub: "V-ribbed & timing" },
  { id: "other",   label: "Other",        Icon: Package,    categories: ["Other"],                                     sub: "Accessories & more" },
];

const FILTER_PILLS = [
  { label: "All",           value: "all" },
  { label: "Oil Filters",   value: "Oil Filter" },
  { label: "Air Filters",   value: "Air Filter" },
  { label: "Cabin Filters", value: "Cabin Filter" },
];

const SORT_OPTIONS = [
  { label: "Sort by",            value: "default" },
  { label: "Category",           value: "category" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Name: A → Z",        value: "az" },
  { label: "Name: Z → A",        value: "za" },
];

interface Props {
  products: Product[];
}

// Strip spaces, slashes, dashes and lowercase — so "H U 7002", "HU7002", "HU-7002" all match
function normalise(str: string) {
  return str.replace(/[\s\-\/]/g, "").toLowerCase();
}

function matchesSearch(product: Product, query: string): boolean {
  const q = normalise(query);
  if (!q) return true;
  const fields = [
    product.name,
    product.shortDescription,
    product.category,
    ...product.specs.map((s) => s.value),
  ];
  return fields.some((f) => normalise(f).includes(q));
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
  const [activeGroup, setActiveGroup]       = useState<GroupId | null>(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [sort, setSort]                     = useState("default");
  const [search, setSearch]                 = useState("");

  const isSearching = search.trim().length > 0;

  function handleGroupClick(id: GroupId) {
    setActiveGroup(id);
    setActiveCategory("all");
    setSearch("");
  }

  function clearSearch() {
    setSearch("");
  }

  // Search mode: all products, no category filter
  const searchResults = isSearching
    ? sortProducts(products.filter((p) => matchesSearch(p, search)), sort)
    : [];

  // Category mode
  const group = activeGroup ? GROUPS.find((g) => g.id === activeGroup)! : null;
  const byGroup = group
    ? group.categories
      ? products.filter((p) => group.categories!.includes(p.category))
      : products
    : [];
  const filtered = activeCategory === "all"
    ? byGroup
    : byGroup.filter((p) => p.category === activeCategory);
  const displayed = isSearching ? searchResults : sortProducts(filtered, sort);

  const showFilterPills = !isSearching && activeGroup === "filters";

  return (
    <>
      {/* Top toolbar: search + sort */}
      <div className="flex items-center gap-3 mb-8">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search... e.g. HU7002, W712/95"
            className="w-full pl-9 pr-8 py-2 rounded-full border border-gray-200 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#DC2626] transition-colors"
          />
          {isSearching && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#DC2626] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="relative shrink-0 ml-auto">
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

      {/* Category group squares — hidden while searching */}
      {!isSearching && (
        <div className={`mb-8 ${
          activeGroup
            ? "flex flex-row overflow-x-auto gap-2 pb-1 sm:justify-center"
            : "grid grid-cols-2 sm:flex sm:flex-row sm:justify-center gap-3"
        }`}>
          {GROUPS.map(({ id, label, Icon }) => {
            const active = activeGroup === id;
            return (
              <button
                key={id}
                onClick={() => handleGroupClick(id)}
                className={`flex flex-col items-center justify-center gap-2 rounded-xl border-2 transition-all duration-200 cursor-pointer shrink-0 ${
                  activeGroup
                    ? "w-[90px] h-[90px]"
                    : "h-[140px] sm:w-[146px] sm:h-[146px]"
                } ${
                  active
                    ? "bg-[#DC2626] border-[#DC2626] text-white"
                    : "bg-[#0A0A0A] border-[#1F1F1F] text-white hover:border-[#DC2626]"
                }`}
              >
                <div className={`rounded-full flex items-center justify-center ${
                  activeGroup ? "w-8 h-8" : "w-11 h-11"
                } ${active ? "bg-white/20" : "bg-white/10"}`}>
                  <Icon className={activeGroup ? "w-4 h-4" : "w-5 h-5"} />
                </div>
                <p className={`font-bold ${activeGroup ? "text-xs" : "text-sm"}`}>{label}</p>
              </button>
            );
          })}
        </div>
      )}

      {/* Nothing selected and not searching */}
      {!activeGroup && !isSearching && (
        <p className="text-center text-gray-400 py-16 text-sm">
          Select a category above or search for a product.
        </p>
      )}

      {/* Products section */}
      {(activeGroup || isSearching) && (
        <>
          {/* Filter sub-pills (Filters group only) */}
          {showFilterPills && (
            <div className="flex flex-wrap gap-2 mb-8">
              {FILTER_PILLS.map((cat) => (
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
          )}

          {/* Results count */}
          <p className="text-sm text-gray-400 mb-6">
            {isSearching
              ? `${displayed.length} ${displayed.length === 1 ? "result" : "results"} for "${search.trim()}"`
              : `${displayed.length} ${displayed.length === 1 ? "product" : "products"}`
            }
          </p>

          {/* Grid */}
          {displayed.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <p className="text-lg font-semibold mb-2">
                {isSearching ? "No products found" : "No products in this category yet"}
              </p>
              <p className="text-sm">
                {isSearching ? "Try a different search term." : "Check back soon or contact us directly."}
              </p>
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
      )}
    </>
  );
}
