"use client";

import { useMemo, useState } from "react";

import Link from "next/link";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import {
  Search,
  SlidersHorizontal,
  Heart,
  ShoppingBag,
} from "lucide-react";

import LuxuryImage from "@/components/common/luxury-image";

import RecentlyViewedCarousel from "@/components/shop/recently-viewed-carousel";

import { useCartStore } from "@/stores/cart-store";
import { useCartUIStore } from "@/stores/cart-ui-store";

interface Product {
  id: string;
  title: string;
  slug: string;
  category: string;
  image: string;
  price: number;
  description: string;
}

interface ShopClientProps {
  products: Product[];
}

const categories = [
  "All",
  "Luxury Lighting",
  "Modern Furniture",
  "Signature Timepiece",
];

export default function ShopClient({
  products,
}: ShopClientProps) {

  const [selectedCategory, setSelectedCategory] =
    useState("All");

  const [search, setSearch] =
    useState("");

  const [sort, setSort] =
    useState("latest");

  const [addedId, setAddedId] =
    useState<string | null>(null);

  const { addItem, getTotalItems } =
    useCartStore();

  const { openCart } =
    useCartUIStore();

  const filteredProducts =
    useMemo(() => {

      let filtered = [...products];

      /* CATEGORY */
      if (
        selectedCategory !== "All"
      ) {
        filtered =
          filtered.filter(
            (product) =>
              product.category ===
              selectedCategory
          );
      }

      /* SEARCH */
      if (search) {
        filtered =
          filtered.filter((product) =>
            product.title
              .toLowerCase()
              .includes(
                search.toLowerCase()
              )
          );
      }

      /* SORTING */
      if (sort === "low") {
        filtered.sort(
          (a, b) =>
            a.price - b.price
        );
      }

      if (sort === "high") {
        filtered.sort(
          (a, b) =>
            b.price - a.price
        );
      }

      return filtered;

    }, [
      products,
      selectedCategory,
      search,
      sort,
    ]);

  /* =========================================================
     ADD TO CART
  ========================================================== */

  const handleAddToCart = (
    product: Product
  ) => {

    addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
    });

    setAddedId(product.id);

    openCart();

    setTimeout(() => {
      setAddedId(null);
    }, 1600);
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050505] text-white">

      {/* =========================================================
          ATMOSPHERIC DEPTH
      ========================================================== */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        {/* Main Glow */}
        <div className="absolute left-1/2 top-[-10%] h-[900px] w-[900px] -translate-x-1/2 rounded-full bg-[#B89B72]/[0.03] blur-[160px]" />

        {/* Ambient Ring */}
        <div className="absolute left-1/2 top-[5%] h-[1300px] w-[1300px] -translate-x-1/2 rounded-full border border-white/[0.025]" />

      </div>

      {/* =========================================================
          SHOP EXPERIENCE
      ========================================================== */}
      <section className="relative z-10">

        <div className="container-luxury py-10 md:py-14">

          <div className="grid gap-10 lg:grid-cols-[280px_1fr] xl:gap-14">

            {/* =====================================================
                SIDEBAR
            ====================================================== */}
            <aside className="sticky top-28 hidden h-fit lg:block">

              <div className="overflow-hidden rounded-[2.4rem] border border-white/[0.05] bg-[#0A0A0A]/90 backdrop-blur-md">

                {/* HEADER */}
                <div className="flex items-center justify-between border-b border-white/[0.05] p-7">

                  <div className="flex items-center gap-3">

                    <SlidersHorizontal
                      size={15}
                      className="text-[#B89B72]"
                    />

                    <p className="text-[10px] uppercase tracking-[0.38em] text-white/60">

                      Refine

                    </p>

                  </div>

                  <p className="text-xs text-white/35">

                    {filteredProducts.length}
                    {" "}
                    Objects

                  </p>

                </div>

                {/* SEARCH */}
                <div className="border-b border-white/[0.05] p-7">

                  <div className="flex items-center gap-4 rounded-full border border-white/[0.05] bg-black/20 px-5 py-4 backdrop-blur-md">

                    <Search
                      size={15}
                      className="text-white/35"
                    />

                    <input
                      value={search}
                      onChange={(e) =>
                        setSearch(
                          e.target.value
                        )
                      }
                      placeholder="Search objects"
                      className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/25"
                    />

                  </div>

                </div>

                {/* COLLECTIONS */}
                <div className="p-7">

                  <p className="mb-7 text-[10px] uppercase tracking-[0.38em] text-[#B89B72]/70">

                    Collections

                  </p>

                  <div className="space-y-3">

                    {categories.map(
                      (category) => (
                        <button
                          key={category}
                          onClick={() =>
                            setSelectedCategory(
                              category
                            )
                          }
                          className={`flex w-full items-center justify-between rounded-full px-5 py-4 text-left text-sm transition-all duration-500 ${
                            selectedCategory ===
                            category
                              ? "bg-white text-black"
                              : "border border-white/[0.05] bg-white/[0.02] text-white/65 hover:border-[#B89B72]/20 hover:bg-white/[0.04]"
                          }`}
                        >

                          {category}

                        </button>
                      )
                    )}

                  </div>

                </div>

                {/* SORT */}
                <div className="border-t border-white/[0.05] p-7">

                  <p className="mb-5 text-[10px] uppercase tracking-[0.38em] text-[#B89B72]/70">

                    Sort

                  </p>

                  <select
                    value={sort}
                    onChange={(e) =>
                      setSort(
                        e.target.value
                      )
                    }
                    className="w-full rounded-full border border-white/[0.05] bg-black/20 px-5 py-4 text-sm text-white outline-none"
                  >

                    <option value="latest">

                      Latest

                    </option>

                    <option value="low">

                      Price: Low To High

                    </option>

                    <option value="high">

                      Price: High To Low

                    </option>

                  </select>

                </div>

                {/* SPATIAL PHILOSOPHY */}
                <div className="border-t border-white/[0.05] p-7">

                  <p className="text-[10px] uppercase tracking-[0.45em] text-[#c9a961]">

                    Spatial Philosophy

                  </p>

                  <p className="mt-5 text-sm leading-8 text-white/40">

                    Designed for cinematic interiors,
                    sculptural restraint, timeless
                    architecture, and elevated living.

                  </p>

                </div>

              </div>

            </aside>

            {/* =====================================================
                PRODUCTS
            ====================================================== */}
            <div>

              {/* TOP BAR */}
              <div className="mb-12 flex items-center justify-between border-b border-white/[0.05] pb-7">

                <div>

                  <p className="text-[10px] uppercase tracking-[0.42em] text-[#c9a961]/80">

                    Curated Objects

                  </p>

                  <p className="mt-3 text-sm text-white/38">

                    Architectural luxury collection

                  </p>

                </div>

                {/* ACTIONS */}
                <div className="flex items-center gap-3">

                  {/* Wishlist */}
                  <button className="flex h-11 w-11 items-center justify-center rounded-full border border-white/[0.05] bg-white/[0.02] text-white/55 transition-all duration-500 hover:border-[#B89B72]/20 hover:bg-white/[0.05] hover:text-white">

                    <Heart size={15} />

                  </button>

                  {/* Cart */}
                  <button
                    onClick={openCart}
                    className="relative flex h-11 w-11 items-center justify-center rounded-full border border-white/[0.05] bg-white/[0.02] text-white/55 transition-all duration-500 hover:border-[#B89B72]/20 hover:bg-white/[0.05] hover:text-white"
                  >

                    <ShoppingBag
                      size={15}
                    />

                    {getTotalItems() >
                      0 && (
                      <motion.div
                        initial={{
                          scale: 0,
                        }}
                        animate={{
                          scale: 1,
                        }}
                        className="absolute -right-1 -top-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-white px-1 text-[9px] font-medium text-black"
                      >

                        {getTotalItems()}

                      </motion.div>
                    )}

                  </button>

                </div>

              </div>

              {/* =====================================================
                  PRODUCTS GRID
              ====================================================== */}
              <AnimatePresence mode="wait">

                <motion.div
                  key={`${selectedCategory}-${sort}-${search}`}
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: 20,
                  }}
                  transition={{
                    duration: 0.45,
                  }}
                  className="grid gap-8 md:grid-cols-2 2xl:grid-cols-3"
                >

                  {filteredProducts.map(
                    (
                      product,
                      index
                    ) => (
                      <motion.div
                        key={product.id}
                        initial={{
                          opacity: 0,
                          y: 50,
                        }}
                        whileInView={{
                          opacity: 1,
                          y: 0,
                        }}
                        transition={{
                          duration: 0.8,
                          delay:
                            index * 0.05,
                        }}
                        viewport={{
                          once: true,
                        }}
                        className="group relative"
                      >

                        {/* =================================================
                            PRODUCT CARD
                        ================================================== */}
                        <div className="group relative overflow-hidden rounded-[2.6rem] border border-white/[0.05] bg-[#0A0A0A]/90 backdrop-blur-md transition-all duration-700 hover:-translate-y-2 hover:border-[#B89B72]/20">

                          {/* IMAGE */}
                          <div className="relative aspect-[0.72] overflow-hidden bg-[#0F0F0F]">

                            <LuxuryImage
                              src={
                                product.image
                              }
                              alt={
                                product.title
                              }
                              className="h-full w-full object-cover transition-transform duration-[1800ms] ease-out group-hover:scale-[1.03]"
                            />

                            {/* OVERLAYS */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />

                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(201,169,97,0.12),transparent_40%)]" />

                            <div className="absolute inset-0 shadow-[inset_0_0_120px_rgba(0,0,0,0.45)]" />

                          </div>

                          {/* CONTENT */}
                          <div className="px-8 pb-8 pt-7">

                            {/* CATEGORY */}
                            <p className="text-[10px] uppercase tracking-[0.4em] text-[#c9a961]/78">

                              {
                                product.category
                              }

                            </p>

                            {/* TITLE */}
                            <Link
                              href={`/shop/${product.slug}`}
                            >

                              <h2 className="mt-5 max-w-[11ch] font-serif text-[2.2rem] leading-[0.92] tracking-[-0.06em] text-white transition-all duration-500 hover:text-[#D6C2A3]">

                                {
                                  product.title
                                }

                              </h2>

                            </Link>

                            {/* DESCRIPTION */}
                            <p className="mt-5 max-w-[30ch] text-[0.95rem] leading-[1.95] text-white/42">

                              Sculptural luxury object
                              designed through architectural
                              restraint, timeless materiality,
                              and refined modern living.

                            </p>

                            {/* BOTTOM */}
                            <div className="mt-10 flex items-center justify-between gap-5">

                              {/* PRICE */}
                              <div>

                                <p className="text-[9px] uppercase tracking-[0.34em] text-white/28">

                                  Curated Piece

                                </p>

                                <p className="mt-3 text-[1.7rem] font-light tracking-[-0.05em] text-white">

                                  ₹
                                  {product.price.toLocaleString(
                                    "en-IN"
                                  )}

                                </p>

                              </div>

                              {/* ACTIONS */}
                              <div className="flex items-center gap-3">

                                {/* Wishlist */}
                                <button className="flex h-11 w-11 items-center justify-center rounded-full border border-white/[0.06] bg-white/[0.02] text-white/55 transition-all duration-500 hover:border-[#B89B72]/20 hover:bg-white/[0.05] hover:text-white">

                                  <Heart
                                    size={15}
                                  />

                                </button>

                                {/* Add */}
                                <button
                                  onClick={() =>
                                    handleAddToCart(
                                      product
                                    )
                                  }
                                  className={`rounded-full px-6 py-3 text-[10px] uppercase tracking-[0.34em] transition-all duration-500 ${
                                    addedId ===
                                    product.id
                                      ? "bg-white text-black"
                                      : "border border-white/[0.08] bg-white text-black hover:scale-[1.02]"
                                  }`}
                                >

                                  {addedId ===
                                  product.id
                                    ? "Added"
                                    : "Add"}

                                </button>

                              </div>

                            </div>

                          </div>

                        </div>

                      </motion.div>
                    )
                  )}

                </motion.div>

              </AnimatePresence>

            </div>

          </div>

        </div>

      </section>

      {/* =========================================================
          RECENTLY VIEWED
      ========================================================== */}
      <RecentlyViewedCarousel />

    </main>
  );
}