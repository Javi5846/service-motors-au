"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "Do you do Pink Slips?",
    a: "Not just yet — but watch this space. For now, we focus on servicing, parts, filters, and brakes.",
  },
  {
    q: "How can I pay for services and parts?",
    a: "We accept PayID, debit and credit cards, and cash.",
  },
  {
    q: "Do you provide an invoice?",
    a: "Yes, we provide an invoice regardless of the payment method used.",
  },
  {
    q: "Why do you ask for my REGO?",
    a: "Your REGO allows us to look up your exact vehicle and source the right parts for it. This way we can provide an accurate quote and confirm compatibility before you commit — so there are no surprises when the part arrives.",
  },
  {
    q: "Do you come to me, or do I bring the car?",
    a: "We come to you. Our mobile service means you don't have to drop your car off anywhere — we show up at your home or workplace and get the job done while you carry on with your day.",
  },
  {
    q: "Do you install parts I supply myself?",
    a: "Yes, we do. Keep in mind that compatibility and labour may vary depending on the car make, model, and type of service — so feel free to get in touch before to confirm everything will work smoothly.",
  },
  {
    q: "The part I need isn't in your shop — can you source it for me?",
    a: "Absolutely. If we don't have it listed, we can look it up and order it in for you. Most parts can be sourced without any issues. For special or hard-to-find orders, a deposit may be required upfront. Just get in touch and we'll do our best to track it down.",
  },
  {
    q: "Are you insured?",
    a: "Yes. Service Motors AU is fully insured through Allianz Australia, holding a Business Insurance Pack with Public and Products Liability cover of up to $10,000,000. You can have complete peace of mind knowing your vehicle and property are protected while we work.",
  },
  {
    q: "Can I return my order?",
    a: "Yes, returns are accepted provided the item is in the exact same condition as when purchased — original packaging intact, boxes unopened, and oils or fluids factory-sealed. Items that have been opened, used, or are missing their original packaging <strong>cannot be returned</strong>.",
  },
];

export default function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => (
        <div
          key={i}
          className="border border-gray-100 rounded-2xl shadow-sm overflow-hidden"
        >
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left bg-white hover:bg-gray-50 transition-colors"
          >
            <span className="font-bold text-[#0A0A0A] text-sm sm:text-base">{faq.q}</span>
            <ChevronDown
              className={`w-5 h-5 text-[#DC2626] shrink-0 transition-transform duration-300 ${
                open === i ? "rotate-180" : ""
              }`}
            />
          </button>

          <div
            className={`overflow-hidden transition-all duration-300 ${
              open === i ? "max-h-96" : "max-h-0"
            }`}
          >
            <p
              className="px-6 pb-5 text-gray-500 text-sm leading-relaxed"
              dangerouslySetInnerHTML={{ __html: faq.a }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
