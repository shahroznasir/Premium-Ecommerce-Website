"use client";

import Link from "next/link";

import Image from "next/image";

import {
  motion,
} from "framer-motion";

import {
  Heart,
  ShoppingBag,
} from "lucide-react";

import LuxurySkeleton from "@/components/ui/luxury-skeleton";

interface CinematicProductCardProps {
  slug?: string;
  name?: string;
  price?: number;
  image?: string;
  category?: string;
  loading?: boolean;
}

export default function CinematicProductCard({
  slug,
  name,
  price,
  image,
  category,
  loading = false,
}: CinematicProductCardProps) {

  /* =========================================================
      SKELETON STATE
  ========================================================== */

  if (loading) {

    return (
      <LuxurySkeleton className="h-full min-h-[720px]" />
    );
  }

  return (
    <Link
      href={`/shop/${slug}`}
      className="group block"
    >

      <motion.article
        initial={{
          opacity: 0,
          y: 30,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        whileHover={{
          y: -10,
        }}
        transition={{
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative"
      >

        {/* =====================================================
            OUTER GLOW
        ====================================================== */}
        <div className="absolute inset-0 rounded-[2.6rem] opacity-0 blur-3xl transition duration-1000 group-hover:opacity-100">

          <div className="h-full w-full bg-[#D6C2A3]/10" />

        </div>

        {/* =====================================================
            CARD CONTAINER
        ====================================================== */}
        <div className="relative overflow-hidden rounded-[2.6rem] border border-white/[0.06] bg-[#0A0A0A]/95 shadow-[0_20px_80px_rgba(0,0,0,0.45)] backdrop-blur-3xl transition-all duration-700 group-hover:border-[#D6C2A3]/14 group-hover:shadow-[0_40px_140px_rgba(214,194,163,0.12)]">

          {/* =====================================================
              ATMOSPHERIC LIGHT
          ====================================================== */}
          <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-1000 group-hover:opacity-100">

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(214,194,163,0.12),transparent_58%)]" />

          </div>

          {/* =====================================================
              IMAGE EXPERIENCE
          ====================================================== */}
          <div className="relative aspect-[0.76] overflow-hidden">

            {/* IMAGE */}
            <motion.div
              whileHover={{
                scale: 1.045,
              }}
              transition={{
                duration: 2.2,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="h-full w-full"
            >

              <Image
                src={image || ""}
                alt={name || "Product"}
                fill
                priority={false}
                className="object-cover"
              />

            </motion.div>

            {/* =================================================
                CINEMATIC OVERLAYS
            ================================================== */}

            {/* MAIN DEPTH */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90" />

            {/* TOP VIGNETTE */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent" />

            {/* CINEMATIC SHADOW */}
            <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_160px_rgba(0,0,0,0.45)]" />

            {/* SOFT GOLD LIGHT */}
            <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-1000 group-hover:opacity-100">

              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(214,194,163,0.15),transparent_60%)]" />

            </div>

            {/* SHIMMER */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-0 transition duration-1000 group-hover:opacity-100">

              <div className="absolute inset-0 -translate-x-full animate-[shimmer_2.8s_infinite] bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />

            </div>

            {/* =================================================
                CATEGORY
            ================================================== */}
            {category && (

              <div className="absolute left-6 top-6 rounded-full border border-white/[0.08] bg-black/35 px-5 py-3 backdrop-blur-2xl">

                <span className="text-[10px] uppercase tracking-[0.34em] text-white/75">

                  {category}

                </span>

              </div>

            )}

            {/* =================================================
                ACTIONS
            ================================================== */}
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between opacity-0 transition duration-700 group-hover:translate-y-0 group-hover:opacity-100">

              {/* WISHLIST */}
              <motion.button
                whileHover={{
                  scale: 1.05,
                }}
                whileTap={{
                  scale: 0.96,
                }}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/[0.08] bg-black/40 backdrop-blur-xl transition duration-500 hover:border-[#D6C2A3]/30 hover:bg-black/60"
              >

                <Heart className="h-[16px] w-[16px] text-white/88" />

              </motion.button>

              {/* ADD TO CART */}
              <motion.button
                whileHover={{
                  scale: 1.04,
                }}
                whileTap={{
                  scale: 0.96,
                }}
                className="flex items-center gap-3 rounded-full border border-white/[0.08] bg-black/40 px-6 py-3 backdrop-blur-xl transition duration-500 hover:border-[#D6C2A3]/30 hover:bg-black/60"
              >

                <ShoppingBag className="h-[16px] w-[16px] text-white/88" />

                <span className="text-[10px] uppercase tracking-[0.32em] text-white/82">

                  Add To Cart

                </span>

              </motion.button>

            </div>

          </div>

          {/* =====================================================
              CONTENT
          ====================================================== */}
          <div className="relative px-7 pb-8 pt-7">

            {/* SOFT INNER LIGHT */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.015] to-transparent" />

            {/* PRODUCT NAME */}
            <h3 className="relative max-w-[12ch] text-[1.45rem] font-light leading-[1.1] tracking-[-0.05em] text-white transition duration-700 group-hover:text-[#E7D6BB]">

              {name}

            </h3>

            {/* FOOTER */}
            <div className="relative mt-7 flex items-end justify-between">

              {/* PRICE */}
              <div>

                <p className="text-[10px] uppercase tracking-[0.34em] text-white/28">

                  Investment Piece

                </p>

                <p className="mt-3 text-[1.9rem] font-light tracking-[-0.06em] text-white">

                  ₹
                  {price?.toLocaleString()}

                </p>

              </div>

              {/* CTA */}
              <div className="translate-y-1 opacity-50 transition duration-700 group-hover:translate-y-0 group-hover:opacity-100">

                <span className="text-[10px] uppercase tracking-[0.34em] text-[#D6C2A3]">

                  View Piece

                </span>

              </div>

            </div>

          </div>

        </div>

      </motion.article>

    </Link>
  );
}