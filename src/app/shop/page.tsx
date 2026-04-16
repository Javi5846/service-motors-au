import { ShoppingBag } from "lucide-react";
import { products } from "@/data/products";
import ShopGrid from "@/components/ShopGrid";

export const metadata = {
  title: "Shop | Service Motors AU",
  description:
    "Buy quality automotive parts online — oils, filters, brake pads and more.",
};

export default function ShopPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Page Header */}
      <div className="bg-[#0A0A0A] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
            AUTO PARTS
          </h1>
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#DC2626]" />
            <span className="text-[#DC2626] text-xs font-semibold uppercase tracking-widest">
              Online Store
            </span>
          </div>
          <p className="mt-3 text-gray-400 max-w-lg">
            Quality automotive parts
          </p>
          <div className="flex items-center gap-2 mt-2 text-sm font-semibold text-white">
            <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
            Same Day Collection Available
          </div>
        </div>
      </div>

      {/* Products + Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <ShopGrid products={products} />
      </div>
    </div>
  );
}
