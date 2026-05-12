"use client";

import { motion } from "framer-motion";

export default function EditorialTransition() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-[#050505]">

      {/* Cinematic Atmosphere */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        {/* Massive Gold Glow */}
        <motion.div
          animate={{
            opacity: [0.05, 0.09, 0.05],
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute left-1/2 top-1/2 h-[1200px] w-[1200px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#B89B72]/10 blur-[180px]"
        />

        {/* Floating Ambient */}
        <motion.div
          animate={{
            y: [0, -40, 0],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute right-[-10%] top-[10%] h-[600px] w-[600px] rounded-full bg-[#B89B72]/[0.04] blur-[140px]"
        />

      </div>

      {/* Massive Background Typography */}
      <motion.div
        animate={{
          y: [0, -30, 0],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[18vw] font-extralight leading-none tracking-[-0.1em] text-white/[0.03]"
      >
        TDAS
      </motion.div>

      {/* Content */}
      <div className="container-luxury relative z-10">

        <div className="max-w-6xl">

          {/* Label */}
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
            }}
            viewport={{ once: true }}
            className="mb-10 text-[11px] uppercase tracking-[0.6em] text-[#B89B72]/85"
          >

            Sculpted Atmosphere

          </motion.p>

          {/* Massive Heading */}
          <div className="overflow-hidden">

            <motion.h2
              initial={{
                y: 220,
              }}
              whileInView={{
                y: 0,
              }}
              transition={{
                duration: 1.8,
                ease: [0.22, 1, 0.36, 1],
              }}
              viewport={{ once: true }}
              className="text-6xl font-light leading-[0.78] tracking-[-0.1em] text-white md:text-[10rem]"
            >

              Spaces
              <br />
              Designed
              <br />
              To Be Felt

            </motion.h2>

          </div>

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
              delay: 0.4,
              duration: 1,
            }}
            viewport={{ once: true }}
            className="mt-14 h-px bg-[#B89B72]"
          />

          {/* Editorial Copy */}
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
              delay: 0.3,
              duration: 1.2,
            }}
            viewport={{ once: true }}
            className="mt-14 max-w-2xl text-[1.15rem] leading-[2.1] text-white/55"
          >

            Curated through architectural restraint,
            cinematic materiality, sculptural composition,
            and timeless emotional atmosphere crafted for
            refined contemporary living.

          </motion.p>

        </div>

      </div>

      {/* Cinematic Grain */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02] mix-blend-soft-light"
        style={{
          backgroundImage:
            "url('https://grainy-gradients.vercel.app/noise.svg')",
        }}
      />

    </section>
  );
}