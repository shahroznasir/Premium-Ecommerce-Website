"use client";

import Link from "next/link";

import {
  AnimatePresence,
  motion,
} from "framer-motion";

interface FullscreenMenuProps {
  open: boolean;
  onClose: () => void;
}

const links = [
  "Home",
  "Collections",
  "Projects",
  "Journal",
  "About",
  "Contact",
];

export default function FullscreenMenu({
  open,
  onClose,
}: FullscreenMenuProps) {
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
            duration: 0.6,
          }}
          className="fixed inset-0 z-[99999] overflow-hidden bg-black/92 backdrop-blur-3xl"
        >

          {/* Cinematic Atmosphere */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">

            {/* Massive Gold Glow */}
            <motion.div
              animate={{
                opacity: [0.05, 0.09, 0.05],
                scale: [1, 1.08, 1],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute left-1/2 top-1/2 h-[1200px] w-[1200px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#B89B72]/10 blur-[180px]"
            />

            {/* Floating Atmosphere */}
            <motion.div
              animate={{
                y: [0, -40, 0],
              }}
              transition={{
                duration: 14,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute right-[-10%] top-[10%] h-[700px] w-[700px] rounded-full bg-[#B89B72]/[0.05] blur-[140px]"
            />

          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="group absolute right-8 top-8 z-50 flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border border-white/[0.08] bg-white/[0.03] text-white transition duration-700 hover:border-[#B89B72] hover:bg-[#B89B72] hover:text-black"
          >

            <span className="relative z-10 text-sm uppercase tracking-[0.35em]">
              ✕
            </span>

          </button>

          {/* Massive Background Typography */}
          <motion.div
            animate={{
              y: [0, -30, 0],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="pointer-events-none absolute bottom-[-10%] right-[-2%] text-[24vw] font-extralight leading-none tracking-[-0.1em] text-white/[0.03]"
          >
            TDAS
          </motion.div>

          {/* Content */}
          <div className="container-luxury relative z-10 flex min-h-screen flex-col justify-between py-12">

            {/* Top Label */}
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
                delay: 0.2,
                duration: 1,
              }}
              className="text-[11px] uppercase tracking-[0.6em] text-[#B89B72]/80"
            >

              The Decor Art Studio

            </motion.p>

            {/* Navigation */}
            <div className="flex flex-col gap-2">

              {links.map((link, index) => (
                <motion.div
                  key={link}
                  initial={{
                    opacity: 0,
                    y: 80,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: 0.15 + index * 0.08,
                    duration: 1.2,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >

                  <Link
                    href="/"
                    onClick={onClose}
                    className="group flex items-center gap-8 overflow-hidden"
                  >

                    {/* Number */}
                    <span className="text-sm uppercase tracking-[0.35em] text-white/30 transition duration-500 group-hover:text-[#B89B72]">

                      0{index + 1}

                    </span>

                    {/* Massive Link */}
                    <span className="relative text-5xl font-light leading-[0.9] tracking-[-0.08em] text-white transition duration-700 group-hover:translate-x-6 group-hover:text-[#B89B72] md:text-[8rem]">

                      {link}

                    </span>

                  </Link>

                </motion.div>
              ))}

            </div>

            {/* Bottom */}
            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                delay: 0.8,
                duration: 1.2,
              }}
              className="flex flex-col gap-8 border-t border-white/[0.08] pt-10 lg:flex-row lg:items-end lg:justify-between"
            >

              {/* Left */}
              <div>

                <p className="mb-4 text-[10px] uppercase tracking-[0.45em] text-white/35">

                  Curated Luxury Living

                </p>

                <p className="max-w-md text-white/55 leading-[1.9]">

                  Sculptural interiors, cinematic atmosphere,
                  and timeless architectural refinement.

                </p>

              </div>

              {/* Right */}
              <div className="text-right">

                <p className="mb-4 text-[10px] uppercase tracking-[0.45em] text-white/35">

                  Based In India

                </p>

                <p className="text-white/55">

                  Luxury Interior Experience Studio

                </p>

              </div>

            </motion.div>

          </div>

        </motion.div>
      )}

    </AnimatePresence>
  );
}