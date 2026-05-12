"use client";

import Link from "next/link";

import { motion } from "framer-motion";

export default function AuthPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050505] text-white">

      {/* ================= ATMOSPHERE ================= */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        {/* Main Glow */}
        <motion.div
          animate={{
            opacity: [0.04, 0.08, 0.04],
            scale: [1, 1.04, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute left-1/2 top-[-10%] h-[1200px] w-[1200px] -translate-x-1/2 rounded-full bg-[#B89B72]/10 blur-[220px]"
        />

        {/* Right Glow */}
        <div className="absolute right-[-10%] top-[20%] h-[700px] w-[700px] rounded-full bg-[#B89B72]/[0.04] blur-[180px]" />

      </div>

      {/* ================= GRID ================= */}
      <div className="relative z-10 grid min-h-screen lg:grid-cols-2">

        {/* ================= LEFT ================= */}
        <motion.div
          initial={{
            opacity: 0,
            scale: 1.05,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 1.4,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative hidden overflow-hidden lg:block"
        >

          {/* Image */}
          <img
            src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=2070&auto=format&fit=crop"
            alt="Luxury Interior"
            className="h-full w-full object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/45" />

          {/* Gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-[#050505]" />

          {/* Content */}
          <div className="absolute bottom-20 left-20 max-w-xl">

            {/* Label */}
            <p className="text-[10px] uppercase tracking-[0.5em] text-[#B89B72]/80">

              The Decor Art Studio

            </p>

            {/* Title */}
            <h1 className="mt-8 text-6xl font-light leading-[0.88] tracking-[-0.08em] text-white">

              Curated
              <br />
              Luxury
              <br />
              Living

            </h1>

            {/* Divider */}
            <div className="mt-10 h-px w-24 bg-[#B89B72]/70" />

            {/* Description */}
            <p className="mt-10 text-lg leading-[2] text-white/55">

              Access your private luxury experience,
              saved collections, curated selections,
              and premium architectural commerce.

            </p>

          </div>

        </motion.div>

        {/* ================= RIGHT ================= */}
        <div className="relative flex items-center justify-center px-6 py-20 md:px-10">

          {/* Floating Panel */}
          <motion.div
            initial={{
              opacity: 0,
              y: 60,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative w-full max-w-xl overflow-hidden rounded-[2.5rem] border border-white/[0.06] bg-white/[0.03] p-10 backdrop-blur-3xl md:p-14"
          >

            {/* Glow */}
            <div className="pointer-events-none absolute right-[-10%] top-[-10%] h-[320px] w-[320px] rounded-full bg-[#B89B72]/10 blur-[140px]" />

            <div className="relative">

              {/* Label */}
              <p className="text-[10px] uppercase tracking-[0.5em] text-[#B89B72]/80">

                Private Access

              </p>

              {/* Heading */}
              <h2 className="mt-6 text-5xl font-light leading-[0.9] tracking-[-0.08em] text-white">

                Welcome
                <br />
                Back

              </h2>

              {/* Copy */}
              <p className="mt-8 text-lg leading-[1.9] text-white/45">

                Sign in to continue your curated
                luxury commerce experience.

              </p>

              {/* ================= FORM ================= */}
              <div className="mt-12 space-y-5">

                {/* Email */}
                <LuxuryInput
                  type="email"
                  placeholder="Email Address"
                />

                {/* Password */}
                <LuxuryInput
                  type="password"
                  placeholder="Password"
                />

              </div>

              {/* Forgot */}
              <div className="mt-5 flex justify-end">

                <button className="text-[10px] uppercase tracking-[0.35em] text-white/35 transition duration-500 hover:text-[#B89B72]">

                  Forgot Password

                </button>

              </div>

              {/* ================= CTA ================= */}
              <button className="group relative mt-10 w-full overflow-hidden rounded-full bg-[#B89B72] py-5 text-sm uppercase tracking-[0.35em] text-black transition duration-700 hover:scale-[1.02]">

                {/* Sweep */}
                <div className="absolute inset-y-0 left-[-30%] w-[30%] rotate-12 bg-white/30 blur-2xl transition duration-1000 group-hover:left-[120%]" />

                <span className="relative z-10">

                  Sign In

                </span>

              </button>

              {/* Divider */}
              <div className="my-10 flex items-center gap-5">

                <div className="h-px flex-1 bg-white/[0.06]" />

                <span className="text-[10px] uppercase tracking-[0.35em] text-white/30">

                  Or Continue With

                </span>

                <div className="h-px flex-1 bg-white/[0.06]" />

              </div>

              {/* Social */}
              <div className="grid gap-4 md:grid-cols-2">

                {/* Google */}
                <button className="rounded-full border border-white/[0.06] bg-white/[0.03] py-5 text-sm tracking-[0.08em] text-white transition duration-700 hover:border-[#B89B72]/30 hover:bg-[#B89B72]/10">

                  Google

                </button>

                {/* Apple */}
                <button className="rounded-full border border-white/[0.06] bg-white/[0.03] py-5 text-sm tracking-[0.08em] text-white transition duration-700 hover:border-[#B89B72]/30 hover:bg-[#B89B72]/10">

                  Apple

                </button>

              </div>

              {/* Bottom */}
              <div className="mt-10 text-center">

                <p className="text-sm text-white/40">

                  New to The Decor Art Studio?

                </p>

                <Link
                  href="/"
                  className="mt-4 inline-block text-[10px] uppercase tracking-[0.4em] text-[#B89B72] transition duration-500 hover:text-white"
                >

                  Create Account

                </Link>

              </div>

            </div>

          </motion.div>

        </div>

      </div>

    </main>
  );
}

/* ================= INPUT ================= */

function LuxuryInput({
  placeholder,
  type,
}: {
  placeholder: string;
  type: string;
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="h-16 w-full rounded-full border border-white/[0.06] bg-white/[0.03] px-6 text-sm tracking-[0.08em] text-white outline-none transition duration-500 placeholder:text-white/25 focus:border-[#B89B72]/40 focus:bg-white/[0.05]"
    />
  );
}