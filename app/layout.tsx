import type { Metadata } from "next";

import {
  Inter,
  Playfair_Display,
} from "next/font/google";

import "./globals.css";

import SmoothScroll from "@/components/common/smooth-scroll";
import CustomCursor from "@/components/common/custom-cursor";
import Loader from "@/components/common/loader";
import PageTransition from "@/components/common/page-transition";

import GrainOverlay from "@/components/common/grain-overlay";

import FloatingCart from "@/components/cart/floating-cart";

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

        {/* Razorpay */}
        <script
          src="https://checkout.razorpay.com/v1/checkout.js"
          async
        />

        {/* ================= LOADER ================= */}
        <Loader />

        {/* ================= SMOOTH SCROLL ================= */}
        <SmoothScroll />

        {/* ================= LUXURY CURSOR ================= */}
        <CustomCursor />

        {/* ================= GRAIN ================= */}
        <GrainOverlay />

        {/* ================= GLOBAL ATMOSPHERE ================= */}
        <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden">

          {/* Main Luxury Aura */}
          <div className="absolute left-1/2 top-[-15%] h-[1200px] w-[1200px] -translate-x-1/2 rounded-full bg-[#B89B72]/[0.035] blur-[220px]" />

          {/* Left Ambient */}
          <div className="absolute left-[-10%] top-[35%] h-[700px] w-[700px] rounded-full bg-[#B89B72]/[0.02] blur-[180px]" />

          {/* Right Ambient */}
          <div className="absolute right-[-10%] top-[55%] h-[800px] w-[800px] rounded-full bg-[#B89B72]/[0.02] blur-[220px]" />

          {/* Bottom Glow */}
          <div className="absolute bottom-[-20%] left-1/2 h-[900px] w-[900px] -translate-x-1/2 rounded-full bg-[#B89B72]/[0.015] blur-[220px]" />

        </div>

        {/* ================= TOP LIGHT ================= */}
        <div className="pointer-events-none fixed inset-0 z-[2] bg-[radial-gradient(circle_at_top,rgba(184,155,114,0.04),transparent_42%)]" />

        {/* ================= VIGNETTE ================= */}
        <div className="pointer-events-none fixed inset-0 z-[3] shadow-[inset_0_0_180px_rgba(0,0,0,0.78)]" />

        {/* ================= NOISE ================= */}
        <div className="pointer-events-none fixed inset-0 z-[4] opacity-[0.012] mix-blend-soft-light">

          <div
            className="h-full w-full"
            style={{
              backgroundImage:
                "url('https://grainy-gradients.vercel.app/noise.svg')",
            }}
          />

        </div>

        {/* ================= EXPERIENCE ================= */}
        <PageTransition>

          {/* ================= FLOATING CART ================= */}
          <FloatingCart />

          <main className="relative">

            {children}

          </main>

        </PageTransition>

      </body>

    </html>
  );
}