import Image from "next/image";
import { Mail, Phone, Clock } from "lucide-react";
import QuoteForm from "@/components/QuoteForm";

export const metadata = {
  title: "Contact | Service Motors AU",
  description:
    "Contact Service Motors AU in Sydney. Book a car service via WhatsApp or email.",
};

const contactMethods = [
  {
    icon: Phone,
    label: "WhatsApp or SMS",
    value: "0433 541 686",
    description: "Fastest way to reach us.",
    href: "https://wa.me/61433541686",
    cta: "Open WhatsApp",
    external: true,
  },
  {
    icon: Mail,
    label: "Email",
    value: "servicemotorsau@gmail.com",
    description: "Send us your enquiry and we'll get back to you promptly.",
    href: "mailto:servicemotorsau@gmail.com",
    cta: "Send Email",
    external: false,
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Page Header */}
      <div className="bg-[#0A0A0A] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-3">
            <Phone className="w-8 h-8 text-[#DC2626]" />
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white uppercase">
              Get In Touch
            </h1>
          </div>
          <p className="mt-3 text-gray-400 max-w-lg">
            Book a service, ask about parts, or request a quote. We&apos;re a
            message away.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Two-column: form + contact info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">

          {/* Quote Form */}
          <QuoteForm />

          {/* Contact info */}
          <div className="space-y-4">
            {contactMethods.map((method) => {
              const Icon = method.icon;
              return (
                <div
                  key={method.label}
                  className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex items-start gap-4"
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${method.label === "WhatsApp or SMS" ? "bg-white border border-gray-200" : "bg-[#DC2626]"}`}>
                    {method.label === "WhatsApp or SMS" ? (
                      <Image src="/whatsapp.png" alt="WhatsApp" width={28} height={28} />
                    ) : (
                      <Icon className="w-5 h-5 text-white" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-[#DC2626] uppercase tracking-widest mb-0.5">
                      {method.label}
                    </p>
                    <p className="font-bold text-[#0A0A0A] text-sm">{method.value}</p>
                    <p className="text-gray-600 text-sm mt-0.5">{method.description}</p>
                  </div>
                  {method.href && method.cta && (
                    <a
                      href={method.href}
                      target={method.external ? "_blank" : undefined}
                      rel={method.external ? "noopener noreferrer" : undefined}
                      className="shrink-0 self-center bg-[#0A0A0A] hover:bg-[#DC2626] text-white text-xs font-semibold px-3 py-2 rounded-lg transition-colors"
                    >
                      {method.cta}
                    </a>
                  )}
                </div>
              );
            })}

            {/* Hours */}
            <div className="px-1 pt-2 flex flex-col items-center lg:items-start">
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-4 h-4 text-[#DC2626]" />
                <p className="text-xs font-semibold text-[#DC2626] uppercase tracking-widest">Hours</p>
              </div>
              <ul className="space-y-1.5 text-sm w-48">
                {[
                  { day: "Mon", hours: "7:00 AM – 5:00 PM" },
                  { day: "Tue", hours: "7:00 AM – 5:00 PM" },
                  { day: "Wed", hours: "7:00 AM – 5:00 PM" },
                  { day: "Thu", hours: "7:00 AM – 5:00 PM" },
                  { day: "Fri", hours: "7:00 AM – 5:00 PM" },
                  { day: "Sat", hours: "7:00 AM – 12:00 PM" },
                  { day: "Sun", hours: "Closed" },
                ].map(({ day, hours }) => (
                  <li key={day} className="flex justify-between gap-6">
                    <span className="font-medium text-[#0A0A0A]">{day}</span>
                    <span className={hours === "Closed" ? "text-[#DC2626] font-semibold" : "text-gray-500"}>{hours}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Google Maps */}
        <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-md">
          <iframe
            src="https://www.google.com/maps?q=5+Finch+Dr,+Eastgardens+NSW+2036&output=embed"
            width="100%"
            height="420"
            style={{ border: 0, display: "block" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Service Motors AU location"
          />
        </div>
      </div>
    </div>
  );
}
