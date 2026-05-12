"use client";

import {
  motion,
  useReducedMotion,
} from "framer-motion";

interface ProductAtmosphereProps {
  category?: string;

  title?: string;
}

export default function ProductAtmosphere({
  category,
  title,
}: ProductAtmosphereProps) {

  const prefersReducedMotion =
    useReducedMotion();

  const value =
    `${category} ${title}`.toLowerCase();

  const isDark =
    value.includes("black") ||
    value.includes("obsidian");

  const isWarm =
    value.includes("wood") ||
    value.includes("beige") ||
    value.includes("sand");

  const isMinimal =
    value.includes("white") ||
    value.includes("ivory");

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">

      {/* =========================================================
          PRIMARY AURA
      ========================================================== */}
      <motion.div
        animate={
          prefersReducedMotion
            ? {}
            : {
                scale: [1, 1.04, 1],
                opacity: [0.82, 1, 0.82],
              }
        }
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className={`absolute left-1/2 top-[-20%] h-[700px] w-[700px] -translate-x-1/2 rounded-full blur-[120px] md:h-[1200px] md:w-[1200px] md:blur-[240px] ${
          isDark
            ? "bg-white/[0.025]"
            : isWarm
            ? "bg-[#D6B98C]/[0.05]"
            : isMinimal
            ? "bg-white/[0.035]"
            : "bg-[#B89B72]/[0.04]"
        }`}
      />

      {/* =========================================================
          SIDE DEPTH
      ========================================================== */}
      <motion.div
        animate={
          prefersReducedMotion
            ? {}
            : {
                y: [0, -24, 0],
              }
        }
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className={`absolute right-[-10%] top-[30%] h-[400px] w-[400px] rounded-full blur-[90px] md:h-[700px] md:w-[700px] md:blur-[200px] ${
          isDark
            ? "bg-white/[0.018]"
            : isWarm
            ? "bg-[#C6A97B]/[0.04]"
            : isMinimal
            ? "bg-white/[0.025]"
            : "bg-[#B89B72]/[0.03]"
        }`}
      />

      {/* =========================================================
          BOTTOM GLOW
      ========================================================== */}
      <motion.div
        animate={
          prefersReducedMotion
            ? {}
            : {
                scale: [1, 1.03, 1],
              }
        }
        transition={{
          duration: 24,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className={`absolute bottom-[-20%] left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full blur-[100px] md:h-[900px] md:w-[900px] md:blur-[220px] ${
          isDark
            ? "bg-white/[0.02]"
            : isWarm
            ? "bg-[#D6B98C]/[0.03]"
            : isMinimal
            ? "bg-white/[0.03]"
            : "bg-[#B89B72]/[0.02]"
        }`}
      />

      {/* =========================================================
          CINEMATIC TOP LIGHT
      ========================================================== */}
      <div
        className={`absolute inset-0 ${
          isDark
            ? "bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.03),transparent_40%)]"
            : isWarm
            ? "bg-[radial-gradient(circle_at_top,rgba(214,185,140,0.08),transparent_45%)]"
            : isMinimal
            ? "bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.05),transparent_42%)]"
            : "bg-[radial-gradient(circle_at_top,rgba(184,155,114,0.05),transparent_42%)]"
        }`}
      />

      {/* =========================================================
          VIGNETTE
      ========================================================== */}
      <div className="absolute inset-0 shadow-[inset_0_0_120px_rgba(0,0,0,0.38)] md:shadow-[inset_0_0_180px_rgba(0,0,0,0.5)]" />

    </div>
  );
}