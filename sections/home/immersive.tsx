"use client";

import { motion } from "framer-motion";

import LuxuryImage from "@/components/common/luxury-image";

export default function Immersive() {
  return (
    <section className="relative overflow-hidden bg-[#F5F1EB] py-[180px] text-black">

      {/* Ambient Atmosphere */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        {/* Top Glow */}
        <div className="absolute left-[-10%] top-[10%] h-[500px] w-[500px] rounded-full bg-[#B89B72]/10 blur-[120px]" />

        {/* Bottom Glow */}
        <div className="absolute bottom-[-20%] right-[-10%] h-[600px] w-[600px] rounded-full bg-[#B89B72]/10 blur-[140px]" />

      </div>

      <div className="container-luxury relative z-10">

        {/* Editorial Header */}
        <motion.div
          initial={{
            opacity: 0,
            y: 50,
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
          className="mb-28 max-w-4xl"
        >

          {/* Label */}
          <p className="mb-8 text-[11px] uppercase tracking-[0.5em] text-[#B89B72]">

            Cinematic Living

          </p>

          {/* Heading */}
          <h2 className="text-5xl font-light leading-[0.88] tracking-[-0.07em] text-[#111111] md:text-[7rem]">

            Designed
            <br />
            Through
            <br />
            Atmosphere

          </h2>

        </motion.div>

        {/* Main Editorial Layout */}
        <div className="grid items-start gap-12 lg:grid-cols-[1.1fr_0.9fr]">

          {/* Left Visual */}
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
            className="relative"
          >

            {/* Floating Number */}
            <div className="pointer-events-none absolute -left-10 -top-10 z-20 text-[10rem] font-light leading-none tracking-[-0.08em] text-[#111111]/[0.05]">

              01

            </div>

            {/* Main Image */}
            <div className="relative overflow-hidden rounded-[3rem]">

              <LuxuryImage
                src="https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=2070&auto=format&fit=crop"
                alt="Luxury Interior"
                className="h-[820px] w-full"
              />

              {/* Editorial Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

              {/* Bottom Content */}
              <div className="absolute bottom-0 left-0 right-0 p-10">

                <motion.div
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
                    duration: 1,
                  }}
                  viewport={{ once: true }}
                  className="max-w-lg rounded-[2rem] border border-white/10 bg-black/25 p-8 backdrop-blur-2xl"
                >

                  <p className="mb-4 text-[10px] uppercase tracking-[0.45em] text-[#B89B72]/80">

                    Architectural Living

                  </p>

                  <p className="text-lg leading-[1.9] text-white/75">

                    Spaces sculpted through light, proportion,
                    silence, and refined emotional atmosphere.

                  </p>

                </motion.div>

              </div>

            </div>

          </motion.div>

          {/* Right Editorial Story */}
          <div className="flex flex-col gap-12">

            {/* Top Text Block */}
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
              className="relative overflow-hidden rounded-[3rem] border border-black/5 bg-[#E9DFD2] p-14 shadow-[0_30px_80px_rgba(0,0,0,0.06)]"
            >

              {/* Ambient Tone */}
              <div className="absolute right-[-10%] top-[-20%] h-[300px] w-[300px] rounded-full bg-[#B89B72]/10 blur-[100px]" />

              <div className="relative z-10">

                {/* Label */}
                <p className="mb-6 text-[10px] uppercase tracking-[0.45em] text-black/45">

                  Curated Interiors

                </p>

                {/* Heading */}
                <h3 className="text-4xl font-light leading-[0.92] tracking-[-0.06em] text-[#111111] md:text-[5rem]">

                  Luxury
                  <br />
                  Crafted
                  <br />
                  Quietly

                </h3>

                {/* Divider */}
                <div className="mt-10 h-px w-20 bg-[#B89B72]/70" />

                {/* Copy */}
                <p className="mt-10 max-w-md text-[1.02rem] leading-[2] text-black/65">

                  Sculptural objects, refined textures,
                  architectural calm, and timeless materiality
                  curated for elevated contemporary living.

                </p>

              </div>

            </motion.div>

            {/* Small Editorial Image */}
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
                delay: 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-[3rem]"
            >

              {/* Floating Number */}
              <div className="pointer-events-none absolute right-8 top-6 z-20 text-[6rem] font-light leading-none tracking-[-0.08em] text-white/[0.08]">

                02

              </div>

              <LuxuryImage
                src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=2070&auto=format&fit=crop"
                alt="Luxury Decor"
                className="h-[360px] w-full"
              />

              {/* Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              {/* Bottom Text */}
              <div className="absolute bottom-8 left-8">

                <p className="mb-3 text-[10px] uppercase tracking-[0.45em] text-[#B89B72]/80">

                  Timeless Atmosphere

                </p>

                <h4 className="max-w-sm text-3xl font-light leading-[1] tracking-[-0.05em] text-white">

                  Sculptural Objects
                  <br />
                  Of Presence

                </h4>

              </div>

            </motion.div>

          </div>

        </div>

      </div>

    </section>
  );
}