"use client";

import { motion } from "framer-motion";

import {
  Sparkles,
  ArrowUpRight,
} from "lucide-react";

const suggestions = [
  "Curate a warm luxury living room",
  "Minimal sculptural décor under ₹1 lakh",
  "Recommend statement lighting",
  "Modern earthy interior styling",
];

const messages = [
  {
    role: "assistant",
    content:
      "Welcome to your private luxury concierge. Describe the atmosphere, aesthetic, or architectural mood you wish to curate.",
  },
];

export default function ConciergePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050505] text-white">

      {/* ================= ATMOSPHERE ================= */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        {/* Main Glow */}
        <motion.div
          animate={{
            opacity: [0.03, 0.06, 0.03],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute left-1/2 top-[-10%] h-[1200px] w-[1200px] -translate-x-1/2 rounded-full bg-[#B89B72]/10 blur-[220px]"
        />

        {/* Right Glow */}
        <div className="absolute right-[-10%] top-[30%] h-[700px] w-[700px] rounded-full bg-[#B89B72]/[0.04] blur-[180px]" />

      </div>

      {/* ================= CONTENT ================= */}
      <div className="container-luxury relative z-10 flex min-h-screen flex-col py-24">

        {/* ================= HEADER ================= */}
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
            duration: 1,
          }}
        >

          {/* Label */}
          <p className="text-[10px] uppercase tracking-[0.5em] text-[#B89B72]/80">

            AI Luxury Concierge

          </p>

          {/* Title */}
          <h1 className="mt-6 text-5xl font-light leading-[0.88] tracking-[-0.08em] text-white md:text-[7rem]">

            Curated
            <br />
            Intelligence

          </h1>

          {/* Description */}
          <p className="mt-10 max-w-2xl text-lg leading-[2] text-white/45">

            Discover sculptural luxury through
            intelligent architectural recommendations,
            curated styling direction, and immersive
            design consultation.

          </p>

        </motion.div>

        {/* ================= CHAT ================= */}
        <div className="mt-20 grid flex-1 gap-10 lg:grid-cols-[340px_1fr]">

          {/* ================= SIDEBAR ================= */}
          <motion.div
            initial={{
              opacity: 0,
              x: -30,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              delay: 0.1,
              duration: 1,
            }}
          >

            <div className="overflow-hidden rounded-[2.5rem] border border-white/[0.06] bg-white/[0.03] p-8 backdrop-blur-3xl">

              {/* Label */}
              <p className="text-[10px] uppercase tracking-[0.45em] text-[#B89B72]/80">

                Suggested Prompts

              </p>

              {/* Suggestions */}
              <div className="mt-10 space-y-4">

                {suggestions.map((item) => (
                  <button
                    key={item}
                    className="group w-full rounded-[1.6rem] border border-white/[0.06] bg-white/[0.03] p-5 text-left transition duration-700 hover:border-[#B89B72]/20 hover:bg-[#B89B72]/10"
                  >

                    <div className="flex items-start justify-between gap-4">

                      <p className="text-sm leading-relaxed text-white/70 transition duration-500 group-hover:text-white">

                        {item}

                      </p>

                      <ArrowUpRight className="mt-1 h-4 w-4 text-white/30 transition duration-500 group-hover:text-[#B89B72]" />

                    </div>

                  </button>
                ))}

              </div>

            </div>

          </motion.div>

          {/* ================= MAIN CHAT ================= */}
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
              delay: 0.2,
              duration: 1,
            }}
            className="flex flex-col overflow-hidden rounded-[2.5rem] border border-white/[0.06] bg-white/[0.03] backdrop-blur-3xl"
          >

            {/* ================= CHAT AREA ================= */}
            <div className="flex-1 space-y-8 overflow-y-auto p-10">

              {messages.map((message, index) => (
                <div
                  key={index}
                  className="flex"
                >

                  <div className="max-w-3xl rounded-[2rem] border border-[#B89B72]/15 bg-[#B89B72]/10 px-8 py-6">

                    <div className="mb-4 flex items-center gap-3">

                      <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#B89B72]/20 bg-[#B89B72]/10">

                        <Sparkles className="h-4 w-4 text-[#B89B72]" />

                      </div>

                      <p className="text-[10px] uppercase tracking-[0.4em] text-[#B89B72]/80">

                        Concierge AI

                      </p>

                    </div>

                    <p className="text-lg leading-[2] text-white/70">

                      {message.content}

                    </p>

                  </div>

                </div>
              ))}

            </div>

            {/* ================= INPUT ================= */}
            <div className="border-t border-white/[0.06] p-8">

              <div className="flex items-center gap-4 rounded-full border border-white/[0.06] bg-white/[0.03] p-3">

                {/* Input */}
                <input
                  placeholder="Describe your luxury atmosphere..."
                  className="flex-1 bg-transparent px-4 text-sm tracking-[0.08em] text-white outline-none placeholder:text-white/25"
                />

                {/* Button */}
                <button className="group relative overflow-hidden rounded-full bg-[#B89B72] px-8 py-4 text-[10px] uppercase tracking-[0.35em] text-black transition duration-700 hover:scale-[1.03]">

                  {/* Sweep */}
                  <div className="absolute inset-y-0 left-[-30%] w-[30%] rotate-12 bg-white/30 blur-2xl transition duration-1000 group-hover:left-[120%]" />

                  <span className="relative z-10">

                    Ask Concierge

                  </span>

                </button>

              </div>

            </div>

          </motion.div>

        </div>

      </div>

    </main>
  );
}