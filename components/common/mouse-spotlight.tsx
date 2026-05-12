"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
} from "framer-motion";

export default function MouseSpotlight() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-[9998]"
      onMouseMove={(e) => {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
      }}
      style={{
        background: useMotionTemplate`
          radial-gradient(
            500px circle at ${mouseX}px ${mouseY}px,
            rgba(184,155,114,0.12),
            transparent 40%
          )
        `,
      }}
    />
  );
}