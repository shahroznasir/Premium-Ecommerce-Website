"use client";

import Link from "next/link";

import { motion } from "framer-motion";

const footerLinks = [
  "Collections",
  "Projects",
  "About",
  "Journal",
  "Contact",
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#050505] pt-52">

      {/* Cinematic Atmosphere */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        {/* Massive Central Glow */}
        <motion.div
          animate={{
            opacity: [0.05, 0.1, 0.05],
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute left-1/2 top-1/2 h-[1200px] w-[1200px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#B89B72]/10 blur-[180px]"
        />

        {/* Floating Right Glow */}
        <motion.div
          animate={{
            y: [0, -40, 0],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute right-[-10%] top-[10%] h-[700px] w-[700px] rounded-full bg-[#B89B72]/[0.05] blur-[140px]"
        />

      </div>

      {/* Top Border */}
      <div className="absolute top-0 h-px w-full bg-white/[0.06]" />

      {/* Massive Background Typography */}
      <motion.div
        animate={{
          y: [0, -20, 0],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute bottom-[-10%] left-1/2 -translate-x-1/2 text-[22vw] font-extralight leading-none tracking-[-0.1em] text-white/[0.03]"
      >
        TDAS
      </motion.div>

      <div className="container-luxury relative z-10">

        {/* Hero Footer Statement */}
        <motion.div
          initial={{
            opacity: 0,
            y: 120,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1.6,
            ease: [0.22, 1, 0.36, 1],
          }}
          viewport={{ once: true }}
          className="max-w-7xl"
        >

          {/* Label */}
          <p className="mb-10 text-[11px] uppercase tracking-[0.6em] text-[#B89B72]/80">

            The Decor Art Studio

          </p>

          {/* Massive Heading */}
          <h2 className="text-6xl font-light leading-[0.78] tracking-[-0.1em] text-white md:text-[10rem]">

            Crafted
            <br />
            Through
            <br />
            Atmosphere

          </h2>

          {/* Divider */}
          <div className="mt-14 h-px w-40 bg-[#B89B72]" />

          {/* Editorial Copy */}
          <p className="mt-14 max-w-2xl text-[1.1rem] leading-[2.1] text-white/55">

            Sculptural interiors, cinematic materiality,
            architectural calm, and timeless emotional
            experiences curated for elevated modern living.

          </p>

        </motion.div>

        {/* Middle Layout */}
        <div className="mt-44 grid gap-24 border-t border-white/[0.06] py-24 lg:grid-cols-[1.1fr_0.7fr_0.7fr]">

          {/* Brand Story */}
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
              duration: 1.1,
            }}
            viewport={{ once: true }}
          >

            <p className="mb-8 text-[10px] uppercase tracking-[0.45em] text-white/35">

              Luxury Design House

            </p>

            <p className="max-w-lg text-[1.02rem] leading-[2] text-white/55">

              Designed through restraint, atmosphere,
              sculptural composition, and timeless editorial
              minimalism inspired by cinematic luxury living.

            </p>

          </motion.div>

          {/* Navigation */}
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
              delay: 0.1,
              duration: 1.1,
            }}
            viewport={{ once: true }}
          >

            <p className="mb-10 text-[10px] uppercase tracking-[0.45em] text-white/35">

              Navigation

            </p>

            <div className="space-y-7">

              {footerLinks.map((link, index) => (
                <Link
                  key={link}
                  href="/"
                  className="group flex items-center gap-5 overflow-hidden"
                >

                  {/* Number */}
                  <span className="text-[10px] uppercase tracking-[0.35em] text-white/25 transition duration-500 group-hover:text-[#B89B72]">

                    0{index + 1}

                  </span>

                  {/* Link */}
                  <span className="relative text-[1.15rem] text-white/70 transition duration-700 group-hover:translate-x-4 group-hover:text-[#B89B72]">

                    {link}

                  </span>

                </Link>
              ))}

            </div>

          </motion.div>

          {/* Contact */}
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
              duration: 1.1,
            }}
            viewport={{ once: true }}
          >

            <p className="mb-10 text-[10px] uppercase tracking-[0.45em] text-white/35">

              Contact

            </p>

            <div className="space-y-8">

              <div>

                <p className="mb-3 text-[10px] uppercase tracking-[0.35em] text-white/25">

                  Email

                </p>

                <p className="text-white/70">
                  studio@thedas.com
                </p>

              </div>

              <div>

                <p className="mb-3 text-[10px] uppercase tracking-[0.35em] text-white/25">

                  Telephone

                </p>

                <p className="text-white/70">
                  +91 98765 43210
                </p>

              </div>

              <div>

                <p className="mb-3 text-[10px] uppercase tracking-[0.35em] text-white/25">

                  Studio

                </p>

                <p className="leading-[1.9] text-white/70">

                  New Delhi
                  <br />
                  India

                </p>

              </div>

            </div>

          </motion.div>

        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{
            opacity: 0,
          }}
          whileInView={{
            opacity: 1,
          }}
          transition={{
            delay: 0.2,
            duration: 1.2,
          }}
          viewport={{ once: true }}
          className="flex flex-col gap-6 border-t border-white/[0.06] py-10 text-[10px] uppercase tracking-[0.4em] text-white/30 md:flex-row md:items-center md:justify-between"
        >

          <p>
            © 2026 The Decor Art Studio
          </p>

          <p>
            Luxury • Editorial • Cinematic
          </p>

        </motion.div>

      </div>

      {/* Grain */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02] mix-blend-soft-light"
        style={{
          backgroundImage:
            "url('https://grainy-gradients.vercel.app/noise.svg')",
        }}
      />

    </footer>
  );
}