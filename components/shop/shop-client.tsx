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

      // Category
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

      // Search
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

      // Sorting
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

      {/* ================= ATMOSPHERE ================= */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        {/* Main Glow */}
        <div className="absolute left-1/2 top-[-10%] h-[1000px] w-[1000px] -translate-x-1/2 rounded-full bg-[#B89B72]/[0.035] blur-[180px]" />

        {/* Ambient Ring */}
        <div className="absolute left-1/2 top-[10%] h-[1400px] w-[1400px] -translate-x-1/2 rounded-full border border-white/[0.03]" />

      </div>

      {/* ================= HERO ================= */}
      <section className="relative z-10 border-b border-white/[0.06] pt-36">

        <div className="container-luxury pb-20">

          <div className="max-w-4xl">

            {/* Label */}
            <p className="mb-8 text-[10px] uppercase tracking-[0.45em] text-[#B89B72]/75">

              Curated Luxury Commerce

            </p>

            {/* Heading */}
            <h1 className="max-w-[10ch] text-5xl font-light leading-[0.88] tracking-[-0.08em] text-white md:text-[6.5rem]">

              Objects
              <br />
              For Elevated
              <br />
              Living

            </h1>

            {/* Description */}
            <p className="mt-10 max-w-2xl text-[1rem] leading-[2] text-white/48">

              Discover sculptural interiors,
              timeless lighting, and
              architectural objects curated
              through restraint, atmosphere,
              and refined modern luxury.

            </p>

          </div>

        </div>

      </section>

      {/* ================= SHOP ================= */}
      <section className="relative z-10">

        <div className="container-luxury py-16">

          <div className="grid gap-14 lg:grid-cols-[280px_1fr]">

            {/* ================= SIDEBAR ================= */}
            <aside className="sticky top-28 hidden h-fit lg:block">

              <div className="overflow-hidden rounded-[2rem] border border-white/[0.05] bg-[#0A0A0A]">

                {/* Header */}
                <div className="flex items-center justify-between border-b border-white/[0.05] p-7">

                  <div className="flex items-center gap-3">

                    <SlidersHorizontal
                      size={15}
                      className="text-[#B89B72]"
                    />

                    <p className="text-[10px] uppercase tracking-[0.35em] text-white/60">

                      Refine

                    </p>

                  </div>

                  <p className="text-xs text-white/35">

                    {filteredProducts.length}
                    {" "}
                    Objects

                  </p>

                </div>

                {/* Search */}
                <div className="border-b border-white/[0.05] p-7">

                  <div className="flex items-center gap-4 rounded-full border border-white/[0.05] bg-black/20 px-5 py-4">

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

                {/* Categories */}
                <div className="p-7">

                  <p className="mb-7 text-[10px] uppercase tracking-[0.35em] text-[#B89B72]/70">

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
                          className={`flex w-full items-center justify-between rounded-full px-5 py-4 text-left text-sm transition duration-300 ${
                            selectedCategory ===
                            category
                              ? "bg-white text-black"
                              : "border border-white/[0.05] bg-white/[0.02] text-white/65 hover:border-white/[0.08]"
                          }`}
                        >

                          {category}

                        </button>
                      )
                    )}

                  </div>

                </div>

                {/* Sorting */}
                <div className="border-t border-white/[0.05] p-7">

                  <p className="mb-5 text-[10px] uppercase tracking-[0.35em] text-[#B89B72]/70">

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

              </div>

            </aside>

            {/* ================= PRODUCTS ================= */}
            <div>

              {/* Top Bar */}
              <div className="mb-12 flex items-center justify-between border-b border-white/[0.05] pb-7">

                <p className="text-[10px] uppercase tracking-[0.4em] text-[#B89B72]/70">

                  Curated Objects

                </p>

                <div className="flex items-center gap-3">

                  {/* Wishlist */}
                  <button className="flex h-11 w-11 items-center justify-center rounded-full border border-white/[0.05] bg-white/[0.02] text-white/55 transition duration-300 hover:border-white/[0.08] hover:text-white">

                    <Heart size={15} />

                  </button>

                  {/* Cart */}
                  <button
                    onClick={openCart}
                    className="relative flex h-11 w-11 items-center justify-center rounded-full border border-white/[0.05] bg-white/[0.02] text-white/55 transition duration-300 hover:border-white/[0.08] hover:text-white"
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

              {/* Products Grid */}
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
                    duration: 0.4,
                  }}
                  className="grid gap-7 md:grid-cols-2 2xl:grid-cols-3"
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
                          y: 40,
                        }}
                        whileInView={{
                          opacity: 1,
                          y: 0,
                        }}
                        transition={{
                          duration: 0.7,
                          delay:
                            index * 0.05,
                        }}
                        viewport={{
                          once: true,
                        }}
                        className="group relative"
                      >

                        {/* ================= CARD ================= */}
                        <div className="group relative overflow-hidden rounded-[2.2rem] border border-white/[0.05] bg-[#0A0A0A] transition duration-500 hover:border-white/[0.08]">

                          {/* Image */}
                          <div className="relative overflow-hidden bg-[#0F0F0F]">

                            <div className="relative h-[520px] overflow-hidden">

                              <LuxuryImage
                                src={
                                  product.image
                                }
                                alt={
                                  product.title
                                }
                                className="h-full w-full transition duration-[1600ms] group-hover:scale-[1.015]"
                              />

                            </div>

                          </div>

                          {/* Content */}
                          <div className="px-8 pb-8 pt-7">

                            {/* Category */}
                            <p className="text-[10px] uppercase tracking-[0.32em] text-white/35">

                              {
                                product.category
                              }

                            </p>

                            {/* Title */}
                            <Link
                              href={`/shop/${product.slug}`}
                            >

                              <h2 className="mt-5 max-w-[12ch] text-[2.1rem] font-light leading-[1] tracking-[-0.06em] text-white transition duration-300 hover:text-[#D6C2A3]">

                                {
                                  product.title
                                }

                              </h2>

                            </Link>

                            {/* Description */}
                            <p className="mt-5 max-w-[32ch] text-[0.95rem] leading-[1.9] text-white/42">

                              Sculptural luxury object designed
                              through architectural restraint,
                              timeless materiality, and refined
                              modern living.

                            </p>

                            {/* Bottom */}
                            <div className="mt-10 flex items-center justify-between">

                              {/* Price */}
                              <div>

                                <p className="text-[1.7rem] font-light tracking-[-0.05em] text-white">

                                  ₹
                                  {product.price.toLocaleString(
                                    "en-IN"
                                  )}

                                </p>

                              </div>

                              {/* Actions */}
                              <div className="flex items-center gap-3">

                                {/* Wishlist */}
                                <button className="flex h-11 w-11 items-center justify-center rounded-full border border-white/[0.06] bg-white/[0.02] text-white/55 transition duration-300 hover:border-white/[0.12] hover:text-white">

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
                                  className={`rounded-full px-6 py-3 text-[10px] uppercase tracking-[0.32em] transition duration-300 ${
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

      {/* ================= RECENTLY VIEWED ================= */}
      <RecentlyViewedCarousel />

    </main>
  );
}