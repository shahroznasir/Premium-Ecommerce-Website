"use client";

import { motion } from "framer-motion";

export default function RevealMask({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden">

      <motion.div
        initial={{
          y: 140,
          opacity: 0,
        }}
        whileInView={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          duration: 1.2,
          ease: [0.22, 1, 0.36, 1],
        }}
        viewport={{ once: true }}
      >
        {children}
      </motion.div>

    </div>
  );
}