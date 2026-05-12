"use client";

import { motion } from "framer-motion";

export default function Marquee() {
  return (
    <section className="overflow-hidden bg-[#111111] py-10">
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          duration: 18,
          ease: "linear",
        }}
        className="flex whitespace-nowrap"
      >
        <div className="flex shrink-0 items-center gap-16 pr-16">
          
          <h2 className="text-5xl uppercase tracking-[0.15em] text-[#F5F1EB] md:text-7xl">
            Curated Luxury
          </h2>

          <h2 className="text-5xl uppercase tracking-[0.15em] text-[#B89B72] md:text-7xl">
            Timeless Interiors
          </h2>

          <h2 className="text-5xl uppercase tracking-[0.15em] text-[#F5F1EB] md:text-7xl">
            Artistic Living
          </h2>

          <h2 className="text-5xl uppercase tracking-[0.15em] text-[#B89B72] md:text-7xl">
            Modern Elegance
          </h2>

        </div>

        <div className="flex shrink-0 items-center gap-16 pr-16">
          
          <h2 className="text-5xl uppercase tracking-[0.15em] text-[#F5F1EB] md:text-7xl">
            Curated Luxury
          </h2>

          <h2 className="text-5xl uppercase tracking-[0.15em] text-[#B89B72] md:text-7xl">
            Timeless Interiors
          </h2>

          <h2 className="text-5xl uppercase tracking-[0.15em] text-[#F5F1EB] md:text-7xl">
            Artistic Living
          </h2>

          <h2 className="text-5xl uppercase tracking-[0.15em] text-[#B89B72] md:text-7xl">
            Modern Elegance
          </h2>

        </div>
      </motion.div>
    </section>
  );
}