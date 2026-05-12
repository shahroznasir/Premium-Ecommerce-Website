"use client";

import {
  motion,
  useTransform,
} from "framer-motion";

import {
  ReactNode,
} from "react";

import {
  useScrollStore,
} from "@/stores/scroll-store";

interface SceneProps {
  children: ReactNode;

  className?: string;

  intensity?: number;
}

export default function Scene({
  children,
  className,
  intensity = 1,
}: SceneProps) {

  const progress =
    useScrollStore(
      (state) => state.progress
    );

  /* =========================================================
     CINEMATIC DEPTH
  ========================================================== */

  const opacity = useTransform(
    () =>
      1 -
      progress *
        0.12 *
        intensity
  );

  const y = useTransform(
    () =>
      progress *
      80 *
      intensity
  );

  const scale = useTransform(
    () =>
      1 -
      progress *
        0.04 *
        intensity
  );

  return (
    <motion.div
      style={{
        opacity,
        y,
        scale,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}