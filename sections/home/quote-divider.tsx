"use client";

import { motion } from "framer-motion";

export default function QuoteDivider() {
  return (
    <section className="relative overflow-hidden bg-[#050505] py-56">

      {/* Ambient Glow */}
      <div className="absolute left-1/2 top-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#B89B72]/10 blur-3xl" />

      {/* Grain Texture */}
      <div
        className="absolute inset-0 opacity-[0.03] mix-blend-soft-light"
        style={{
          backgroundImage:
            "url('https://grainy-gradients.vercel.app/noise.svg')",
        }}
      />

      <div className="container-luxury relative z-10">

        {/* Small Label */}
        <motion.p
          initial={{
            opacity: 0,
            y: 40,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1,
            ease: [0.22, 1, 0.36, 1],
          }}
          viewport={{ once: true }}
          className="mb-10 text-center text-sm uppercase tracking-[0.55em] text-[#B89B72]/80"
        >
          Editorial Philosophy
        </motion.p>

        {/* Massive Quote */}
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
            duration: 1.4,
            ease: [0.22, 1, 0.36, 1],
          }}
          viewport={{ once: true }}
          className="mx-auto max-w-7xl"
        >

          <h2 className="text-center text-6xl font-light leading-[0.85] tracking-[-0.08em] text-white md:text-[8rem]">
            Crafted For
            <br />
            Interiors That
            <br />
            Transcend Trends
          </h2>

        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{
            width: 0,
            opacity: 0,
          }}
          whileInView={{
            width: 160,
            opacity: 1,
          }}
          transition={{
            duration: 1,
            delay: 0.4,
          }}
          viewport={{ once: true }}
          className="mx-auto mt-16 h-px bg-[#B89B72]"
        />

        {/* Bottom Description */}
        <motion.p
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1,
            delay: 0.6,
          }}
          viewport={{ once: true }}
          className="mx-auto mt-14 max-w-3xl text-center text-xl leading-relaxed text-white/55"
        >
          Sculptural forms, cinematic atmosphere, and timeless design
          language curated for elevated contemporary living.
        </motion.p>

      </div>

      {/* Massive Background Typography */}
      <div className="pointer-events-none absolute bottom-[-12%] left-1/2 -translate-x-1/2 text-[20vw] font-extralight leading-none tracking-[-0.08em] text-white/[0.03]">
        TDAS
      </div>

    </section>
  );
}