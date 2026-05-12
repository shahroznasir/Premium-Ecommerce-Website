"use client";

import { motion } from "framer-motion";

interface LuxuryProductCardProps {
  title: string;
  category: string;
  price: string;
  image: string;
}

export default function LuxuryProductCard({
  title,
  category,
  price,
  image,
}: LuxuryProductCardProps) {
  return (
    <motion.div
      whileHover={{
        y: -10,
      }}
      transition={{
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative overflow-hidden rounded-[2.5rem] border border-white/[0.06] bg-white/[0.03] backdrop-blur-2xl"
    >

      {/* Ambient Glow */}
      <div className="absolute inset-0 opacity-0 transition duration-700 group-hover:opacity-100">

        <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#B89B72]/10 blur-[120px]" />

      </div>

      {/* Image */}
      <div className="relative overflow-hidden rounded-[2.5rem]">

        <motion.img
          whileHover={{
            scale: 1.06,
          }}
          transition={{
            duration: 1,
            ease: [0.22, 1, 0.36, 1],
          }}
          src={image}
          alt={title}
          className="h-[520px] w-full object-cover"
        />

        {/* Cinematic Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 w-full p-8">

        {/* Category */}
        <p className="text-[10px] uppercase tracking-[0.4em] text-[#B89B72]/80">

          {category}

        </p>

        {/* Title */}
        <h3 className="mt-4 text-3xl font-light tracking-[-0.05em] text-white">

          {title}

        </h3>

        {/* Bottom */}
        <div className="mt-6 flex items-center justify-between">

          {/* Price */}
          <p className="text-lg text-white/70">

            {price}

          </p>

          {/* Button */}
          <button className="rounded-full border border-white/10 bg-white/[0.06] px-5 py-2 text-xs uppercase tracking-[0.3em] text-white backdrop-blur-xl transition duration-500 hover:border-[#B89B72]/40 hover:bg-[#B89B72]/10">

            Explore

          </button>

        </div>

      </div>

    </motion.div>
  );
}