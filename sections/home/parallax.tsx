"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function ParallaxSection() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section
      ref={ref}
      className="relative h-[120vh] overflow-hidden"
    >

      {/* Background Image */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 scale-110"
      >
        <img
          src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=2070&auto=format&fit=crop"
          alt="Luxury Interior"
          className="h-full w-full object-cover"
        />
      </motion.div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 flex h-full items-center justify-center">
        
        <div className="container-luxury text-center">

          <motion.p
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="mb-8 text-sm uppercase tracking-[0.4em] text-white/70"
          >
            Timeless Interior Aesthetics
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            viewport={{ once: true }}
            className="mx-auto max-w-6xl text-6xl leading-[0.9] tracking-[-0.05em] text-white md:text-9xl"
          >
            Designed To
            <br />
            Transform
            <br />
            Every Space
          </motion.h2>

        </div>

      </div>

    </section>
  );
}