"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X, Wrench } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0A] border-b border-[#1F1F1F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-[#DC2626] rounded flex items-center justify-center group-hover:bg-[#B91C1C] transition-colors">
              <Wrench className="w-4 h-4 text-white" />
            </div>
            <span className="text-white font-bold text-lg tracking-tight">
              Service Motors <span className="text-[#DC2626]">AU</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-300 hover:text-white text-sm font-medium transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#DC2626] group-hover:w-full transition-all duration-200" />
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
            className="md:hidden text-gray-300 hover:text-white"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#111111] border-t border-[#1F1F1F] px-4 py-4 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block text-gray-300 hover:text-white font-medium py-2 border-b border-[#1F1F1F]"
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
