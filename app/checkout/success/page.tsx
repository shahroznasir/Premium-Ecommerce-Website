"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";

export default function CheckoutSuccessPage() {

  /* =========================================================
     GET ORDER NUMBER
  ========================================================== */

  const searchParams =
    useSearchParams();

  const orderNumber =
    searchParams.get("order");

  return (
    <main className="relative flex min-h-screen overflow-hidden bg-[#050505] text-white">

      {/* =====================================================
          ATMOSPHERIC BACKGROUND
      ====================================================== */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        {/* Main Cinematic Glow */}
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
          className="absolute left-1/2 top-1/2 h-[1000px] w-[1000px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#B89B72]/10 blur-[220px]"
        />

        {/* Top Glow */}
        <div className="absolute left-1/2 top-[-20%] h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-[#B89B72]/[0.05] blur-[180px]" />

        {/* Right Glow */}
        <div className="absolute right-[-10%] top-[20%] h-[500px] w-[500px] rounded-full bg-[#B89B72]/[0.04] blur-[160px]" />

        {/* Bottom Aura */}
        <div className="absolute bottom-[-20%] left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-[#B89B72]/[0.03] blur-[180px]" />

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
          className="mx-auto max-w-5xl text-center"
        >

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
            className="relative mx-auto flex h-36 w-36 items-center justify-center rounded-full border border-[#B89B72]/20 bg-[#B89B72]/10 backdrop-blur-3xl md:h-44 md:w-44"
          >

            {/* Inner Glow */}
            <div className="absolute inset-0 rounded-full bg-[#B89B72]/10 blur-3xl" />

            {/* Ring */}
            <div className="absolute inset-4 rounded-full border border-[#B89B72]/30" />

            {/* Checkmark */}
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              className="relative z-10"
            >
              <path
                d="M5 13L9 17L19 7"
                stroke="#B89B72"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

          </motion.div>

          {/* =================================================
              LABEL
          ================================================== */}
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
            className="mt-12 text-[10px] uppercase tracking-[0.5em] text-[#B89B72]/80"
          >

            Purchase Confirmed

          </motion.p>

          {/* =================================================
              TITLE
          ================================================== */}
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
            className="mt-8 text-5xl font-light leading-[0.88] tracking-[-0.08em] text-white sm:text-6xl md:text-[7rem]"
          >

            Thank You
            <br />
            For Your
            <br />
            Selection

          </motion.h1>

          {/* =================================================
              DIVIDER
          ================================================== */}
          <motion.div
            initial={{
              width: 0,
            }}
            animate={{
              width: 120,
            }}
            transition={{
              delay: 0.8,
              duration: 1,
            }}
            className="mx-auto mt-10 h-px bg-[#B89B72]/70"
          />

          {/* =================================================
              DESCRIPTION
          ================================================== */}
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
              delay: 0.9,
              duration: 1,
            }}
            className="mx-auto mt-10 max-w-3xl text-base leading-[2] text-white/50 md:text-lg"
          >

            Your curated architectural luxury objects
            are now being prepared with exceptional care,
            refined craftsmanship, and cinematic precision.

            <br />
            <br />

            A confirmation and delivery timeline
            will be shared shortly.

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
              delay: 1,
              duration: 1,
            }}
            className="relative mx-auto mt-20 max-w-3xl overflow-hidden rounded-[2.5rem] border border-white/[0.06] bg-white/[0.03] p-8 backdrop-blur-3xl md:p-12"
          >

            {/* Card Glow */}
            <div className="absolute right-[-10%] top-[-10%] h-[280px] w-[280px] rounded-full bg-[#B89B72]/10 blur-[120px]" />

            <div className="relative">

              {/* Top */}
              <div className="flex flex-col gap-8 border-b border-white/[0.06] pb-8 md:flex-row md:items-center md:justify-between">

                {/* Order Number */}
                <div>

                  <p className="text-[10px] uppercase tracking-[0.45em] text-white/35">

                    Order Number

                  </p>

                  <p className="mt-4 text-2xl font-light tracking-[-0.04em] text-white md:text-3xl">

                    {orderNumber ||
                      "TDAS-2026-0000"}

                  </p>

                </div>

                {/* Delivery */}
                <div className="text-left md:text-right">

                  <p className="text-[10px] uppercase tracking-[0.45em] text-white/35">

                    Estimated Delivery

                  </p>

                  <p className="mt-4 text-sm leading-7 text-white/55">

                    3 — 5 Business Days
                    <br />
                    Premium Protected Delivery

                  </p>

                </div>

              </div>

              {/* Bottom */}
              <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">

                {/* Status */}
                <div>

                  <p className="text-[10px] uppercase tracking-[0.45em] text-white/35">

                    Payment Status

                  </p>

                  <div className="mt-5 inline-flex items-center gap-3 rounded-full border border-[#B89B72]/20 bg-[#B89B72]/10 px-5 py-3">

                    <div className="h-2 w-2 rounded-full bg-[#B89B72]" />

                    <span className="text-sm uppercase tracking-[0.3em] text-[#B89B72]">

                      Confirmed

                    </span>

                  </div>

                </div>

                {/* Brand Note */}
                <div className="max-w-sm text-left md:text-right">

                  <p className="text-sm leading-8 text-white/45">

                    Your collectible pieces will be
                    prepared using premium packaging
                    and protected luxury handling.

                  </p>

                </div>

              </div>

            </div>

          </motion.div>

          {/* =================================================
              CTA BUTTONS
          ================================================== */}
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 1.2,
              duration: 1,
            }}
            className="mt-16 flex flex-wrap items-center justify-center gap-4"
          >

            {/* Continue */}
            <Link href="/shop">

              <button className="group relative overflow-hidden rounded-full bg-[#B89B72] px-10 py-5 text-sm uppercase tracking-[0.35em] text-black transition duration-700 hover:scale-[1.03]">

                <div className="absolute inset-y-0 left-[-30%] w-[30%] rotate-12 bg-white/30 blur-2xl transition duration-1000 group-hover:left-[120%]" />

                <span className="relative z-10">

                  Continue Exploring

                </span>

              </button>

            </Link>

            {/* Back To Shop */}
            <Link href="/shop">

              <button className="rounded-full border border-white/[0.08] bg-white/[0.03] px-10 py-5 text-sm uppercase tracking-[0.35em] text-white transition duration-700 hover:border-[#B89B72]/30 hover:bg-[#B89B72]/10">

                Return To Collection

              </button>

            </Link>

          </motion.div>

        </motion.div>

      </div>

    </main>
  );
}