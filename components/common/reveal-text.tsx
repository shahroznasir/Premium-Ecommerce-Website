"use client";

import { motion } from "framer-motion";

interface RevealTextProps {
  text: string;
  className?: string;
}

export default function RevealText({
  text,
  className = "",
}: RevealTextProps) {
  const words = text.split(" ");

  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{
          staggerChildren: 0.08,
        }}
        className="flex flex-wrap"
      >
        {words.map((word, index) => (
          <motion.span
            key={index}
            variants={{
              hidden: {
                y: 120,
                opacity: 0,
              },
              visible: {
                y: 0,
                opacity: 1,
              },
            }}
            transition={{
              duration: 1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mr-4 inline-block"
          >
            {word}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
}