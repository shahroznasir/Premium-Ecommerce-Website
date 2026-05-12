import Atmosphere from "@/components/layout/atmosphere";

import GrainOverlay from "@/components/common/grain-overlay";
import FloatingCart from "@/components/cart/floating-cart";

import CustomCursor from "@/components/common/custom-cursor";
import Loader from "@/components/common/loader";

export default function ExperienceShell() {
  return (
    <>
      {/* ================= LOADER ================= */}
      <Loader />

      {/* ================= CURSOR ================= */}
      <CustomCursor />

      {/* ================= GRAIN ================= */}
      <GrainOverlay />

      {/* ================= ATMOSPHERE ================= */}
      <Atmosphere />

      {/* ================= FLOATING CART ================= */}
      <FloatingCart />
    </>
  );
}