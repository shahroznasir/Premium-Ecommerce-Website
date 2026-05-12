"use client";

import {
  motion,
  useTransform,
} from "framer-motion";

import {
  useScrollStore,
} from "@/stores/scroll-store";

export default function Atmosphere() {

  const progress =
    useScrollStore(
      (state) => state.progress
    );

  /* =========================================================
     CINEMATIC ATMOSPHERIC EVOLUTION
  ========================================================== */

  const heroOpacity = useTransform(
    () => 1 - progress * 1.8
  );

  const ambientScale = useTransform(
    () => 1 + progress * 0.08
  );

  const vignetteOpacity = useTransform(
    () => 0.7 + progress * 0.25
  );

  return (
    <>
      {/* =========================================================
          GLOBAL ATMOSPHERIC SYSTEM
      ========================================================== */}
      <motion.div
        style={{
          opacity: heroOpacity,
          scale: ambientScale,
        }}
        className="pointer-events-none fixed inset-0 z-[1] overflow-hidden"
      >

        {/* Primary Aura */}
        <motion.div
          animate={{
            y: [0, -30, 0],
            scale: [1, 1.04, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute left-1/2 top-[-15%] h-[1200px] w-[1200px] -translate-x-1/2 rounded-full bg-[#B89B72]/[0.035] blur-[220px]"
        />

        {/* Left Ambient */}
        <motion.div
          animate={{
            y: [0, 20, 0],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute left-[-10%] top-[35%] h-[700px] w-[700px] rounded-full bg-[#B89B72]/[0.02] blur-[180px]"
        />

        {/* Right Ambient */}
        <motion.div
          animate={{
            y: [0, -20, 0],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute right-[-10%] top-[55%] h-[800px] w-[800px] rounded-full bg-[#B89B72]/[0.02] blur-[220px]"
        />

        {/* Bottom Glow */}
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-[-20%] left-1/2 h-[900px] w-[900px] -translate-x-1/2 rounded-full bg-[#B89B72]/[0.015] blur-[220px]"
        />

      </motion.div>

      {/* =========================================================
          TOP LIGHT
      ========================================================== */}
      <motion.div
        style={{
          opacity: heroOpacity,
        }}
        className="pointer-events-none fixed inset-0 z-[2] bg-[radial-gradient(circle_at_top,rgba(184,155,114,0.04),transparent_42%)]"
      />

      {/* =========================================================
          CINEMATIC VIGNETTE
      ========================================================== */}
      <motion.div
        style={{
          opacity: vignetteOpacity,
        }}
        className="pointer-events-none fixed inset-0 z-[3] shadow-[inset_0_0_180px_rgba(0,0,0,0.78)]"
      />

      {/* =========================================================
          FILM NOISE
      ========================================================== */}
      <div className="pointer-events-none fixed inset-0 z-[4] opacity-[0.012] mix-blend-soft-light">

        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "url('https://grainy-gradients.vercel.app/noise.svg')",
          }}
        />

      </div>
    </>
  );
}