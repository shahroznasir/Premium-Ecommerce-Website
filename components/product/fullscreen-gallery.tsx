"use client";

import Image from "next/image";

import {
  AnimatePresence,
  motion,
} from "framer-motion";

import {
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";

interface FullscreenGalleryProps {
  images: string[];
  activeIndex: number;
  open: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function FullscreenGallery({
  images,
  activeIndex,
  open,
  onClose,
  onNext,
  onPrev,
}: FullscreenGalleryProps) {

  return (
    <AnimatePresence>

      {open && (

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
            duration: 0.45,
          }}
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-black/92 backdrop-blur-2xl"
        >

          {/* =====================================================
              ATMOSPHERIC DEPTH
          ====================================================== */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">

            <div className="absolute left-1/2 top-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#B89B72]/[0.06] blur-[180px]" />

            <div className="absolute left-1/2 top-[-10%] h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-white/[0.03] blur-[140px]" />

          </div>

          {/* =====================================================
              CLOSE BUTTON
          ====================================================== */}
          <button
            onClick={onClose}
            className="absolute right-6 top-6 z-50 flex h-14 w-14 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] text-white/70 backdrop-blur-xl transition-all duration-500 hover:rotate-90 hover:border-[#B89B72]/30 hover:bg-[#B89B72]/10 hover:text-[#D6C2A3]"
          >

            <X size={18} />

          </button>

          {/* =====================================================
              PREV BUTTON
          ====================================================== */}
          {images.length > 1 && (

            <button
              onClick={onPrev}
              className="absolute left-4 z-50 flex h-14 w-14 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] text-white/70 backdrop-blur-xl transition-all duration-500 hover:border-[#B89B72]/30 hover:bg-[#B89B72]/10 hover:text-[#D6C2A3] md:left-8"
            >

              <ChevronLeft size={18} />

            </button>

          )}

          {/* =====================================================
              NEXT BUTTON
          ====================================================== */}
          {images.length > 1 && (

            <button
              onClick={onNext}
              className="absolute right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] text-white/70 backdrop-blur-xl transition-all duration-500 hover:border-[#B89B72]/30 hover:bg-[#B89B72]/10 hover:text-[#D6C2A3] md:right-8"
            >

              <ChevronRight size={18} />

            </button>

          )}

          {/* =====================================================
              IMAGE EXPERIENCE
          ====================================================== */}
          <div className="relative z-10 flex h-full w-full items-center justify-center p-6 md:p-16">

            <AnimatePresence mode="wait">

              <motion.div
                key={images[activeIndex]}
                initial={{
                  opacity: 0,
                  scale: 1.04,
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
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative h-full w-full"
              >

                {/* IMAGE */}
                <div className="relative h-full w-full overflow-hidden rounded-[2.8rem]">

                  <Image
                    src={images[activeIndex]}
                    alt="Luxury Object"
                    fill
                    priority
                    className="object-contain"
                  />

                  {/* CINEMATIC VIGNETTE */}
                  <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_120px_rgba(0,0,0,0.45)]" />

                </div>

              </motion.div>

            </AnimatePresence>

          </div>

          {/* =====================================================
              THUMBNAILS
          ====================================================== */}
          {images.length > 1 && (

            <div className="absolute bottom-6 left-1/2 z-50 flex -translate-x-1/2 gap-3 rounded-full border border-white/[0.06] bg-black/40 px-4 py-3 backdrop-blur-2xl">

              {images.map(
                (
                  image,
                  index
                ) => {

                  const active =
                    index ===
                    activeIndex;

                  return (

                    <button
                      key={index}
                      onClick={() => {

                        if (
                          index >
                          activeIndex
                        ) {

                          onNext();

                        } else if (
                          index <
                          activeIndex
                        ) {

                          onPrev();
                        }
                      }}
                      className={`relative overflow-hidden rounded-full transition-all duration-500 ${
                        active
                          ? "ring-2 ring-[#B89B72]"
                          : "opacity-50 hover:opacity-100"
                      }`}
                    >

                      <div className="relative h-14 w-14 overflow-hidden rounded-full">

                        <Image
                          src={image}
                          alt={`Preview ${index}`}
                          fill
                          className="object-cover"
                        />

                      </div>

                    </button>

                  );
                }
              )}

            </div>

          )}

        </motion.div>

      )}

    </AnimatePresence>
  );
}