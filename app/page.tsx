import Navbar from "@/components/layout/navbar";

import Reveal from "@/components/common/reveal";

import Hero from "@/sections/home/hero";
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

import Footer from "@/components/layout/footer";

export default function Home() {
  return (
    <main className="relative overflow-x-hidden bg-[#050505] text-white">

      {/* ================= GLOBAL ATMOSPHERE ================= */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">

        {/* Main Aura */}
        <div className="absolute left-1/2 top-[-20%] h-[1300px] w-[1300px] -translate-x-1/2 rounded-full bg-[#B89B72]/[0.03] blur-[240px]" />

        {/* Left Ambient */}
        <div className="absolute left-[-15%] top-[25%] h-[700px] w-[700px] rounded-full bg-[#B89B72]/[0.02] blur-[180px]" />

        {/* Right Ambient */}
        <div className="absolute right-[-10%] top-[65%] h-[900px] w-[900px] rounded-full bg-[#B89B72]/[0.018] blur-[220px]" />

        {/* Bottom Glow */}
        <div className="absolute bottom-[-20%] left-1/2 h-[900px] w-[900px] -translate-x-1/2 rounded-full bg-[#B89B72]/[0.018] blur-[240px]" />

        {/* Grain */}
        <div
          className="absolute inset-0 opacity-[0.012] mix-blend-soft-light"
          style={{
            backgroundImage:
              "url('https://grainy-gradients.vercel.app/noise.svg')",
          }}
        />

      </div>

      {/* ================= CINEMATIC VIGNETTE ================= */}
      <div className="pointer-events-none fixed inset-0 z-[1]">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(184,155,114,0.04),transparent_38%)]" />

        <div className="absolute inset-0 shadow-[inset_0_0_180px_rgba(0,0,0,0.68)]" />

      </div>

      {/* ================= NAVBAR ================= */}
      <Navbar />

      {/* ================= HERO ================= */}
      <section className="relative z-10 overflow-hidden">
        <Hero />
      </section>

      {/* ================= EDITORIAL ================= */}
      <Reveal>
        <section className="relative z-10 overflow-hidden border-t border-white/[0.04]">
          <Editorial />
        </section>
      </Reveal>

      {/* ================= IMMERSIVE ================= */}
      <Reveal delay={0.08}>
        <section className="relative z-10 overflow-hidden border-t border-white/[0.04]">
          <Immersive />
        </section>
      </Reveal>

      {/* ================= EDITORIAL TRANSITION ================= */}
      <Reveal delay={0.1}>
        <section className="relative z-10 overflow-hidden border-t border-white/[0.04]">
          <EditorialTransition />
        </section>
      </Reveal>

      {/* ================= MARQUEE ================= */}
      <Reveal delay={0.05}>
        <section className="relative z-10 overflow-hidden border-y border-white/[0.04] py-10">
          <Marquee />
        </section>
      </Reveal>

      {/* ================= COLLECTIONS ================= */}
      <Reveal delay={0.08}>
        <section className="relative z-10 overflow-hidden border-t border-white/[0.04]">
          <Collections />
        </section>
      </Reveal>

      {/* ================= PARALLAX ================= */}
      <Reveal delay={0.08}>
        <section className="relative z-10 overflow-hidden border-t border-white/[0.04]">
          <ParallaxSection />
        </section>
      </Reveal>

      {/* ================= SHOWCASE ================= */}
      <Reveal delay={0.08}>
        <section className="relative z-10 overflow-hidden border-t border-white/[0.04]">
          <Showcase />
        </section>
      </Reveal>

      {/* ================= HORIZONTAL STORY ================= */}
      <Reveal delay={0.1}>
        <section className="relative z-10 overflow-hidden border-t border-white/[0.04]">
          <HorizontalScroll />
        </section>
      </Reveal>

      {/* ================= SIGNATURE ================= */}
      <Reveal delay={0.08}>
        <section className="relative z-10 overflow-hidden border-t border-white/[0.04]">
          <SignaturePiece />
        </section>
      </Reveal>

      {/* ================= QUOTE ================= */}
      <Reveal delay={0.05}>
        <section className="relative z-10 overflow-hidden border-t border-white/[0.04]">
          <QuoteDivider />
        </section>
      </Reveal>

      {/* ================= PRODUCTS ================= */}
      <Reveal delay={0.08}>
        <section className="relative z-10 overflow-hidden border-t border-white/[0.04]">
          <Products />
        </section>
      </Reveal>

      {/* ================= FOOTER TRANSITION ================= */}
      <div className="relative z-10 h-24 overflow-hidden">

        {/* Soft Fade */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#070707]/50 to-black" />

        {/* Ambient Glow */}
        <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#B89B72]/[0.03] blur-[180px]" />

      </div>

      {/* ================= FOOTER ================= */}
      <Reveal>
        <Footer />
      </Reveal>

    </main>
  );
}