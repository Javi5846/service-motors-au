import Link from "next/link";
import { Phone, Mail, MapPin, Wrench } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0A0A0A] border-t border-[#1F1F1F] text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-[#DC2626] rounded flex items-center justify-center">
                <Wrench className="w-4 h-4 text-white" />
              </div>
              <span className="text-white font-bold text-lg tracking-tight">
                Service Motors <span className="text-[#DC2626]">AU</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed">
              Professional automotive services in Sydney. Oil changes, brake
              services, filters and more — done right.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 uppercase text-xs tracking-widest">
              Navigation
            </h3>
            <ul className="space-y-2 text-sm">
              {[
                { label: "Home", href: "/" },
                { label: "Shop", href: "/shop" },
                { label: "Contact", href: "/contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4 uppercase text-xs tracking-widest">
              Contact
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#DC2626] shrink-0" />
                <a
                  href="https://wa.me/61433541686"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  0433 541 686
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#DC2626] shrink-0" />
                <a
                  href="mailto:servicemotorsau@gmail.com"
                  className="hover:text-white transition-colors"
                >
                  servicemotorsau@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#DC2626] shrink-0 mt-0.5" />
                <span>Sydney, NSW, Australia</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#1F1F1F] mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>
            &copy; {new Date().getFullYear()} Service Motors AU. All rights
            reserved.
          </p>
          <p>
            <a
              href="https://servicemotorsau.com"
              className="hover:text-white transition-colors"
            >
              servicemotorsau.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
