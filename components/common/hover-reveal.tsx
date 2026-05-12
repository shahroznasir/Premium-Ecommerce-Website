"use client";

import {
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";

interface HoverRevealProps {
  text: string;
  image: string;
}

export default function HoverReveal({
  text,
  image,
}: HoverRevealProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const smoothX = useSpring(x, {
    stiffness: 120,
    damping: 20,
  });

  const smoothY = useSpring(y, {
    stiffness: 120,
    damping: 20,
  });

  return (
    <div
      className="group relative w-fit"
      onMouseMove={(e) => {
        x.set(e.clientX);
        y.set(e.clientY);
      }}
    >

      {/* Text */}
      <h2 className="cursor-none text-6xl tracking-[-0.05em] text-[#111111] transition duration-500 group-hover:text-[#B89B72] md:text-8xl">
        {text}
      </h2>

      {/* Floating Image */}
      <motion.div
        style={{
          left: smoothX,
          top: smoothY,
        }}
        className="pointer-events-none fixed z-50 hidden -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-3xl opacity-0 shadow-2xl transition duration-500 group-hover:opacity-100 md:block"
      >

        <img
          src={image}
          alt={text}
          className="h-[320px] w-[260px] object-cover"
        />

      </motion.div>

    </div>
  );
}