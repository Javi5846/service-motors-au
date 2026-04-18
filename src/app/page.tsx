import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";


export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-[#DC2626] overflow-hidden">

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 md:pt-28 pb-0">
          {/* Headline */}
          <h1 className="font-[family-name:var(--font-bebas)] text-6xl sm:text-8xl md:text-9xl text-white leading-none mb-4">
            We Come<br />
            <span className="text-[#0A0A0A]">To You.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-white text-xl sm:text-3xl font-bold mb-6">
            MOBILE SERVICING &amp; AUTO PARTS
          </p>

          {/* Service bullets */}
          <ul className="flex flex-col gap-3 mb-8">
            {["OIL CHANGE", "FILTERS", "BRAKE PADS", "ROTORS"].map((point) => (
              <li key={point} className="flex items-center gap-3 text-white text-lg font-normal tracking-wide">
                <span className="w-2 h-2 rounded-full bg-white inline-block shrink-0" />
                {point}
              </li>
            ))}
          </ul>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 mb-16">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#0A0A0A] hover:bg-[#1a1a1a] text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              Request a quote <ChevronRight className="w-4 h-4" />
            </Link>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 border-2 border-white/40 hover:border-white text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              Shop Parts
            </Link>
          </div>
        </div>

      </section>

      {/* Brands */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-gray-400 mb-10">
            Brands We Use &amp; Stock
          </p>
          <div className="flex flex-wrap items-center justify-center gap-10 sm:gap-16">
            {[
              { src: "/brands/motul.png",   alt: "Motul" },
              { src: "/brands/castrol.png", alt: "Castrol" },
              { src: "/brands/mann.png",    alt: "Mann Filter" },
              { src: "/brands/ryco.png",    alt: "Ryco" },
            ].map((brand) => (
              <Image
                key={brand.alt}
                src={brand.src}
                alt={brand.alt}
                width={160}
                height={80}
                className="object-contain"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block text-white text-2xl sm:text-3xl font-extrabold mb-3">
              WHAT CUSTOMERS SAY
            </span>
          </div>
          <TestimonialsCarousel />
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-[#DC2626] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Ready to book your service?
          </h2>
          <p className="text-red-100 text-lg mb-8 max-w-xl mx-auto">
            Get in touch via WhatsApp or email and we&apos;ll get your car
            sorted — fast.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://wa.me/61433541686"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1da851] text-white font-semibold px-6 py-3 rounded transition-colors"
            >
              <Image src="/whatsapp.png" alt="WhatsApp" width={22} height={22} className="brightness-0 invert" />
              WhatsApp Us
            </a>
            <a
              href="mailto:servicemotorsau@gmail.com"
              className="inline-flex items-center gap-2 border-2 border-white text-white hover:bg-white hover:text-[#DC2626] font-semibold px-6 py-3 rounded transition-colors"
            >
              Send an Email
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
