"use client";

import {
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";

import { ReactNode } from "react";

export default function MagneticCard({
  children,
}: {
  children: ReactNode;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const smoothX = useSpring(x, {
    damping: 20,
    stiffness: 150,
  });

  const smoothY = useSpring(y, {
    damping: 20,
    stiffness: 150,
  });

  function handleMouseMove(
    e: React.MouseEvent<HTMLDivElement>
  ) {
    const rect = e.currentTarget.getBoundingClientRect();

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    x.set((mouseX - centerX) * 0.08);
    y.set((mouseY - centerY) * 0.08);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      style={{
        x: smoothX,
        y: smoothY,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      transition={{
        type: "spring",
      }}
    >
      {children}
    </motion.div>
  );
}