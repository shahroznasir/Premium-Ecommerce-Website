"use client";

import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";

import {
  ReactNode,
  useRef,
} from "react";

interface CinematicHeadingProps {
  children: ReactNode;

  className?: string;
}

export default function CinematicHeading({
  children,
  className,
}: CinematicHeadingProps) {

  const ref =
    useRef<HTMLHeadingElement>(null);

  const { scrollYProgress } =
    useScroll({
      target: ref,
      offset: [
        "start 92%",
        "end 8%",
      ],
    });

  /* =========================================================
     REFINED MOTION SYSTEM
  ========================================================== */

  const rawY =
    useTransform(
      scrollYProgress,
      [0, 1],
      [24, -16]
    );

  const rawOpacity =
    useTransform(
      scrollYProgress,
      [0, 0.18, 0.82, 1],
      [0.15, 1, 1, 0.78]
    );

  const rawScale =
    useTransform(
      scrollYProgress,
      [0, 1],
      [0.985, 1.01]
    );

  /* =========================================================
     LUXURY SPRING SMOOTHING
  ========================================================== */

  const y =
    useSpring(rawY, {
      stiffness: 80,
      damping: 26,
      mass: 1,
    });

  const opacity =
    useSpring(rawOpacity, {
      stiffness: 70,
      damping: 24,
    });

  const scale =
    useSpring(rawScale, {
      stiffness: 70,
      damping: 22,
    });

  return (
    <div className="relative overflow-hidden">

      {/* =========================================================
          CINEMATIC REVEAL MASK
      ========================================================== */}
      <motion.div
        initial={{
          y: "0%",
        }}
        whileInView={{
          y: "100%",
        }}
        viewport={{
          once: true,
          amount: 0.4,
        }}
        transition={{
          duration: 1.4,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="absolute inset-0 z-20 bg-[#050505]"
      />

      {/* =========================================================
          TYPOGRAPHY
      ========================================================== */}
      <motion.h2
        ref={ref}
        style={{
          y,
          opacity,
          scale,
        }}
        transition={{
          duration: 1.2,
        }}
        className={className}
      >

        {children}

      </motion.h2>

    </div>
  );
}