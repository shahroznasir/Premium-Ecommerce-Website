"use client";

import Image from "next/image";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import {
  X,
  ShoppingBag,
} from "lucide-react";

import { toast } from "sonner";

import { useCartStore } from "@/stores/cart-store";

interface Product {
  id: string;
  title: string;
  slug: string;
  category: string;
  image: string;
  price: number;
  description: string;
}

interface QuickViewModalProps {
  product: Product | null;
  open: boolean;
  onClose: () => void;
}

export default function QuickViewModal({
  product,
  open,
  onClose,
}: QuickViewModalProps) {

  const { addItem } =
    useCartStore();

  /* =======================================================
     SAFETY CHECK
  ======================================================== */

  if (!product) {
    return null;
  }

  /* =======================================================
     ADD TO CART
  ======================================================== */

  function handleAddToCart() {

    if (!product) {
      return;
    }

    addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
    });

    toast.success(
      `${product.title} added to cart`
    );
  }

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
            duration: 0.35,
          }}
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/70 p-4 backdrop-blur-xl"
          onClick={onClose}
        >

          {/* =================================================
              MODAL
          ================================================== */}
          <motion.div
            initial={{
              opacity: 0,
              y: 50,
              scale: 0.96,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 30,
              scale: 0.98,
            }}
            transition={{
              duration: 0.55,
              ease: [0.22, 1, 0.36, 1],
            }}
            onClick={(e) =>
              e.stopPropagation()
            }
            className="relative grid w-full max-w-6xl overflow-hidden rounded-[2.8rem] border border-white/[0.08] bg-[#0A0A0A]/95 shadow-[0_40px_140px_rgba(0,0,0,0.65)] backdrop-blur-3xl lg:grid-cols-[1.05fr_0.95fr]"
          >

            {/* ===============================================
                IMAGE
            ================================================ */}
            <div className="relative overflow-hidden bg-black">

              {/* IMAGE */}
              <div className="relative aspect-[0.9] h-full min-h-[480px] overflow-hidden">

                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  priority
                  className="object-cover transition-transform duration-[2200ms] ease-out hover:scale-[1.04]"
                />

                {/* VIGNETTE */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent opacity-90" />

                <div className="absolute inset-0 bg-black/10" />

              </div>

              {/* CATEGORY */}
              <div className="absolute left-8 top-8 rounded-full border border-white/[0.08] bg-black/30 px-5 py-3 backdrop-blur-xl">

                <p className="text-[10px] uppercase tracking-[0.38em] text-[#D6C2A3]">

                  {product.category}

                </p>

              </div>

            </div>

            {/* ===============================================
                CONTENT
            ================================================ */}
            <div className="relative flex flex-col justify-between p-8 md:p-12">

              {/* CLOSE */}
              <button
                onClick={onClose}
                className="absolute right-6 top-6 flex h-12 w-12 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] text-white/60 transition-all duration-500 hover:rotate-90 hover:border-[#B89B72]/30 hover:bg-[#B89B72]/10 hover:text-[#D6C2A3]"
              >

                <X size={18} />

              </button>

              {/* TOP */}
              <div>

                {/* LABEL */}
                <p className="text-[10px] uppercase tracking-[0.45em] text-[#B89B72]/70">

                  Curated Luxury Object

                </p>

                {/* TITLE */}
                <h2 className="mt-8 max-w-[10ch] font-serif text-[3.8rem] leading-[0.9] tracking-[-0.08em] text-white">

                  {product.title}

                </h2>

                {/* DESCRIPTION */}
                <p className="mt-10 max-w-xl text-[1rem] leading-[2] text-white/45">

                  {product.description ||
                    "Architectural sculptural object designed through refined materiality, cinematic restraint, and timeless modern luxury aesthetics."}

                </p>

                {/* PRICE */}
                <div className="mt-14">

                  <p className="text-[10px] uppercase tracking-[0.38em] text-white/28">

                    Investment Piece

                  </p>

                  <p className="mt-4 text-[2.5rem] font-light tracking-[-0.08em] text-white">

                    ₹
                    {product.price.toLocaleString(
                      "en-IN"
                    )}

                  </p>

                </div>

              </div>

              {/* ACTIONS */}
              <div className="mt-16 flex flex-col gap-4 sm:flex-row">

                {/* ADD TO CART */}
                <button
                  onClick={
                    handleAddToCart
                  }
                  className="group relative flex flex-1 items-center justify-center gap-3 overflow-hidden rounded-full bg-white px-8 py-5 text-[11px] uppercase tracking-[0.34em] text-black transition-all duration-700 hover:scale-[1.02]"
                >

                  <div className="absolute inset-y-0 left-[-30%] w-[30%] rotate-12 bg-black/10 blur-2xl transition-all duration-1000 group-hover:left-[120%]" />

                  <ShoppingBag
                    size={16}
                    className="relative z-10"
                  />

                  <span className="relative z-10">

                    Add To Cart

                  </span>

                </button>

                {/* VIEW PRODUCT */}
                <a
                  href={`/shop/${product.slug}`}
                  className="flex flex-1 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.02] px-8 py-5 text-[11px] uppercase tracking-[0.34em] text-white transition-all duration-500 hover:border-[#B89B72]/20 hover:bg-[#B89B72]/10 hover:text-[#D6C2A3]"
                >

                  View Full Product

                </a>

              </div>

            </div>

          </motion.div>

        </motion.div>

      )}

    </AnimatePresence>
  );
}