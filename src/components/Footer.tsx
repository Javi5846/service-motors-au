import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react";


export default function Footer() {
  return (
    <footer className="bg-[#0A0A0A] border-t border-[#1F1F1F] text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/logo.png"
                alt="Service Motors AU"
                width={44}
                height={44}
                className="rounded"
              />
              <span className="font-[family-name:var(--font-bebas)] text-2xl tracking-wide text-white">
                Service Motors <span className="text-[#DC2626]">AU</span>
              </span>
            </div>
            <p className="text-xs uppercase tracking-widest text-gray-600 mb-2">Follow us</p>
            <a
              href="https://www.instagram.com/servicemotorsau?igsh=YXZ2YndvY2hqaXE0&utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex text-gray-400 hover:text-white transition-colors"
              aria-label="Instagram"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-white font-semibold mb-4 uppercase text-xs tracking-widest">
              Navigation
            </h3>
            <ul className="space-y-2 text-sm">
              {[
                { label: "Home", href: "/" },
                { label: "Shop", href: "/shop" },
                { label: "Contact", href: "/contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* FAQ */}
          <div>
            <h3 className="text-white font-semibold mb-4 uppercase text-xs tracking-widest">
              Legal & Info
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/faq" className="hover:text-white transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy Statement
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4 uppercase text-xs tracking-widest">
              Contact
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#DC2626] shrink-0" />
                <a
                  href="https://wa.me/61433541686"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  0433 541 686
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#DC2626] shrink-0" />
                <a
                  href="mailto:servicemotorsau@gmail.com"
                  className="hover:text-white transition-colors"
                >
                  servicemotorsau@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#DC2626] shrink-0 mt-0.5" />
                <span>Sydney, 2036 NSW, Australia</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#1F1F1F] mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>
            &copy; {new Date().getFullYear()} Service Motors AU. All rights reserved.
          </p>
          <p>
            <a href="https://servicemotorsau.com" className="hover:text-white transition-colors">
              servicemotorsau.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
