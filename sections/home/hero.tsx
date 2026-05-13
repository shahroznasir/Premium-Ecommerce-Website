"use client";

import {
  motion,
  useReducedMotion,
} from "framer-motion";

import {
  useEffect,
  useRef,
} from "react";

import MagneticButton from "@/components/common/magnetic-button";

export default function Hero() {

  const prefersReducedMotion =
    useReducedMotion();

  /* =========================================================
     VIDEO PERFORMANCE OPTIMIZATION
  ========================================================== */

  const videoRef =
    useRef<HTMLVideoElement>(null);

  useEffect(() => {

    let timeout: NodeJS.Timeout;

    const handleScroll = () => {

      if (!videoRef.current)
        return;

      /* Force efficient GPU compositing */
      videoRef.current.style.willChange =
        "transform";

      clearTimeout(timeout);

      timeout = setTimeout(() => {

        if (videoRef.current) {
          videoRef.current.style.willChange =
            "auto";
        }

      }, 120);
    };

    window.addEventListener(
      "scroll",
      handleScroll,
      { passive: true }
    );

    return () => {

      clearTimeout(timeout);

      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };

  }, []);

  return (
    <section className="relative h-screen overflow-hidden bg-[#050505]">

      {/* =========================================================
          VIDEO BACKGROUND
      ========================================================== */}
      <div className="absolute inset-0">

        {/* Desktop Video */}
        <div className="hidden h-full w-full lg:block">

          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/images/hero-poster.jpg"
            className="h-full w-full object-cover will-change-transform [transform:translateZ(0)]"
          >

            <source
              src="/videos/luxury-interior.mp4"
              type="video/mp4"
            />

          </video>

        </div>

        {/* Mobile / Tablet Poster */}
        <div className="block h-full w-full lg:hidden">

          <img
            src="/images/hero-poster.jpg"
            alt="Luxury Interior"
            loading="eager"
            className="h-full w-full object-cover"
          />

        </div>

      </div>

      {/* =========================================================
          SIMPLE PERFORMANCE OVERLAY
      ========================================================== */}
      <div className="absolute inset-0 bg-black/45" />

      {/* =========================================================
          MAIN CONTENT
      ========================================================== */}
      <div className="relative z-10 flex h-full items-center">

        <div className="container-luxury w-full">

          <motion.div
            initial={{
              opacity: 0,
              y:
                prefersReducedMotion
                  ? 0
                  : 10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="max-w-[680px] px-6 md:px-16"
          >

            {/* =====================================================
                LABEL
            ====================================================== */}
            <motion.p
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                delay: 0.1,
                duration: 0.5,
              }}
              className="mb-6 pl-1 text-[9px] uppercase tracking-[0.42em] text-[#B89B72]/80 md:text-[10px]"
            >

              Curated Luxury Living

            </motion.p>

            {/* =====================================================
                HEADING
            ====================================================== */}
            <div className="overflow-hidden">

              <motion.h1
                initial={{
                  opacity: 0,
                  y:
                    prefersReducedMotion
                      ? 0
                      : 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.85,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="text-[3rem] font-light leading-[0.92] tracking-[-0.075em] text-white md:text-[5.5rem]"
              >

                Timeless Luxury
                <br />
                Defined

              </motion.h1>

            </div>

            {/* =====================================================
                DIVIDER
            ====================================================== */}
            <motion.div
              initial={{
                width: 0,
                opacity: 0,
              }}
              animate={{
                width: 70,
                opacity: 1,
              }}
              transition={{
                delay: 0.35,
                duration: 0.6,
              }}
              className="mt-7 h-px bg-[#B89B72]/70"
            />

            {/* =====================================================
                DESCRIPTION
            ====================================================== */}
            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                delay: 0.22,
                duration: 0.7,
              }}
              className="mt-6 max-w-[500px]"
            >

              <p className="text-[15px] leading-[1.8] text-white/58 md:text-[16px]">

                Discover sculptural décor,
                cinematic interiors, and elevated
                design objects curated for refined
                contemporary living.

              </p>

            </motion.div>

            {/* =====================================================
                CTA BUTTONS
            ====================================================== */}
            <motion.div
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
                delay: 0.32,
                duration: 0.6,
              }}
              className="mt-8 flex flex-wrap gap-3"
            >

              {/* Primary */}
              <MagneticButton className="rounded-full bg-white px-7 py-3 text-[10px] uppercase tracking-[0.3em] text-black transition duration-500 hover:scale-[1.01]">

                Explore Collection

              </MagneticButton>

              {/* Secondary */}
              <MagneticButton className="rounded-full border border-white/12 bg-white/[0.03] px-7 py-3 text-[10px] uppercase tracking-[0.3em] text-white transition duration-500 hover:border-white/30">

                View Projects

              </MagneticButton>

            </motion.div>

          </motion.div>

        </div>

      </div>

      {/* =========================================================
          SOFT BOTTOM BLEND
      ========================================================== */}
      <div className="absolute bottom-0 left-0 h-20 w-full bg-gradient-to-t from-[#050505] to-transparent" />

    </section>
  );
}