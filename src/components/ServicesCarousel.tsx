"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Droplets, CircleDot, ClipboardCheck, Zap } from "lucide-react";

const services = [
  {
    icon: Droplets,
    title: "Oil Change & Filters",
    description:
      "Full oil and filter service at your location using premium brands like Motul, Castrol and Mann-Filter. No workshop visit needed.",
  },
  {
    icon: CircleDot,
    title: "Brake Pads & Rotors",
    description:
      "Professional brake pad and rotor replacement to keep you safe on the road. We bring the parts and tools to you.",
  },
  {
    icon: ClipboardCheck,
    title: "Pre-Purchase Inspection",
    description:
      "Thinking of buying a used car? We'll inspect it thoroughly so you know exactly what you're getting before you commit.",
  },
  {
    icon: Zap,
    title: "Jump Start",
    description:
      "Battery gone flat? We'll come to you with professional jump start equipment and get you back on the road fast.",
  },
];

export default function ServicesCarousel() {
  const [index, setIndex] = useState(0);

  function prev() {
    setIndex((i) => (i - 1 + services.length) % services.length);
  }

  function next() {
    setIndex((i) => (i + 1) % services.length);
  }

  return (
    <div>
      {/* Desktop: show all 4 */}
      <div className="hidden md:grid grid-cols-4 gap-6">
        {services.map((s) => <ServiceCard key={s.title} service={s} />)}
      </div>

      {/* Mobile: carousel 1 at a time */}
      <div className="md:hidden">
        <ServiceCard service={services[index]} />
        <div className="flex items-center justify-center gap-4 mt-6">
          <button
            onClick={prev}
            className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center hover:border-[#DC2626] hover:text-[#DC2626] transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div className="flex gap-2">
            {services.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`w-2 h-2 rounded-full transition-colors ${i === index ? "bg-[#DC2626]" : "bg-gray-300"}`}
              />
            ))}
          </div>
          <button
            onClick={next}
            className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center hover:border-[#DC2626] hover:text-[#DC2626] transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

function ServiceCard({ service }: { service: typeof services[0] }) {
  const Icon = service.icon;
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col gap-4">
      <div className="w-12 h-12 bg-[#DC2626] rounded-xl flex items-center justify-center shrink-0">
        <Icon className="w-6 h-6 text-white" />
      </div>
      <h3 className="font-extrabold text-[#0A0A0A] text-base">{service.title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed">{service.description}</p>
    </div>
  );
}
