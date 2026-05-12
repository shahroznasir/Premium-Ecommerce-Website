"use client";

import { motion } from "framer-motion";

import MagneticButton from "@/components/common/magnetic-button";

export default function Hero() {
  return (
    <section className="relative h-screen overflow-hidden bg-black">

      {/* Video Background */}
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 2,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="absolute inset-0"
      >

        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="h-full w-full object-cover"
          style={{
            willChange: "transform",
            transform: "translateZ(0)",
            backfaceVisibility: "hidden",
          }}
        >
          <source
            src="/videos/luxury-interior.mp4"
            type="video/mp4"
          />
        </video>

      </motion.div>

      {/* Cinematic Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Warm Luxury Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-black/20" />

      {/* Ambient Glow */}
      <motion.div
        animate={{
          opacity: [0.22, 0.32, 0.22],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute left-[10%] top-[20%] h-[520px] w-[520px] rounded-full bg-[#B89B72]/10 blur-[120px]"
      />

      {/* Gold Cinematic Sweep */}
      <motion.div
        animate={{
          x: ["-20%", "120%"],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute top-0 h-full w-[24%] rotate-12 bg-gradient-to-r from-transparent via-[#B89B72]/[0.05] to-transparent blur-2xl"
      />

      {/* Main Content */}
      <div className="relative z-10 flex h-full items-center pt-24">

        <div className="container-luxury w-full">

          <motion.div
            initial={{
              opacity: 0,
              y: 60,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 1.4,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="max-w-[720px] pl-12 md:pl-20"
          >

            {/* Label */}
            <motion.p
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.2,
                duration: 1,
              }}
              className="mb-10 pl-1 text-[11px] uppercase tracking-[0.55em] text-[#B89B72]/85"
            >
              Curated Luxury Living
            </motion.p>

            {/* Main Heading */}
            <div className="overflow-hidden">

              <motion.h1
                initial={{
                  y: 180,
                }}
                animate={{
                  y: 0,
                }}
                transition={{
                  duration: 1.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="text-[4.5rem] font-light leading-[0.9] tracking-[-0.05em] text-white drop-shadow-[0_10px_40px_rgba(0,0,0,0.45)] md:text-[6.2rem]"
              >
                Timeless Luxury
                <br />
                Defined
              </motion.h1>

            </div>

            {/* Divider */}
            <motion.div
              initial={{
                width: 0,
                opacity: 0,
              }}
              animate={{
                width: 112,
                opacity: 1,
              }}
              transition={{
                delay: 0.8,
                duration: 1,
              }}
              className="mt-10 h-px w-28 bg-[#B89B72]"
            />

            {/* Description */}
            <motion.div
              initial={{
                opacity: 0,
                y: 40,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.5,
                duration: 1.2,
              }}
              className="mt-8 max-w-[540px]"
            >

              <p className="text-[17px] leading-[2] text-white/60">

                Discover sculptural décor, cinematic interiors,
                and elevated design objects curated for refined
                contemporary living and timeless architectural spaces.

              </p>

              {/* Buttons */}
              <div className="mt-10 flex flex-wrap gap-4">

                {/* Primary */}
                <MagneticButton className="rounded-full bg-gradient-to-b from-white to-[#E7E2DA] px-8 py-4 text-[11px] uppercase tracking-[0.35em] text-black transition duration-700 hover:bg-[#B89B72] hover:text-black">

                  Explore Collection

                </MagneticButton>

                {/* Secondary */}
                <MagneticButton className="rounded-full border border-white/10 bg-black/30 px-8 py-4 text-[11px] uppercase tracking-[0.35em] text-white backdrop-blur-xl transition duration-700 hover:border-white hover:bg-white hover:text-black">

                  View Projects

                </MagneticButton>

              </div>

            </motion.div>

          </motion.div>

        </div>

      </div>

      {/* Floating Brand Typography */}
      <motion.div
        animate={{
          y: [0, -8, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute bottom-[-8%] right-[-2%] text-[16vw] font-light leading-none tracking-[-0.08em] text-white/[0.02]"
      >
        TDAS
      </motion.div>

      {/* Film Grain */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025] mix-blend-soft-light"
        style={{
          backgroundImage:
            "url('https://grainy-gradients.vercel.app/noise.svg')",
        }}
      />

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 h-48 w-full bg-gradient-to-t from-[#050505] to-transparent" />

    </section>
  );
}