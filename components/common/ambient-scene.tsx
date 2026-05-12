"use client";

import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";

export default function AmbientScene() {
  const { scrollYProgress } = useScroll();

  /* Atmosphere Progression */
  const background = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [
      "radial-gradient(circle at top, rgba(184,155,114,0.18), #050505 45%)",
      "radial-gradient(circle at center, rgba(255,255,255,0.05), #050505 50%)",
      "radial-gradient(circle at bottom, rgba(184,155,114,0.10), #030303 60%)",
      "radial-gradient(circle at right, rgba(255,255,255,0.03), #000000 65%)",
      "radial-gradient(circle at bottom, rgba(184,155,114,0.12), #000000 70%)",
    ]
  );

  const opacity = useTransform(
    scrollYProgress,
    [0, 1],
    [1, 0.9]
  );

  const blur = useTransform(
    scrollYProgress,
    [0, 1],
    [0, 40]
  );

  const filter = useMotionTemplate`
    blur(${blur}px)
  `;

  return (
    <motion.div
      style={{
        background,
        opacity,
        filter,
      }}
      className="pointer-events-none fixed inset-0 z-[0]"
    />
  );
}