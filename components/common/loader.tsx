"use client";

import {
  AnimatePresence,
  motion,
} from "framer-motion";

import {
  useEffect,
  useState,
} from "react";

export default function Loader() {

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    const timer =
      setTimeout(() => {
        setLoading(false);
      }, 3000);

    return () =>
      clearTimeout(timer);

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
            filter: "blur(10px)",
            transition: {
              duration: 1.1,
              ease: [0.22, 1, 0.36, 1],
            },
          }}
          className="fixed inset-0 z-[999999] overflow-hidden bg-[#050505]"
        >

          {/* =========================================================
              ATMOSPHERIC GLOW
          ========================================================== */}
          <motion.div
            animate={{
              opacity: [0.08, 0.12, 0.08],
              scale: [1, 1.03, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute left-1/2 top-1/2 h-[820px] w-[820px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#B89B72]/[0.08] blur-[180px]"
          />

          {/* =========================================================
              TOP ATMOSPHERIC LIGHT
          ========================================================== */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(184,155,114,0.08),transparent_42%)]" />

          {/* =========================================================
              FILM GRAIN
          ========================================================== */}
          <div
            className="absolute inset-0 opacity-[0.012] mix-blend-soft-light"
            style={{
              backgroundImage:
                "url('https://grainy-gradients.vercel.app/noise.svg')",
            }}
          />

          {/* =========================================================
              VIGNETTE
          ========================================================== */}
          <div className="absolute inset-0 shadow-[inset_0_0_220px_rgba(0,0,0,0.88)]" />

          {/* =========================================================
              CONTENT
          ========================================================== */}
          <div className="relative flex h-full flex-col items-center justify-center px-6 text-center">

            {/* Label */}
            <motion.p
              initial={{
                opacity: 0,
                y: 14,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 1,
                delay: 0.2,
              }}
              className="mb-8 text-[9px] uppercase tracking-[0.58em] text-[#B89B72]/72 md:text-[10px]"
            >

              Sculptural Luxury Interiors

            </motion.p>

            {/* =========================================================
                CINEMATIC REVEAL
            ========================================================== */}
            <div className="relative overflow-hidden">

              {/* Reveal Mask */}
              <motion.div
                initial={{
                  y: "0%",
                }}
                animate={{
                  y: "100%",
                }}
                transition={{
                  duration: 1.6,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="absolute inset-0 z-20 bg-[#050505]"
              />

              {/* Typography */}
              <motion.h1
                initial={{
                  opacity: 0,
                  y: 40,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 1.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="text-center text-[3.8rem] font-light leading-[0.84] tracking-[-0.08em] text-white md:text-[7rem] lg:text-[8rem]"
              >

                The Decor
                <br />
                Art Studio

              </motion.h1>

            </div>

            {/* =========================================================
                DIVIDER
            ========================================================== */}
            <motion.div
              initial={{
                width: 0,
                opacity: 0,
              }}
              animate={{
                width: 120,
                opacity: 1,
              }}
              transition={{
                duration: 1,
                delay: 0.9,
              }}
              className="mt-10 h-px bg-gradient-to-r from-transparent via-[#B89B72] to-transparent"
            />

            {/* =========================================================
                LOADING TEXT
            ========================================================== */}
            <motion.p
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: [0.18, 0.42, 0.18],
              }}
              transition={{
                duration: 2.6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="mt-6 text-[9px] uppercase tracking-[0.45em] text-white/28 md:text-[10px]"
            >

              Curating Atmosphere

            </motion.p>

          </div>

          {/* =========================================================
              FLOATING TYPOGRAPHY
          ========================================================== */}
          <motion.div
            animate={{
              y: [0, -8, 0],
            }}
            transition={{
              duration: 14,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="pointer-events-none absolute bottom-[-6%] left-1/2 -translate-x-1/2 text-[18vw] font-extralight leading-none tracking-[-0.08em] text-white/[0.018]"
          >

            TDAS

          </motion.div>

        </motion.div>

      )}

    </AnimatePresence>
  );
}