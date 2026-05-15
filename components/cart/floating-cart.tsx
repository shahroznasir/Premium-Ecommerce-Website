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
  ShoppingBag,
} from "lucide-react";

import { useCartStore } from "@/stores/cart-store";

import { useCartUIStore } from "@/stores/cart-ui-store";

export default function FloatingCart() {

  const router =
    useRouter();

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
      CHECKOUT
  ========================================================== */

  function handleCheckout() {

    closeCart();

    setTimeout(() => {

      router.push(
        "/checkout"
      );

    }, 300);
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
            transition={{
              duration: 0.45,
            }}
            onClick={closeCart}
            className="fixed inset-0 z-[9998] bg-black/72 backdrop-blur-[24px]"
          />

          {/* =====================================================
              CART DRAWER
          ====================================================== */}
          <motion.aside
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
            className="fixed right-0 top-0 z-[9999] flex h-screen w-full max-w-[560px] flex-col overflow-hidden border-l border-white/[0.06] bg-[#050505]/96 backdrop-blur-3xl"
          >

            {/* ===================================================
                ATMOSPHERIC DEPTH
            ==================================================== */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">

              <div className="absolute right-[-20%] top-[-10%] h-[520px] w-[520px] rounded-full bg-[#B89B72]/[0.08] blur-[160px]" />

              <div className="absolute bottom-[-20%] left-[-10%] h-[420px] w-[420px] rounded-full bg-[#D6C2A3]/[0.04] blur-[140px]" />

              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.03),transparent_45%)]" />

            </div>

            {/* ===================================================
                HEADER
            ==================================================== */}
            <div className="relative z-10 border-b border-white/[0.06] px-6 py-7 md:px-8">

              <div className="flex items-start justify-between">

                <div>

                  <p className="text-[10px] uppercase tracking-[0.45em] text-[#B89B72]/70">

                    Luxury Cart

                  </p>

                  <h2 className="mt-4 text-[2.2rem] font-light tracking-[-0.08em] text-white">

                    Shopping Bag

                  </h2>

                  <p className="mt-4 max-w-[240px] text-sm leading-[1.9] text-white/38">

                    Curated architectural objects
                    selected for your space.

                  </p>

                </div>

                {/* CLOSE */}
                <button
                  onClick={closeCart}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-white/[0.06] bg-white/[0.03] text-white/60 transition-all duration-500 hover:rotate-90 hover:border-[#B89B72]/30 hover:bg-[#B89B72]/10 hover:text-[#D6C2A3]"
                >

                  <X size={18} />

                </button>

              </div>

            </div>

            {/* ===================================================
                EMPTY STATE
            ==================================================== */}
            {items.length === 0 && (

              <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-10 text-center">

                {/* ATMOSPHERIC ORB */}
                <div className="absolute h-[260px] w-[260px] rounded-full bg-[#B89B72]/10 blur-[120px]" />

                {/* ICON */}
                <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-white/[0.06] bg-white/[0.03] backdrop-blur-2xl">

                  <ShoppingBag
                    size={30}
                    className="text-[#D6C2A3]"
                  />

                </div>

                <p className="relative mt-10 text-[10px] uppercase tracking-[0.45em] text-[#B89B72]/65">

                  Your Collection Awaits

                </p>

                <h3 className="relative mt-6 text-[3rem] font-light leading-[0.92] tracking-[-0.08em] text-white">

                  Curate Your
                  <br />
                  Luxury Space

                </h3>

                <p className="relative mt-8 max-w-[320px] text-sm leading-[2] text-white/38">

                  Discover sculptural objects,
                  atmospheric lighting, and
                  timeless architectural pieces.

                </p>

              </div>

            )}

            {/* ===================================================
                CART ITEMS
            ==================================================== */}
            {items.length > 0 && (
              <>

                {/* =================================================
                    SCROLL AREA
                ================================================== */}
                <div className="relative z-10 flex-1 overflow-y-auto px-4 py-5 md:px-6">

                  <div className="space-y-5">

                    {items.map(
                      (
                        item,
                        index
                      ) => (

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
                          transition={{
                            delay:
                              index * 0.05,
                          }}
                          className="group overflow-hidden rounded-[2.3rem] border border-white/[0.06] bg-white/[0.03] backdrop-blur-2xl transition-all duration-700 hover:border-[#B89B72]/20 hover:bg-white/[0.04]"
                        >

                          <div className="flex gap-5 p-4 md:p-5">

                            {/* ===============================
                                IMAGE
                            ================================ */}
                            <div className="relative h-32 w-28 overflow-hidden rounded-[1.8rem]">

                              <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                sizes="240px"
                                className="object-cover transition duration-[1200ms] group-hover:scale-[1.04]"
                              />

                              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                            </div>

                            {/* ===============================
                                CONTENT
                            ================================ */}
                            <div className="flex flex-1 flex-col justify-between">

                              <div>

                                <p className="text-[9px] uppercase tracking-[0.35em] text-[#B89B72]/65">

                                  Curated Object

                                </p>

                                <h3 className="mt-3 max-w-[12ch] text-[1.35rem] font-light leading-[1.05] tracking-[-0.05em] text-white">

                                  {item.title}

                                </h3>

                                <p className="mt-5 text-[1.45rem] font-light tracking-[-0.05em] text-white">

                                  ₹
                                  {item.price.toLocaleString(
                                    "en-IN"
                                  )}

                                </p>

                              </div>

                              {/* =============================
                                  QUANTITY
                              ============================== */}
                              <div className="mt-6 flex items-center justify-between">

                                {/* CONTROLS */}
                                <div className="flex items-center gap-2">

                                  {/* MINUS */}
                                  <button
                                    onClick={() =>
                                      decreaseQuantity(
                                        item.id
                                      )
                                    }
                                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.06] bg-white/[0.03] text-white/70 transition-all duration-500 hover:border-[#B89B72]/30 hover:bg-[#B89B72]/10 hover:text-white"
                                  >

                                    <Minus
                                      size={14}
                                    />

                                  </button>

                                  {/* QUANTITY */}
                                  <div className="flex h-10 min-w-[56px] items-center justify-center rounded-full border border-white/[0.06] bg-black/30 px-4 text-sm tracking-[0.25em] text-white">

                                    {String(
                                      item.quantity
                                    ).padStart(
                                      2,
                                      "0"
                                    )}

                                  </div>

                                  {/* PLUS */}
                                  <button
                                    onClick={() =>
                                      increaseQuantity(
                                        item.id
                                      )
                                    }
                                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.06] bg-white/[0.03] text-white/70 transition-all duration-500 hover:border-[#B89B72]/30 hover:bg-[#B89B72]/10 hover:text-white"
                                  >

                                    <Plus
                                      size={14}
                                    />

                                  </button>

                                </div>

                                {/* REMOVE */}
                                <button
                                  onClick={() =>
                                    removeItem(
                                      item.id
                                    )
                                  }
                                  className="text-[10px] uppercase tracking-[0.35em] text-white/38 transition-all duration-500 hover:text-[#D6C2A3]"
                                >

                                  Remove

                                </button>

                              </div>

                            </div>

                          </div>

                        </motion.div>

                      )
                    )}

                  </div>

                </div>

                {/* =================================================
                    FOOTER
                ================================================== */}
                <div className="relative z-10 border-t border-white/[0.06] bg-black/40 p-5 backdrop-blur-3xl md:p-6">

                  {/* =============================================
                      TOTAL
                  ============================================== */}
                  <div className="flex items-end justify-between gap-6">

                    <div>

                      <p className="text-[10px] uppercase tracking-[0.35em] text-white/38">

                        Total Investment

                      </p>

                      <h3 className="mt-4 text-[3rem] font-light tracking-[-0.08em] text-white">

                        ₹
                        {getTotalPrice().toLocaleString(
                          "en-IN"
                        )}

                      </h3>

                    </div>

                    <p className="max-w-[150px] text-right text-xs leading-[1.9] text-white/38">

                      Premium delivery &
                      protected packaging
                      included.

                    </p>

                  </div>

                  {/* =============================================
                      CHECKOUT CTA
                  ============================================== */}
                  <button
                    onClick={handleCheckout}
                    className="group relative mt-8 flex h-[68px] w-full items-center justify-center overflow-hidden rounded-full bg-[#B89B72] text-[11px] uppercase tracking-[0.42em] text-black transition-all duration-700 hover:scale-[1.01]"
                  >

                    {/* REFLECTION */}
                    <div className="absolute inset-y-0 left-[-30%] w-[30%] rotate-12 bg-white/40 blur-2xl transition-all duration-1000 group-hover:left-[120%]" />

                    <span className="relative z-10">

                      Proceed Securely

                    </span>

                  </button>

                </div>

              </>
            )}

          </motion.aside>

        </>
      )}

    </AnimatePresence>
  );
}