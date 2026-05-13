"use client";

import {
  AnimatePresence,
  motion,
} from "framer-motion";

import {
  useEffect,
  useState,
} from "react";

import { usePathname } from "next/navigation";

export default function LuxuryTransitionOverlay() {

  const pathname =
    usePathname();

  const [mounted, setMounted] =
    useState(false);

  useEffect(() => {

    const timer =
      setTimeout(() => {
        setMounted(true);
      }, 100);

    return () =>
      clearTimeout(timer);

  }, []);

  /* =========================================================
     SKIP INITIAL LOAD
  ========================================================== */

  if (!mounted) return null;

  return (
    <AnimatePresence mode="wait">

      <motion.div
        key={pathname}
        initial={{
          opacity: 1,
        }}
        animate={{
          opacity: 0,
        }}
        exit={{
          opacity: 1,
        }}
        transition={{
          duration: 0.45,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="pointer-events-none fixed inset-0 z-[9999]"
      >

        {/* Cinematic Background */}
        <div className="absolute inset-0 bg-[#050505]" />

        {/* Soft Luxury Atmosphere */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(184,155,114,0.05),transparent_60%)]" />

      </motion.div>

    </AnimatePresence>
  );
}