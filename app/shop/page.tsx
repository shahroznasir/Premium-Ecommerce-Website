import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

import ShopClient from "../../components/shop/shop-client";

import { getProducts } from "@/lib/get-products";

export default async function ShopPage() {

  const products =
    await getProducts();

  return (
    <main className="relative overflow-hidden bg-[#050505] text-white">

      {/* =========================================================
          GLOBAL CINEMATIC BACKGROUND
      ========================================================== */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">

        {/* Main Ambient Aura */}
        <div className="absolute left-1/2 top-[-18%] h-[650px] w-[650px] -translate-x-1/2 rounded-full bg-[#B89B72]/[0.05] blur-[100px] md:h-[1100px] md:w-[1100px] md:blur-[220px]" />

        {/* Right Atmospheric Depth */}
        <div className="absolute right-[-15%] top-[30%] h-[420px] w-[420px] rounded-full bg-[#B89B72]/[0.03] blur-[90px] md:h-[760px] md:w-[760px] md:blur-[200px]" />

        {/* Bottom Cinematic Glow */}
        <div className="absolute bottom-[-20%] left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[#B89B72]/[0.025] blur-[110px] md:h-[850px] md:w-[850px] md:blur-[240px]" />

        {/* Soft Radial Atmosphere */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(201,169,97,0.08),transparent_45%)]" />

      </div>

      {/* =========================================================
          NAVBAR
      ========================================================== */}
      <Navbar />

      {/* =========================================================
          HERO SECTION
      ========================================================== */}
      <section className="relative z-10 overflow-hidden border-b border-white/[0.06]">

        {/* Hero Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(201,169,97,0.12),transparent_50%)]" />

        {/* Right Side Atmospheric Product */}
        <div className="pointer-events-none absolute right-[-5%] top-1/2 hidden -translate-y-1/2 opacity-[0.08] blur-[2px] lg:block">

          <img
            src="https://wwuvgzalzbksjunyhmwd.supabase.co/storage/v1/object/public/products/image_1.webp"
            alt=""
            className="h-[700px] w-auto object-contain"
          />

        </div>

        <div className="relative mx-auto max-w-[1600px] px-6 pb-16 pt-32 md:px-10 md:pb-20 md:pt-36">

          <div className="max-w-5xl">

            {/* Micro Label */}
            <p className="mb-6 text-[10px] uppercase tracking-[0.45em] text-[#c9a961]">

              Curated Collection

            </p>

            {/* Cinematic Heading */}
            <h1 className="max-w-5xl font-serif text-4xl leading-[0.82] tracking-[-0.05em] text-white md:text-6xl lg:text-7xl">

              Designed Through
              <br />
              Atmosphere

            </h1>

            {/* Supporting Copy */}
            <p className="mt-8 max-w-xl text-sm leading-8 text-white/50 md:text-base md:leading-9">

              Collectible architectural objects crafted
              for elevated interiors, cinematic spatial
              experiences, and refined contemporary living.

            </p>

          </div>

        </div>

        {/* Cinematic Fade */}
        <div className="absolute bottom-0 left-0 h-32 w-full bg-gradient-to-b from-transparent to-[#050505]" />

      </section>

      {/* =========================================================
          SHOP EXPERIENCE
      ========================================================== */}
      <section className="relative z-10 -mt-10 md:-mt-14">

        <ShopClient products={products} />

      </section>

      {/* =========================================================
          FOOTER SPACING
      ========================================================== */}
      <div className="h-20 md:h-28" />

      {/* =========================================================
          FOOTER
      ========================================================== */}
      <Footer />

    </main>
  );
}