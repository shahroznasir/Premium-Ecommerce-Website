"use client";

import {
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";

import { useEffect } from "react";

export default function CinematicLight() {

  const mouseX =
    useMotionValue(0);

  const mouseY =
    useMotionValue(0);

  /* =========================================================
     OPTIMIZED SPRINGS
  ========================================================== */

  const primaryX =
    useSpring(mouseX, {
      damping: 70,
      stiffness: 55,
      mass: 1.2,
    });

  const primaryY =
    useSpring(mouseY, {
      damping: 70,
      stiffness: 55,
      mass: 1.2,
    });

  const ambientX =
    useSpring(mouseX, {
      damping: 90,
      stiffness: 35,
    });

  const ambientY =
    useSpring(mouseY, {
      damping: 90,
      stiffness: 35,
    });

  useEffect(() => {

    let raf = 0;

    const handleMouseMove = (
      e: MouseEvent
    ) => {

      cancelAnimationFrame(raf);

      raf =
        requestAnimationFrame(() => {

          mouseX.set(e.clientX);
          mouseY.set(e.clientY);

        });
    };

    window.addEventListener(
      "mousemove",
      handleMouseMove,
      { passive: true }
    );

    return () => {

      cancelAnimationFrame(raf);

      window.removeEventListener(
        "mousemove",
        handleMouseMove
      );
    };

  }, [mouseX, mouseY]);

  return (
    <>

      {/* =========================================================
          PRIMARY CINEMATIC LIGHT
      ========================================================== */}
      <motion.div
        style={{
          left: primaryX,
          top: primaryY,
          x: "-50%",
          y: "-50%",
        }}
        animate={{
          opacity: [0.045, 0.065, 0.045],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none fixed z-[2] hidden h-[360px] w-[360px] rounded-full bg-[#B89B72]/[0.07] blur-[90px] lg:block"
      />

      {/* =========================================================
          SOFT AMBIENT DEPTH
      ========================================================== */}
      <motion.div
        style={{
          left: ambientX,
          top: ambientY,
          x: "-50%",
          y: "-50%",
        }}
        animate={{
          opacity: [0.018, 0.028, 0.018],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none fixed z-[1] hidden h-[620px] w-[620px] rounded-full bg-[#B89B72]/[0.035] blur-[120px] lg:block"
      />

    </>
  );
}