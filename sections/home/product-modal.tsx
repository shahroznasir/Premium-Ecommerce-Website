"use client";

import { AnimatePresence, motion } from "framer-motion";

import LuxuryImage from "@/components/common/luxury-image";
import MagneticButton from "@/components/common/magnetic-button";

interface ProductModalProps {
  product: {
    title: string;
    category: string;
    price: string;
    image: string;
  } | null;

  onClose: () => void;
}

export default function ProductModal({
  product,
  onClose,
}: ProductModalProps) {
  return (
    <AnimatePresence>

      {product && (
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="fixed inset-0 z-[99999] overflow-y-auto bg-black/85 backdrop-blur-2xl"
        >

          {/* Ambient Atmosphere */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">

            {/* Massive Gold Glow */}
            <div className="absolute left-1/2 top-1/2 h-[1200px] w-[1200px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#B89B72]/[0.08] blur-[180px]" />

            {/* Secondary Glow */}
            <div className="absolute right-[-10%] top-[5%] h-[700px] w-[700px] rounded-full bg-[#B89B72]/[0.05] blur-[140px]" />

          </div>

          {/* Close Button */}
          <motion.button
            initial={{
              opacity: 0,
              scale: 0.8,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              delay: 0.2,
              duration: 0.6,
            }}
            onClick={onClose}
            className="group fixed right-8 top-8 z-50 flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border border-white/[0.08] bg-white/[0.03] text-white backdrop-blur-2xl transition duration-700 hover:border-[#B89B72] hover:bg-[#B89B72] hover:text-black"
          >

            {/* Reflection */}
            <div className="absolute inset-0 overflow-hidden opacity-0 transition duration-700 group-hover:opacity-100">

              <div className="absolute -left-1/2 top-0 h-full w-1/3 rotate-12 bg-white/30 blur-2xl transition-all duration-[1400ms] group-hover:left-[150%]" />

            </div>

            <span className="relative z-10 text-sm uppercase tracking-[0.35em]">
              ✕
            </span>

          </motion.button>

          {/* Main Layout */}
          <div className="grid min-h-screen lg:grid-cols-[1.1fr_0.9fr]">

            {/* LEFT VISUAL */}
            <motion.div
              initial={{
                opacity: 0,
                scale: 1.05,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                duration: 1.6,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative h-screen overflow-hidden"
            >

              {/* Image */}
              <LuxuryImage
                src={product.image}
                alt={product.title}
                className="h-full w-full"
              />

              {/* Cinematic Gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/30" />

              {/* Floating Typography */}
              <motion.div
                animate={{
                  y: [0, -8, 0],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="pointer-events-none absolute bottom-[-4%] left-10 text-[12vw] font-light leading-none tracking-[-0.08em] text-white/[0.06]"
              >
                TDAS
              </motion.div>

            </motion.div>

            {/* RIGHT CONTENT */}
            <div className="relative flex items-center px-10 py-28 lg:px-24">

              {/* Divider Glow */}
              <div className="absolute left-0 top-1/2 hidden h-[60%] w-px -translate-y-1/2 bg-gradient-to-b from-transparent via-[#B89B72]/30 to-transparent lg:block" />

              <motion.div
                initial={{
                  opacity: 0,
                  y: 80,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 1.2,
                  delay: 0.2,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="max-w-2xl"
              >

                {/* Category */}
                <p className="mb-8 text-[11px] uppercase tracking-[0.55em] text-[#B89B72]/80">

                  {product.category}

                </p>

                {/* Heading */}
                <h2 className="text-5xl font-light leading-[0.86] tracking-[-0.08em] text-white md:text-[6.5rem]">

                  {product.title}

                </h2>

                {/* Divider */}
                <div className="mt-12 h-px w-32 bg-[#B89B72]/80" />

                {/* Description */}
                <p className="mt-12 max-w-xl text-[1.05rem] leading-[2] text-white/60">

                  Sculptural forms curated through architectural
                  restraint, refined materiality, and cinematic
                  contemporary design language crafted for elevated
                  luxury interiors.

                </p>

                {/* Specs */}
                <div className="mt-16 grid gap-10 border-t border-white/[0.08] pt-10 md:grid-cols-2">

                  <div>

                    <p className="mb-4 text-[10px] uppercase tracking-[0.4em] text-white/35">

                      Materials

                    </p>

                    <p className="text-lg text-white/75">

                      Marble, Brass, Matte Steel

                    </p>

                  </div>

                  <div>

                    <p className="mb-4 text-[10px] uppercase tracking-[0.4em] text-white/35">

                      Craftsmanship

                    </p>

                    <p className="text-lg text-white/75">

                      Handmade Luxury Finish

                    </p>

                  </div>

                </div>

                {/* Bottom */}
                <div className="mt-20 flex flex-wrap items-center justify-between gap-8">

                  {/* Price */}
                  <div>

                    <p className="mb-3 text-[10px] uppercase tracking-[0.4em] text-white/35">

                      Investment

                    </p>

                    <p className="text-5xl font-light tracking-[-0.05em] text-white">

                      {product.price}

                    </p>

                  </div>

                  {/* CTA */}
                  <MagneticButton className="rounded-full border border-white/[0.08] bg-white px-10 py-5 text-[11px] uppercase tracking-[0.4em] text-black transition duration-700 hover:border-[#B89B72] hover:bg-[#B89B72]">

                    Add To Collection

                  </MagneticButton>

                </div>

              </motion.div>

            </div>

          </div>

        </motion.div>
      )}

    </AnimatePresence>
  );
}