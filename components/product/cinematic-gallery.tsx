"use client";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import {
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";

import { useState } from "react";

interface CinematicGalleryProps {
  images: string[];
}

export default function CinematicGallery({
  images,
}: CinematicGalleryProps) {
  const [activeIndex, setActiveIndex] =
    useState(0);

  const [fullscreen, setFullscreen] =
    useState(false);

  const nextImage = () => {
    setActiveIndex((prev) =>
      prev === images.length - 1
        ? 0
        : prev + 1
    );
  };

  const prevImage = () => {
    setActiveIndex((prev) =>
      prev === 0
        ? images.length - 1
        : prev - 1
    );
  };

  return (
    <>
      {/* ================= MAIN GALLERY ================= */}
      <div className="relative">

        {/* Main Image */}
        <motion.div
          layoutId={`gallery-${activeIndex}`}
          onClick={() =>
            setFullscreen(true)
          }
          className="group relative cursor-zoom-in overflow-hidden rounded-[3rem]"
        >

          {/* Image */}
          <img
            src={images[activeIndex]}
            alt="Product"
            className="h-[900px] w-full object-cover transition duration-[2200ms] group-hover:scale-[1.04]"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />

          {/* Zoom Hint */}
          <div className="absolute bottom-8 right-8 rounded-full border border-white/[0.08] bg-black/40 px-5 py-3 text-[10px] uppercase tracking-[0.35em] text-white backdrop-blur-2xl opacity-0 transition duration-700 group-hover:opacity-100">

            Expand View

          </div>

        </motion.div>

        {/* ================= NAVIGATION ================= */}
        <div className="mt-6 flex items-center justify-between">

          {/* Thumbnails */}
          <div className="flex gap-4 overflow-x-auto pb-2">

            {images.map(
              (image, index) => (
                <button
                  key={index}
                  onClick={() =>
                    setActiveIndex(index)
                  }
                  className={`relative overflow-hidden rounded-[1.5rem] border transition duration-500 ${
                    activeIndex === index
                      ? "border-[#B89B72]/50"
                      : "border-white/[0.06]"
                  }`}
                >

                  <img
                    src={image}
                    alt="Thumbnail"
                    className="h-28 w-28 object-cover"
                  />

                </button>
              )
            )}

          </div>

          {/* Arrows */}
          <div className="hidden items-center gap-3 md:flex">

            <button
              onClick={prevImage}
              className="flex h-14 w-14 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] transition duration-500 hover:border-[#B89B72]/20 hover:bg-[#B89B72]/10"
            >

              <ChevronLeft className="h-5 w-5 text-white/70" />

            </button>

            <button
              onClick={nextImage}
              className="flex h-14 w-14 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] transition duration-500 hover:border-[#B89B72]/20 hover:bg-[#B89B72]/10"
            >

              <ChevronRight className="h-5 w-5 text-white/70" />

            </button>

          </div>

        </div>

      </div>

      {/* ================= FULLSCREEN ================= */}
      <AnimatePresence>

        {fullscreen && (
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
            className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/95 p-6 backdrop-blur-2xl"
          >

            {/* Close */}
            <button
              onClick={() =>
                setFullscreen(false)
              }
              className="absolute right-8 top-8 z-20 flex h-14 w-14 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03]"
            >

              <X className="h-5 w-5 text-white/70" />

            </button>

            {/* Previous */}
            <button
              onClick={prevImage}
              className="absolute left-8 z-20 flex h-16 w-16 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03]"
            >

              <ChevronLeft className="h-6 w-6 text-white/70" />

            </button>

            {/* Next */}
            <button
              onClick={nextImage}
              className="absolute right-8 z-20 flex h-16 w-16 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03]"
            >

              <ChevronRight className="h-6 w-6 text-white/70" />

            </button>

            {/* Image */}
            <motion.img
              key={activeIndex}
              initial={{
                opacity: 0,
                scale: 0.96,
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
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
              src={images[activeIndex]}
              alt="Fullscreen Product"
              className="max-h-[92vh] max-w-[92vw] rounded-[2rem] object-contain"
            />

          </motion.div>
        )}

      </AnimatePresence>
    </>
  );
}