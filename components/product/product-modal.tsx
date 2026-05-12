"use client";

import { AnimatePresence, motion } from "framer-motion";

interface ProductModalProps {
  product: {
    title: string;
    category: string;
    price: string;
    image: string;
  } | null;

  onClose: () => void;
}

export default function ProductModal({
  product,
  onClose,
}: ProductModalProps) {
  return (
    <AnimatePresence>

      {product && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[99999] overflow-y-auto bg-black/90 backdrop-blur-2xl"
        >

          {/* Ambient Glow */}
          <div className="absolute left-1/2 top-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#B89B72]/10 blur-3xl" />

          {/* Close */}
          <button
            onClick={onClose}
            className="fixed right-8 top-8 z-50 flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition duration-500 hover:border-[#B89B72] hover:bg-[#B89B72] hover:text-black"
          >
            ✕
          </button>

          <div className="grid min-h-screen lg:grid-cols-2">

            {/* Image */}
            <motion.div
              initial={{
                scale: 1.08,
                opacity: 0,
              }}
              animate={{
                scale: 1,
                opacity: 1,
              }}
              transition={{
                duration: 1.2,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative h-screen overflow-hidden"
            >

              <img
                src={product.image}
                alt={product.title}
                className="h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-black/20" />

            </motion.div>

            {/* Content */}
            <div className="relative flex items-center px-10 py-32 lg:px-24">

              <motion.div
                initial={{
                  opacity: 0,
                  y: 80,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 1.2,
                  delay: 0.2,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="max-w-2xl"
              >

                {/* Category */}
                <p className="mb-8 text-sm uppercase tracking-[0.5em] text-[#B89B72]/80">
                  {product.category}
                </p>

                {/* Title */}
                <h2 className="text-6xl font-light leading-[0.85] tracking-[-0.08em] text-white md:text-[7rem]">
                  {product.title}
                </h2>

                {/* Divider */}
                <div className="mt-12 h-px w-32 bg-[#B89B72]" />

                {/* Description */}
                <p className="mt-12 text-xl leading-relaxed text-white/60">
                  Sculptural forms crafted through timeless materials,
                  cinematic composition, and elevated luxury aesthetics
                  designed for sophisticated interiors.
                </p>

                {/* Price + CTA */}
                <div className="mt-16 flex items-center justify-between">

                  <p className="text-4xl font-light text-white">
                    {product.price}
                  </p>

                  <button className="rounded-full border border-white/10 bg-white px-10 py-5 text-sm uppercase tracking-[0.35em] text-black transition duration-700 hover:bg-[#B89B72]">
                    Add To Cart
                  </button>

                </div>

              </motion.div>

            </div>

          </div>

        </motion.div>
      )}

    </AnimatePresence>
  );
}