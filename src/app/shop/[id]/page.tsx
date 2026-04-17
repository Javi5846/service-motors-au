import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle, MessageCircle, Mail, ShieldCheck } from "lucide-react";
import { getProductWithStock } from "@/lib/stock";
import { products } from "@/data/products"; // needed for generateStaticParams
import ProductGallery from "@/components/ProductGallery";

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = products.find((p) => p.id === id);
  if (!product) return {};
  return {
    title: `${product.name} | Service Motors AU Shop`,
    description: product.shortDescription,
  };
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await getProductWithStock(id);

  if (!product) notFound();

  const waMessage = `Hi! I'd like to order: ${product.name} ($${product.price.toFixed(2)})`;

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">

        {/* Back */}
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#DC2626] mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Shop
        </Link>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">

            {/* Image gallery */}
            <ProductGallery
              images={product.images ?? [product.image]}
              name={product.name}
              category={product.category}
            />

            {/* Details */}
            <div className="p-8 lg:p-10 flex flex-col">

              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0A0A0A] mb-2">
                {product.name}
              </h1>

              <div className="flex items-center gap-3 mb-6">
                <span className="text-[#DC2626] font-extrabold text-3xl">
                  ${product.price.toFixed(2)}
                </span>
                {product.inStock ? (
                  <span className="inline-flex items-center gap-1.5 text-green-600 text-sm font-semibold bg-green-50 px-3 py-1 rounded-full">
                    <CheckCircle className="w-4 h-4" /> In Stock
                  </span>
                ) : (
                  <span className="text-red-500 text-sm font-semibold bg-red-50 px-3 py-1 rounded-full">
                    Out of Stock
                  </span>
                )}
              </div>

              <p className="text-gray-600 leading-relaxed mb-8">
                {product.description}
              </p>

              {/* Order buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mb-8">
                <a
                  href={`https://wa.me/61433541686?text=${encodeURIComponent(waMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1da851] text-white font-semibold px-6 py-3 rounded-xl transition-colors"
                >
                  <MessageCircle className="w-5 h-5 shrink-0" />
                  <span className="whitespace-nowrap">Order via WhatsApp</span>
                </a>
                <a
                  href={`mailto:servicemotorsau@gmail.com?subject=Order: ${product.name}&body=${encodeURIComponent(`Hi, I'd like to order: ${product.name} ($${product.price.toFixed(2)})`)}`}
                  className="flex-1 inline-flex items-center justify-center gap-2 border-2 border-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-white text-[#0A0A0A] font-semibold px-6 py-3 rounded-xl transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  Order via Email
                </a>
              </div>

              {/* Badges */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-gray-400 text-sm">
                  <ShieldCheck className="w-4 h-4 text-[#DC2626]" />
                  OEM quality — sourced and checked by our mechanics
                </div>
                <div className="flex items-center gap-2 text-sm font-semibold text-[#0A0A0A]">
                  <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
                  Same Day Collection Available
                </div>
              </div>
            </div>
          </div>

          {/* Specs + Compatibility */}
          <div className="border-t border-gray-100 grid grid-cols-1 lg:grid-cols-2">

            {/* Specs Table */}
            <div className="p-8 lg:p-10">
              <h2 className="text-lg font-extrabold text-[#0A0A0A] mb-5 uppercase tracking-wide">
                Specifications
              </h2>
              <table className="w-full text-sm">
                <tbody>
                  {product.specs.map((spec, i) => (
                    <tr key={spec.label} className={i % 2 === 0 ? "bg-[#F5F5F5]" : "bg-white"}>
                      <td className="py-2.5 px-4 font-semibold text-[#0A0A0A] rounded-l w-1/2">
                        {spec.label}
                      </td>
                      <td className="py-2.5 px-4 text-gray-600 rounded-r">
                        {spec.value.includes("|")
                          ? spec.value.split("|").map((d) => d.trim()).join("   |   ")
                          : spec.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Compatible vehicles */}
            {product.compatible && product.compatible.length > 0 && (
              <div className="p-8 lg:p-10 border-t lg:border-t-0 lg:border-l border-gray-100">
                <h2 className="text-lg font-extrabold text-[#0A0A0A] mb-5 uppercase tracking-wide">
                  Compatible Vehicles
                </h2>
                <ul className="space-y-2">
                  {product.compatible.map((vehicle) => (
                    <li key={vehicle} className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626] shrink-0" />
                      {vehicle}
                    </li>
                  ))}
                </ul>
                <p className="mt-5 text-xs text-gray-400">
                  Not sure if this fits your vehicle? Contact us before ordering.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
