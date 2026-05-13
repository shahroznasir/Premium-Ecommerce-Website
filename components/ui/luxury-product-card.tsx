"use client";

import Link from "next/link";
import Image from "next/image";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";

interface LuxuryProductCardProps {
  title: string;
  category: string;
  price: string;
  image: string;
  slug: string;
}

export default function LuxuryProductCard({
  title,
  category,
  price,
  image,
  slug,
}: LuxuryProductCardProps) {

  const prefersReducedMotion =
    useReducedMotion();

  /* =========================================================
     SMOOTH CINEMATIC DEPTH SYSTEM
  ========================================================== */

  const mouseX =
    useMotionValue(0);

  const mouseY =
    useMotionValue(0);

  const smoothX =
    useSpring(mouseX, {
      stiffness: 65,
      damping: 18,
      mass: 0.8,
    });

  const smoothY =
    useSpring(mouseY, {
      stiffness: 65,
      damping: 18,
      mass: 0.8,
    });

  const rotateY =
    useTransform(
      smoothX,
      [-0.5, 0.5],
      [-3, 3]
    );

  const rotateX =
    useTransform(
      smoothY,
      [-0.5, 0.5],
      [3, -3]
    );

  const imageScale =
    useTransform(
      smoothY,
      [-0.5, 0.5],
      [1.01, 1.03]
    );

  const imageY =
    useTransform(
      smoothY,
      [-0.5, 0.5],
      [-6, 6]
    );

  function handleMouseMove(
    e: React.MouseEvent<HTMLDivElement>
  ) {

    if (
      prefersReducedMotion
    ) {
      return;
    }

    const rect =
      e.currentTarget.getBoundingClientRect();

    const x =
      (e.clientX - rect.left) /
      rect.width;

    const y =
      (e.clientY - rect.top) /
      rect.height;

    mouseX.set(x - 0.5);
    mouseY.set(y - 0.5);
  }

  function handleMouseLeave() {

    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <Link
      href={`/shop/${slug}`}
      className="block"
    >

      <motion.article
        onMouseMove={
          handleMouseMove
        }
        onMouseLeave={
          handleMouseLeave
        }
        whileHover={{
          y: -8,
        }}
        transition={{
          duration: 0.7,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{
          rotateX,
          rotateY,
          transformStyle:
            "preserve-3d",
        }}
        className="group relative overflow-hidden rounded-[2.6rem] border border-white/[0.05] bg-white/[0.02] backdrop-blur-xl transition-all duration-700 hover:border-[#B89B72]/20"
      >

        {/* =====================================================
            ATMOSPHERIC GLOW
        ====================================================== */}
        <motion.div className="pointer-events-none absolute inset-0 opacity-0 transition duration-1000 group-hover:opacity-100">

          {/* Gold Aura */}
          <div className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#B89B72]/[0.08] blur-[160px]" />

          {/* Top Light */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(201,169,97,0.10),transparent_42%)]" />

        </motion.div>

        {/* =====================================================
            IMAGE CONTAINER
        ====================================================== */}
        <div className="relative aspect-[0.72] overflow-hidden rounded-[2.6rem] bg-[#0B0B0B]">

          {/* IMAGE MOTION */}
          <motion.div
            style={{
              scale: imageScale,
              y: imageY,
            }}
            className="h-full w-full"
          >

            <Image
              src={image}
              alt={title}
              fill
              priority={false}
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-[1800ms] ease-out md:group-hover:scale-[1.03]"
            />

          </motion.div>

          {/* =====================================================
              CINEMATIC OVERLAYS
          ====================================================== */}

          {/* Base Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/18 to-transparent" />

          {/* Warm Lighting */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(201,169,97,0.14),transparent_38%)] opacity-90" />

          {/* Side Shadow */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/25 via-transparent to-black/20" />

          {/* Inner Vignette */}
          <div className="absolute inset-0 shadow-[inset_0_0_120px_rgba(0,0,0,0.45)]" />

          {/* Bottom Fade */}
          <div className="absolute bottom-0 left-0 h-[45%] w-full bg-gradient-to-t from-black/92 to-transparent" />

          {/* Reflection */}
          <div className="pointer-events-none absolute inset-y-0 left-[-25%] w-[18%] rotate-12 bg-white/[0.04] blur-2xl transition-all duration-[1600ms] group-hover:left-[120%]" />

        </div>

        {/* =====================================================
            CONTENT
        ====================================================== */}
        <div
          className="absolute bottom-0 left-0 w-full p-6 md:p-9"
          style={{
            transform:
              "translateZ(40px)",
          }}
        >

          {/* MICRO LABEL */}
          <motion.p
            whileHover={{
              x: 2,
            }}
            transition={{
              duration: 0.35,
            }}
            className="text-[9px] uppercase tracking-[0.42em] text-[#c9a961] md:text-[10px]"
          >

            {category}

          </motion.p>

          {/* TITLE */}
          <motion.h3
            whileHover={{
              x: 2,
            }}
            transition={{
              duration: 0.4,
            }}
            className="mt-4 max-w-[10ch] font-serif text-[2rem] leading-[0.86] tracking-[-0.06em] text-white md:mt-5 md:text-[2.7rem]"
          >

            {title}

          </motion.h3>

          {/* DESCRIPTION */}
          <p className="mt-5 max-w-[28ch] text-[0.92rem] leading-[1.9] text-white/46 md:mt-6 md:text-[15px] md:leading-8">

            Sculptural luxury object
            designed through
            architectural restraint,
            timeless materiality,
            and refined modern living.

          </p>

          {/* =====================================================
              BOTTOM ROW
          ====================================================== */}
          <div className="mt-8 flex items-end justify-between gap-5 md:mt-9">

            {/* PRICE */}
            <div>

              <p className="text-[9px] uppercase tracking-[0.34em] text-white/28 md:text-[10px]">

                Curated Piece

              </p>

              <p className="mt-3 text-[1.15rem] font-light tracking-[-0.04em] text-white/80 md:text-[1.35rem]">

                {price}

              </p>

            </div>

            {/* EXPLORE */}
            <motion.div
              whileHover={{
                y: -2,
              }}
              transition={{
                duration: 0.3,
              }}
              className="rounded-[1.1rem] border border-white/[0.08] bg-white/[0.04] px-5 py-3 text-[9px] uppercase tracking-[0.34em] text-white/78 backdrop-blur-md transition-all duration-700 hover:border-[#c9a961]/30 hover:bg-white/[0.07] hover:text-white md:px-6 md:text-[10px]"
            >

              Explore

            </motion.div>

          </div>

        </div>

        {/* =====================================================
            OUTER BORDER
        ====================================================== */}
        <div className="pointer-events-none absolute inset-0 rounded-[2.6rem] border border-white/[0.03]" />

      </motion.article>

    </Link>
  );
}