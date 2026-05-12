"use client";

import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";

import { useRef } from "react";

import LuxuryImage from "@/components/common/luxury-image";

const slides = [
  {
    title: "Architectural Lighting",
    subtitle: "Curated Luxury",
    description:
      "Refined lighting compositions crafted to transform atmosphere through sculptural form and cinematic warmth.",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=2070&auto=format&fit=crop",
  },
  {
    title: "Sculptural Decor",
    subtitle: "Timeless Objects",
    description:
      "Minimal silhouettes and artistic materials curated for sophisticated interiors and elevated modern living.",
    image:
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2070&auto=format&fit=crop",
  },
  {
    title: "Elevated Interiors",
    subtitle: "Modern Elegance",
    description:
      "Immersive luxury spaces designed with architectural balance, emotional depth, and timeless visual restraint.",
    image:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=2070&auto=format&fit=crop",
  },
];

function CinematicSlide({
  slide,
  index,
}: {
  slide: (typeof slides)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  /* Cinematic Depth */
  const imageScale = useTransform(
    scrollYProgress,
    [0, 1],
    [1.18, 1]
  );

  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    [120, -120]
  );

  const contentY = useTransform(
    scrollYProgress,
    [0, 1],
    [80, -80]
  );

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.4, 1, 1, 0.4]
  );

  const numberY = useTransform(
    scrollYProgress,
    [0, 1],
    [100, -100]
  );

  return (
    <section
      ref={ref}
      className="relative flex min-h-screen items-center overflow-hidden border-b border-white/[0.05]"
    >

      {/* Background Image */}
      <motion.div
        style={{
          scale: imageScale,
          y: imageY,
        }}
        className="absolute inset-0"
      >

        <LuxuryImage
          src={slide.image}
          alt={slide.title}
          className="h-full w-full"
        />

      </motion.div>

      {/* Cinematic Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Editorial Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/45 to-black/10" />

      {/* Atmospheric Glow */}
      <motion.div
        animate={{
          opacity: [0.08, 0.16, 0.08],
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-[-15%] right-[-5%] h-[900px] w-[900px] rounded-full bg-[#B89B72]/10 blur-[160px]"
      />

      {/* Floating Typography */}
      <motion.div
        style={{
          y: numberY,
        }}
        className="pointer-events-none absolute bottom-[-8%] right-[-1%] text-[22vw] font-extralight leading-none tracking-[-0.08em] text-white/[0.03]"
      >
        0{index + 1}
      </motion.div>

      {/* Cinematic Light Sweep */}
      <motion.div
        animate={{
          x: ["-20%", "140%"],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute top-0 h-full w-[25%] rotate-12 bg-gradient-to-r from-transparent via-white/[0.04] to-transparent blur-3xl"
      />

      {/* Content */}
      <motion.div
        style={{
          y: contentY,
          opacity,
        }}
        className="container-luxury relative z-10"
      >

        <div className="max-w-[900px]">

          {/* Label */}
          <motion.p
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 1,
            }}
            viewport={{ once: true }}
            className="mb-8 text-[11px] uppercase tracking-[0.55em] text-[#B89B72]/85"
          >

            {slide.subtitle}

          </motion.p>

          {/* Heading */}
          <div className="overflow-hidden">

            <motion.h2
              initial={{
                y: 180,
              }}
              whileInView={{
                y: 0,
              }}
              transition={{
                duration: 1.6,
                ease: [0.22, 1, 0.36, 1],
              }}
              viewport={{ once: true }}
              className="text-6xl font-light leading-[0.8] tracking-[-0.1em] text-white md:text-[9rem]"
            >

              {slide.title}

            </motion.h2>

          </div>

          {/* Divider */}
          <motion.div
            initial={{
              width: 0,
              opacity: 0,
            }}
            whileInView={{
              width: 140,
              opacity: 1,
            }}
            transition={{
              duration: 1,
              delay: 0.3,
            }}
            viewport={{ once: true }}
            className="mt-12 h-px bg-[#B89B72]"
          />

          {/* Description */}
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
              duration: 1.2,
              delay: 0.2,
            }}
            viewport={{ once: true }}
            className="mt-12 max-w-2xl text-[19px] leading-[2] text-white/60"
          >

            {slide.description}

          </motion.p>

          {/* CTA */}
          <motion.button
            whileHover={{
              x: 12,
            }}
            transition={{
              duration: 0.4,
            }}
            className="group mt-16 flex items-center gap-5 text-[11px] uppercase tracking-[0.45em] text-white/80 transition duration-700 hover:text-[#B89B72]"
          >

            Explore Collection

            <span className="h-px w-16 bg-white/30 transition-all duration-700 group-hover:w-28 group-hover:bg-[#B89B72]" />

          </motion.button>

        </div>

      </motion.div>

      {/* Film Grain */}
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

export default function HorizontalScroll() {
  return (
    <section className="relative overflow-hidden bg-[#050505]">

      {/* Global Atmosphere */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        <div className="absolute left-1/2 top-1/2 h-[1600px] w-[1600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#B89B72]/[0.06] blur-[180px]" />

      </div>

      {/* Slides */}
      <div className="relative z-10">

        {slides.map((slide, index) => (
          <CinematicSlide
            key={slide.title}
            slide={slide}
            index={index}
          />
        ))}

      </div>

    </section>
  );
}