import type { Metadata } from "next";
import { Geist, Geist_Mono, Bebas_Neue } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Service Motors AU | Auto Service & Parts — Sydney",
  description:
    "Professional automotive services in Sydney. Oil changes, brake pads, rotors, filters and more. Quality parts available in our online shop.",
  keywords: [
    "car service Sydney",
    "oil change Sydney",
    "brake pads Sydney",
    "auto parts Sydney",
    "Service Motors AU",
  ],
  openGraph: {
    title: "Service Motors AU",
    description:
      "Professional automotive services & parts in Sydney, Australia.",
    url: "https://servicemotorsau.com",
    siteName: "Service Motors AU",
    locale: "en_AU",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${bebasNeue.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-white text-[#0A0A0A]">
        <Navbar />
        <main className="flex-1 pt-32">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
