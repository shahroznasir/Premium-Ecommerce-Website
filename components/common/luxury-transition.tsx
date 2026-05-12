"use client";

import { motion } from "framer-motion";

interface LuxuryTransitionProps {
  light?: boolean;
}

export default function LuxuryTransition({
  light = false,
}: LuxuryTransitionProps) {
  return (
    <section
      className={`relative overflow-hidden ${
        light
          ? "bg-[#F5F1EB]"
          : "bg-[#050505]"
      }`}
    >
      {/* Main Transition Space */}
      <div className="relative h-[220px] overflow-hidden">

        {/* Ambient Glow */}
        <motion.div
          animate={{
            opacity: [0.4, 0.7, 0.4],
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#B89B72]/10 blur-[140px]"
        />

        {/* Gradient Blend */}
        <div
          className={`absolute inset-0 ${
            light
              ? "bg-gradient-to-b from-[#050505] via-[#151515] to-[#F5F1EB]"
              : "bg-gradient-to-b from-[#F5F1EB] via-[#111111] to-[#050505]"
          }`}
        />

        {/* Center Line */}
        <div className="absolute left-1/2 top-1/2 h-px w-[70%] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-transparent via-[#B89B72]/30 to-transparent" />

      </div>
    </section>
  );
}