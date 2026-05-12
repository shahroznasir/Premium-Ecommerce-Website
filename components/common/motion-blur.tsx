"use client";

import {
  motion,
  useMotionTemplate,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";

export default function MotionBlur() {
  const { scrollY } = useScroll();

  const velocity = useVelocity(scrollY);

  const smoothVelocity = useSpring(velocity, {
    damping: 40,
    stiffness: 120,
  });

  const blur = useTransform(
    smoothVelocity,
    [-2000, 0, 2000],
    [10, 0, 10]
  );

  const filter = useMotionTemplate`
    blur(${blur}px)
  `;

  return (
    <motion.div
      style={{
        backdropFilter: filter,
      }}
      className="pointer-events-none fixed inset-0 z-[4]"
    />
  );
}