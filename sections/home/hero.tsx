"use client";

import {
  motion,
  useReducedMotion,
} from "framer-motion";

import MagneticButton from "@/components/common/magnetic-button";

export default function Hero() {

  const prefersReducedMotion =
    useReducedMotion();

  return (
    <section className="relative h-screen overflow-hidden bg-black">

      {/* =========================================================
          VIDEO BACKGROUND
      ========================================================== */}
      <div className="absolute inset-0">

        {/* Desktop Video */}
        <div className="hidden h-full w-full md:block">

          <video
            key="luxury-video"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/images/hero-poster.jpg"
            className="h-full w-full object-cover"
          >

            <source
              src="/videos/Luxury-Interior.mp4"
              type="video/mp4"
            />

          </video>

        </div>

        {/* Mobile Poster */}
        <div className="block h-full w-full md:hidden">

          <img
            src="/images/hero-poster.jpg"
            alt="Luxury Interior"
            loading="eager"
            className="h-full w-full object-cover"
          />

        </div>

      </div>

      {/* =========================================================
          SINGLE CINEMATIC OVERLAY
      ========================================================== */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/10 to-[#050505]/85" />

      {/* =========================================================
          ATMOSPHERIC TOP LIGHT
      ========================================================== */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(184,155,114,0.07),transparent_42%)]" />

      {/* =========================================================
          MAIN CONTENT
      ========================================================== */}
      <div className="relative z-10 flex h-full items-center pt-24">

        <div className="container-luxury w-full">

          <motion.div
            initial={{
              opacity: 0,
              y:
                prefersReducedMotion
                  ? 0
                  : 24,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.9,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="max-w-[720px] pl-6 md:pl-20"
          >

            {/* =========================================================
                LABEL
            ========================================================== */}
            <motion.p
              initial={{
                opacity: 0,
                y:
                  prefersReducedMotion
                    ? 0
                    : 8,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.12,
                duration: 0.7,
              }}
              className="mb-8 md:mb-10 pl-1 text-[9px] md:text-[11px] uppercase tracking-[0.45em] md:tracking-[0.55em] text-[#B89B72]/85"
            >

              Curated Luxury Living

            </motion.p>

            {/* =========================================================
                MAIN HEADING
            ========================================================== */}
            <div className="overflow-hidden">

              <motion.h1
                initial={{
                  y:
                    prefersReducedMotion
                      ? 0
                      : 36,
                }}
                animate={{
                  y: 0,
                }}
                transition={{
                  duration: 1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="text-[3.4rem] font-light leading-[0.9] tracking-[-0.065em] text-white drop-shadow-[0_10px_40px_rgba(0,0,0,0.4)] md:text-[6.1rem]"
              >

                Timeless Luxury
                <br />
                Defined

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
                width: 90,
                opacity: 1,
              }}
              transition={{
                delay: 0.5,
                duration: 0.8,
              }}
              className="mt-8 md:mt-10 h-px bg-gradient-to-r from-[#B89B72] to-transparent"
            />

            {/* =========================================================
                DESCRIPTION
            ========================================================== */}
            <motion.div
              initial={{
                opacity: 0,
                y:
                  prefersReducedMotion
                    ? 0
                    : 16,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.28,
                duration: 0.85,
              }}
              className="mt-6 md:mt-8 max-w-[540px]"
            >

              <p className="text-[15px] leading-[1.9] text-white/58 md:text-[17px] md:leading-[2]">

                Discover sculptural décor,
                cinematic interiors, and elevated
                design objects curated for refined
                contemporary living and timeless
                architectural spaces.

              </p>

            </motion.div>

            {/* =========================================================
                CTA BUTTONS
            ========================================================== */}
            <motion.div
              initial={{
                opacity: 0,
                y:
                  prefersReducedMotion
                    ? 0
                    : 14,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.42,
                duration: 0.8,
              }}
              className="mt-8 md:mt-10 flex flex-wrap gap-3 md:gap-4"
            >

              {/* Primary */}
              <MagneticButton className="rounded-full bg-gradient-to-b from-white to-[#E7E2DA] px-7 py-3.5 text-[10px] uppercase tracking-[0.32em] text-black transition duration-500 hover:bg-[#B89B72] hover:text-black md:px-8 md:py-4 md:text-[11px]">

                Explore Collection

              </MagneticButton>

              {/* Secondary */}
              <MagneticButton className="rounded-full border border-white/10 bg-black/20 px-7 py-3.5 text-[10px] uppercase tracking-[0.32em] text-white transition duration-500 hover:border-white hover:bg-white hover:text-black md:px-8 md:py-4 md:text-[11px]">

                View Projects

              </MagneticButton>

            </motion.div>

          </motion.div>

        </div>

      </div>

      {/* =========================================================
          FLOATING TYPOGRAPHY
      ========================================================== */}
      {!prefersReducedMotion && (
        <motion.div
          animate={{
            y: [0, -3, 0],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="pointer-events-none absolute bottom-[-6%] right-[-2%] hidden text-[18vw] font-light leading-none tracking-[-0.08em] text-white/[0.018] lg:block"
        >

          TDAS

        </motion.div>
      )}

      {/* =========================================================
          FILM GRAIN
      ========================================================== */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.01] mix-blend-soft-light"
        style={{
          backgroundImage:
            "url('https://grainy-gradients.vercel.app/noise.svg')",
        }}
      />

      {/* =========================================================
          BOTTOM FADE
      ========================================================== */}
      <div className="absolute bottom-0 left-0 h-40 w-full bg-gradient-to-t from-[#050505] to-transparent md:h-48" />

    </section>
  );
}