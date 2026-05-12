"use client";

import Link from "next/link";

import { motion } from "framer-motion";

export default function CheckoutSuccessPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#050505] text-white">

      {/* ================= ATMOSPHERE ================= */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        {/* Main Glow */}
        <motion.div
          animate={{
            opacity: [0.03, 0.06, 0.03],
            scale: [1, 1.06, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute left-1/2 top-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#B89B72]/10 blur-[180px]"
        />

        {/* Top Glow */}
        <div className="absolute left-1/2 top-[-20%] h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-[#B89B72]/[0.05] blur-[180px]" />

      </div>

      {/* ================= CONTENT ================= */}
      <div className="container-luxury relative z-10">

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
          className="mx-auto max-w-4xl text-center"
        >

          {/* ================= SUCCESS SEAL ================= */}
          <motion.div
            initial={{
              scale: 0.8,
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
            className="relative mx-auto flex h-40 w-40 items-center justify-center rounded-full border border-[#B89B72]/20 bg-[#B89B72]/10 backdrop-blur-3xl"
          >

            {/* Glow */}
            <div className="absolute inset-0 rounded-full bg-[#B89B72]/10 blur-3xl" />

            {/* Inner Ring */}
            <div className="absolute inset-4 rounded-full border border-[#B89B72]/30" />

            {/* Check */}
            <svg
              width="42"
              height="42"
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

          {/* ================= LABEL ================= */}
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

          {/* ================= TITLE ================= */}
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
            className="mt-8 text-5xl font-light leading-[0.88] tracking-[-0.08em] text-white md:text-[7rem]"
          >

            Thank You
            <br />
            For Your
            <br />
            Selection

          </motion.h1>

          {/* ================= DIVIDER ================= */}
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

          {/* ================= DESCRIPTION ================= */}
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
            className="mx-auto mt-10 max-w-2xl text-lg leading-[2] text-white/50"
          >

            Your curated luxury objects are now being
            prepared with exceptional care and
            architectural precision.

            <br />
            <br />

            A confirmation and delivery timeline
            has been sent to your email.

          </motion.p>

          {/* ================= ORDER CARD ================= */}
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
            className="relative mx-auto mt-20 max-w-2xl overflow-hidden rounded-[2.5rem] border border-white/[0.06] bg-white/[0.03] p-10 backdrop-blur-3xl"
          >

            {/* Glow */}
            <div className="absolute right-[-10%] top-[-10%] h-[250px] w-[250px] rounded-full bg-[#B89B72]/10 blur-[120px]" />

            <div className="relative">

              {/* Order ID */}
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-6">

                <div>

                  <p className="text-[10px] uppercase tracking-[0.45em] text-white/35">

                    Order Reference

                  </p>

                  <p className="mt-4 text-2xl font-light tracking-[-0.04em] text-white">

                    #TDAS-2048

                  </p>

                </div>

                <p className="text-sm text-white/40">

                  Estimated Delivery
                  <br />
                  3 — 5 Business Days

                </p>

              </div>

              {/* Total */}
              <div className="mt-8 flex items-end justify-between">

                <div>

                  <p className="text-[10px] uppercase tracking-[0.45em] text-white/35">

                    Total Paid

                  </p>

                  <p className="mt-4 text-5xl font-light tracking-[-0.06em] text-white">

                    ₹2,11,998

                  </p>

                </div>

              </div>

            </div>

          </motion.div>

          {/* ================= CTA ================= */}
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
            <Link href="/">

              <button className="group relative overflow-hidden rounded-full bg-[#B89B72] px-10 py-5 text-sm uppercase tracking-[0.35em] text-black transition duration-700 hover:scale-[1.03]">

                {/* Sweep */}
                <div className="absolute inset-y-0 left-[-30%] w-[30%] rotate-12 bg-white/30 blur-2xl transition duration-1000 group-hover:left-[120%]" />

                <span className="relative z-10">

                  Continue Exploring

                </span>

              </button>

            </Link>

            {/* Orders */}
            <button className="rounded-full border border-white/[0.08] bg-white/[0.03] px-10 py-5 text-sm uppercase tracking-[0.35em] text-white transition duration-700 hover:border-[#B89B72]/30 hover:bg-[#B89B72]/10">

              View Orders

            </button>

          </motion.div>

        </motion.div>

      </div>

    </main>
  );
}