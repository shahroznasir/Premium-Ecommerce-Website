"use client";

import { useState } from "react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import LuxuryImage from "@/components/common/luxury-image";

interface ProductGalleryProps {
  images: string[];
  title: string;
}

export default function ProductGallery({
  images,
  title,
}: ProductGalleryProps) {
  const [activeImage, setActiveImage] =
    useState(images[0]);

  return (
    <div className="relative">

      {/* ================= MAIN IMAGE ================= */}
      <div className="group relative overflow-hidden rounded-[3rem] border border-white/[0.06] bg-white/[0.03]">

        {/* Atmosphere */}
        <div className="pointer-events-none absolute inset-0 z-10">

          <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#B89B72]/10 blur-[140px]" />

        </div>

        {/* Reflection */}
        <div className="pointer-events-none absolute inset-y-0 left-[-30%] z-20 w-[30%] rotate-12 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent blur-3xl transition duration-[1800ms] group-hover:left-[120%]" />

        {/* Image */}
        <div className="relative h-[850px] overflow-hidden">

          <AnimatePresence mode="wait">

            <motion.div
              key={activeImage}
              initial={{
                opacity: 0,
                scale: 1.08,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                scale: 0.96,
              }}
              transition={{
                duration: 1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="absolute inset-0"
            >

              <LuxuryImage
                src={activeImage}
                alt={title}
                className="h-full w-full transition duration-[2200ms] group-hover:scale-[1.05]"
              />

            </motion.div>

          </AnimatePresence>

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />

        </div>

      </div>

      {/* ================= THUMBNAILS ================= */}
      <div className="mt-8 grid grid-cols-4 gap-5">

        {images.map((image, index) => {
          const active =
            activeImage === image;

          return (
            <button
              key={index}
              onClick={() =>
                setActiveImage(image)
              }
              className={`group relative overflow-hidden rounded-[1.8rem] border transition duration-700 ${
                active
                  ? "border-[#B89B72]"
                  : "border-white/[0.06] hover:border-[#B89B72]/30"
              }`}
            >

              {/* Active Glow */}
              {active && (
                <div className="absolute inset-0 z-10 rounded-[1.8rem] ring-1 ring-[#B89B72]/60" />
              )}

              {/* Thumbnail */}
              <div className="relative h-36 overflow-hidden">

                <LuxuryImage
                  src={image}
                  alt={`${title}-${index}`}
                  className="h-full w-full transition duration-700 group-hover:scale-[1.08]"
                />

                {/* Overlay */}
                <div
                  className={`absolute inset-0 transition duration-500 ${
                    active
                      ? "bg-black/10"
                      : "bg-black/35 group-hover:bg-black/15"
                  }`}
                />

              </div>

            </button>
          );
        })}

      </div>

    </div>
  );
}