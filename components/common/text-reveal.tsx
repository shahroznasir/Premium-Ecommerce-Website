"use client";

import { motion } from "framer-motion";

export default function TextReveal({
  children,
}: {
  children: string;
}) {
  const words = children.split(" ");

  return (
    <div className="flex flex-wrap overflow-hidden">

      {words.map((word, index) => (
        <div
          key={index}
          className="overflow-hidden"
        >

          <motion.span
            initial={{
              y: "100%",
              opacity: 0,
            }}
            whileInView={{
              y: 0,
              opacity: 1,
            }}
            transition={{
              duration: 1,
              delay: index * 0.04,
              ease: [0.22, 1, 0.36, 1],
            }}
            viewport={{ once: true }}
            className="mr-4 inline-block"
          >
            {word}
          </motion.span>

        </div>
      ))}

    </div>
  );
}