"use client";

import {
  useMemo,
  useState,
  useEffect,
} from "react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import {
  Search,
  SlidersHorizontal,
  ShoppingBag,
} from "lucide-react";

import { toast } from "sonner";

import RecentlyViewedCarousel from "@/components/shop/recently-viewed-carousel";

import CinematicProductCard from "@/components/product/cinematic-product-card";

import QuickViewModal from "@/components/shop/quick-view-modal";

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

  const [
    selectedCategory,
    setSelectedCategory,
  ] = useState("All");

  const [search, setSearch] =
    useState("");

  const [sort] =
    useState("latest");

  const [loadingProducts] =
    useState(false);

  /* =========================================================
      QUICK VIEW STATE
  ========================================================== */

  const [
    selectedProduct,
    setSelectedProduct,
  ] = useState<Product | null>(
    null
  );

  const [
    quickViewOpen,
    setQuickViewOpen,
  ] = useState(false);

  const { getTotalItems } =
    useCartStore();

  const { openCart } =
    useCartUIStore();

  /* =========================================================
      FILTER PRODUCTS
  ========================================================== */

  const filteredProducts =
    useMemo(() => {

      let filtered = [...products];

      /* CATEGORY */
      if (
        selectedCategory !==
        "All"
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
          filtered.filter(
            (product) =>
              product.title
                .toLowerCase()
                .includes(
                  search.toLowerCase()
                )
          );
      }

      /* SORT */
      if (sort === "low") {

        filtered.sort(
          (a, b) =>
            a.price -
            b.price
        );
      }

      if (sort === "high") {

        filtered.sort(
          (a, b) =>
            b.price -
            a.price
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
      EMPTY SEARCH FEEDBACK
  ========================================================== */

  useEffect(() => {

    if (
      search &&
      filteredProducts.length ===
        0
    ) {

      toast.error(
        "No luxury objects found"
      );
    }

  }, [
    search,
    filteredProducts.length,
  ]);

  /* =========================================================
      OPEN QUICK VIEW
  ========================================================== */

  function openQuickView(
    product: Product
  ) {

    setSelectedProduct(
      product
    );

    setQuickViewOpen(true);
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050505] text-white">

      {/* =========================================================
          QUICK VIEW MODAL
      ========================================================== */}
      <QuickViewModal
        product={selectedProduct}
        open={quickViewOpen}
        onClose={() =>
          setQuickViewOpen(false)
        }
      />

      {/* =========================================================
          ATMOSPHERIC DEPTH
      ========================================================== */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        <div className="absolute left-1/2 top-[-10%] h-[900px] w-[900px] -translate-x-1/2 rounded-full bg-[#B89B72]/[0.03] blur-[160px]" />

        <div className="absolute left-1/2 top-[5%] h-[1300px] w-[1300px] -translate-x-1/2 rounded-full border border-white/[0.025]" />

        <div className="absolute bottom-[-15%] right-[-10%] h-[600px] w-[600px] rounded-full bg-[#D6C2A3]/[0.03] blur-[140px]" />

      </div>

      {/* =========================================================
          SHOP EXPERIENCE
      ========================================================== */}
      <section className="relative z-10">

        <div className="container-luxury py-10 md:py-14">

          <div className="grid gap-10 lg:grid-cols-[300px_1fr] xl:gap-16">

            {/* =====================================================
                SIDEBAR
            ====================================================== */}
            <aside className="sticky top-28 hidden h-fit lg:block">

              <div className="overflow-hidden rounded-[2.8rem] border border-white/[0.05] bg-[#0A0A0A]/90 backdrop-blur-2xl">

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

                  <div className="flex items-center gap-4 rounded-full border border-white/[0.05] bg-black/20 px-5 py-4 backdrop-blur-md transition-all duration-500 focus-within:border-[#B89B72]/30">

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

              </div>

            </aside>

            {/* =====================================================
                PRODUCTS AREA
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

                {/* CART */}
                <button
                  onClick={openCart}
                  className="relative flex h-11 w-11 items-center justify-center rounded-full border border-white/[0.05] bg-white/[0.02] text-white/55 transition-all duration-500 hover:scale-[1.03] hover:border-[#B89B72]/20 hover:bg-white/[0.05] hover:text-white"
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

              {/* =====================================================
                  PRODUCTS GRID
              ====================================================== */}
              {loadingProducts ? (

                <div className="grid gap-8 md:grid-cols-2 2xl:grid-cols-3">

                  {Array.from({
                    length: 6,
                  }).map((_, index) => (

                    <CinematicProductCard
                      key={index}
                      loading
                    />

                  ))}

                </div>

              ) : filteredProducts.length ===
                0 ? (

                <div className="flex min-h-[480px] flex-col items-center justify-center rounded-[2.8rem] border border-white/[0.05] bg-white/[0.02] px-8 text-center backdrop-blur-xl">

                  <p className="text-[10px] uppercase tracking-[0.45em] text-[#B89B72]/70">

                    No Results

                  </p>

                  <h2 className="mt-6 text-4xl font-light tracking-[-0.06em] text-white">

                    No Luxury Objects Found

                  </h2>

                  <p className="mt-6 max-w-md text-sm leading-8 text-white/40">

                    Try refining your search,
                    category, or collection
                    preferences.

                  </p>

                </div>

              ) : (

                <AnimatePresence mode="wait">

                  <motion.div
                    key={`${selectedCategory}-${search}`}
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

                          {/* QUICK VIEW BUTTON */}
                          <button
                            onClick={() =>
                              openQuickView(
                                product
                              )
                            }
                            className="absolute right-5 top-5 z-20 rounded-full border border-white/[0.08] bg-black/50 px-5 py-3 text-[10px] uppercase tracking-[0.34em] text-white opacity-0 backdrop-blur-xl transition-all duration-500 hover:border-[#B89B72]/30 hover:bg-[#B89B72]/10 hover:text-[#D6C2A3] group-hover:opacity-100"
                          >

                            Quick View

                          </button>

                          <CinematicProductCard
                            slug={
                              product.slug
                            }
                            name={
                              product.title
                            }
                            price={
                              product.price
                            }
                            image={
                              product.image
                            }
                            category={
                              product.category
                            }
                          />

                        </motion.div>

                      )
                    )}

                  </motion.div>

                </AnimatePresence>

              )}

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