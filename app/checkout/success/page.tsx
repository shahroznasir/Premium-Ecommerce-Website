"use client";

import Link from "next/link";

import { motion } from "framer-motion";

import {
  Suspense,
} from "react";

import {
  useSearchParams,
} from "next/navigation";

import LuxurySkeleton from "@/components/ui/luxury-skeleton";

/* =========================================================
   FORCE DYNAMIC RENDERING
========================================================== */

export const dynamic =
  "force-dynamic";

/* =========================================================
   SUCCESS SKELETON
========================================================== */

function SuccessSkeleton() {

  return (

    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#050505] px-6 text-white">

      {/* BACKGROUND */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        <div className="absolute left-1/2 top-[-10%] h-[900px] w-[900px] -translate-x-1/2 rounded-full bg-[#B89B72]/[0.05] blur-[180px]" />

        <div className="absolute bottom-[-20%] left-1/2 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-[#D6C2A3]/[0.03] blur-[180px]" />

      </div>

      {/* CONTENT */}
      <div className="relative z-10 w-full max-w-3xl">

        <LuxurySkeleton
          showImage={false}
          lines={4}
          className="rounded-[3rem]"
          contentClassName="px-10 py-12"
        />

      </div>

    </main>

  );
}

/* =========================================================
   SUCCESS CONTENT
========================================================== */

function SuccessContent() {

  /* =======================================================
     GET ORDER NUMBER
  ======================================================== */

  const searchParams =
    useSearchParams();

  const orderNumber =
    searchParams.get(
      "order"
    );

  return (
    <main className="relative flex min-h-screen overflow-hidden bg-[#050505] text-white">

      {/* =====================================================
          ATMOSPHERIC BACKGROUND
      ====================================================== */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        {/* MAIN AURA */}
        <motion.div
          animate={{
            opacity: [0.04, 0.08, 0.04],
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute left-1/2 top-1/2 h-[1100px] w-[1100px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#B89B72]/10 blur-[240px]"
        />

        {/* TOP GLOW */}
        <div className="absolute left-1/2 top-[-20%] h-[800px] w-[800px] -translate-x-1/2 rounded-full bg-[#B89B72]/[0.05] blur-[180px]" />

        {/* RIGHT GLOW */}
        <div className="absolute right-[-10%] top-[20%] h-[500px] w-[500px] rounded-full bg-[#D6C2A3]/[0.04] blur-[160px]" />

        {/* BOTTOM GLOW */}
        <div className="absolute bottom-[-15%] left-1/2 h-[650px] w-[650px] -translate-x-1/2 rounded-full bg-[#B89B72]/[0.04] blur-[180px]" />

      </div>

      {/* =====================================================
          CONTENT
      ====================================================== */}
      <div className="container-luxury relative z-10 flex min-h-screen items-center justify-center py-24">

        <motion.div
          initial={{
            opacity: 0,
            y: 50,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mx-auto w-full max-w-4xl"
        >

          {/* =================================================
              GLASS PANEL
          ================================================== */}
          <div className="relative overflow-hidden rounded-[3rem] border border-white/[0.06] bg-white/[0.03] px-8 py-14 backdrop-blur-3xl md:px-16 md:py-20">

            {/* INNER LIGHT */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent" />

            {/* SHIMMER */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">

              <div className="absolute inset-0 -translate-x-full animate-[shimmer_3.4s_infinite] bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />

            </div>

            {/* =================================================
                SUCCESS ICON
            ================================================== */}
            <motion.div
              initial={{
                scale: 0.7,
                opacity: 0,
              }}
              animate={{
                scale: 1,
                opacity: 1,
              }}
              transition={{
                duration: 1,
                delay: 0.2,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative mx-auto flex h-32 w-32 items-center justify-center rounded-full border border-[#B89B72]/20 bg-[#B89B72]/10 backdrop-blur-3xl md:h-40 md:w-40"
            >

              <div className="absolute inset-0 rounded-full bg-[#B89B72]/10 blur-3xl" />

              <div className="absolute inset-4 rounded-full border border-[#B89B72]/30" />

              <svg
                width="52"
                height="52"
                viewBox="0 0 24 24"
                fill="none"
                className="relative z-10"
              >

                <path
                  d="M5 13L9 17L19 7"
                  stroke="#D6C2A3"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

              </svg>

            </motion.div>

            {/* LABEL */}
            <motion.p
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.4,
                duration: 0.8,
              }}
              className="mt-12 text-center text-[10px] uppercase tracking-[0.55em] text-[#D6C2A3]/80"
            >

              Purchase Confirmed

            </motion.p>

            {/* TITLE */}
            <motion.h1
              initial={{
                opacity: 0,
                y: 30,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.5,
                duration: 1,
              }}
              className="mt-8 text-center text-5xl font-light leading-[0.88] tracking-[-0.08em] text-white sm:text-6xl md:text-[6.5rem]"
            >

              Thank You
              <br />
              For Your
              <br />
              Selection

            </motion.h1>

            {/* DESCRIPTION */}
            <motion.p
              initial={{
                opacity: 0,
                y: 24,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.7,
                duration: 1,
              }}
              className="mx-auto mt-10 max-w-2xl text-center text-[15px] leading-[2.1] text-white/45"
            >

              Your order has been successfully placed.
              Our team is now preparing your curated
              luxury selection for dispatch with the
              highest attention to detail.

            </motion.p>

            {/* =================================================
                ORDER CARD
            ================================================== */}
            <motion.div
              initial={{
                opacity: 0,
                y: 40,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.9,
                duration: 1,
              }}
              className="relative mx-auto mt-14 max-w-2xl overflow-hidden rounded-[2.5rem] border border-white/[0.05] bg-black/20 p-8 backdrop-blur-2xl"
            >

              {/* SOFT GLOW */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent" />

              <div className="relative">

                <p className="text-[10px] uppercase tracking-[0.42em] text-[#D6C2A3]/70">

                  Order Reference

                </p>

                <h2 className="mt-6 text-3xl font-light tracking-[-0.05em] text-white">

                  {orderNumber
                    ? `#${orderNumber}`
                    : "#LX-2026-001"}

                </h2>

                <div className="mt-8 h-px w-full bg-white/[0.05]" />

                <p className="mt-8 text-sm leading-8 text-white/42">

                  A confirmation email and shipping
                  details will be shared shortly.
                  Your luxury objects are being
                  prepared with precision and care.

                </p>

              </div>

            </motion.div>

            {/* =================================================
                ACTION BUTTONS
            ================================================== */}
            <motion.div
              initial={{
                opacity: 0,
                y: 30,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 1.1,
                duration: 1,
              }}
              className="mt-14 flex flex-col items-center justify-center gap-5 sm:flex-row"
            >

              {/* CONTINUE SHOPPING */}
              <Link
                href="/shop"
                className="group flex h-14 items-center justify-center rounded-full border border-white/[0.08] bg-white px-10 text-[10px] uppercase tracking-[0.34em] text-black transition-all duration-500 hover:scale-[1.02]"
              >

                Continue Shopping

              </Link>

              {/* VIEW ORDERS */}
              <Link
                href="/account/orders"
                className="group flex h-14 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] px-10 text-[10px] uppercase tracking-[0.34em] text-white transition-all duration-500 hover:border-[#D6C2A3]/30 hover:bg-white/[0.05]"
              >

                View Orders

              </Link>

            </motion.div>

          </div>

        </motion.div>

      </div>

    </main>
  );
}

/* =========================================================
   PAGE
========================================================== */

export default function CheckoutSuccessPage() {

  return (
    <Suspense
      fallback={
        <SuccessSkeleton />
      }
    >

      <SuccessContent />

    </Suspense>
  );
}