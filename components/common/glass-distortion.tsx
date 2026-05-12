"use client";

import {
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";

import { ReactNode } from "react";

export default function GlassDistortion({
  children,
}: {
  children: ReactNode;
}) {
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const smoothRotateX = useSpring(rotateX, {
    damping: 30,
    stiffness: 120,
  });

  const smoothRotateY = useSpring(rotateY, {
    damping: 30,
    stiffness: 120,
  });

  function handleMouseMove(
    e: React.MouseEvent<HTMLDivElement>
  ) {
    const rect = e.currentTarget.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const rotateYValue =
      ((mouseX - width / 2) / width) * 10;

    const rotateXValue =
      -((mouseY - height / 2) / height) * 10;

    rotateX.set(rotateXValue);
    rotateY.set(rotateYValue);
  }

  function handleMouseLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <motion.div
      style={{
        rotateX: smoothRotateX,
        rotateY: smoothRotateY,
        transformPerspective: 1400,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative transform-gpu"
    >

      {/* Luxury Reflection */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-20 opacity-0 transition duration-700 group-hover:opacity-100"
      >
        <div className="absolute -left-1/3 top-0 h-full w-1/3 rotate-12 bg-white/10 blur-3xl transition-all duration-[1800ms] group-hover:left-[140%]" />
      </motion.div>

      {children}

    </motion.div>
  );
}