"use client";

import { motion } from "framer-motion";

interface LuxuryImageProps {
  src: string;
  alt: string;
  className?: string;
}

export default function LuxuryImage({
  src,
  alt,
  className = "",
}: LuxuryImageProps) {
  return (
    <div
      className={`group relative overflow-hidden ${className}`}
    >

      {/* Main Image */}
      <motion.img
        src={src}
        alt={alt}
        initial={{
          scale: 1.02,
        }}
        whileHover={{
          scale: 1.06,
        }}
        transition={{
          duration: 2,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="h-full w-full object-cover"
      />

      {/* Soft Luxury Overlay */}
      <div className="absolute inset-0 bg-black/5" />

      {/* Warm Editorial Tone */}
      <div className="absolute inset-0 bg-[#B89B72]/[0.03] mix-blend-soft-light" />

      {/* Bottom Shadow */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />

      {/* Reflection Sweep */}
      <motion.div
        initial={{
          x: "-120%",
        }}
        whileHover={{
          x: "140%",
        }}
        transition={{
          duration: 1.8,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="absolute inset-y-0 w-[20%] rotate-12 bg-gradient-to-r from-transparent via-white/10 to-transparent blur-2xl"
      />

    </div>
  );
}