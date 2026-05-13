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

import { useEffect, useState } from "react";

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

  /* =========================================================
     NAVIGATION
  ========================================================== */

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

  /* =========================================================
     KEYBOARD NAVIGATION
  ========================================================== */

  useEffect(() => {

    const handleKeyDown = (
      e: KeyboardEvent
    ) => {

      if (!fullscreen) return;

      if (e.key === "ArrowRight") {
        nextImage();
      }

      if (e.key === "ArrowLeft") {
        prevImage();
      }

      if (e.key === "Escape") {
        setFullscreen(false);
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };

  }, [fullscreen]);

  return (
    <>
      {/* =====================================================
          MAIN GALLERY
      ====================================================== */}
      <div className="relative">

        {/* MAIN IMAGE */}
        <motion.div
          layoutId={`gallery-${activeIndex}`}
          onClick={() =>
            setFullscreen(true)
          }
          className="group relative cursor-zoom-in overflow-hidden rounded-[2rem] bg-[#080808] md:rounded-[3rem]"
        >

          {/* IMAGE */}
          <div className="relative h-[420px] w-full overflow-hidden sm:h-[560px] md:h-[760px] lg:h-[900px]">

            <Image
              src={images[activeIndex]}
              alt="Luxury Product"
              fill
              priority
              quality={88}
              sizes="(max-width: 768px) 100vw, 55vw"
              className="object-cover will-change-transform transform-gpu transition-transform duration-[1600ms] ease-out md:group-hover:scale-[1.018]"
            />

          </div>

          {/* SOFT OVERLAY */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />

          {/* VIGNETTE */}
          <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_60px_rgba(0,0,0,0.42)] md:shadow-[inset_0_0_120px_rgba(0,0,0,0.45)]" />

          {/* TOP GRADIENT */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/20 to-transparent" />

          {/* EXPAND */}
          <div className="absolute bottom-5 right-5 hidden rounded-full border border-white/[0.08] bg-black/30 px-5 py-3 text-[10px] uppercase tracking-[0.35em] text-white/80 backdrop-blur-md opacity-0 transition-all duration-500 group-hover:opacity-100 md:block">

            Expand View

          </div>

        </motion.div>

        {/* =====================================================
            NAVIGATION
        ====================================================== */}
        <div className="mt-5 flex items-center justify-between gap-4 md:mt-6">

          {/* THUMBNAILS */}
          <div className="flex flex-1 gap-3 overflow-x-auto pb-2 scrollbar-none md:gap-4">

            {images.map(
              (image, index) => (
                <button
                  key={index}
                  onClick={() =>
                    setActiveIndex(index)
                  }
                  className={`group relative shrink-0 overflow-hidden rounded-[1.2rem] border transition-all duration-500 md:rounded-[1.5rem] ${
                    activeIndex === index
                      ? "border-[#B89B72]/40 shadow-[0_0_25px_rgba(184,155,114,0.15)]"
                      : "border-white/[0.06]"
                  }`}
                >

                  <div className="relative h-20 w-20 overflow-hidden bg-[#090909] sm:h-24 sm:w-24 md:h-28 md:w-28">

                    <Image
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      fill
                      quality={75}
                      sizes="120px"
                      className={`object-cover transition duration-700 md:group-hover:scale-[1.03] ${
                        activeIndex === index
                          ? "scale-[1.02]"
                          : ""
                      }`}
                    />

                  </div>

                  {/* ACTIVE OVERLAY */}
                  {activeIndex === index && (
                    <>
                      <div className="pointer-events-none absolute inset-0 bg-[#B89B72]/[0.08]" />

                      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] bg-[#B89B72]" />
                    </>
                  )}

                </button>
              )
            )}

          </div>

          {/* ARROWS */}
          <div className="hidden items-center gap-3 md:flex">

            <button
              onClick={prevImage}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] backdrop-blur-md transition-all duration-500 hover:border-[#B89B72]/20 hover:bg-[#B89B72]/10 lg:h-14 lg:w-14"
            >

              <ChevronLeft className="h-5 w-5 text-white/70" />

            </button>

            <button
              onClick={nextImage}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] backdrop-blur-md transition-all duration-500 hover:border-[#B89B72]/20 hover:bg-[#B89B72]/10 lg:h-14 lg:w-14"
            >

              <ChevronRight className="h-5 w-5 text-white/70" />

            </button>

          </div>

        </div>

      </div>

      {/* =====================================================
          FULLSCREEN
      ====================================================== */}
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
            className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/95 p-4 backdrop-blur-md md:p-6"
          >

            {/* CLOSE */}
            <button
              onClick={() =>
                setFullscreen(false)
              }
              className="absolute right-4 top-4 z-20 flex h-12 w-12 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] backdrop-blur-md transition-all duration-500 hover:border-[#B89B72]/20 hover:bg-white/[0.05] md:right-8 md:top-8 md:h-14 md:w-14"
            >

              <X className="h-5 w-5 text-white/70" />

            </button>

            {/* PREVIOUS */}
            <button
              onClick={prevImage}
              className="absolute left-6 z-20 hidden h-14 w-14 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] backdrop-blur-md transition-all duration-500 hover:border-[#B89B72]/20 hover:bg-white/[0.05] lg:flex"
            >

              <ChevronLeft className="h-6 w-6 text-white/70" />

            </button>

            {/* NEXT */}
            <button
              onClick={nextImage}
              className="absolute right-6 z-20 hidden h-14 w-14 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] backdrop-blur-md transition-all duration-500 hover:border-[#B89B72]/20 hover:bg-white/[0.05] lg:flex"
            >

              <ChevronRight className="h-6 w-6 text-white/70" />

            </button>

            {/* IMAGE */}
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
                duration: 0.35,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative h-[88vh] w-[94vw] md:h-[92vh] md:w-[92vw]"
            >

              <Image
                src={images[activeIndex]}
                alt="Fullscreen Product"
                fill
                quality={92}
                sizes="100vw"
                className="rounded-[1.5rem] object-contain md:rounded-[2rem]"
              />

            </motion.div>

          </motion.div>
        )}

      </AnimatePresence>
    </>
  );
}