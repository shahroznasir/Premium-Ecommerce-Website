"use client";

import {
  AnimatePresence,
  motion,
} from "framer-motion";

import {
  Search,
  ArrowRight,
} from "lucide-react";

interface LuxurySearchProps {
  open: boolean;
  onClose: () => void;
}

const suggestions = [
  {
    title: "Aurelius Wall Clock",
    category: "Signature Timepiece",
  },
  {
    title: "Architectural Floor Lamp",
    category: "Luxury Lighting",
  },
  {
    title: "Sculptural Accent Chair",
    category: "Modern Furniture",
  },
];

const categories = [
  "Lighting",
  "Furniture",
  "Wall Decor",
  "Sculptural Objects",
];

export default function LuxurySearch({
  open,
  onClose,
}: LuxurySearchProps) {
  return (
    <AnimatePresence>

      {open && (
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          transition={{
            duration: 0.4,
          }}
          className="fixed inset-0 z-[200] overflow-hidden bg-black/70 backdrop-blur-3xl"
        >

          {/* ================= ATMOSPHERE ================= */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">

            {/* Main Glow */}
            <motion.div
              animate={{
                opacity: [0.04, 0.08, 0.04],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute left-1/2 top-[20%] h-[900px] w-[900px] -translate-x-1/2 rounded-full bg-[#B89B72]/10 blur-[180px]"
            />

          </div>

          {/* ================= CLOSE AREA ================= */}
          <button
            onClick={onClose}
            className="absolute inset-0 cursor-default"
          />

          {/* ================= CONTENT ================= */}
          <div className="relative z-10 flex min-h-screen flex-col px-6 py-32 md:px-12 lg:px-20">

            {/* ================= TOP ================= */}
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
                duration: 0.8,
              }}
              className="mx-auto w-full max-w-5xl"
            >

              {/* Label */}
              <p className="mb-6 text-[10px] uppercase tracking-[0.5em] text-[#B89B72]/75">

                Curated Discovery

              </p>

              {/* Search Input */}
              <div className="relative border-b border-white/[0.08] pb-8">

                <Search className="absolute left-0 top-1 h-8 w-8 text-[#B89B72]" />

                <input
                  autoFocus
                  placeholder="Search sculptural luxury..."
                  className="w-full bg-transparent pl-14 text-4xl font-light tracking-[-0.06em] text-white outline-none placeholder:text-white/20 md:text-6xl"
                />

              </div>

            </motion.div>

            {/* ================= BODY ================= */}
            <div className="mx-auto mt-20 grid w-full max-w-5xl gap-16 lg:grid-cols-[0.8fr_1.2fr]">

              {/* ================= LEFT ================= */}
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
                  delay: 0.1,
                  duration: 0.8,
                }}
              >

                {/* Categories */}
                <div>

                  <p className="mb-8 text-[10px] uppercase tracking-[0.45em] text-white/35">

                    Curated Categories

                  </p>

                  <div className="space-y-4">

                    {categories.map((category) => (
                      <button
                        key={category}
                        className="group flex items-center gap-4 text-left transition duration-500"
                      >

                        <span className="h-px w-0 bg-[#B89B72] transition-all duration-700 group-hover:w-10" />

                        <span className="text-2xl font-light tracking-[-0.05em] text-white/45 transition duration-500 group-hover:text-white">

                          {category}

                        </span>

                      </button>
                    ))}

                  </div>

                </div>

              </motion.div>

              {/* ================= RIGHT ================= */}
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
                  duration: 0.8,
                }}
              >

                {/* Suggestions */}
                <div>

                  <p className="mb-8 text-[10px] uppercase tracking-[0.45em] text-white/35">

                    Suggested Objects

                  </p>

                  <div className="space-y-5">

                    {suggestions.map((item) => (
                      <button
                        key={item.title}
                        className="group flex w-full items-center justify-between overflow-hidden rounded-[2rem] border border-white/[0.06] bg-white/[0.03] p-6 backdrop-blur-2xl transition duration-700 hover:border-[#B89B72]/20 hover:bg-white/[0.05]"
                      >

                        {/* Left */}
                        <div className="text-left">

                          <p className="text-2xl font-light tracking-[-0.05em] text-white">

                            {item.title}

                          </p>

                          <p className="mt-3 text-[10px] uppercase tracking-[0.4em] text-[#B89B72]/70">

                            {item.category}

                          </p>

                        </div>

                        {/* Arrow */}
                        <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/[0.06] bg-white/[0.03] transition duration-700 group-hover:border-[#B89B72]/20 group-hover:bg-[#B89B72]/10">

                          <ArrowRight className="h-5 w-5 text-white/60 transition duration-500 group-hover:text-[#B89B72]" />

                        </div>

                      </button>
                    ))}

                  </div>

                </div>

              </motion.div>

            </div>

          </div>

        </motion.div>
      )}

    </AnimatePresence>
  );
}