"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  ShoppingBag,
  Plus,
  Minus,
  X,
} from "lucide-react";

import { useCartStore } from "@/stores/cart-store";

export default function CartDrawer() {
  const {
    items,
    removeItem,
    increaseQuantity,
    decreaseQuantity,
    getTotalItems,
    getTotalPrice,
  } = useCartStore();

  return (
    <Sheet>

      {/* ================= TRIGGER ================= */}
      <SheetTrigger asChild>

        <button className="group relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl transition duration-700 hover:border-[#B89B72]/40">

          {/* Glow */}
          <div className="absolute inset-0 bg-[#B89B72]/0 opacity-0 blur-xl transition duration-700 group-hover:bg-[#B89B72]/[0.06] group-hover:opacity-100" />

          {/* Icon */}
          <ShoppingBag className="relative z-10 h-5 w-5 text-white transition duration-500 group-hover:text-[#B89B72]" />

          {/* Count */}
          {getTotalItems() > 0 && (
            <div className="absolute -right-1 -top-1 z-20 flex h-5 w-5 items-center justify-center rounded-full bg-[#B89B72] text-[10px] text-black shadow-[0_0_20px_rgba(184,155,114,0.7)]">

              {getTotalItems()}

            </div>
          )}

        </button>

      </SheetTrigger>

      {/* ================= DRAWER ================= */}
      <SheetContent className="w-full border-l border-white/[0.06] bg-[#050505]/95 p-0 text-white shadow-[-40px_0_120px_rgba(0,0,0,0.6)] backdrop-blur-3xl sm:max-w-[480px]">

        {/* ================= ATMOSPHERE ================= */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">

          {/* Main Glow */}
          <div className="absolute right-[-20%] top-[10%] h-[500px] w-[500px] rounded-full bg-[#B89B72]/[0.06] blur-[140px]" />

          {/* Bottom Glow */}
          <div className="absolute bottom-[-20%] left-[-10%] h-[400px] w-[400px] rounded-full bg-[#B89B72]/[0.04] blur-[140px]" />

        </div>

        {/* ================= HEADER ================= */}
        <SheetHeader className="relative border-b border-white/[0.06] px-8 pb-8 pt-8 text-left">

          {/* Label */}
          <p className="text-[10px] uppercase tracking-[0.45em] text-[#B89B72]/80">

            Luxury Cart

          </p>

          {/* Title */}
          <SheetTitle className="mt-4 text-3xl font-light leading-[0.92] tracking-[-0.06em] text-white">

            Curated
            <br />
            Selections

          </SheetTitle>

        </SheetHeader>

        {/* ================= ITEMS ================= */}
        <div className="relative flex-1 overflow-y-auto px-8 py-8">

          {items.length === 0 ? (
            <div className="flex h-[50vh] flex-col items-center justify-center text-center">

              {/* Label */}
              <p className="text-[10px] uppercase tracking-[0.45em] text-white/30">

                Cart Empty

              </p>

              {/* Title */}
              <h3 className="mt-6 text-5xl font-light leading-[0.92] tracking-[-0.06em] text-white">

                Curate
                <br />
                Your Space

              </h3>

              {/* Description */}
              <p className="mt-8 max-w-sm text-lg leading-relaxed text-white/40">

                Discover sculptural luxury objects
                curated for elevated modern living.

              </p>

            </div>
          ) : (
            <div className="space-y-5 pb-52">

              {items.map((item) => (
                <div
                  key={item.id}
                  className="group relative overflow-hidden rounded-[2rem] border border-white/[0.06] bg-white/[0.03] p-5 backdrop-blur-2xl transition duration-700 hover:border-[#B89B72]/20"
                >

                  {/* Hover Glow */}
                  <div className="absolute inset-0 opacity-0 transition duration-700 group-hover:opacity-100">

                    <div className="absolute left-1/2 top-1/2 h-[220px] w-[220px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#B89B72]/[0.06] blur-3xl" />

                  </div>

                  <div className="relative flex gap-5">

                    {/* ================= IMAGE ================= */}
                    <div className="overflow-hidden rounded-[1.5rem]">

                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-28 w-24 object-cover transition duration-700 group-hover:scale-105"
                      />

                    </div>

                    {/* ================= CONTENT ================= */}
                    <div className="flex flex-1 flex-col justify-between">

                      <div>

                        {/* Title */}
                        <h3 className="text-xl font-light leading-[1] tracking-[-0.05em] text-white">

                          {item.title}

                        </h3>

                        {/* Price */}
                        <p className="mt-4 text-lg text-[#B89B72]">

                          ₹
                          {item.price.toLocaleString("en-IN")}

                        </p>

                      </div>

                      {/* ================= BOTTOM ================= */}
                      <div className="mt-6 flex items-center justify-between">

                        {/* Quantity */}
                        <div className="flex items-center gap-3">

                          <button
                            onClick={() =>
                              decreaseQuantity(item.id)
                            }
                            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.02] transition duration-500 hover:border-[#B89B72]/40"
                          >

                            <Minus className="h-3 w-3 text-white" />

                          </button>

                          <span className="w-4 text-center text-white">

                            {item.quantity}

                          </span>

                          <button
                            onClick={() =>
                              increaseQuantity(item.id)
                            }
                            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.02] transition duration-500 hover:border-[#B89B72]/40"
                          >

                            <Plus className="h-3 w-3 text-white" />

                          </button>

                        </div>

                        {/* Remove */}
                        <button
                          onClick={() =>
                            removeItem(item.id)
                          }
                          className="group/remove flex items-center gap-2 text-[10px] uppercase tracking-[0.35em] text-white/35 transition duration-500 hover:text-[#B89B72]"
                        >

                          <X className="h-3 w-3" />

                          Remove

                        </button>

                      </div>

                    </div>

                  </div>

                </div>
              ))}

            </div>
          )}

        </div>

        {/* ================= FOOTER ================= */}
        {items.length > 0 && (
          <div className="absolute bottom-0 left-0 w-full border-t border-white/[0.06] bg-[#050505]/95 p-8 backdrop-blur-3xl">

            {/* Total */}
            <div className="mb-8 flex items-center justify-between">

              <div>

                <p className="text-[10px] uppercase tracking-[0.35em] text-white/35">

                  Subtotal

                </p>

                <p className="mt-2 text-sm text-white/35">

                  Inclusive of luxury handling

                </p>

              </div>

              <p className="text-4xl font-light tracking-[-0.06em] text-white">

                ₹
                {getTotalPrice().toLocaleString("en-IN")}

              </p>

            </div>

            {/* ================= BUTTONS ================= */}
            <div className="space-y-4">

              {/* Checkout */}
              <button className="group relative w-full overflow-hidden rounded-full bg-[#B89B72] py-5 text-sm uppercase tracking-[0.35em] text-black transition duration-700 hover:scale-[1.02]">

                {/* Light Sweep */}
                <div className="absolute inset-y-0 left-[-30%] w-[30%] rotate-12 bg-white/30 blur-2xl transition duration-1000 group-hover:left-[120%]" />

                <span className="relative z-10">

                  Secure Checkout

                </span>

              </button>

              {/* Continue */}
              <button className="w-full rounded-full border border-white/[0.08] py-5 text-sm uppercase tracking-[0.35em] text-white/70 transition duration-700 hover:border-[#B89B72]/40 hover:text-[#B89B72]">

                Continue Shopping

              </button>

            </div>

          </div>
        )}

      </SheetContent>

    </Sheet>
  );
}