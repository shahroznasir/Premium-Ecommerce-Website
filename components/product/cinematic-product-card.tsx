"use client";

import Link from "next/link";

import Image from "next/image";

import {
  motion,
} from "framer-motion";

import {
  ShoppingBag,
} from "lucide-react";

import ImageReveal from "@/components/common/image-reveal";

interface CinematicProductCardProps {
  slug: string;

  name: string;

  price: number;

  image: string;

  category?: string;
}

export default function CinematicProductCard({
  slug,
  name,
  price,
  image,
  category,
}: CinematicProductCardProps) {

  return (
    <Link
      href={`/shop/${slug}`}
      className="group block"
    >

      <motion.article
        whileHover={{
          y: -6,
        }}
        transition={{
          duration: 0.5,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative"
      >

        {/* =========================================================
            IMAGE EXPERIENCE
        ========================================================== */}
        <div className="relative overflow-hidden rounded-[2rem] bg-[#0A0A0A]">

          {/* Cinematic Reveal */}
          <ImageReveal>

            <div className="relative aspect-[4/5] overflow-hidden">

              <motion.div
                whileHover={{
                  scale: 1.04,
                }}
                transition={{
                  duration: 1.2,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="h-full w-full"
              >

                <Image
                  src={image}
                  alt={name}
                  fill
                  className="object-cover"
                />

              </motion.div>

            </div>

          </ImageReveal>

          {/* Luxury Overlay */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

          {/* Cinematic Vignette */}
          <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.28)]" />

          {/* Floating Glow */}
          <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-1000 group-hover:opacity-100">

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(184,155,114,0.14),transparent_55%)]" />

          </div>

          {/* Category */}
          {category && (
            <div className="absolute left-5 top-5 rounded-full border border-white/10 bg-black/30 px-4 py-2 backdrop-blur-xl">

              <span className="text-[10px] uppercase tracking-[0.24em] text-white/70">

                {category}

              </span>

            </div>
          )}

          {/* Floating Cart */}
          <motion.button
            whileHover={{
              scale: 1.04,
            }}
            whileTap={{
              scale: 0.96,
            }}
            className="absolute bottom-5 right-5 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-black/40 backdrop-blur-xl transition duration-500 hover:border-[#D6C2A3]"
          >

            <ShoppingBag className="h-[16px] w-[16px] text-white/88" />

          </motion.button>

        </div>

        {/* =========================================================
            CONTENT
        ========================================================== */}
        <div className="px-2 pt-6">

          {/* Product Name */}
          <h3 className="text-lg font-light tracking-[-0.02em] text-white transition duration-500 group-hover:text-[#D6C2A3]">

            {name}

          </h3>

          {/* Price */}
          <div className="mt-3 flex items-center justify-between">

            <p className="text-sm tracking-[0.18em] text-white/55">

              ₹{price.toLocaleString()}

            </p>

            <span className="text-[10px] uppercase tracking-[0.24em] text-white/40 transition duration-500 group-hover:text-white/70">

              View Piece

            </span>

          </div>

        </div>

      </motion.article>

    </Link>
  );
}