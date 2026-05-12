"use client";

import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";

import {
  ReactNode,
  useRef,
} from "react";

interface CinematicHeadingProps {
  children: ReactNode;

  className?: string;
}

export default function CinematicHeading({
  children,
  className,
}: CinematicHeadingProps) {

  const ref =
    useRef<HTMLHeadingElement>(null);

  const { scrollYProgress } =
    useScroll({
      target: ref,
      offset: [
        "start end",
        "end start",
      ],
    });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [40, -40]
  );

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0.4, 1, 1, 0.5]
  );

  const scale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.96, 1, 1.02]
  );

  return (
    <motion.h2
      ref={ref}
      style={{
        y,
        opacity,
        scale,
      }}
      className={className}
    >
      {children}
    </motion.h2>
  );
}