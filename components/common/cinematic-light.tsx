"use client";

import {
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";

import { useEffect } from "react";

export default function CinematicLight() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  /* Main Cinematic Glow */
  const smoothX = useSpring(mouseX, {
    damping: 45,
    stiffness: 110,
    mass: 0.8,
  });

  const smoothY = useSpring(mouseY, {
    damping: 45,
    stiffness: 110,
    mass: 0.8,
  });

  /* Secondary Glow */
  const secondaryX = useSpring(mouseX, {
    damping: 60,
    stiffness: 80,
  });

  const secondaryY = useSpring(mouseY, {
    damping: 60,
    stiffness: 80,
  });

  /* Ambient Drift */
  const ambientX = useSpring(mouseX, {
    damping: 80,
    stiffness: 50,
  });

  const ambientY = useSpring(mouseY, {
    damping: 80,
    stiffness: 50,
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener(
        "mousemove",
        handleMouseMove
      );
    };
  }, [mouseX, mouseY]);

  return (
    <>
      {/* Main Gold Atmosphere */}
      <motion.div
        style={{
          left: smoothX,
          top: smoothY,
          x: "-50%",
          y: "-50%",
        }}
        animate={{
          opacity: [0.16, 0.24, 0.16],
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none fixed z-[4] hidden h-[700px] w-[700px] rounded-full bg-[#B89B72]/[0.08] blur-[140px] md:block"
      />

      {/* Secondary Soft Glow */}
      <motion.div
        style={{
          left: secondaryX,
          top: secondaryY,
          x: "-50%",
          y: "-50%",
        }}
        animate={{
          opacity: [0.08, 0.14, 0.08],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none fixed z-[3] hidden h-[420px] w-[420px] rounded-full bg-white/[0.04] blur-[120px] md:block"
      />

      {/* Ambient Cinematic Drift */}
      <motion.div
        style={{
          left: ambientX,
          top: ambientY,
          x: "-50%",
          y: "-50%",
        }}
        animate={{
          opacity: [0.04, 0.08, 0.04],
          scale: [1, 1.12, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none fixed z-[2] hidden h-[1000px] w-[1000px] rounded-full bg-[#B89B72]/[0.04] blur-[200px] md:block"
      />
    </>
  );
}