"use client";

import { motion } from "framer-motion";

export default function SignaturePiece() {
  return (
    <section className="relative overflow-hidden bg-[#050505] py-48">

      {/* Ambient Glow */}
      <div className="absolute left-1/2 top-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#B89B72]/10 blur-3xl" />

      <div className="container-luxury relative z-10">

        <div className="grid items-center gap-24 lg:grid-cols-2">

          {/* Left Side */}
          <motion.div
            initial={{
              opacity: 0,
              y: 100,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 1.4,
              ease: [0.22, 1, 0.36, 1],
            }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >

            {/* Label */}
            <p className="mb-8 text-sm uppercase tracking-[0.5em] text-[#B89B72]/80">
              Signature Piece
            </p>

            {/* Heading */}
            <h2 className="text-6xl font-light leading-[0.82] tracking-[-0.09em] text-white md:text-[8rem]">
              The
              <br />
              Aurelius
              <br />
              Clock
            </h2>

            {/* Divider */}
            <div className="mt-12 h-px w-32 bg-[#B89B72]" />

            {/* Description */}
            <p className="mt-12 max-w-xl text-xl leading-relaxed text-white/60">
              A sculptural luxury timepiece crafted through architectural
              minimalism, refined metallic detailing, and timeless cinematic
              elegance.
            </p>

            {/* Price */}
            <p className="mt-12 text-3xl font-light tracking-[-0.04em] text-white">
              ₹1,24,999
            </p>

            {/* CTA */}
            <button className="group mt-16 flex items-center gap-5 text-sm uppercase tracking-[0.35em] text-white/80 transition duration-500 hover:text-[#B89B72]">

              Discover Piece

              <span className="h-px w-16 bg-white/30 transition duration-500 group-hover:w-24 group-hover:bg-[#B89B72]" />

            </button>

          </motion.div>

          {/* Right Side */}
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.92,
            }}
            whileInView={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 1.6,
              ease: [0.22, 1, 0.36, 1],
            }}
            viewport={{ once: true }}
            className="relative"
          >

            {/* Floating Glow */}
            <div className="absolute -bottom-10 -right-10 h-72 w-72 rounded-full bg-[#B89B72]/20 blur-3xl" />

            {/* Image */}
            <div className="group relative overflow-hidden rounded-[3rem]">

              <img
                src="https://images.unsplash.com/photo-1517705008128-361805f42e86?q=80&w=1974&auto=format&fit=crop"
                alt="Luxury Clock"
                className="h-[85vh] w-full object-cover transition duration-[2000ms] group-hover:scale-105"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/30" />

              {/* Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            </div>

          </motion.div>

        </div>

      </div>

    </section>
  );
}