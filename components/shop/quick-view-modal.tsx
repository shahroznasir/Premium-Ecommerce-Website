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
      SAFETY
  ======================================================== */

  if (!product) {
    return null;
  }

  /* =======================================================
      SAFE PRODUCT
  ======================================================== */

  const safeProduct =
    product;

  /* =======================================================
      ADD TO CART
  ======================================================== */

  function handleAddToCart() {

    try {

      addItem({
        id: safeProduct.id,
        title: safeProduct.title,
        price: safeProduct.price,
        image: safeProduct.image,
      });

      toast.success(
        `${safeProduct.title} added to cart`
      );

    } catch {

      toast.error(
        "Unable to add item to cart."
      );
    }
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
          className="fixed inset-0 z-[999] overflow-y-auto bg-black/75 p-3 backdrop-blur-2xl md:p-6"
          onClick={onClose}
          aria-modal="true"
          role="dialog"
        >

          {/* ===================================================
              CENTER WRAPPER
          ==================================================== */}
          <div className="flex min-h-full items-center justify-center">

            {/* =================================================
                MODAL
            ================================================== */}
            <motion.div
              initial={{
                opacity: 0,
                y: 50,
                scale: 0.97,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: 24,
                scale: 0.98,
              }}
              transition={{
                duration: 0.55,
                ease: [0.22, 1, 0.36, 1],
              }}
              onClick={(e) =>
                e.stopPropagation()
              }
              className="relative grid w-full max-w-6xl overflow-hidden rounded-[2.2rem] border border-white/[0.08] bg-[#0A0A0A]/96 shadow-[0_40px_140px_rgba(0,0,0,0.7)] backdrop-blur-3xl lg:grid-cols-[1.05fr_0.95fr]"
            >

              {/* ===============================================
                  IMAGE
              ================================================ */}
              <div className="relative overflow-hidden bg-black">

                {/* IMAGE CONTAINER */}
                <div className="relative aspect-[0.9] overflow-hidden min-[400px]:aspect-[0.92] lg:h-full lg:min-h-[760px]">

                  <Image
                    src={safeProduct.image}
                    alt={safeProduct.title}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-[2200ms] ease-out hover:scale-[1.04]"
                  />

                  {/* OVERLAYS */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent opacity-90" />

                  <div className="absolute inset-0 bg-black/10" />

                  <div className="absolute inset-0 shadow-[inset_0_0_120px_rgba(0,0,0,0.45)]" />

                </div>

                {/* CATEGORY */}
                <div className="absolute left-4 top-4 rounded-full border border-white/[0.08] bg-black/35 px-4 py-2.5 backdrop-blur-xl md:left-8 md:top-8 md:px-5 md:py-3">

                  <p className="text-[9px] uppercase tracking-[0.34em] text-[#D6C2A3] md:text-[10px]">

                    {safeProduct.category}

                  </p>

                </div>

              </div>

              {/* ===============================================
                  CONTENT
              ================================================ */}
              <div className="relative flex flex-col justify-between p-5 sm:p-7 md:p-10 lg:p-12">

                {/* CLOSE BUTTON */}
                <button
                  onClick={onClose}
                  aria-label="Close quick view modal"
                  className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] text-white/60 transition-all duration-500 hover:rotate-90 hover:border-[#B89B72]/30 hover:bg-[#B89B72]/10 hover:text-[#D6C2A3] md:right-6 md:top-6 md:h-12 md:w-12"
                >

                  <X size={16} />

                </button>

                {/* =============================================
                    TOP CONTENT
                ============================================== */}
                <div>

                  {/* LABEL */}
                  <p className="text-[9px] uppercase tracking-[0.42em] text-[#B89B72]/70 md:text-[10px]">

                    Curated Luxury Object

                  </p>

                  {/* TITLE */}
                  <h2 className="mt-6 max-w-[9ch] font-serif text-[2.6rem] leading-[0.92] tracking-[-0.08em] text-white sm:text-[3rem] md:mt-8 md:text-[3.5rem] lg:text-[4rem]">

                    {safeProduct.title}

                  </h2>

                  {/* DESCRIPTION */}
                  <p className="mt-7 max-w-xl text-[0.95rem] leading-[1.95] text-white/45 md:mt-10 md:text-[1rem] md:leading-[2]">

                    {safeProduct.description ||
                      "Architectural sculptural object designed through refined materiality, cinematic restraint, and timeless modern luxury aesthetics."}

                  </p>

                  {/* PRICE */}
                  <div className="mt-10 md:mt-14">

                    <p className="text-[9px] uppercase tracking-[0.34em] text-white/28 md:text-[10px]">

                      Investment Piece

                    </p>

                    <p className="mt-3 text-[2.1rem] font-light tracking-[-0.08em] text-white sm:text-[2.4rem] md:mt-4 md:text-[2.8rem]">

                      ₹
                      {safeProduct.price.toLocaleString(
                        "en-IN"
                      )}

                    </p>

                  </div>

                </div>

                {/* =============================================
                    ACTIONS
                ============================================== */}
                <div className="mt-10 flex flex-col gap-3 md:mt-14 md:gap-4">

                  {/* ADD TO CART */}
                  <button
                    onClick={
                      handleAddToCart
                    }
                    aria-label={`Add ${safeProduct.title} to cart`}
                    className="group relative flex h-14 items-center justify-center gap-3 overflow-hidden rounded-full bg-white px-6 text-[10px] uppercase tracking-[0.34em] text-black transition-all duration-700 hover:scale-[1.01] md:h-16 md:text-[11px]"
                  >

                    {/* SHIMMER */}
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
                    href={`/shop/${safeProduct.slug}`}
                    aria-label={`View full details for ${safeProduct.title}`}
                    className="flex h-14 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.02] px-6 text-[10px] uppercase tracking-[0.34em] text-white transition-all duration-500 hover:border-[#B89B72]/20 hover:bg-[#B89B72]/10 hover:text-[#D6C2A3] md:h-16 md:text-[11px]"
                  >

                    View Full Product

                  </a>

                </div>

              </div>

            </motion.div>

          </div>

        </motion.div>

      )}

    </AnimatePresence>
  );
}