"use client";

import { useState } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const reviews = [
  {
    name: "Dave B.",
    text: "Professional, friendly, and had easy smooth transaction. The service was completed on time, and my car is running well now. Pricing was fair and transparent, with no unexpected surprises. Highly recommend to anyone looking for reliable and trustworthy car servicing!",
  },
  {
    name: "Ethan M.",
    text: "Very professional, organized and trustworthy. Highly recommended.",
  },
  {
    name: "Mitch M.",
    text: "Came very quick and had the right tools for the job. Left no mess and was easy to communicate with. Will gladly recommend to anyone and will use again in the future if needed.",
  },
  {
    name: "Craig H.",
    text: "Excellent work! Great communication and attention to detail. Upfront with costs of parts and additional work. Punctual and respectful. Would highly recommend!",
  },
  {
    name: "Cris R.",
    text: "Amazing, profesional, highly recommend!!",
  },
];

export default function TestimonialsCarousel() {
  const [index, setIndex] = useState(0);

  const visible = 3;
  const total = reviews.length;

  function prev() {
    setIndex((i) => (i - 1 + total) % total);
  }

  function next() {
    setIndex((i) => (i + 1) % total);
  }

  // Get 3 reviews starting from current index, wrapping around
  const shown = Array.from({ length: visible }, (_, i) => reviews[(index + i) % total]);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        {shown.map((review, i) => (
          <div
            key={`${review.name}-${i}`}
            className={`bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col gap-4 h-[300px] sm:h-[340px] ${i > 0 ? "hidden sm:flex" : "flex"}`}
          >
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, j) => (
                <Star key={j} className="w-4 h-4 fill-[#DC2626] text-[#DC2626]" />
              ))}
            </div>
            <p className="text-gray-600 text-sm leading-relaxed flex-1 overflow-hidden">
              &ldquo;{review.text}&rdquo;
            </p>
            <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
              <div className="w-8 h-8 rounded-full bg-[#DC2626] flex items-center justify-center shrink-0">
                <span className="text-white text-xs font-bold">
                  {review.name.charAt(0)}
                </span>
              </div>
              <span className="text-sm font-bold text-[#0A0A0A]">{review.name}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={prev}
          className="w-9 h-9 rounded-full border border-gray-200 bg-white hover:border-[#DC2626] hover:text-[#DC2626] flex items-center justify-center transition-colors"
          aria-label="Previous"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="flex gap-2">
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`w-2 h-2 rounded-full transition-colors ${
                i === index ? "bg-[#DC2626]" : "bg-gray-300"
              }`}
              aria-label={`Go to review ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={next}
          className="w-9 h-9 rounded-full border border-gray-200 bg-white hover:border-[#DC2626] hover:text-[#DC2626] flex items-center justify-center transition-colors"
          aria-label="Next"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
