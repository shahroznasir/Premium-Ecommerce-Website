"use client";

import {
  AnimatePresence,
  motion,
} from "framer-motion";

import { usePathname } from "next/navigation";

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">

      <motion.div
        key={pathname}

        initial={{
          opacity: 0,
          scale: 1.015,
          filter: "blur(14px)",
          y: 30,
        }}

        animate={{
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          y: 0,
        }}

        exit={{
          opacity: 0,
          scale: 0.985,
          filter: "blur(12px)",
          y: -20,
        }}

        transition={{
          duration: 1.2,
          ease: [0.22, 1, 0.36, 1],
        }}

        className="will-change-transform"
      >

        {/* Cinematic Fade Layer */}
        <motion.div
          initial={{
            opacity: 0.18,
          }}
          animate={{
            opacity: 0,
          }}
          exit={{
            opacity: 0.12,
          }}
          transition={{
            duration: 1.4,
            ease: "easeOut",
          }}
          className="pointer-events-none fixed inset-0 z-[999] bg-black"
        />

        {children}

      </motion.div>

    </AnimatePresence>
  );
}