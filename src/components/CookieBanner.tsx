"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const choice = localStorage.getItem("cookies_choice");
    if (!choice) setVisible(true);
  }, []);

  function accept() {
    localStorage.setItem("cookies_choice", "all");
    setVisible(false);
  }

  function essential() {
    localStorage.setItem("cookies_choice", "essential");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#0A0A0A] border-t border-[#1F1F1F] px-4 py-5 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="max-w-2xl">
          <p className="text-white text-sm font-semibold mb-1">We use cookies</p>
          <p className="text-gray-400 text-xs leading-relaxed">
            We use essential cookies to keep the site working, and optional analytics &amp; advertising cookies to improve our service and show relevant ads. See our{" "}
            <Link href="/privacy" className="text-[#DC2626] hover:underline">
              Privacy Statement
            </Link>
            .
          </p>
        </div>
        <div className="flex gap-3 shrink-0">
          <button
            onClick={essential}
            className="text-xs font-semibold px-4 py-2 rounded-lg border border-gray-600 text-gray-400 hover:border-white hover:text-white transition-colors"
          >
            Essential only
          </button>
          <button
            onClick={accept}
            className="text-xs font-semibold px-4 py-2 rounded-lg bg-[#DC2626] hover:bg-[#B91C1C] text-white transition-colors"
          >
            Accept all
          </button>
        </div>
      </div>
    </div>
  );
}
