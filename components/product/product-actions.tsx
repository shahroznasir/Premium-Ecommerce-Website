"use client";

import { useState } from "react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import {
  Check,
  Minus,
  Plus,
  ArrowUpRight,
  Heart,
} from "lucide-react";

import WishlistButton from "@/components/product/wishlist-button";

import { useCartStore } from "@/stores/cart-store";

import { useCartUIStore } from "@/stores/cart-ui-store";

interface ProductActionsProps {
  product: {
    id: string;
    title: string;
    slug: string;
    image: string;
    price: number;
  };
}

export default function ProductActions({
  product,
}: ProductActionsProps) {

  const [quantity, setQuantity] =
    useState(1);

  const [added, setAdded] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const { addItem } =
    useCartStore();

  const { openCart } =
    useCartUIStore();

  /* =========================================================
     ADD TO CART
  ========================================================== */

  const handleAddToCart = () => {

    for (
      let i = 0;
      i < quantity;
      i++
    ) {
      addItem({
        id: product.id,
        title: product.title,
        image: product.image,
        price: product.price,
      });
    }

    setAdded(true);

    openCart();

    setTimeout(() => {
      setAdded(false);
    }, 2200);
  };

  /* =========================================================
     BUY NOW
  ========================================================== */

  const handleBuyNow = async () => {

    try {

      setLoading(true);

      handleAddToCart();

      setTimeout(() => {
        openCart();
      }, 300);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }
  };

  return (
    <div>

      {/* =========================================================
          PURCHASE EXPERIENCE
      ========================================================== */}
      <div className="relative overflow-hidden rounded-[2.5rem] border border-white/[0.05] bg-white/[0.02] p-6 md:p-8 xl:p-10">

        {/* Ambient Glow */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(184,155,114,0.08),transparent_58%)]" />

        {/* Reflection */}
        <div className="pointer-events-none absolute inset-y-0 left-[-15%] hidden w-[20%] rotate-12 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent blur-3xl md:block" />

        <div className="relative z-10">

          {/* =====================================================
              TOP
          ====================================================== */}
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">

            {/* LEFT */}
            <div className="max-w-[420px]">

              <p className="text-[10px] uppercase tracking-[0.45em] text-[#B89B72]/72">

                Curated Acquisition

              </p>

              <p className="mt-5 text-[15px] leading-[2] text-white/46">

                Designed as a collectible sculptural object crafted for refined architectural interiors and timeless cinematic environments.

              </p>

            </div>

            {/* RIGHT */}
            <div className="lg:text-right">

              <p className="text-[10px] uppercase tracking-[0.38em] text-white/28">

                Total Value

              </p>

              <p className="mt-4 text-[3rem] font-light leading-none tracking-[-0.08em] text-white md:text-[3.5rem]">

                ₹
                {(
                  product.price *
                  quantity
                ).toLocaleString(
                  "en-IN"
                )}

              </p>

            </div>

          </div>

          {/* =====================================================
              DIVIDER
          ====================================================== */}
          <div className="mt-10 h-px w-full bg-gradient-to-r from-white/[0.08] via-white/[0.03] to-transparent" />

          {/* =====================================================
              QUANTITY
          ====================================================== */}
          <div className="mt-10 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

            {/* Label */}
            <div>

              <p className="text-[10px] uppercase tracking-[0.38em] text-white/28">

                Quantity Selection

              </p>

            </div>

            {/* Controls */}
            <div className="flex items-center gap-4">

              {/* Minus */}
              <button
                onClick={() =>
                  setQuantity((prev) =>
                    Math.max(
                      1,
                      prev - 1
                    )
                  )
                }
                className="flex h-[68px] w-[68px] items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] text-white/68 transition-all duration-500 hover:border-[#B89B72]/35 hover:bg-white/[0.05] hover:text-white"
              >

                <Minus size={16} />

              </button>

              {/* Quantity */}
              <div className="flex h-[68px] min-w-[100px] items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] px-8 text-sm tracking-[0.38em] text-white">

                {String(quantity).padStart(
                  2,
                  "0"
                )}

              </div>

              {/* Plus */}
              <button
                onClick={() =>
                  setQuantity((prev) =>
                    prev + 1
                  )
                }
                className="flex h-[68px] w-[68px] items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] text-white/68 transition-all duration-500 hover:border-[#B89B72]/35 hover:bg-white/[0.05] hover:text-white"
              >

                <Plus size={16} />

              </button>

            </div>

          </div>

          {/* =====================================================
              CTA
          ====================================================== */}
          <div className="mt-10 grid gap-4 lg:grid-cols-[1fr_1fr_auto]">

            {/* BUY NOW */}
            <motion.button
              whileHover={{
                scale: 1.01,
              }}
              whileTap={{
                scale: 0.985,
              }}
              onClick={handleBuyNow}
              disabled={loading}
              className="group relative flex h-[74px] items-center justify-center overflow-hidden rounded-full bg-[#B89B72] px-10 text-sm uppercase tracking-[0.34em] text-black transition-all duration-700 hover:bg-[#C7A97D]"
            >

              {/* Reflection */}
              <div className="absolute inset-y-0 left-[-35%] w-[22%] rotate-12 bg-white/35 blur-2xl transition-all duration-1000 group-hover:left-[130%]" />

              <span className="relative z-10 flex items-center gap-3">

                {loading
                  ? "Processing..."
                  : "Acquire Piece"}

                <ArrowUpRight
                  size={16}
                />

              </span>

            </motion.button>

            {/* ADD TO CART */}
            <motion.button
              whileHover={{
                scale: 1.01,
              }}
              whileTap={{
                scale: 0.985,
              }}
              onClick={handleAddToCart}
              className={`group relative flex h-[74px] items-center justify-center overflow-hidden rounded-full border px-10 text-sm uppercase tracking-[0.34em] transition-all duration-700 ${
                added
                  ? "border-green-500/30 bg-green-500 text-white"
                  : "border-white/[0.08] bg-white/[0.03] text-white hover:border-[#B89B72]/35 hover:bg-white/[0.05]"
              }`}
            >

              {/* Reflection */}
              <div className="absolute inset-y-0 left-[-35%] w-[22%] rotate-12 bg-white/10 blur-2xl transition-all duration-1000 group-hover:left-[130%]" />

              <AnimatePresence mode="wait">

                <motion.span
                  key={
                    added
                      ? "added"
                      : "default"
                  }
                  initial={{
                    opacity: 0,
                    y: 10,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: -10,
                  }}
                  className="relative z-10 flex items-center gap-3"
                >

                  {added ? (
                    <>
                      <Check size={16} />
                      Added
                    </>
                  ) : (
                    "Add To Cart"
                  )}

                </motion.span>

              </AnimatePresence>

            </motion.button>

            {/* WISHLIST */}
            <div className="flex items-center justify-center">

              <div className="flex h-[74px] w-[74px] items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] transition-all duration-500 hover:border-[#B89B72]/30 hover:bg-white/[0.05]">

                <WishlistButton
                  product={{
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    image: product.image,
                    slug: product.slug,
                  }}
                />

              </div>

            </div>

          </div>

          {/* =====================================================
              TRUST
          ====================================================== */}
          <div className="mt-10 flex flex-wrap gap-3">

            <LuxuryPill text="Secure Checkout" />

            <LuxuryPill text="Curated Luxury Piece" />

            <LuxuryPill text="Premium Packaging" />

            <LuxuryPill text="Architectural Collection" />

          </div>

        </div>

      </div>

    </div>
  );
}

/* =============================================================
   LUXURY PILL
============================================================= */

function LuxuryPill({
  text,
}: {
  text: string;
}) {
  return (
    <div className="rounded-full border border-white/[0.05] bg-white/[0.03] px-5 py-2.5 text-[9px] uppercase tracking-[0.32em] text-white/42 transition-all duration-500 hover:border-[#B89B72]/25 hover:bg-white/[0.05]">

      {text}

    </div>
  );
}