"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

import { ReactNode } from "react";

interface LuxuryHoverCardProps {
  children: ReactNode;
  className?: string;
}

export default function LuxuryHoverCard({
  children,
  className = "",
}: LuxuryHoverCardProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  /* Smooth Motion */
  const smoothX = useSpring(mouseX, {
    stiffness: 140,
    damping: 18,
    mass: 0.6,
  });

  const smoothY = useSpring(mouseY, {
    stiffness: 140,
    damping: 18,
    mass: 0.6,
  });

  /* Tilt */
  const rotateX = useTransform(
    smoothY,
    [-120, 120],
    [8, -8]
  );

  const rotateY = useTransform(
    smoothX,
    [-120, 120],
    [-8, 8]
  );

  /* Reflection */
  const glowX = useTransform(
    smoothX,
    [-120, 120],
    [-40, 40]
  );

  const glowY = useTransform(
    smoothY,
    [-120, 120],
    [-40, 40]
  );

  function handleMouseMove(
    e: React.MouseEvent<HTMLDivElement>
  ) {
    const rect =
      e.currentTarget.getBoundingClientRect();

    const x =
      e.clientX - rect.left - rect.width / 2;

    const y =
      e.clientY - rect.top - rect.height / 2;

    mouseX.set(x);
    mouseY.set(y);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      transition={{
        type: "spring",
        stiffness: 120,
        damping: 20,
      }}
      className={`relative ${className}`}
    >

      {/* Dynamic Reflection */}
      <motion.div
        style={{
          x: glowX,
          y: glowY,
        }}
        className="pointer-events-none absolute inset-0 z-20 opacity-0 transition duration-700 group-hover:opacity-100"
      >

        <div className="absolute left-1/2 top-1/2 h-[260px] w-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.06] blur-3xl" />

      </motion.div>

      {/* Content */}
      <div
        style={{
          transform: "translateZ(0px)",
        }}
      >
        {children}
      </div>

    </motion.div>
  );
}