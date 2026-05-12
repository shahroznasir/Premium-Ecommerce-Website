"use client";

import Link from "next/link";

import { motion } from "framer-motion";

import LuxuryImage from "@/components/common/luxury-image";

interface Product {
  id: string;
  title: string;
  slug: string;
  image: string;
  price: number;
  category: string;
}

interface RelatedProductsProps {
  products: Product[];
}

export default function RelatedProducts({
  products,
}: RelatedProductsProps) {
  return (
    <section className="relative overflow-hidden py-40">

      {/* Atmosphere */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        <div className="absolute left-1/2 top-0 h-[1000px] w-[1000px] -translate-x-1/2 rounded-full bg-[#B89B72]/10 blur-[200px]" />

      </div>

      <div className="container-luxury relative z-10">

        {/* Header */}
        <div className="mb-20 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">

          <div>

            <p className="text-[10px] uppercase tracking-[0.55em] text-[#B89B72]/80">

              Curated For Your Space

            </p>

            <h2 className="mt-8 text-5xl font-light leading-[0.85] tracking-[-0.08em] text-white md:text-7xl">

              Recommended
              <br />
              Objects

            </h2>

          </div>

          <p className="max-w-xl text-lg leading-[2] text-white/50">

            Discover sculptural pieces curated
            through atmosphere, architectural
            restraint, and timeless modern luxury.

          </p>

        </div>

        {/* Grid */}
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{
                opacity: 0,
                y: 80,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 1,
                delay: index * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              viewport={{ once: true }}
              className={`group relative ${
                index === 1
                  ? "xl:translate-y-12"
                  : ""
              }`}
            >

              {/* Card */}
              <div className="relative overflow-hidden rounded-[3rem] border border-white/[0.06] bg-white/[0.03] transition duration-700 hover:border-[#B89B72]/20">

                {/* Glow */}
                <div className="absolute inset-0 opacity-0 transition duration-1000 group-hover:opacity-100">

                  <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#B89B72]/10 blur-[140px]" />

                </div>

                {/* Image */}
                <div className="relative h-[620px] overflow-hidden">

                  <LuxuryImage
                    src={product.image}
                    alt={product.title}
                    className="h-full w-full transition duration-[2200ms] group-hover:scale-[1.05]"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                  {/* Reflection */}
                  <div className="absolute inset-y-0 left-[-30%] w-[30%] rotate-12 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent blur-3xl transition duration-[1800ms] group-hover:left-[120%]" />

                  {/* CTA */}
                  <div className="absolute bottom-8 left-8 right-8 translate-y-8 opacity-0 transition duration-700 group-hover:translate-y-0 group-hover:opacity-100">

                    <Link
                      href={`/shop/${product.slug}`}
                      className="block rounded-full border border-white/[0.08] bg-black/40 px-6 py-4 text-center text-[10px] uppercase tracking-[0.35em] text-white backdrop-blur-2xl transition duration-500 hover:border-[#B89B72]/20 hover:bg-[#B89B72]/10"
                    >

                      Discover Object

                    </Link>

                  </div>

                </div>

                {/* Content */}
                <div className="relative p-8">

                  {/* Category */}
                  <p className="text-[10px] uppercase tracking-[0.55em] text-[#B89B72]/80">

                    {product.category}

                  </p>

                  {/* Title */}
                  <h3 className="mt-5 text-[2.4rem] font-light leading-[0.9] tracking-[-0.08em] text-white transition duration-500 group-hover:text-[#B89B72]">

                    {product.title}

                  </h3>

                  {/* Divider */}
                  <div className="mt-8 h-px w-16 bg-[#B89B72]/70" />

                  {/* Bottom */}
                  <div className="mt-9 flex items-end justify-between">

                    {/* Price */}
                    <p className="text-[1.8rem] font-light tracking-[-0.06em] text-white">

                      ₹
                      {product.price.toLocaleString("en-IN")}

                    </p>

                    {/* Discover */}
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
          ))}

        </div>

      </div>

    </section>
  );
}