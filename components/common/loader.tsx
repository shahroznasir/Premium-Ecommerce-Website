"use client";

import {
  AnimatePresence,
  motion,
} from "framer-motion";

import { useEffect, useState } from "react";

export default function Loader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3400);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>

      {loading && (
        <motion.div
          initial={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
            scale: 1.04,
            filter: "blur(12px)",
            transition: {
              duration: 1.4,
              ease: [0.22, 1, 0.36, 1],
            },
          }}
          className="fixed inset-0 z-[99999] overflow-hidden bg-[#050505]"
        >

          {/* Massive Ambient Glow */}
          <motion.div
            animate={{
              opacity: [0.2, 0.35, 0.2],
              scale: [1, 1.08, 1],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute left-1/2 top-1/2 h-[1000px] w-[1000px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#B89B72]/10 blur-3xl"
          />

          {/* Cinematic Gold Sweep */}
          <motion.div
            animate={{
              x: ["-20%", "120%"],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute top-0 h-full w-[30%] rotate-12 bg-gradient-to-r from-transparent via-[#B89B72]/[0.06] to-transparent blur-3xl"
          />

          {/* Film Grain */}
          <div
            className="absolute inset-0 opacity-[0.03] mix-blend-soft-light"
            style={{
              backgroundImage:
                "url('https://grainy-gradients.vercel.app/noise.svg')",
            }}
          />

          {/* Vignette */}
          <div className="absolute inset-0 shadow-[inset_0_0_250px_rgba(0,0,0,0.9)]" />

          {/* Center Content */}
          <div className="relative flex h-full flex-col items-center justify-center">

            {/* Small Label */}
            <motion.p
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
                delay: 0.3,
              }}
              className="mb-10 text-[11px] uppercase tracking-[0.65em] text-[#B89B72]/85"
            >
              Luxury Interior Design House
            </motion.p>

            {/* Main Logo */}
            <div className="overflow-hidden">

              <motion.h1
                initial={{
                  y: 220,
                }}
                animate={{
                  y: 0,
                }}
                transition={{
                  duration: 1.8,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="text-center text-6xl font-light leading-[0.82] tracking-[-0.08em] text-white drop-shadow-[0_10px_40px_rgba(0,0,0,0.45)] md:text-[9rem]"
              >
                The Decor
                <br />
                Art Studio
              </motion.h1>

            </div>

            {/* Divider */}
            <motion.div
              initial={{
                width: 0,
                opacity: 0,
              }}
              animate={{
                width: 160,
                opacity: 1,
              }}
              transition={{
                duration: 1,
                delay: 1.2,
              }}
              className="mt-14 h-px bg-[#B89B72]"
            />

            {/* Loading Text */}
            <motion.p
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="mt-8 text-[10px] uppercase tracking-[0.5em] text-white/35"
            >
              Curating Experience
            </motion.p>

          </div>

          {/* Massive Floating Typography */}
          <motion.div
            animate={{
              y: [0, -20, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="pointer-events-none absolute bottom-[-10%] left-1/2 -translate-x-1/2 text-[22vw] font-extralight leading-none tracking-[-0.08em] text-white/[0.025]"
          >
            TDAS
          </motion.div>

        </motion.div>
      )}

    </AnimatePresence>
  );
}