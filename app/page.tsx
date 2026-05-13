import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

import Section from "@/components/layout/section";
import Atmosphere from "@/components/layout/atmosphere";
import Scene from "@/components/layout/scene";

import { MOTION } from "@/lib/motion";

import Hero from "@/sections/home/hero";
import EditorialPause from "@/sections/home/editorial-pause";
import Editorial from "@/sections/home/editorial";
import Immersive from "@/sections/home/immersive";
import EditorialTransition from "@/sections/home/editorial-transition";
import Marquee from "@/sections/home/marquee";
import Collections from "@/sections/home/collections";
import ParallaxSection from "@/sections/home/parallax";
import Showcase from "@/sections/home/showcase";
import HorizontalScroll from "@/sections/home/horizontal-scroll";
import SignaturePiece from "@/sections/home/signature-piece";
import QuoteDivider from "@/sections/home/quote-divider";
import Products from "@/sections/home/products";

export default function Home() {
  return (
    <main className="relative overflow-x-hidden bg-[#050505] text-white">

      {/* =========================================================
          GLOBAL ATMOSPHERE
      ========================================================== */}
      <Atmosphere />

      {/* =========================================================
          NAVIGATION
      ========================================================== */}
      <Navbar />

      {/* =========================================================
          HERO EXPERIENCE
      ========================================================== */}
      <Scene intensity={0.55}>
        <Section>
          <Hero />
        </Section>
      </Scene>

      {/* =========================================================
          EDITORIAL SILENCE
      ========================================================== */}
      <Section>
        <EditorialPause />
      </Section>

      {/* =========================================================
          EDITORIAL STORY
      ========================================================== */}
      <Scene intensity={0.28}>
        <Section
          reveal
          bordered
          delay={MOTION.delay.none}
        >
          <Editorial />
        </Section>
      </Scene>

      {/* =========================================================
          IMMERSIVE EXPERIENCE
      ========================================================== */}
      <Scene intensity={0.38}>
        <Section
          reveal
          bordered
          delay={MOTION.delay.sm}
        >
          <Immersive />
        </Section>
      </Scene>

      {/* =========================================================
          TRANSITIONAL NARRATIVE
      ========================================================== */}
      <Section
        reveal
        bordered
        delay={MOTION.delay.md}
      >
        <EditorialTransition />
      </Section>

      {/* =========================================================
          LUXURY MARQUEE
      ========================================================== */}
      <Section
        reveal
        delay={MOTION.delay.xs}
        className="border-y border-white/[0.04] py-10"
      >
        <Marquee />
      </Section>

      {/* =========================================================
          COLLECTIONS
      ========================================================== */}
      <Scene intensity={0.22}>
        <Section
          reveal
          bordered
          delay={MOTION.delay.sm}
        >
          <Collections />
        </Section>
      </Scene>

      {/* =========================================================
          PARALLAX EXPERIENCE
      ========================================================== */}
      <Scene intensity={0.25}>
        <Section
          reveal
          bordered
          delay={MOTION.delay.sm}
        >
          <ParallaxSection />
        </Section>
      </Scene>

      {/* =========================================================
          CURATED SHOWCASE
      ========================================================== */}
      <Scene intensity={0.32}>
        <Section
          reveal
          bordered
          delay={MOTION.delay.sm}
        >
          <Showcase />
        </Section>
      </Scene>

      {/* =========================================================
          HORIZONTAL STORYTELLING
      ========================================================== */}
      <Scene intensity={0.36}>
        <Section
          reveal
          bordered
          delay={MOTION.delay.md}
        >
          <HorizontalScroll />
        </Section>
      </Scene>

      {/* =========================================================
          SIGNATURE PIECE
      ========================================================== */}
      <Scene intensity={0.28}>
        <Section
          reveal
          bordered
          delay={MOTION.delay.sm}
        >
          <SignaturePiece />
        </Section>
      </Scene>

      {/* =========================================================
          QUOTATION DIVIDER
      ========================================================== */}
      <Section
        reveal
        bordered
        delay={MOTION.delay.xs}
      >
        <QuoteDivider />
      </Section>

      {/* =========================================================
          FEATURED PRODUCTS
      ========================================================== */}
      <Scene intensity={0.18}>
        <Section
          reveal
          bordered
          delay={MOTION.delay.sm}
        >
          <Products />
        </Section>
      </Scene>

      {/* =========================================================
          FOOTER ATMOSPHERIC TRANSITION
      ========================================================== */}
      <div className="relative z-10 h-24 overflow-hidden">

        {/* Soft Fade */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#070707]/50 to-black" />

        {/* Ambient Glow */}
        <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#B89B72]/[0.025] blur-[180px]" />

      </div>

      {/* =========================================================
          FOOTER
      ========================================================== */}
      <Section reveal>
        <Footer />
      </Section>

    </main>
  );
}