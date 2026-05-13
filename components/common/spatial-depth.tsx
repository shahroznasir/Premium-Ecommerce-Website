"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

import {
  ReactNode,
} from "react";

interface SpatialDepthProps {
  children: ReactNode;

  intensity?: number;

  className?: string;
}

export default function SpatialDepth({
  children,
  intensity = 10,
  className,
}: SpatialDepthProps) {

  /* =========================================================
     MOUSE POSITION
  ========================================================== */

  const mouseX =
    useMotionValue(0);

  const mouseY =
    useMotionValue(0);

  /* =========================================================
     CINEMATIC SMOOTHING
  ========================================================== */

  const smoothX =
    useSpring(mouseX, {
      stiffness: 65,
      damping: 26,
      mass: 1.2,
    });

  const smoothY =
    useSpring(mouseY, {
      stiffness: 65,
      damping: 26,
      mass: 1.2,
    });

  /* =========================================================
     REFINED ROTATION
  ========================================================== */

  const rotateY =
    useTransform(
      smoothX,
      [-1, 1],
      [-intensity, intensity]
    );

  const rotateX =
    useTransform(
      smoothY,
      [-1, 1],
      [intensity, -intensity]
    );

  /* =========================================================
     SUBTLE DEPTH FLOAT
  ========================================================== */

  const translateY =
    useTransform(
      smoothY,
      [-1, 1],
      [-6, 6]
    );

  const translateX =
    useTransform(
      smoothX,
      [-1, 1],
      [-4, 4]
    );

  /* =========================================================
     SCALE ATMOSPHERE
  ========================================================== */

  const scale =
    useTransform(
      smoothY,
      [-1, 1],
      [1.008, 0.995]
    );

  /* =========================================================
     MOUSE TRACKING
  ========================================================== */

  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement>
  ) => {

    const rect =
      e.currentTarget.getBoundingClientRect();

    const x =
      (e.clientX - rect.left) /
      rect.width;

    const y =
      (e.clientY - rect.top) /
      rect.height;

    mouseX.set((x - 0.5) * 2);
    mouseY.set((y - 0.5) * 2);
  };

  const handleMouseLeave = () => {

    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        x: translateX,
        y: translateY,
        scale,
        transformStyle: "preserve-3d",
        perspective: 2200,
        willChange:
          "transform",
      }}
      transition={{
        duration: 1.2,
      }}
      className={className}
    >

      {children}

    </motion.div>
  );
}