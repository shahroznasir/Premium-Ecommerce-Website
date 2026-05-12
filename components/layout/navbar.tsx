"use client";

import Link from "next/link";

import {
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";

import { useState } from "react";

import {
  Search,
  ShoppingBag,
} from "lucide-react";

import FullscreenMenu from "@/components/layout/fullscreen-menu";
import LuxurySearch from "@/components/search/luxury-search";

import { useCartStore } from "@/stores/cart-store";
import { useCartUIStore } from "@/stores/cart-ui-store";

const navLinks = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Collections",
    href: "/collections",
  },
  {
    name: "Shop",
    href: "/shop",
  },
  {
    name: "Projects",
    href: "/projects",
  },
  {
    name: "About",
    href: "/about",
  },
];

export default function Navbar() {
  const { scrollY } = useScroll();

  const [scrolled, setScrolled] =
    useState(false);

  const [menuOpen, setMenuOpen] =
    useState(false);

  const [searchOpen, setSearchOpen] =
    useState(false);

  const { getTotalItems } =
    useCartStore();

  const { openCart } =
    useCartUIStore();

  useMotionValueEvent(
    scrollY,
    "change",
    (latest) => {
      setScrolled(latest > 40);
    }
  );

  return (
    <>
      {/* ================= SEARCH ================= */}
      <LuxurySearch
        open={searchOpen}
        onClose={() =>
          setSearchOpen(false)
        }
      />

      {/* ================= MENU ================= */}
      <FullscreenMenu
        open={menuOpen}
        onClose={() =>
          setMenuOpen(false)
        }
      />

      {/* ================= NAVBAR ================= */}
      <motion.header
        initial={{
          y: -100,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          duration: 1,
          ease: [0.22, 1, 0.36, 1],
        }}
        className={`fixed left-1/2 top-7 z-[9999] w-[94%] max-w-[1480px] -translate-x-1/2 overflow-hidden rounded-full border transition-all duration-700 ${
          scrolled
            ? "border-white/[0.16] bg-[#0A0A0A]/82 shadow-[0_30px_120px_rgba(0,0,0,0.62)] backdrop-blur-[26px]"
            : "border-white/[0.12] bg-[#0A0A0A]/72 shadow-[0_24px_90px_rgba(0,0,0,0.48)] backdrop-blur-[22px]"
        }`}
      >

        {/* Floating Aura */}
        <div className="pointer-events-none absolute inset-0 rounded-full shadow-[0_0_120px_rgba(0,0,0,0.45)]" />

        {/* Premium Reflection */}
        <div className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-b from-white/[0.14] via-white/[0.04] to-transparent opacity-60" />

        {/* Gold Edge Glow */}
        <div className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-r from-[#B89B72]/[0.16] via-transparent to-[#B89B72]/[0.16]" />

        {/* Moving Reflection */}
        <motion.div
          animate={{
            x: ["-120%", "120%"],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "linear",
          }}
          className="pointer-events-none absolute inset-y-0 w-[26%] rotate-12 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent blur-2xl"
        />

        {/* Inner Border */}
        <div className="pointer-events-none absolute inset-[1px] rounded-full border border-white/[0.08]" />

        {/* ================= CONTENT ================= */}
        <div
          className={`relative flex items-center justify-between transition-all duration-700 ${
            scrolled
              ? "h-[70px] px-7 lg:px-9"
              : "h-[78px] px-8 lg:px-10"
          }`}
        >

          {/* ================= LOGO ================= */}
          <Link
            href="/"
            className="group relative flex items-center gap-3"
          >

            {/* Luxury Dot */}
            <motion.div
              animate={{
                opacity: [0.6, 1, 0.6],
                scale: [1, 1.08, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="h-[6px] w-[6px] rounded-full bg-[#D6C2A3] shadow-[0_0_18px_rgba(214,194,163,0.8)]"
            />

            {/* Logo */}
            <span
              className={`font-medium uppercase tracking-[0.34em] text-white transition duration-500 group-hover:text-[#D6C2A3] ${
                scrolled
                  ? "text-[10px]"
                  : "text-[11px]"
              }`}
            >

              THE DECOR ART STUDIO

            </span>

          </Link>

          {/* ================= NAVIGATION ================= */}
          <nav className="hidden items-center gap-11 md:flex">

            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="group relative overflow-hidden text-[10px] uppercase tracking-[0.24em] text-white/70 transition duration-500 hover:text-white"
              >

                {/* Text */}
                <span className="relative z-10">

                  {link.name}

                </span>

                {/* Hover Line */}
                <span className="absolute bottom-[-6px] left-0 h-px w-0 bg-[#D6C2A3] transition-all duration-700 group-hover:w-full" />

              </Link>
            ))}

          </nav>

          {/* ================= RIGHT SIDE ================= */}
          <div className="flex items-center gap-3 lg:gap-4">

            {/* Consultation */}
            <motion.button
              whileHover={{
                y: -1,
              }}
              transition={{
                duration: 0.3,
              }}
              className="hidden rounded-full border border-white/[0.1] bg-white/[0.04] px-5 py-2.5 text-[10px] uppercase tracking-[0.3em] text-white/88 backdrop-blur-xl transition duration-500 hover:border-[#D6C2A3] hover:bg-[#D6C2A3] hover:text-black lg:block"
            >

              Consultation

            </motion.button>

            {/* Divider */}
            <div className="hidden h-5 w-px bg-gradient-to-b from-transparent via-white/25 to-transparent lg:block" />

            {/* ================= SEARCH ================= */}
            <motion.button
              whileHover={{
                y: -1,
              }}
              whileTap={{
                scale: 0.97,
              }}
              transition={{
                duration: 0.25,
              }}
              onClick={() =>
                setSearchOpen(true)
              }
              className="group relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-white/[0.1] bg-white/[0.04] backdrop-blur-xl transition duration-500 hover:border-[#D6C2A3]"
            >

              <Search className="relative z-10 h-[15px] w-[15px] text-white/85 transition duration-500 group-hover:text-[#D6C2A3]" />

            </motion.button>

            {/* ================= CART ================= */}
            <motion.button
              whileHover={{
                y: -1,
              }}
              whileTap={{
                scale: 0.97,
              }}
              transition={{
                duration: 0.25,
              }}
              onClick={openCart}
              className="group relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-white/[0.1] bg-white/[0.04] backdrop-blur-xl transition duration-500 hover:border-[#D6C2A3]"
            >

              <ShoppingBag className="relative z-10 h-[15px] w-[15px] text-white/85 transition duration-500 group-hover:text-[#D6C2A3]" />

              {/* Count */}
              {getTotalItems() > 0 && (
                <motion.div
                  initial={{
                    scale: 0,
                  }}
                  animate={{
                    scale: 1,
                  }}
                  className="absolute -right-1 -top-1 flex h-[17px] min-w-[17px] items-center justify-center rounded-full border border-black/20 bg-[#D6C2A3] px-1 text-[8px] font-semibold text-black shadow-[0_0_24px_rgba(214,194,163,0.7)]"
                >

                  {getTotalItems()}

                </motion.div>
              )}

            </motion.button>

            {/* ================= MENU ================= */}
            <motion.button
              whileHover={{
                y: -1,
              }}
              whileTap={{
                scale: 0.97,
              }}
              transition={{
                duration: 0.25,
              }}
              onClick={() =>
                setMenuOpen(true)
              }
              className="group relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-white/[0.1] bg-white/[0.04] backdrop-blur-xl transition duration-500 hover:border-[#D6C2A3]"
            >

              {/* Lines */}
              <div className="relative z-10 flex flex-col gap-[4px]">

                <span className="h-px w-4 bg-white transition duration-500 group-hover:bg-[#D6C2A3]" />

                <span className="h-px w-2.5 bg-white/70 transition duration-500 group-hover:w-4 group-hover:bg-[#D6C2A3]" />

              </div>

            </motion.button>

          </div>

        </div>

      </motion.header>
    </>
  );
}