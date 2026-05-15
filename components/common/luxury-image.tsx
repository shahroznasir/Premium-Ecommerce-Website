"use client";

import Image from "next/image";

import { motion } from "framer-motion";

interface LuxuryImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
}

export default function LuxuryImage({
  src,
  alt,
  className = "",
  priority = false,
  sizes = "(max-width: 768px) 100vw, 50vw",
}: LuxuryImageProps) {

  return (
    <div
      className={`group relative overflow-hidden ${className}`}
    >

      {/* =====================================================
          MAIN IMAGE
      ====================================================== */}
      <motion.div
        initial={{
          scale: 1.01,
        }}
        whileHover={{
          scale: 1.03,
        }}
        transition={{
          duration: 1.4,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="h-full w-full"
      >

        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          quality={82}
          className="object-cover"
        />

      </motion.div>

      {/* =====================================================
          SOFT OVERLAY
      ====================================================== */}
      <div className="pointer-events-none absolute inset-0 bg-black/[0.04]" />

      {/* =====================================================
          WARM EDITORIAL TONE
      ====================================================== */}
      <div className="pointer-events-none absolute inset-0 bg-[#B89B72]/[0.025] mix-blend-soft-light" />

      {/* =====================================================
          DEPTH GRADIENT
      ====================================================== */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

      {/* =====================================================
          CINEMATIC VIGNETTE
      ====================================================== */}
      <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_60px_rgba(0,0,0,0.18)]" />

      {/* =====================================================
          REFLECTION SWEEP
      ====================================================== */}
      <motion.div
        initial={{
          x: "-140%",
        }}
        whileHover={{
          x: "160%",
        }}
        transition={{
          duration: 1.5,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="pointer-events-none absolute inset-y-0 w-[18%] rotate-12 bg-gradient-to-r from-transparent via-white/[0.07] to-transparent blur-2xl"
      />

    </div>
  );
}