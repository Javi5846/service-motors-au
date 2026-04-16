import { ShoppingBag } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/lib/sanity";

export const metadata = {
  title: "Shop | Service Motors AU",
  description:
    "Buy quality automotive parts online — oils, filters, brake pads and more. Delivered in Sydney.",
};

export default async function ShopPage() {
  const products = await getProducts();

  return (
    <div className="min-h-screen bg-white">
      {/* Page Header */}
      <div className="bg-[#0A0A0A] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-3">
            <ShoppingBag className="w-6 h-6 text-[#DC2626]" />
            <span className="text-[#DC2626] text-xs font-semibold uppercase tracking-widest">
              Online Store
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
            Parts & Products
          </h1>
          <p className="mt-3 text-gray-400 max-w-lg">
            Quality automotive parts sourced and tested by our mechanics.
            Available for purchase and delivery.
          </p>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {products.length === 0 ? (
          <div className="text-center py-24">
            <ShoppingBag className="w-16 h-16 text-gray-200 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-300 mb-2">
              Products Coming Soon
            </h2>
            <p className="text-gray-400 max-w-sm mx-auto">
              We&apos;re stocking up the shop. Check back soon or contact us
              directly for parts availability.
            </p>
            <a
              href="https://wa.me/61433541686"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-6 bg-[#DC2626] hover:bg-[#B91C1C] text-white font-semibold px-6 py-3 rounded transition-colors"
            >
              Ask via WhatsApp
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
