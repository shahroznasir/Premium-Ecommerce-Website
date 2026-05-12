"use client";

import Link from "next/link";

import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
  useReducedMotion,
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

import { useScrollStore } from "@/stores/scroll-store";

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

  const prefersReducedMotion =
    useReducedMotion();

  const { scrollY } =
    useScroll();

  const progress =
    useScrollStore(
      (state) => state.progress
    );

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

  /* =========================================================
     CINEMATIC NAVBAR EVOLUTION
  ========================================================== */

  const navbarScale =
    useTransform(
      () => 1 - progress * 0.02
    );

  const navbarY =
    useTransform(
      () => progress * -5
    );

  const borderOpacity =
    useTransform(
      () => 0.08 + progress * 0.1
    );

  const glowOpacity =
    useTransform(
      () => 0.34 - progress * 0.12
    );

  const blurOpacity =
    useTransform(
      () => 0.7 + progress * 0.14
    );

  useMotionValueEvent(
    scrollY,
    "change",
    (latest) => {
      setScrolled(latest > 40);
    }
  );

  return (
    <>
      {/* =========================================================
          SEARCH
      ========================================================== */}
      <LuxurySearch
        open={searchOpen}
        onClose={() =>
          setSearchOpen(false)
        }
      />

      {/* =========================================================
          MENU
      ========================================================== */}
      <FullscreenMenu
        open={menuOpen}
        onClose={() =>
          setMenuOpen(false)
        }
      />

      {/* =========================================================
          NAVBAR
      ========================================================== */}
      <motion.header
        initial={{
          y:
            prefersReducedMotion
              ? 0
              : -80,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          duration: 0.9,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{
          scale: navbarScale,
          y: navbarY,
        }}
        className="fixed left-1/2 top-4 md:top-7 z-[9999] w-[94%] max-w-[1480px] -translate-x-1/2"
      >

        {/* =========================================================
            CINEMATIC SHELL
        ========================================================== */}
        <motion.div
          style={{
            opacity: blurOpacity,
          }}
          className={`relative overflow-hidden rounded-full border transition-all duration-700 ${
            scrolled
              ? "border-white/[0.14] bg-[#0A0A0A]/82 shadow-[0_20px_80px_rgba(0,0,0,0.52)] backdrop-blur-[18px] md:backdrop-blur-[28px]"
              : "border-white/[0.1] bg-[#0A0A0A]/72 shadow-[0_18px_60px_rgba(0,0,0,0.42)] backdrop-blur-[14px] md:backdrop-blur-[22px]"
          }`}
        >

          {/* Floating Aura */}
          <motion.div
            style={{
              opacity: glowOpacity,
            }}
            className="pointer-events-none absolute inset-0 rounded-full shadow-[0_0_90px_rgba(0,0,0,0.38)]"
          />

          {/* Premium Reflection */}
          <div className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-b from-white/[0.12] via-white/[0.03] to-transparent opacity-60" />

          {/* Gold Edge Glow */}
          <div className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-r from-[#B89B72]/[0.12] via-transparent to-[#B89B72]/[0.12]" />

          {/* Moving Reflection */}
          {!prefersReducedMotion && (
            <motion.div
              animate={{
                x: ["-120%", "120%"],
              }}
              transition={{
                duration: 22,
                repeat: Infinity,
                ease: "linear",
              }}
              className="pointer-events-none absolute inset-y-0 hidden w-[24%] rotate-12 bg-gradient-to-r from-transparent via-white/[0.06] to-transparent blur-2xl md:block"
            />
          )}

          {/* Inner Border */}
          <motion.div
            style={{
              opacity: borderOpacity,
            }}
            className="pointer-events-none absolute inset-[1px] rounded-full border border-white/[0.06]"
          />

          {/* =========================================================
              CONTENT
          ========================================================== */}
          <div
            className={`relative flex items-center justify-between transition-all duration-700 ${
              scrolled
                ? "h-[62px] px-5 md:h-[70px] md:px-7 lg:px-9"
                : "h-[68px] px-5 md:h-[78px] md:px-8 lg:px-10"
            }`}
          >

            {/* =========================================================
                LOGO
            ========================================================== */}
            <Link
              href="/"
              className="group relative flex items-center gap-2.5 md:gap-3"
            >

              {/* Luxury Dot */}
              {!prefersReducedMotion && (
                <motion.div
                  animate={{
                    opacity: [0.6, 1, 0.6],
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="h-[5px] w-[5px] rounded-full bg-[#D6C2A3] shadow-[0_0_14px_rgba(214,194,163,0.7)]"
                />
              )}

              {/* Logo */}
              <span
                className={`font-medium uppercase tracking-[0.22em] md:tracking-[0.34em] text-white transition duration-500 group-hover:text-[#D6C2A3] ${
                  scrolled
                    ? "text-[9px] md:text-[10px]"
                    : "text-[9px] md:text-[11px]"
                }`}
              >

                THE DECOR ART STUDIO

              </span>

            </Link>

            {/* =========================================================
                NAVIGATION
            ========================================================== */}
            <nav className="hidden items-center gap-9 lg:flex">

              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="group relative overflow-hidden text-[10px] uppercase tracking-[0.22em] text-white/68 transition duration-500 hover:text-white"
                >

                  <span className="relative z-10">

                    {link.name}

                  </span>

                  <span className="absolute bottom-[-6px] left-0 h-px w-0 bg-[#D6C2A3] transition-all duration-700 group-hover:w-full" />

                </Link>
              ))}

            </nav>

            {/* =========================================================
                RIGHT SIDE
            ========================================================== */}
            <div className="flex items-center gap-2.5 md:gap-3 lg:gap-4">

              {/* Consultation */}
              <motion.button
                whileHover={{
                  y: -1,
                  scale: 1.01,
                }}
                transition={{
                  duration: 0.25,
                }}
                className="hidden rounded-full border border-white/[0.08] bg-white/[0.04] px-5 py-2.5 text-[10px] uppercase tracking-[0.28em] text-white/88 backdrop-blur-xl transition duration-500 hover:border-[#D6C2A3] hover:bg-[#D6C2A3] hover:text-black xl:block"
              >

                Consultation

              </motion.button>

              {/* Divider */}
              <div className="hidden h-5 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent xl:block" />

              {/* Search */}
              <LuxuryIconButton
                onClick={() =>
                  setSearchOpen(true)
                }
              >

                <Search className="h-[14px] w-[14px] text-white/82 transition duration-500 group-hover:text-[#D6C2A3]" />

              </LuxuryIconButton>

              {/* Cart */}
              <LuxuryIconButton
                onClick={openCart}
              >

                <ShoppingBag className="h-[14px] w-[14px] text-white/82 transition duration-500 group-hover:text-[#D6C2A3]" />

                {getTotalItems() > 0 && (
                  <motion.div
                    initial={{
                      scale: 0,
                    }}
                    animate={{
                      scale: 1,
                    }}
                    className="absolute -right-1 -top-1 flex h-[16px] min-w-[16px] items-center justify-center rounded-full border border-black/20 bg-[#D6C2A3] px-1 text-[8px] font-semibold text-black shadow-[0_0_20px_rgba(214,194,163,0.55)]"
                  >

                    {getTotalItems()}

                  </motion.div>
                )}

              </LuxuryIconButton>

              {/* Menu */}
              <LuxuryIconButton
                onClick={() =>
                  setMenuOpen(true)
                }
              >

                <div className="relative z-10 flex flex-col gap-[4px]">

                  <span className="h-px w-4 bg-white transition duration-500 group-hover:bg-[#D6C2A3]" />

                  <span className="h-px w-2.5 bg-white/70 transition duration-500 group-hover:w-4 group-hover:bg-[#D6C2A3]" />

                </div>

              </LuxuryIconButton>

            </div>

          </div>

        </motion.div>

      </motion.header>
    </>
  );
}

function LuxuryIconButton({
  children,
  onClick,
}: {
  children: React.ReactNode;

  onClick?: () => void;
}) {
  return (
    <motion.button
      whileHover={{
        y: -1,
        scale: 1.02,
      }}
      whileTap={{
        scale: 0.97,
      }}
      transition={{
        duration: 0.22,
      }}
      onClick={onClick}
      className="group relative flex h-9 w-9 md:h-10 md:w-10 items-center justify-center overflow-hidden rounded-full border border-white/[0.08] bg-white/[0.04] backdrop-blur-xl transition duration-500 hover:border-[#D6C2A3]"
    >

      {children}

    </motion.button>
  );
}