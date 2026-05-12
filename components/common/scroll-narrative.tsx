"use client";

import {
  motion,
  useReducedMotion,
} from "framer-motion";

import {
  ReactNode,
} from "react";

import { MOTION } from "@/lib/motion";

interface ScrollNarrativeProps {
  children: ReactNode;

  className?: string;

  delay?: number;

  once?: boolean;
}

export default function ScrollNarrative({
  children,
  className,
  delay = 0,
  once = true,
}: ScrollNarrativeProps) {

  const prefersReducedMotion =
    useReducedMotion();

  return (
    <motion.div
      initial={{
        opacity: 0,

        y:
          prefersReducedMotion
            ? 0
            : 50,

        filter:
          prefersReducedMotion
            ? "blur(0px)"
            : "blur(6px)",
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
      }}
      viewport={{
        once,
        amount: 0.15,
      }}
      transition={{
        duration:
          prefersReducedMotion
            ? 0.35
            : MOTION.duration.cinematic,

        delay,

        ease:
          MOTION.ease.luxury,
      }}
      className={className}
      style={{
        willChange:
          "transform, opacity",

        backfaceVisibility:
          "hidden",

        transform:
          "translateZ(0)",
      }}
    >
      {children}
    </motion.div>
  );
}