"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

interface LuxuryProductCardProps {
  title: string;
  category: string;
  price: string;
  image: string;
}

export default function LuxuryProductCard({
  title,
  category,
  price,
  image,
}: LuxuryProductCardProps) {

  /* =========================================================
     MOUSE DEPTH SYSTEM
  ========================================================== */

  const mouseX =
    useMotionValue(0);

  const mouseY =
    useMotionValue(0);

  const smoothX =
    useSpring(mouseX, {
      stiffness: 120,
      damping: 18,
    });

  const smoothY =
    useSpring(mouseY, {
      stiffness: 120,
      damping: 18,
    });

  const rotateY =
    useTransform(
      smoothX,
      [-0.5, 0.5],
      [-6, 6]
    );

  const rotateX =
    useTransform(
      smoothY,
      [-0.5, 0.5],
      [6, -6]
    );

  const imageY =
    useTransform(
      smoothY,
      [-0.5, 0.5],
      [-10, 10]
    );

  function handleMouseMove(
    e: React.MouseEvent<HTMLDivElement>
  ) {

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
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{
        y: -8,
      }}
      transition={{
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="group relative overflow-hidden rounded-[2.4rem] border border-white/[0.05] bg-white/[0.02] perspective-[2000px]"
    >

      {/* =========================================================
          ATMOSPHERIC GLOW
      ========================================================== */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 transition duration-700 group-hover:opacity-100"
      >

        <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#B89B72]/[0.08] blur-[140px]" />

      </motion.div>

      {/* =========================================================
          IMAGE WRAPPER
      ========================================================== */}
      <div className="relative overflow-hidden rounded-[2.4rem]">

        {/* Image */}
        <motion.div
          style={{
            y: imageY,
          }}
          transition={{
            duration: 1.2,
            ease: [0.22, 1, 0.36, 1],
          }}
        >

          <motion.img
            whileHover={{
              scale: 1.045,
            }}
            transition={{
              duration: 1.4,
              ease: [0.22, 1, 0.36, 1],
            }}
            src={image}
            alt={title}
            className="h-[520px] w-full object-cover"
          />

        </motion.div>

        {/* =========================================================
            CINEMATIC OVERLAYS
        ========================================================== */}

        {/* Main Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/78 via-black/10 to-transparent" />

        {/* Top Atmospheric Light */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(184,155,114,0.10),transparent_38%)] opacity-70" />

        {/* Cinematic Vignette */}
        <div className="absolute inset-0 shadow-[inset_0_0_120px_rgba(0,0,0,0.4)]" />

      </div>

      {/* =========================================================
          CONTENT
      ========================================================== */}
      <div
        className="absolute bottom-0 left-0 w-full p-8 md:p-10"
        style={{
          transform: "translateZ(40px)",
        }}
      >

        {/* Category */}
        <motion.p
          whileHover={{
            x: 2,
          }}
          transition={{
            duration: 0.4,
          }}
          className="text-[9px] uppercase tracking-[0.42em] text-[#B89B72]/78 md:text-[10px]"
        >

          {category}

        </motion.p>

        {/* Title */}
        <motion.h3
          whileHover={{
            x: 2,
          }}
          transition={{
            duration: 0.45,
          }}
          className="mt-5 text-[2rem] font-light leading-[0.92] tracking-[-0.06em] text-white md:text-[2.4rem]"
        >

          {title}

        </motion.h3>

        {/* Bottom */}
        <div className="mt-8 flex items-end justify-between gap-6">

          {/* Price */}
          <div>

            <p className="text-[9px] uppercase tracking-[0.36em] text-white/28 md:text-[10px]">

              Curated Piece

            </p>

            <p className="mt-3 text-[1.15rem] font-light tracking-[-0.03em] text-white/72 md:text-[1.25rem]">

              {price}

            </p>

          </div>

          {/* Explore */}
          <motion.button
            whileHover={{
              y: -1,
            }}
            transition={{
              duration: 0.25,
            }}
            className="rounded-[1rem] border border-white/[0.06] bg-white/[0.04] px-5 py-3 text-[9px] uppercase tracking-[0.34em] text-white/78 transition duration-500 hover:border-[#B89B72]/30 hover:bg-white/[0.06] hover:text-white md:text-[10px]"
          >

            Explore

          </motion.button>

        </div>

      </div>

    </motion.div>
  );
}