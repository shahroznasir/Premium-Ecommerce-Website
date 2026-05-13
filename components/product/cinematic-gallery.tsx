"use client";

import Image from "next/image";

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
      {/* MAIN GALLERY */}
      <div className="relative">

        {/* MAIN IMAGE */}
        <motion.div
          layoutId={`gallery-${activeIndex}`}
          onClick={() =>
            setFullscreen(true)
          }
          className="group relative cursor-zoom-in overflow-hidden rounded-[3rem]"
        >

          {/* IMAGE */}
          <div className="relative h-[760px] w-full overflow-hidden md:h-[900px]">

            <Image
              src={images[activeIndex]}
              alt="Luxury Product"
              fill
              priority
              quality={88}
              sizes="(max-width: 768px) 100vw, 55vw"
              className="object-cover will-change-transform transform-gpu transition-transform duration-[2200ms] ease-out group-hover:scale-[1.02]"
            />

          </div>

          {/* OVERLAY */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />

          {/* VIGNETTE */}
          <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_120px_rgba(0,0,0,0.45)]" />

          {/* ZOOM HINT */}
          <div className="absolute bottom-8 right-8 rounded-full border border-white/[0.08] bg-black/30 px-5 py-3 text-[10px] uppercase tracking-[0.35em] text-white/80 backdrop-blur-md opacity-0 transition-all duration-500 group-hover:opacity-100">

            Expand View

          </div>

        </motion.div>

        {/* NAVIGATION */}
        <div className="mt-6 flex items-center justify-between gap-5">

          {/* THUMBNAILS */}
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none">

            {images.map(
              (image, index) => (
                <button
                  key={index}
                  onClick={() =>
                    setActiveIndex(index)
                  }
                  className={`group relative overflow-hidden rounded-[1.6rem] border transition-all duration-500 ${
                    activeIndex === index
                      ? "border-[#B89B72]/40"
                      : "border-white/[0.06]"
                  }`}
                >

                  <div className="relative h-28 w-28 overflow-hidden">

                    <Image
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      fill
                      quality={75}
                      sizes="120px"
                      className={`object-cover transition duration-700 group-hover:scale-[1.03] ${
                        activeIndex === index
                          ? "scale-[1.02]"
                          : ""
                      }`}
                    />

                  </div>

                  {/* ACTIVE GLOW */}
                  {activeIndex === index && (
                    <div className="pointer-events-none absolute inset-0 bg-[#B89B72]/[0.08]" />
                  )}

                </button>
              )
            )}

          </div>

          {/* ARROWS */}
          <div className="hidden items-center gap-3 md:flex">

            <button
              onClick={prevImage}
              className="flex h-14 w-14 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] backdrop-blur-md transition-all duration-500 hover:border-[#B89B72]/20 hover:bg-[#B89B72]/10"
            >

              <ChevronLeft className="h-5 w-5 text-white/70" />

            </button>

            <button
              onClick={nextImage}
              className="flex h-14 w-14 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] backdrop-blur-md transition-all duration-500 hover:border-[#B89B72]/20 hover:bg-[#B89B72]/10"
            >

              <ChevronRight className="h-5 w-5 text-white/70" />

            </button>

          </div>

        </div>

      </div>

      {/* FULLSCREEN */}
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
            className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/95 p-6 backdrop-blur-md"
          >

            {/* CLOSE */}
            <button
              onClick={() =>
                setFullscreen(false)
              }
              className="absolute right-8 top-8 z-20 flex h-14 w-14 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] backdrop-blur-md"
            >

              <X className="h-5 w-5 text-white/70" />

            </button>

            {/* PREVIOUS */}
            <button
              onClick={prevImage}
              className="absolute left-8 z-20 hidden h-16 w-16 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] backdrop-blur-md md:flex"
            >

              <ChevronLeft className="h-6 w-6 text-white/70" />

            </button>

            {/* NEXT */}
            <button
              onClick={nextImage}
              className="absolute right-8 z-20 hidden h-16 w-16 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] backdrop-blur-md md:flex"
            >

              <ChevronRight className="h-6 w-6 text-white/70" />

            </button>

            {/* FULLSCREEN IMAGE */}
            <motion.div
              key={activeIndex}
              initial={{
                opacity: 0,
                scale: 0.985,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                scale: 0.985,
              }}
              transition={{
                duration: 0.45,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative h-[92vh] w-[92vw]"
            >

              <Image
                src={images[activeIndex]}
                alt="Fullscreen Product"
                fill
                quality={92}
                sizes="100vw"
                className="rounded-[2rem] object-contain"
              />

            </motion.div>

          </motion.div>
        )}

      </AnimatePresence>
    </>
  );
}