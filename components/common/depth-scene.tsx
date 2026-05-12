"use client";

import {
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";

import { ReactNode } from "react";

export default function DepthScene({
  children,
}: {
  children: ReactNode;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const smoothX = useSpring(x, {
    damping: 30,
    stiffness: 100,
  });

  const smoothY = useSpring(y, {
    damping: 30,
    stiffness: 100,
  });

  function handleMouseMove(
    e: React.MouseEvent<HTMLDivElement>
  ) {
    const rect = e.currentTarget.getBoundingClientRect();

    const mouseX =
      (e.clientX - rect.left - rect.width / 2) * 0.015;

    const mouseY =
      (e.clientY - rect.top - rect.height / 2) * 0.015;

    x.set(mouseX);
    y.set(mouseY);
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
      className="relative"
    >
      {children}
    </motion.div>
  );
}