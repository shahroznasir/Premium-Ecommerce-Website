"use client";

import { motion } from "framer-motion";
import { useState } from "react";

import LuxuryParallax from "@/components/common/luxury-parallax";
import ProductModal from "@/components/product/product-modal";

import LuxuryHoverCard from "@/components/common/luxury-hover-card";
import LuxuryImage from "@/components/common/luxury-image";

const products = [
  {
    title: "Aurelius Wall Clock",
    category: "Signature Timepiece",
    price: "₹1,24,999",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=2070&auto=format&fit=crop",
  },
  {
    title: "Architectural Floor Lamp",
    category: "Luxury Lighting",
    price: "₹84,999",
    image:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=2070&auto=format&fit=crop",
  },
  {
    title: "Sculptural Accent Chair",
    category: "Modern Furniture",
    price: "₹1,48,999",
    image:
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2070&auto=format&fit=crop",
  },
];

export default function Products() {
  const [selectedProduct, setSelectedProduct] = useState<
    (typeof products)[0] | null
  >(null);

  return (
    <section className="relative overflow-hidden bg-[#050505] py-44">

      {/* Cinematic Atmosphere */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        {/* Central Glow */}
        <motion.div
          animate={{
            opacity: [0.04, 0.08, 0.04],
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute left-1/2 top-1/2 h-[1200px] w-[1200px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#B89B72]/10 blur-[180px]"
        />

        {/* Floating Glow */}
        <motion.div
          animate={{
            y: [0, -40, 0],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute right-[-10%] top-[10%] h-[700px] w-[700px] rounded-full bg-[#B89B72]/[0.05] blur-[140px]"
        />

      </div>

      <div className="container-luxury relative z-10">

        {/* Heading */}
        <motion.div
          initial={{
            opacity: 0,
            y: 80,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1.3,
            ease: [0.22, 1, 0.36, 1],
          }}
          viewport={{ once: true }}
          className="mb-32"
        >

          {/* Label */}
          <p className="mb-8 text-[11px] uppercase tracking-[0.55em] text-[#B89B72]/85">

            Curated Signature Objects

          </p>

          {/* Heading */}
          <h2 className="max-w-6xl text-5xl font-light leading-[0.82] tracking-[-0.1em] text-white md:text-[9rem]">

            Designed
            <br />
            To Be
            <br />
            Experienced

          </h2>

          {/* Divider */}
          <div className="mt-12 h-px w-40 bg-[#B89B72]" />

          {/* Copy */}
          <p className="mt-12 max-w-2xl text-[1.05rem] leading-[2] text-white/55">

            Sculptural luxury objects curated through
            architectural restraint, cinematic materiality,
            and timeless emotional atmosphere.

          </p>

        </motion.div>

        {/* Products */}
        <div className="grid gap-14 lg:grid-cols-3">

          {products.map((product, index) => (
            <LuxuryParallax key={product.title}>

              <LuxuryHoverCard className="group">

                <motion.div
                  initial={{
                    opacity: 0,
                    y: 100,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  whileHover={{
                    y: -12,
                  }}
                  transition={{
                    duration: 1.1,
                    delay: index * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  viewport={{ once: true }}
                  onClick={() =>
                    setSelectedProduct(product)
                  }
                  className="relative cursor-pointer"
                >

                  {/* Hover Glow */}
                  <div className="absolute -inset-5 rounded-[3rem] bg-[#B89B72]/0 blur-3xl transition duration-1000 group-hover:bg-[#B89B72]/12" />

                  {/* Card */}
                  <div className="relative overflow-hidden rounded-[3rem] border border-white/[0.06] bg-white/[0.03] shadow-[0_25px_100px_rgba(0,0,0,0.45)] backdrop-blur-2xl transition duration-700 group-hover:border-[#B89B72]/20">

                    {/* Image Wrapper */}
                    <div className="relative h-[760px] overflow-hidden">

                      {/* Luxury Image */}
                      <motion.div
                        whileHover={{
                          scale: 1.04,
                        }}
                        transition={{
                          duration: 1.6,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="h-full w-full"
                      >

                        <LuxuryImage
                          src={product.image}
                          alt={product.title}
                          className="h-full w-full"
                        />

                      </motion.div>

                      {/* Cinematic Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                      {/* Reflection Sweep */}
                      <motion.div
                        initial={{
                          x: "-120%",
                        }}
                        whileHover={{
                          x: "140%",
                        }}
                        transition={{
                          duration: 2.2,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="absolute inset-y-0 w-[24%] rotate-12 bg-gradient-to-r from-transparent via-white/[0.10] to-transparent blur-3xl"
                      />

                      {/* Floating Number */}
                      <div className="pointer-events-none absolute right-6 top-6 text-[5rem] font-extralight leading-none tracking-[-0.08em] text-white/[0.06]">

                        0{index + 1}

                      </div>

                      {/* Bottom Panel */}
                      <div className="absolute bottom-0 left-0 right-0 p-8">

                        <motion.div
                          whileHover={{
                            y: -4,
                          }}
                          transition={{
                            duration: 0.6,
                          }}
                          className="overflow-hidden rounded-[2.3rem] border border-white/[0.06] bg-black/35 p-8 backdrop-blur-3xl transition duration-700 group-hover:border-[#B89B72]/20"
                        >

                          {/* Category */}
                          <p className="mb-5 text-[10px] uppercase tracking-[0.55em] text-[#B89B72]/85">

                            {product.category}

                          </p>

                          {/* Title */}
                          <h3 className="max-w-[90%] text-[2.3rem] font-light leading-[0.92] tracking-[-0.08em] text-white transition duration-700 group-hover:translate-x-1">

                            {product.title}

                          </h3>

                          {/* Divider */}
                          <div className="mt-8 h-px w-16 bg-[#B89B72]/70 transition-all duration-700 group-hover:w-28" />

                          {/* Bottom Row */}
                          <div className="mt-9 flex items-center justify-between">

                            {/* Price */}
                            <p className="text-[1.8rem] font-light tracking-[-0.06em] text-white">

                              {product.price}

                            </p>

                            {/* CTA */}
                            <button className="group/button flex items-center gap-4 text-[10px] uppercase tracking-[0.45em] text-white/65 transition duration-500 hover:text-[#B89B72]">

                              Discover

                              <span className="h-px w-8 bg-white/30 transition-all duration-700 group-hover/button:w-16 group-hover/button:bg-[#B89B72]" />

                            </button>

                          </div>

                        </motion.div>

                      </div>

                    </div>

                  </div>

                </motion.div>

              </LuxuryHoverCard>

            </LuxuryParallax>
          ))}

        </div>

      </div>

      {/* Modal */}
      <ProductModal
        product={selectedProduct}
        onClose={() =>
          setSelectedProduct(null)
        }
      />

      {/* Film Grain */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02] mix-blend-soft-light"
        style={{
          backgroundImage:
            "url('https://grainy-gradients.vercel.app/noise.svg')",
        }}
      />

    </section>
  );
}