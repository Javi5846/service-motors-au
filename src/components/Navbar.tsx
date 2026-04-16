"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Service Motors AU"
              width={88}
              height={88}
              className="rounded-lg"
            />
            <span className="font-[family-name:var(--font-bebas)] text-3xl tracking-wide hidden sm:inline text-[#0A0A0A]">
              Service Motors <span className="text-[#DC2626]">AU</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[#0A0A0A] hover:text-[#DC2626] text-base font-bold transition-all duration-200 hover:scale-105 inline-block"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="bg-[#DC2626] hover:bg-[#B91C1C] text-white text-sm font-semibold px-4 py-2 rounded transition-colors"
            >
              Book a Service
            </Link>
          </nav>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden text-[#0A0A0A] hover:text-[#DC2626]"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 px-4 py-4 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block text-[#0A0A0A] hover:text-[#DC2626] font-medium py-2 border-b border-gray-100"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setIsOpen(false)}
            className="block bg-[#DC2626] hover:bg-[#B91C1C] text-white font-semibold px-4 py-2 rounded text-center mt-2 transition-colors"
          >
            Book a Service
          </Link>
        </div>
      )}
    </header>
  );
}
