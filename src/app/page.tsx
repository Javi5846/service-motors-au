import Link from "next/link";
import {
  Wrench,
  Droplets,
  Shield,
  Settings,
  ChevronRight,
  Phone,
  Star,
  Clock,
  MapPin,
} from "lucide-react";

const services = [
  {
    icon: Droplets,
    title: "Oil Change",
    description:
      "Full synthetic, semi-synthetic or conventional oil changes. We use top-grade oils and OEM-spec filters to keep your engine running clean.",
  },
  {
    icon: Settings,
    title: "Filter Replacement",
    description:
      "Air, cabin, fuel and oil filter replacement. Fresh filters improve performance, fuel economy and air quality inside your vehicle.",
  },
  {
    icon: Shield,
    title: "Brake Pads & Rotors",
    description:
      "Don't compromise on stopping power. We supply and fit quality brake pads and rotors to keep you safe on Sydney roads.",
  },
  {
    icon: Wrench,
    title: "General Service",
    description:
      "From fluid top-ups to full logbook servicing — we cover all your car's maintenance needs in one place.",
  },
];

const whyUs = [
  {
    icon: Star,
    title: "Quality Parts",
    description: "We use trusted brands and OEM-grade components only.",
  },
  {
    icon: Clock,
    title: "Fast Turnaround",
    description: "Efficient service that respects your time.",
  },
  {
    icon: MapPin,
    title: "Based in Sydney",
    description: "Local, reliable and easy to reach.",
  },
  {
    icon: Phone,
    title: "Direct Contact",
    description: "Speak to a real mechanic, not a call centre.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-[#0A0A0A] overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-[#DC2626]" />
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, #DC2626 0px, #DC2626 1px, transparent 1px, transparent 60px)`,
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 md:py-40">
          <div className="max-w-3xl">
            <span className="inline-block bg-[#DC2626]/10 border border-[#DC2626]/30 text-[#DC2626] text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-widest mb-6">
              Sydney&apos;s Trusted Auto Specialists
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight mb-6">
              Expert Car Service
              <br />
              <span className="text-[#DC2626]">Done Right.</span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl leading-relaxed mb-10 max-w-xl">
              From oil changes and brake pads to filters and rotors — Service
              Motors AU keeps your vehicle in peak condition. Quality parts,
              honest service, Sydney locals.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-[#DC2626] hover:bg-[#B91C1C] text-white font-semibold px-6 py-3 rounded transition-colors"
              >
                Book a Service
                <ChevronRight className="w-4 h-4" />
              </Link>
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 border border-gray-600 hover:border-gray-400 text-gray-300 hover:text-white font-semibold px-6 py-3 rounded transition-colors"
              >
                Shop Parts
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* Services */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block text-[#DC2626] text-xs font-semibold uppercase tracking-widest mb-3">
              What We Do
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0A0A0A]">
              Our Services
            </h2>
            <p className="mt-4 text-gray-500 max-w-xl mx-auto">
              We offer a full range of automotive services to keep your vehicle
              running at its best.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.title}
                  className="group bg-[#F5F5F5] hover:bg-[#0A0A0A] rounded-xl p-6 transition-all duration-300 border border-transparent hover:border-[#DC2626]/30"
                >
                  <div className="w-12 h-12 bg-[#DC2626]/10 group-hover:bg-[#DC2626] rounded-lg flex items-center justify-center mb-5 transition-colors duration-300">
                    <Icon className="w-6 h-6 text-[#DC2626] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-[#0A0A0A] group-hover:text-white font-bold text-lg mb-2 transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-gray-500 group-hover:text-gray-400 text-sm leading-relaxed transition-colors duration-300">
                    {service.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="py-20 bg-[#F5F5F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block text-[#DC2626] text-xs font-semibold uppercase tracking-widest mb-3">
              Why Choose Us
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0A0A0A]">
              The Service Motors Difference
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyUs.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="text-center">
                  <div className="w-14 h-14 bg-[#DC2626] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-[#0A0A0A] text-lg mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 text-sm">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-[#DC2626] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Ready to book your service?
          </h2>
          <p className="text-red-100 text-lg mb-8 max-w-xl mx-auto">
            Get in touch via WhatsApp or email and we&apos;ll get your car
            sorted — fast.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://wa.me/61433541686"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-[#DC2626] hover:bg-gray-100 font-semibold px-6 py-3 rounded transition-colors"
            >
              WhatsApp Us
            </a>
            <a
              href="mailto:servicemotorsau@gmail.com"
              className="inline-flex items-center gap-2 border-2 border-white text-white hover:bg-white hover:text-[#DC2626] font-semibold px-6 py-3 rounded transition-colors"
            >
              Send an Email
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
