"use client";

import Link from "next/link";

import { motion } from "framer-motion";

import LuxuryImage from "@/components/common/luxury-image";

import { useRecentlyViewed } from "@/stores/recently-viewed";

export default function RecentlyViewedCarousel() {
  const { products } =
    useRecentlyViewed();

  if (products.length === 0) {
    return null;
  }

  return (
    <section className="relative overflow-hidden border-t border-white/[0.06] py-40">

      {/* Atmosphere */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        <div className="absolute left-1/2 top-0 h-[900px] w-[900px] -translate-x-1/2 rounded-full bg-[#B89B72]/10 blur-[180px]" />

      </div>

      <div className="container-luxury relative z-10">

        {/* Header */}
        <div className="mb-20 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">

          {/* Left */}
          <div>

            <p className="text-[10px] uppercase tracking-[0.55em] text-[#B89B72]/80">

              Personalized Commerce

            </p>

            <h2 className="mt-8 text-5xl font-light leading-[0.85] tracking-[-0.08em] text-white md:text-7xl">

              Recently
              <br />
              Viewed

            </h2>

          </div>

          {/* Right */}
          <p className="max-w-xl text-lg leading-[2] text-white/50">

            Continue exploring sculptural
            objects curated through cinematic
            atmosphere, timeless materiality,
            and elevated modern living.

          </p>

        </div>

        {/* Products */}
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">

          {products.map(
            (product, index) => (
              <motion.div
                key={product.id}
                initial={{
                  opacity: 0,
                  y: 60,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 1,
                  delay:
                    index * 0.06,
                  ease: [
                    0.22,
                    1,
                    0.36,
                    1,
                  ],
                }}
                viewport={{
                  once: true,
                }}
                className="group relative"
              >

                {/* Card */}
                <div className="relative overflow-hidden rounded-[2.8rem] border border-white/[0.06] bg-white/[0.03] transition duration-700 hover:border-[#B89B72]/20">

                  {/* Glow */}
                  <div className="absolute inset-0 opacity-0 transition duration-1000 group-hover:opacity-100">

                    <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#B89B72]/10 blur-[140px]" />

                  </div>

                  {/* Image */}
                  <div className="relative h-[460px] overflow-hidden">

                    <LuxuryImage
                      src={product.image}
                      alt={product.title}
                      className="h-full w-full transition duration-[2200ms] group-hover:scale-[1.04]"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />

                    {/* Reflection */}
                    <div className="absolute inset-y-0 left-[-30%] w-[30%] rotate-12 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent blur-3xl transition duration-[1800ms] group-hover:left-[120%]" />

                    {/* CTA */}
                    <div className="absolute bottom-6 left-6 right-6 translate-y-10 opacity-0 transition duration-700 group-hover:translate-y-0 group-hover:opacity-100">

                      <Link
                        href={`/shop/${product.slug}`}
                        className="block rounded-full bg-[#B89B72] px-6 py-4 text-center text-[10px] uppercase tracking-[0.4em] text-black transition duration-500 hover:scale-[1.02]"
                      >

                        Continue Viewing

                      </Link>

                    </div>

                  </div>

                  {/* Content */}
                  <div className="relative p-8">

                    {/* Category */}
                    <p className="text-[10px] uppercase tracking-[0.45em] text-[#B89B72]/75">

                      {product.category}

                    </p>

                    {/* Title */}
                    <Link
                      href={`/shop/${product.slug}`}
                    >

                      <h3 className="mt-5 text-[2.2rem] font-light leading-[0.9] tracking-[-0.08em] text-white transition duration-500 group-hover:text-[#B89B72]">

                        {product.title}

                      </h3>

                    </Link>

                    {/* Divider */}
                    <div className="mt-8 h-px w-16 bg-[#B89B72]/70" />

                    {/* Bottom */}
                    <div className="mt-8 flex items-end justify-between">

                      {/* Price */}
                      <p className="text-[1.7rem] font-light tracking-[-0.06em] text-white">

                        ₹
                        {product.price.toLocaleString(
                          "en-IN"
                        )}

                      </p>

                      {/* Discover */}
                      <Link
                        href={`/shop/${product.slug}`}
                        className="text-[10px] uppercase tracking-[0.45em] text-white/55 transition duration-500 hover:text-[#B89B72]"
                      >

                        Discover

                      </Link>

                    </div>

                  </div>

                </div>

              </motion.div>
            )
          )}

        </div>

      </div>

    </section>
  );
}