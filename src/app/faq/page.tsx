import { HelpCircle } from "lucide-react";
import FaqAccordion from "@/components/FaqAccordion";

export const metadata = {
  title: "FAQ | Service Motors AU",
  description: "Frequently asked questions about Service Motors AU services in Sydney.",
};

export default function FaqPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Page Header */}
      <div className="bg-[#0A0A0A] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-3">
            <HelpCircle className="w-8 h-8 text-[#DC2626]" />
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white uppercase">
              FAQ
            </h1>
          </div>
          <p className="mt-3 text-gray-400 max-w-lg">
            Answers to the most common questions about our services.
          </p>
        </div>
      </div>

      {/* Accordion */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <FaqAccordion />

        {/* Still have questions */}
        <div className="mt-10 text-center bg-[#0A0A0A] rounded-2xl p-8">
          <p className="text-white font-bold text-lg mb-1">Still have questions?</p>
          <p className="text-gray-400 text-sm mb-5">Can&apos;t find what you&apos;re looking for? We&apos;re happy to help.</p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#DC2626] hover:bg-[#B91C1C] text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm"
          >
            Get in touch
          </a>
        </div>
      </div>
    </div>
  );
}
