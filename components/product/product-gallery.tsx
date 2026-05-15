"use client";

import {
  useState,
} from "react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import LuxuryImage from "@/components/common/luxury-image";

import FullscreenGallery from "@/components/product/fullscreen-gallery";

interface ProductGalleryProps {
  images: string[];
  title: string;
}

export default function ProductGallery({
  images,
  title,
}: ProductGalleryProps) {

  /* =========================================================
      IMAGE STATE
  ========================================================== */

  const [
    activeIndex,
    setActiveIndex,
  ] = useState(0);

  const activeImage =
    images[activeIndex];

  /* =========================================================
      FULLSCREEN STATE
  ========================================================== */

  const [
    fullscreenOpen,
    setFullscreenOpen,
  ] = useState(false);

  /* =========================================================
      NAVIGATION
  ========================================================== */

  function nextImage() {

    setActiveIndex(
      (prev) =>
        (prev + 1) %
        images.length
    );
  }

  function prevImage() {

    setActiveIndex(
      (prev) =>
        prev === 0
          ? images.length - 1
          : prev - 1
    );
  }

  return (
    <>
      {/* =====================================================
          FULLSCREEN VIEWER
      ====================================================== */}
      <FullscreenGallery
        images={images}
        activeIndex={activeIndex}
        open={fullscreenOpen}
        onClose={() =>
          setFullscreenOpen(false)
        }
        onNext={nextImage}
        onPrev={prevImage}
      />

      {/* =====================================================
          GALLERY
      ====================================================== */}
      <div className="relative">

        {/* ===================================================
            MAIN IMAGE
        ==================================================== */}
        <div className="group relative overflow-hidden rounded-[3rem] border border-white/[0.06] bg-white/[0.03]">

          {/* ATMOSPHERE */}
          <div className="pointer-events-none absolute inset-0 z-10">

            <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#B89B72]/10 blur-[140px]" />

          </div>

          {/* REFLECTION */}
          <div className="pointer-events-none absolute inset-y-0 left-[-30%] z-20 w-[30%] rotate-12 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent blur-3xl transition duration-[1800ms] group-hover:left-[120%]" />

          {/* =================================================
              IMAGE EXPERIENCE
          ================================================== */}
          <button
            onClick={() =>
              setFullscreenOpen(true)
            }
            className="relative block h-[850px] w-full overflow-hidden"
          >

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

            {/* =================================================
                OVERLAYS
            ================================================== */}

            {/* MAIN OVERLAY */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />

            {/* VIGNETTE */}
            <div className="absolute inset-0 shadow-[inset_0_0_120px_rgba(0,0,0,0.5)]" />

            {/* CLICK LABEL */}
            <div className="absolute bottom-8 right-8 rounded-full border border-white/[0.08] bg-black/30 px-5 py-3 backdrop-blur-xl transition-all duration-500 group-hover:border-[#B89B72]/30 group-hover:bg-[#B89B72]/10">

              <p className="text-[10px] uppercase tracking-[0.34em] text-white/72">

                View Fullscreen

              </p>

            </div>

          </button>

        </div>

        {/* ===================================================
            THUMBNAILS
        ==================================================== */}
        <div className="mt-8 grid grid-cols-4 gap-5">

          {images.map(
            (
              image,
              index
            ) => {

              const active =
                activeIndex ===
                index;

              return (
                <button
                  key={index}
                  onClick={() =>
                    setActiveIndex(
                      index
                    )
                  }
                  className={`group relative overflow-hidden rounded-[1.8rem] border transition duration-700 ${
                    active
                      ? "border-[#B89B72]"
                      : "border-white/[0.06] hover:border-[#B89B72]/30"
                  }`}
                >

                  {/* ACTIVE GLOW */}
                  {active && (

                    <div className="absolute inset-0 z-10 rounded-[1.8rem] ring-1 ring-[#B89B72]/60" />

                  )}

                  {/* THUMBNAIL */}
                  <div className="relative h-36 overflow-hidden">

                    <LuxuryImage
                      src={image}
                      alt={`${title}-${index}`}
                      className="h-full w-full transition duration-700 group-hover:scale-[1.08]"
                    />

                    {/* OVERLAY */}
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
            }
          )}

        </div>

      </div>
    </>
  );
}