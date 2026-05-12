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
          ATMOSPHERIC BACKGROUND
      ========================================================== */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">

        {/* Main Aura */}
        <div className="absolute left-1/2 top-[-20%] h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-[#B89B72]/[0.04] blur-[100px] md:h-[1100px] md:w-[1100px] md:blur-[220px]" />

        {/* Side Depth */}
        <div className="absolute right-[-10%] top-[30%] h-[400px] w-[400px] rounded-full bg-[#B89B72]/[0.025] blur-[80px] md:h-[700px] md:w-[700px] md:blur-[180px]" />

        {/* Bottom Glow */}
        <div className="absolute bottom-[-15%] left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[#B89B72]/[0.02] blur-[100px] md:h-[800px] md:w-[800px] md:blur-[220px]" />

      </div>

      {/* =========================================================
          NAVBAR
      ========================================================== */}
      <Navbar />

      {/* =========================================================
          SHOP EXPERIENCE
      ========================================================== */}
      <section className="relative z-10">

        <ShopClient products={products} />

      </section>

      {/* =========================================================
          FOOTER SPACING
      ========================================================== */}
      <div className="h-16 md:h-24" />

      {/* =========================================================
          FOOTER
      ========================================================== */}
      <Footer />

    </main>
  );
}