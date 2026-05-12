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

  const { addItem } =
    useCartStore();

  const { openCart } =
    useCartUIStore();

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
    }, 2000);
  };

  return (
    <div>

      {/* ================= QUANTITY ================= */}
      <div className="flex items-center gap-4">

        {/* Minus */}
        <button
          onClick={() =>
            setQuantity((prev) =>
              Math.max(1, prev - 1)
            )
          }
          className="flex h-14 w-14 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] text-white/70 transition duration-500 hover:border-[#B89B72]/30 hover:text-white"
        >

          <Minus size={16} />

        </button>

        {/* Quantity */}
        <div className="flex h-14 w-20 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] text-sm tracking-[0.3em] text-white">

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
          className="flex h-14 w-14 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] text-white/70 transition duration-500 hover:border-[#B89B72]/30 hover:text-white"
        >

          <Plus size={16} />

        </button>

      </div>

      {/* ================= CTA ================= */}
      <div className="mt-14 flex flex-wrap items-center gap-4">

        {/* Add To Cart */}
        <motion.button
          whileHover={{
            scale: 1.02,
          }}
          whileTap={{
            scale: 0.98,
          }}
          onClick={handleAddToCart}
          className={`group relative overflow-hidden rounded-full px-10 py-5 text-sm uppercase tracking-[0.35em] transition duration-700 ${
            added
              ? "bg-green-500 text-white"
              : "bg-[#B89B72] text-black"
          }`}
        >

          {/* Reflection */}
          <div className="absolute inset-y-0 left-[-30%] w-[30%] rotate-12 bg-white/30 blur-2xl transition duration-1000 group-hover:left-[120%]" />

          {/* Content */}
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
                  Added To Cart
                </>
              ) : (
                "Add To Cart"
              )}

            </motion.span>

          </AnimatePresence>

        </motion.button>

        {/* Buy Now */}
        <button className="rounded-full border border-white/[0.08] bg-white/[0.03] px-10 py-5 text-sm uppercase tracking-[0.35em] text-white transition duration-500 hover:border-[#B89B72]/30 hover:bg-[#B89B72]/10">

          Buy Now

        </button>

        {/* Wishlist */}
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
  );
}