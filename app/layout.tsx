import type { Metadata } from "next";

import {
  Inter,
  Playfair_Display,
} from "next/font/google";

import { Toaster } from "sonner";

import "./globals.css";

import SmoothScroll from "@/components/common/smooth-scroll";

import CinematicLight from "@/components/common/cinematic-light";

import ExperienceShell from "@/components/layout/experience-shell";

import ScrollProgressProvider from "@/components/providers/scroll-progress-provider";

import PageTransitionProvider from "@/components/providers/page-transition-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair =
  Playfair_Display({
    subsets: ["latin"],
    variable:
      "--font-playfair",
  });

export const metadata: Metadata =
  {
    title:
      "The Decor Art Studio",

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

        {/* =========================================================
            RAZORPAY
        ========================================================== */}
        <script
          src="https://checkout.razorpay.com/v1/checkout.js"
          async
        />

        {/* =========================================================
            SMOOTH SCROLL
        ========================================================== */}
        <SmoothScroll />

        {/* =========================================================
            GLOBAL SCROLL TIMELINE
        ========================================================== */}
        <ScrollProgressProvider />

        {/* =========================================================
            GLOBAL ATMOSPHERIC EXPERIENCE
        ========================================================== */}
        <ExperienceShell />

        {/* =========================================================
            CINEMATIC LIGHT SYSTEM
        ========================================================== */}
        <CinematicLight />

        {/* =========================================================
            PREMIUM TOAST SYSTEM
        ========================================================== */}
        <Toaster
          position="top-right"
          richColors
          expand={false}
          closeButton
          toastOptions={{
            style: {
              background:
                "rgba(10,10,10,0.82)",

              border:
                "1px solid rgba(184,155,114,0.12)",

              color:
                "white",

              backdropFilter:
                "blur(20px)",

              borderRadius:
                "24px",

              padding:
                "18px 20px",

              fontSize:
                "13px",

              letterSpacing:
                "0.08em",
            },
          }}
        />

        {/* =========================================================
            MAIN EXPERIENCE
        ========================================================== */}
        <PageTransitionProvider>

          <main className="relative z-10">

            {children}

          </main>

        </PageTransitionProvider>

      </body>

    </html>
  );
}