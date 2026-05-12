"use client";

import {
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";

import {
  ReactNode,
  useRef,
} from "react";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
}

export default function MagneticButton({
  children,
  className = "",
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateXValue = useMotionValue(0);
  const rotateYValue = useMotionValue(0);

  const springX = useSpring(x, {
    stiffness: 180,
    damping: 18,
    mass: 0.5,
  });

  const springY = useSpring(y, {
    stiffness: 180,
    damping: 18,
    mass: 0.5,
  });

  const rotateX = useSpring(rotateXValue, {
    stiffness: 120,
    damping: 12,
  });

  const rotateY = useSpring(rotateYValue, {
    stiffness: 120,
    damping: 12,
  });

  const handleMouseMove = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const offsetX =
      e.clientX - rect.left - width / 2;

    const offsetY =
      e.clientY - rect.top - height / 2;

    x.set(offsetX * 0.25);
    y.set(offsetY * 0.25);

    rotateXValue.set(-(offsetY / height) * 6);
    rotateYValue.set((offsetX / width) * 6);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);

    rotateXValue.set(0);
    rotateYValue.set(0);
  };

  return (
    <motion.button
      ref={ref}
      style={{
        x: springX,
        y: springY,
        rotateX,
        rotateY,
        transformPerspective: 1200,
      }}
      whileTap={{
        scale: 0.96,
      }}
      transition={{
        type: "spring",
        stiffness: 220,
        damping: 18,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`group relative overflow-hidden will-change-transform ${className}`}
    >

      {/* Atmospheric Glow */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 blur-2xl transition duration-700 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(circle at center, rgba(184,155,114,0.25), transparent 70%)",
        }}
      />

      {/* Cinematic Reflection Sweep */}
      <motion.div
        initial={{
          x: "-120%",
        }}
        whileHover={{
          x: "140%",
        }}
        transition={{
          duration: 1.4,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="pointer-events-none absolute inset-y-0 w-[30%] rotate-12 bg-gradient-to-r from-transparent via-white/20 to-transparent blur-xl"
      />

      {/* Premium Inner Border */}
      <div className="pointer-events-none absolute inset-[1px] rounded-full border border-white/[0.06]" />

      {/* Content */}
      <span className="relative z-10 flex items-center justify-center">
        {children}
      </span>

    </motion.button>
  );
}