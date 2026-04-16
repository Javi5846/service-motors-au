"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  images: string[];
  name: string;
  category: string;
}

export default function ProductGallery({ images, name, category }: Props) {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  // Close lightbox on Escape, navigate with arrow keys
  useEffect(() => {
    if (!lightbox) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(false);
      if (e.key === "ArrowRight") setActive((p) => (p + 1) % images.length);
      if (e.key === "ArrowLeft") setActive((p) => (p - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightbox, images.length]);

  // Prevent background scroll when lightbox open
  useEffect(() => {
    document.body.style.overflow = lightbox ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightbox]);

  return (
    <>
      {/* Main image */}
      <div className="bg-white flex flex-col min-h-80 lg:min-h-full">
        <div
          className="relative flex-1 flex items-center justify-center p-10 min-h-72 cursor-zoom-in group"
          onClick={() => setLightbox(true)}
        >
          <Image
            key={active}
            src={images[active]}
            alt={`${name} — image ${active + 1}`}
            width={400}
            height={400}
            className="object-contain max-h-80 w-auto"
          />
          {/* Zoom hint */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors rounded-none flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 rounded-full p-2 shadow">
              <ZoomIn className="w-5 h-5 text-[#0A0A0A]" />
            </div>
          </div>
          <span className="absolute top-5 left-5 bg-[#DC2626] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">
            {category}
          </span>
        </div>

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="flex gap-3 px-8 pb-6 justify-center">
            {images.map((src, i) => (
              <button
                key={src}
                onClick={() => setActive(i)}
                className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                  active === i
                    ? "border-[#DC2626] shadow-md"
                    : "border-gray-200 hover:border-gray-400"
                }`}
              >
                <Image
                  src={src}
                  alt={`${name} thumbnail ${i + 1}`}
                  fill
                  className="object-contain p-1"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={() => setLightbox(false)}
        >
          {/* Close */}
          <button
            className="absolute top-5 right-5 text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors"
            onClick={() => setLightbox(false)}
          >
            <X className="w-6 h-6" />
          </button>

          {/* Prev */}
          {images.length > 1 && (
            <button
              className="absolute left-4 text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors"
              onClick={(e) => { e.stopPropagation(); setActive((p) => (p - 1 + images.length) % images.length); }}
            >
              <ChevronLeft className="w-7 h-7" />
            </button>
          )}

          {/* Full image */}
          <div
            className="relative max-w-4xl max-h-[90vh] w-full mx-16"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[active]}
              alt={`${name} — image ${active + 1}`}
              width={1000}
              height={1000}
              className="object-contain w-full max-h-[90vh]"
            />
          </div>

          {/* Next */}
          {images.length > 1 && (
            <button
              className="absolute right-4 text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors"
              onClick={(e) => { e.stopPropagation(); setActive((p) => (p + 1) % images.length); }}
            >
              <ChevronRight className="w-7 h-7" />
            </button>
          )}

          {/* Counter */}
          {images.length > 1 && (
            <span className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/60 text-sm">
              {active + 1} / {images.length}
            </span>
          )}
        </div>
      )}
    </>
  );
}
