"use client";

import { motion } from "framer-motion";

import { Heart } from "lucide-react";

import { useWishlistStore } from "@/stores/wishlist-store";

interface WishlistButtonProps {
  product: {
    id: string;
    title: string;
    price: number;
    image: string;
    slug: string;
  };
}

export default function WishlistButton({
  product,
}: WishlistButtonProps) {
  const {
    addItem,
    removeItem,
    isInWishlist,
  } = useWishlistStore();

  const active =
    isInWishlist(product.id);

  function toggleWishlist() {
    if (active) {
      removeItem(product.id);
    } else {
      addItem(product);
    }
  }

  return (
    <motion.button
      whileTap={{
        scale: 0.92,
      }}
      whileHover={{
        y: -2,
      }}
      transition={{
        duration: 0.3,
      }}
      onClick={toggleWishlist}
      className={`group relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border backdrop-blur-2xl transition duration-700 ${
        active
          ? "border-[#B89B72]/40 bg-[#B89B72]/15"
          : "border-white/[0.08] bg-white/[0.03]"
      }`}
    >

      {/* Glow */}
      <div
        className={`absolute inset-0 blur-xl transition duration-700 ${
          active
            ? "bg-[#B89B72]/20 opacity-100"
            : "bg-[#B89B72]/0 opacity-0 group-hover:opacity-100"
        }`}
      />

      {/* Heart */}
      <Heart
        className={`relative z-10 h-5 w-5 transition duration-500 ${
          active
            ? "fill-[#B89B72] text-[#B89B72]"
            : "text-white/70 group-hover:text-[#B89B72]"
        }`}
      />

      {/* Pulse */}
      {active && (
        <motion.div
          initial={{
            scale: 0,
            opacity: 0.5,
          }}
          animate={{
            scale: 2.2,
            opacity: 0,
          }}
          transition={{
            duration: 0.8,
          }}
          className="absolute h-10 w-10 rounded-full border border-[#B89B72]/30"
        />
      )}

    </motion.button>
  );
}