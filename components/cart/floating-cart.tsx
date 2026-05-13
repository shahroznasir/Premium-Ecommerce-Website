"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import {
  Minus,
  Plus,
  X,
} from "lucide-react";

import { useCartStore } from "@/stores/cart-store";
import { useCartUIStore } from "@/stores/cart-ui-store";

export default function FloatingCart() {

  const router = useRouter();

  const {
    items,
    removeItem,
    increaseQuantity,
    decreaseQuantity,
    getTotalPrice,
  } = useCartStore();

  const {
    isOpen,
    closeCart,
  } = useCartUIStore();

  /* =========================================================
     HANDLE CHECKOUT
  ========================================================== */

  function handleCheckout() {

    closeCart();

    setTimeout(() => {

      router.push("/checkout");

    }, 250);
  }

  return (
    <AnimatePresence>

      {isOpen && (
        <>

          {/* =====================================================
              BACKDROP
          ====================================================== */}
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
            onClick={closeCart}
            className="fixed inset-0 z-[9998] bg-black/50 backdrop-blur-[20px]"
          />

          {/* =====================================================
              CART PANEL
          ====================================================== */}
          <motion.div
            initial={{
              x: "100%",
            }}
            animate={{
              x: 0,
            }}
            exit={{
              x: "100%",
            }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="fixed right-0 top-0 z-[9999] flex h-screen w-full max-w-[520px] flex-col overflow-hidden border-l border-white/[0.06] bg-[#050505]/95 backdrop-blur-3xl"
          >

            {/* =====================================================
                ATMOSPHERIC GLOW
            ====================================================== */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">

              <div className="absolute right-[-20%] top-[-10%] h-[500px] w-[500px] rounded-full bg-[#B89B72]/10 blur-[140px]" />

              <div className="absolute bottom-[-20%] left-[-10%] h-[400px] w-[400px] rounded-full bg-[#B89B72]/5 blur-[120px]" />

            </div>

            {/* =====================================================
                HEADER
            ====================================================== */}
            <div className="relative z-10 flex items-center justify-between border-b border-white/[0.06] px-6 py-6 md:px-8 md:py-7">

              <div>

                <p className="text-[10px] uppercase tracking-[0.45em] text-[#B89B72]/70">

                  Luxury Cart

                </p>

                <h2 className="mt-3 text-2xl font-light tracking-[-0.06em] text-white md:text-3xl">

                  Shopping Bag

                </h2>

              </div>

              {/* Close */}
              <button
                onClick={closeCart}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/[0.06] bg-white/[0.03] text-white/60 transition duration-500 hover:border-[#B89B72]/30 hover:text-white"
              >

                <X size={18} />

              </button>

            </div>

            {/* =====================================================
                EMPTY STATE
            ====================================================== */}
            {items.length === 0 && (

              <div className="flex flex-1 flex-col items-center justify-center px-10 text-center">

                <div className="h-32 w-32 rounded-full bg-[#B89B72]/10 blur-3xl" />

                <p className="mt-10 text-[10px] uppercase tracking-[0.45em] text-[#B89B72]/60">

                  Your Cart Is Empty

                </p>

                <h3 className="mt-5 text-4xl font-light leading-[1] tracking-[-0.06em] text-white">

                  Curate Your
                  <br />
                  Luxury Space

                </h3>

              </div>

            )}

            {/* =====================================================
                ITEMS
            ====================================================== */}
            {items.length > 0 && (
              <>

                {/* =================================================
                    SCROLL AREA
                ================================================== */}
                <div className="relative z-10 flex-1 overflow-y-auto px-4 py-5 md:px-6 md:py-6">

                  <div className="space-y-5">

                    {items.map((item) => (

                      <motion.div
                        key={item.id}
                        initial={{
                          opacity: 0,
                          y: 20,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        className="group rounded-[2rem] border border-white/[0.06] bg-white/[0.03] p-4 transition duration-500 hover:border-[#B89B72]/20"
                      >

                        <div className="flex gap-4">

                          {/* =========================================
                              IMAGE
                          ========================================== */}
                          <div className="relative h-28 w-24 overflow-hidden rounded-[1.5rem] md:h-32 md:w-28">

                            <Image
                              src={item.image}
                              alt={item.title}
                              fill
                              sizes="200px"
                              className="object-cover transition duration-700 group-hover:scale-[1.04]"
                            />

                          </div>

                          {/* =========================================
                              CONTENT
                          ========================================== */}
                          <div className="flex flex-1 flex-col justify-between">

                            <div>

                              <p className="text-[9px] uppercase tracking-[0.35em] text-[#B89B72]/60">

                                Curated Object

                              </p>

                              <h3 className="mt-2 text-[1.15rem] font-light leading-[1.1] tracking-[-0.04em] text-white md:text-[1.25rem]">

                                {item.title}

                              </h3>

                              <p className="mt-3 text-lg text-white/70">

                                ₹
                                {item.price.toLocaleString(
                                  "en-IN"
                                )}

                              </p>

                            </div>

                            {/* =====================================
                                QUANTITY
                            ====================================== */}
                            <div className="mt-5 flex items-center justify-between">

                              <div className="flex items-center gap-2">

                                {/* Minus */}
                                <button
                                  onClick={() =>
                                    decreaseQuantity(
                                      item.id
                                    )
                                  }
                                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.06] bg-white/[0.03] text-white/70 transition hover:border-[#B89B72]/30 hover:text-white"
                                >

                                  <Minus size={14} />

                                </button>

                                {/* Quantity */}
                                <div className="flex h-9 min-w-[52px] items-center justify-center rounded-full border border-white/[0.06] bg-black/30 px-4 text-sm tracking-[0.25em] text-white">

                                  {String(
                                    item.quantity
                                  ).padStart(
                                    2,
                                    "0"
                                  )}

                                </div>

                                {/* Plus */}
                                <button
                                  onClick={() =>
                                    increaseQuantity(
                                      item.id
                                    )
                                  }
                                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.06] bg-white/[0.03] text-white/70 transition hover:border-[#B89B72]/30 hover:text-white"
                                >

                                  <Plus size={14} />

                                </button>

                              </div>

                              {/* Remove */}
                              <button
                                onClick={() =>
                                  removeItem(
                                    item.id
                                  )
                                }
                                className="text-[10px] uppercase tracking-[0.35em] text-white/40 transition hover:text-[#B89B72]"
                              >

                                Remove

                              </button>

                            </div>

                          </div>

                        </div>

                      </motion.div>

                    ))}

                  </div>

                </div>

                {/* =================================================
                    FOOTER
                ================================================== */}
                <div className="relative z-10 border-t border-white/[0.06] bg-black/40 p-5 backdrop-blur-3xl md:p-6">

                  {/* Total */}
                  <div className="flex items-end justify-between gap-5">

                    <div>

                      <p className="text-[10px] uppercase tracking-[0.35em] text-white/40">

                        Total

                      </p>

                      <h3 className="mt-3 text-3xl font-light tracking-[-0.06em] text-white md:text-4xl">

                        ₹
                        {getTotalPrice().toLocaleString(
                          "en-IN"
                        )}

                      </h3>

                    </div>

                    <p className="max-w-[140px] text-right text-xs leading-[1.8] text-white/40 md:text-sm">

                      Taxes &
                      premium delivery
                      included

                    </p>

                  </div>

                  {/* =============================================
                      CHECKOUT BUTTON
                  ============================================== */}
                  <button
                    onClick={handleCheckout}
                    className="group relative mt-7 flex h-16 w-full items-center justify-center overflow-hidden rounded-full bg-[#B89B72] text-sm uppercase tracking-[0.45em] text-black transition duration-500 hover:scale-[1.01]"
                  >

                    {/* Reflection */}
                    <div className="absolute inset-y-0 left-[-30%] w-[30%] rotate-12 bg-white/40 blur-2xl transition duration-1000 group-hover:left-[120%]" />

                    <span className="relative z-10">

                      Secure Checkout

                    </span>

                  </button>

                </div>

              </>
            )}

          </motion.div>

        </>
      )}

    </AnimatePresence>
  );
}