"use client";

import { motion } from "framer-motion";

import HoverReveal from "@/components/common/hover-reveal";

export default function Showcase() {
  return (
    <section className="relative overflow-hidden bg-[#F5F1EB] py-56 text-black">

      {/* Ambient Glow */}
      <div className="absolute left-[-10%] top-[10%] h-[700px] w-[700px] rounded-full bg-[#B89B72]/10 blur-3xl" />

      {/* Secondary Glow */}
      <div className="absolute bottom-[-20%] right-[-10%] h-[800px] w-[800px] rounded-full bg-[#B89B72]/10 blur-3xl" />

      {/* Background Typography */}
      <motion.div
        animate={{
          y: [0, -20, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute right-[-5%] top-24 text-[16vw] font-light leading-none tracking-[-0.08em] text-black/[0.03]"
      >
        TDAS
      </motion.div>

      <div className="container-luxury relative z-10">

        {/* Top Area */}
        <div className="mb-32 flex flex-col justify-between gap-16 lg:flex-row lg:items-end">

          {/* Left */}
          <motion.div
            initial={{
              opacity: 0,
              y: 80,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 1.2,
              ease: [0.22, 1, 0.36, 1],
            }}
            viewport={{ once: true }}
          >

            {/* Label */}
            <p className="mb-8 text-[11px] uppercase tracking-[0.5em] text-[#B89B72]">
              Curated Collections
            </p>

            {/* Heading */}
            <h2 className="max-w-5xl text-6xl font-light leading-[0.82] tracking-[-0.08em] text-[#111111] md:text-[7rem]">

              Designed
              <br />
              To Transform
              <br />
              Space

            </h2>

          </motion.div>

          {/* Right Text */}
          <motion.div
            initial={{
              opacity: 0,
              y: 60,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.2,
              duration: 1.2,
              ease: [0.22, 1, 0.36, 1],
            }}
            viewport={{ once: true }}
            className="max-w-md"
          >

            <p className="text-[17px] leading-[2] text-black/55">

              Explore sculptural collections curated to
              elevate atmosphere, emotion, and modern
              architectural living through timeless luxury design.

            </p>

          </motion.div>

        </div>

        {/* Editorial Showcase */}
        <div className="space-y-24">

          {/* Item 1 */}
          <motion.div
            initial={{
              opacity: 0,
              y: 100,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 1.2,
              ease: [0.22, 1, 0.36, 1],
            }}
            viewport={{ once: true }}
            className="relative"
          >

            <div className="absolute left-[-5%] top-1/2 hidden h-px w-32 bg-[#B89B72]/40 lg:block" />

            <HoverReveal
              text="Luxury Lighting"
              image="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=2070&auto=format&fit=crop"
            />

          </motion.div>

          {/* Item 2 */}
          <motion.div
            initial={{
              opacity: 0,
              y: 100,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.1,
              duration: 1.2,
              ease: [0.22, 1, 0.36, 1],
            }}
            viewport={{ once: true }}
            className="relative ml-auto max-w-[92%]"
          >

            <div className="absolute right-[-5%] top-1/2 hidden h-px w-32 bg-[#B89B72]/40 lg:block" />

            <HoverReveal
              text="Sculptural Decor"
              image="https://images.unsplash.com/photo-1517705008128-361805f42e86?q=80&w=1974&auto=format&fit=crop"
            />

          </motion.div>

          {/* Item 3 */}
          <motion.div
            initial={{
              opacity: 0,
              y: 100,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.2,
              duration: 1.2,
              ease: [0.22, 1, 0.36, 1],
            }}
            viewport={{ once: true }}
            className="relative"
          >

            <div className="absolute left-[-5%] top-1/2 hidden h-px w-32 bg-[#B89B72]/40 lg:block" />

            <HoverReveal
              text="Architectural Furniture"
              image="https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=2070&auto=format&fit=crop"
            />

          </motion.div>

        </div>

      </div>

      {/* Film Grain */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03] mix-blend-soft-light"
        style={{
          backgroundImage:
            "url('https://grainy-gradients.vercel.app/noise.svg')",
        }}
      />

    </section>
  );
}