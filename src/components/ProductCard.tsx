"use client";

import { useState } from "react";
import Image from "next/image";
import { ShoppingCart, Loader2 } from "lucide-react";
import { urlFor } from "@/lib/sanity";
import type { Product } from "@/types";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const [loading, setLoading] = useState(false);

  const handleBuy = async () => {
    if (!product.stripePriceId) return;
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId: product.stripePriceId }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const imageUrl = product.image
    ? urlFor(product.image).width(400).height(300).fit("crop").url()
    : null;

  return (
    <div className="group bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-lg hover:border-[#DC2626]/20 transition-all duration-300">
      {/* Image */}
      <div className="relative h-48 bg-[#F5F5F5] overflow-hidden">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={product.image?.alt ?? product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="h-full flex items-center justify-center">
            <ShoppingCart className="w-12 h-12 text-gray-300" />
          </div>
        )}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="bg-[#DC2626] text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-widest">
              Out of Stock
            </span>
          </div>
        )}
        {product.category && (
          <span className="absolute top-3 left-3 bg-[#0A0A0A]/80 text-white text-xs font-medium px-2 py-1 rounded">
            {product.category}
          </span>
        )}
      </div>

      {/* Info */}
      <div className="p-5">
        <h3 className="font-bold text-[#0A0A0A] text-base mb-1 line-clamp-2">
          {product.name}
        </h3>
        <p className="text-gray-500 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-[#DC2626] font-extrabold text-xl">
            ${product.price.toFixed(2)}
          </span>
          <button
            onClick={handleBuy}
            disabled={!product.inStock || !product.stripePriceId || loading}
            className="flex items-center gap-2 bg-[#0A0A0A] hover:bg-[#DC2626] disabled:bg-gray-200 disabled:text-gray-400 text-white text-sm font-semibold px-4 py-2 rounded transition-colors disabled:cursor-not-allowed"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <ShoppingCart className="w-4 h-4" />
            )}
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}
