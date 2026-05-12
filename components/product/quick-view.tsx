"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Link from "next/link";

interface QuickViewProps {
  product: {
    id: string;
    title: string;
    slug: string;
    category: string;
    image: string;
    price: number;
    description: string;
  };
  trigger: React.ReactNode;
}

export default function QuickView({ product, trigger }: QuickViewProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div onClick={() => setIsOpen(true)} className="cursor-pointer">
        {trigger}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] flex items-center justify-center bg-black/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="relative max-w-5xl w-full rounded-3xl bg-[#050505] p-8 shadow-xl"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-6 right-6 text-white/70 hover:text-[#B89B72] transition"
              >
                <X size={24} />
              </button>

              <div className="grid gap-8 lg:grid-cols-2">
                {/* Product Image */}
                <div className="relative rounded-2xl overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="h-[500px] w-full object-cover rounded-2xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                </div>

                {/* Product Info */}
                <div className="flex flex-col justify-between text-white">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.55em] text-[#B89B72]/80">
                      {product.category}
                    </p>
                    <h2 className="mt-4 text-5xl font-light leading-tight tracking-[-0.06em]">
                      {product.title}
                    </h2>
                    <div className="mt-6 h-px w-16 bg-[#B89B72]" />
                    <p className="mt-6 text-lg text-white/60 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  <div className="mt-10 flex items-center justify-between">
                    <p className="text-4xl font-light tracking-[-0.06em] text-[#B89B72]">
                      ₹{product.price.toLocaleString("en-IN")}
                    </p>

                    <div className="flex gap-4">
                      <Link
                        href={`/shop/${product.slug}`}
                        className="rounded-full border border-[#B89B72]/40 px-8 py-3 uppercase text-sm tracking-[0.25em] text-white transition hover:bg-[#B89B72] hover:text-black"
                      >
                        Discover
                      </Link>
                      <button className="rounded-full border border-[#B89B72]/40 px-8 py-3 uppercase text-sm tracking-[0.25em] text-white transition hover:bg-[#B89B72] hover:text-black">
                        Add To Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}