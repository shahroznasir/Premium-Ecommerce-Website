"use client";

import {
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";

import { useEffect, useState } from "react";

export default function CustomCursor() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const [hovering, setHovering] = useState(false);

  const springConfig = {
    damping: 35,
    stiffness: 320,
    mass: 0.5,
  };

  const cursorX = useSpring(
    mouseX,
    springConfig
  );

  const cursorY = useSpring(
    mouseY,
    springConfig
  );

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX - 8);
      mouseY.set(e.clientY - 8);
    };

    const handleMouseOver = (e: Event) => {
      const target = e.target as HTMLElement;

      if (
        target.closest(
          "button, a, .group, input, textarea"
        )
      ) {
        setHovering(true);
      } else {
        setHovering(false);
      }
    };

    window.addEventListener(
      "mousemove",
      moveCursor
    );

    window.addEventListener(
      "mouseover",
      handleMouseOver
    );

    return () => {
      window.removeEventListener(
        "mousemove",
        moveCursor
      );

      window.removeEventListener(
        "mouseover",
        handleMouseOver
      );
    };
  }, [mouseX, mouseY]);

  return (
    <>
      {/* Main Cursor */}
      <motion.div
        animate={{
          width: hovering ? 22 : 16,
          height: hovering ? 22 : 16,
          opacity: hovering ? 0.95 : 0.8,
        }}
        transition={{
          duration: 0.35,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden rounded-full border border-[#B89B72]/80 bg-[#B89B72]/10 backdrop-blur-md md:block"
        style={{
          translateX: cursorX,
          translateY: cursorY,
        }}
      />

      {/* Subtle Glow */}
      <motion.div
        animate={{
          width: hovering ? 36 : 28,
          height: hovering ? 36 : 28,
          opacity: hovering ? 0.12 : 0.08,
        }}
        transition={{
          duration: 0.45,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="pointer-events-none fixed left-0 top-0 z-[9998] hidden rounded-full bg-[#B89B72] blur-xl md:block"
        style={{
          translateX: cursorX,
          translateY: cursorY,
          x: "-25%",
          y: "-25%",
        }}
      />
    </>
  );
}