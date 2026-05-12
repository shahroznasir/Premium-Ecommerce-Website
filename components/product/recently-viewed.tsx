"use client";

import Link from "next/link";

import { motion } from "framer-motion";

import LuxuryImage from "@/components/common/luxury-image";

import { useRecentlyViewed } from "@/stores/recently-viewed";

export default function RecentlyViewed() {
  const { products } =
    useRecentlyViewed();

  if (products.length === 0) {
    return null;
  }

  return (
    <section className="relative overflow-hidden py-40">

      {/* Atmosphere */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        <div className="absolute left-1/2 top-0 h-[900px] w-[900px] -translate-x-1/2 rounded-full bg-[#B89B72]/10 blur-[180px]" />

      </div>

      <div className="container-luxury relative z-10">

        {/* Header */}
        <div className="mb-20">

          <p className="text-[10px] uppercase tracking-[0.55em] text-[#B89B72]/80">

            Your Journey

          </p>

          <h2 className="mt-8 text-5xl font-light leading-[0.85] tracking-[-0.08em] text-white md:text-7xl">

            Recently
            <br />
            Viewed

          </h2>

        </div>

        {/* Grid */}
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
                <div className="relative overflow-hidden rounded-[3rem] border border-white/[0.06] bg-white/[0.03] transition duration-700 hover:border-[#B89B72]/20">

                  {/* Image */}
                  <div className="relative h-[500px] overflow-hidden">

                    <LuxuryImage
                      src={product.image}
                      alt={product.title}
                      className="h-full w-full transition duration-[2200ms] group-hover:scale-[1.05]"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                  </div>

                  {/* Content */}
                  <div className="relative p-8">

                    {/* Category */}
                    <p className="text-[10px] uppercase tracking-[0.5em] text-[#B89B72]/75">

                      {product.category}

                    </p>

                    {/* Title */}
                    <h3 className="mt-5 text-[2rem] font-light leading-[0.9] tracking-[-0.08em] text-white">

                      {product.title}

                    </h3>

                    {/* Divider */}
                    <div className="mt-7 h-px w-16 bg-[#B89B72]/70" />

                    {/* Bottom */}
                    <div className="mt-8 flex items-end justify-between">

                      <p className="text-[1.5rem] font-light tracking-[-0.06em] text-white">

                        ₹
                        {product.price.toLocaleString("en-IN")}

                      </p>

                      <Link
                        href={`/shop/${product.slug}`}
                        className="text-[10px] uppercase tracking-[0.45em] text-white/55 transition duration-500 hover:text-[#B89B72]"
                      >

                        View

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