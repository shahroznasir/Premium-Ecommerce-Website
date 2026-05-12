"use client";

import { motion } from "framer-motion";
import RevealText from "@/components/common/reveal-text";

export default function Editorial() {
  return (
    <section className="relative overflow-hidden bg-[#F5F1EB] py-48">

      {/* Ambient Glow */}
      <div className="absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-[#B89B72]/10 blur-3xl" />

      <div className="container-luxury relative z-10">

        <div className="grid gap-24 lg:grid-cols-2 lg:items-center">

          {/* Left Side */}
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1.2,
              ease: [0.22, 1, 0.36, 1],
            }}
            viewport={{ once: true }}
          >

            {/* Label */}
            <p className="mb-8 text-sm uppercase tracking-[0.35em] text-[#111111]/50">
              Our Philosophy
            </p>

            {/* Reveal Heading */}
            <RevealText
              text="Designed Beyond Trends"
              className="max-w-3xl text-5xl leading-[0.92] tracking-[-0.06em] text-[#111111] md:text-7xl"
            />

          </motion.div>

          {/* Right Side */}
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1.4,
              ease: [0.22, 1, 0.36, 1],
            }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >

            {/* Main Paragraph */}
            <p className="text-2xl leading-relaxed tracking-[-0.02em] text-[#111111]/75">
              The Decor Art Studio curates timeless interior objects,
              sculptural forms, and refined living experiences inspired by
              architectural minimalism and elevated contemporary aesthetics.
            </p>

            {/* Secondary Paragraph */}
            <p className="mt-10 text-lg leading-relaxed text-[#111111]/55">
              Every collection is thoughtfully designed to transform spaces
              into immersive environments that feel calm, intentional,
              sophisticated, and enduring.
            </p>

            {/* Signature Line */}
            <div className="mt-14 h-px w-32 bg-[#B89B72]" />

          </motion.div>

        </div>

      </div>

    </section>
  );
}