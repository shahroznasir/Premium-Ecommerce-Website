"use client";

import { motion } from "framer-motion";

const collections = [
  {
    title: "Sculptural Objects",
    image:
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2070&auto=format&fit=crop",
  },
  {
    title: "Luxury Lighting",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=2070&auto=format&fit=crop",
  },
  {
    title: "Modern Interiors",
    image:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=2070&auto=format&fit=crop",
  },
];

export default function Collections() {
  return (
    <section className="bg-[#F5F1EB] py-40">
      <div className="container-luxury">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <p className="mb-5 text-sm uppercase tracking-[0.3em] text-black/60">
            Featured Collections
          </p>

          <h2 className="max-w-4xl text-6xl leading-[0.95] tracking-[-0.04em] text-[#111111] md:text-8xl">
            Designed For
            <br />
            Elevated Living
          </h2>
        </motion.div>

        {/* Collection Grid */}
        <div className="grid gap-8 lg:grid-cols-3">

          {collections.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1,
                delay: index * 0.2,
              }}
              viewport={{ once: true }}
              className="group cursor-pointer"
            >
              
              {/* Image */}
              <div className="relative overflow-hidden rounded-[2rem]">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-[650px] w-full object-cover transition duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-black/10 transition duration-500 group-hover:bg-black/20" />
              </div>

              {/* Text */}
              <div className="mt-8 flex items-center justify-between">
                <h3 className="text-3xl tracking-[-0.03em] text-[#111111]">
                  {item.title}
                </h3>

                <span className="text-sm uppercase tracking-[0.2em] text-black/50">
                  Explore
                </span>
              </div>

            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
}