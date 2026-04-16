import { Mail, Phone, MapPin, Clock, MessageCircle } from "lucide-react";

export const metadata = {
  title: "Contact | Service Motors AU",
  description:
    "Contact Service Motors AU in Sydney. Book a car service via WhatsApp or email.",
};

const contactMethods = [
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "0433 541 686",
    description: "Fastest way to reach us — message or call.",
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
  {
    icon: MapPin,
    label: "Location",
    value: "Sydney, NSW",
    description: "Serving Sydney and surrounding areas.",
    href: null,
    cta: null,
    external: false,
  },
  {
    icon: Clock,
    label: "Hours",
    value: "Mon – Sat",
    description: "8:00 AM – 6:00 PM. Closed Sundays.",
    href: null,
    cta: null,
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
            <Phone className="w-6 h-6 text-[#DC2626]" />
            <span className="text-[#DC2626] text-xs font-semibold uppercase tracking-widest">
              Get In Touch
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
            Contact Us
          </h1>
          <p className="mt-3 text-gray-400 max-w-lg">
            Book a service, ask about parts, or just say hello. We&apos;re a
            message away.
          </p>
        </div>
      </div>

      {/* Contact Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactMethods.map((method) => {
            const Icon = method.icon;
            return (
              <div
                key={method.label}
                className="bg-[#F5F5F5] rounded-xl p-6 flex flex-col gap-4"
              >
                <div className="w-12 h-12 bg-[#DC2626] rounded-lg flex items-center justify-center">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#DC2626] uppercase tracking-widest mb-1">
                    {method.label}
                  </p>
                  <p className="font-bold text-[#0A0A0A] text-base">
                    {method.value}
                  </p>
                  <p className="text-gray-500 text-sm mt-1">
                    {method.description}
                  </p>
                </div>
                {method.href && method.cta && (
                  <a
                    href={method.href}
                    target={method.external ? "_blank" : undefined}
                    rel={method.external ? "noopener noreferrer" : undefined}
                    className="mt-auto inline-block bg-[#0A0A0A] hover:bg-[#DC2626] text-white text-sm font-semibold px-4 py-2 rounded text-center transition-colors"
                  >
                    {method.cta}
                  </a>
                )}
              </div>
            );
          })}
        </div>

        {/* Big CTA */}
        <div className="bg-[#0A0A0A] rounded-2xl p-10 text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
            Book your service today
          </h2>
          <p className="text-gray-400 max-w-md mx-auto mb-8">
            The quickest way to get your car booked in is via WhatsApp. Message
            us your vehicle details and we&apos;ll confirm a time.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://wa.me/61433541686"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#DC2626] hover:bg-[#B91C1C] text-white font-semibold px-8 py-3 rounded transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp — 0433 541 686
            </a>
            <a
              href="mailto:servicemotorsau@gmail.com"
              className="inline-flex items-center gap-2 border border-gray-600 hover:border-gray-400 text-gray-300 hover:text-white font-semibold px-8 py-3 rounded transition-colors"
            >
              <Mail className="w-5 h-5" />
              servicemotorsau@gmail.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
