import type { Metadata } from "next";

import {
  Inter,
  Playfair_Display,
} from "next/font/google";

import "./globals.css";

import SmoothScroll from "@/components/common/smooth-scroll";
import PageTransition from "@/components/common/page-transition";

import ExperienceShell from "@/components/layout/experience-shell";

import ScrollProgressProvider from "@/components/providers/scroll-progress-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "The Decor Art Studio",
  description:
    "Luxury sculptural décor, cinematic interiors, and timeless modern living.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <body
        suppressHydrationWarning
        className={`${inter.variable} ${playfair.variable} overflow-x-hidden bg-[#050505] text-white antialiased`}
      >

        {/* ================= RAZORPAY ================= */}
        <script
          src="https://checkout.razorpay.com/v1/checkout.js"
          async
        />

        {/* ================= SMOOTH SCROLL ================= */}
        <SmoothScroll />

        {/* ================= GLOBAL SCROLL TIMELINE ================= */}
        <ScrollProgressProvider />

        {/* ================= GLOBAL EXPERIENCE ================= */}
        <ExperienceShell />

        {/* ================= PAGE EXPERIENCE ================= */}
        <PageTransition>

          <main className="relative z-10">

            {children}

          </main>

        </PageTransition>

      </body>
    </html>
  );
}