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
     ATMOSPHERIC NAVBAR MOTION
  ========================================================== */

  const navbarScale =
    useTransform(
      () => 1 - progress * 0.01
    );

  const navbarY =
    useTransform(
      () => progress * -3
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
              : -50,
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
        className="fixed left-1/2 top-4 md:top-6 z-[9999] w-[94%] max-w-[1460px] -translate-x-1/2"
      >

        {/* =========================================================
            SHELL
        ========================================================== */}
        <div
          className={`relative overflow-hidden rounded-[2rem] border transition-all duration-700 ${
            scrolled
              ? "border-white/[0.05] bg-black/22 backdrop-blur-md"
              : "border-white/[0.04] bg-black/12 backdrop-blur-sm"
          }`}
        >

          {/* Subtle Reflection */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.05] to-transparent" />

          {/* Atmospheric Edge */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.14] to-transparent" />

          {/* =========================================================
              CONTENT
          ========================================================== */}
          <div
            className={`relative flex items-center justify-between transition-all duration-700 ${
              scrolled
                ? "h-[62px] px-5 md:h-[68px] md:px-8"
                : "h-[68px] px-5 md:h-[76px] md:px-9"
            }`}
          >

            {/* =========================================================
                LOGO
            ========================================================== */}
            <Link
              href="/"
              className="group flex items-center"
            >

              <span
                className={`font-medium uppercase text-white transition duration-500 group-hover:text-[#D6C2A3] ${
                  scrolled
                    ? "text-[9px] tracking-[0.32em] md:text-[10px]"
                    : "text-[9px] tracking-[0.38em] md:text-[11px]"
                }`}
              >

                THE DECOR ART STUDIO

              </span>

            </Link>

            {/* =========================================================
                NAVIGATION
            ========================================================== */}
            <nav className="hidden items-center gap-10 lg:flex">

              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="group relative text-[10px] uppercase tracking-[0.24em] text-white/58 transition duration-500 hover:text-white"
                >

                  {link.name}

                  <span className="absolute -bottom-2 left-0 h-px w-0 bg-[#D6C2A3] transition-all duration-700 group-hover:w-full" />

                </Link>
              ))}

            </nav>

            {/* =========================================================
                RIGHT SIDE
            ========================================================== */}
            <div className="flex items-center gap-2 md:gap-3">

              {/* Consultation */}
              <motion.button
                whileHover={{
                  y: -1,
                }}
                transition={{
                  duration: 0.25,
                }}
                className="hidden rounded-[1.1rem] border border-white/[0.06] bg-white/[0.03] px-5 py-3 text-[10px] uppercase tracking-[0.28em] text-white/85 transition duration-500 hover:border-[#D6C2A3]/40 hover:bg-white/[0.06] xl:block"
              >

                Consultation

              </motion.button>

              {/* Search */}
              <LuxuryIconButton
                onClick={() =>
                  setSearchOpen(true)
                }
              >

                <Search className="h-[14px] w-[14px] text-white/75 transition duration-500 group-hover:text-[#D6C2A3]" />

              </LuxuryIconButton>

              {/* Cart */}
              <LuxuryIconButton
                onClick={openCart}
              >

                <ShoppingBag className="h-[14px] w-[14px] text-white/75 transition duration-500 group-hover:text-[#D6C2A3]" />

                {getTotalItems() > 0 && (
                  <motion.div
                    initial={{
                      scale: 0,
                    }}
                    animate={{
                      scale: 1,
                    }}
                    className="absolute -right-1 -top-1 flex h-[16px] min-w-[16px] items-center justify-center rounded-full bg-[#D6C2A3] px-1 text-[8px] font-semibold text-black"
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

                <div className="flex flex-col gap-[4px]">

                  <span className="h-px w-4 bg-white transition duration-500 group-hover:bg-[#D6C2A3]" />

                  <span className="h-px w-2.5 bg-white/70 transition duration-500 group-hover:w-4 group-hover:bg-[#D6C2A3]" />

                </div>

              </LuxuryIconButton>

            </div>

          </div>

        </div>

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
      }}
      whileTap={{
        scale: 0.98,
      }}
      transition={{
        duration: 0.2,
      }}
      onClick={onClick}
      className="group relative flex h-9 w-9 md:h-10 md:w-10 items-center justify-center overflow-hidden rounded-[1rem] border border-white/[0.05] bg-white/[0.03] transition duration-500 hover:border-[#D6C2A3]/40 hover:bg-white/[0.05]"
    >

      {children}

    </motion.button>
  );
}