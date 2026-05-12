"use client";

import {
  motion,
  useMotionValue,
  useSpring,
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
  intensity = 18,
  className,
}: SpatialDepthProps) {

  const mouseX =
    useMotionValue(0);

  const mouseY =
    useMotionValue(0);

  const rotateX =
    useSpring(mouseY, {
      stiffness: 120,
      damping: 18,
    });

  const rotateY =
    useSpring(mouseX, {
      stiffness: 120,
      damping: 18,
    });

  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement>
  ) => {

    const rect =
      e.currentTarget.getBoundingClientRect();

    const x =
      e.clientX - rect.left;

    const y =
      e.clientY - rect.top;

    const centerX =
      rect.width / 2;

    const centerY =
      rect.height / 2;

    mouseX.set(
      ((x - centerX) / centerX) *
        intensity
    );

    mouseY.set(
      -(
        ((y - centerY) / centerY) *
        intensity
      )
    );
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        mouseX.set(0);
        mouseY.set(0);
      }}
      style={{
        rotateX,
        rotateY,
        transformStyle:
          "preserve-3d",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}