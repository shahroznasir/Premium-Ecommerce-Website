"use client";

import {
  motion,
} from "framer-motion";

export default function EditorialPause() {
  return (
    <section className="relative overflow-hidden py-24 md:py-40">

      <div className="container-luxury">

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.4,
          }}
          transition={{
            duration: 1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mx-auto max-w-[820px] text-center"
        >

          {/* Label */}
          <p className="text-[9px] uppercase tracking-[0.42em] text-[#B89B72]/70 md:text-[10px]">

            Sculptural Living

          </p>

          {/* Statement */}
          <h2 className="mt-8 text-3xl font-light leading-[1.25] tracking-[-0.05em] text-white/92 md:text-5xl">

            Objects designed
            <br />
            to exist quietly
            <br />
            within space.

          </h2>

          {/* Divider */}
          <div className="mx-auto mt-10 h-px w-16 bg-gradient-to-r from-transparent via-[#B89B72] to-transparent" />

        </motion.div>

      </div>

    </section>
  );
}