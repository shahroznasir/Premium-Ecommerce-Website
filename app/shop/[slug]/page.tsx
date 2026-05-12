import { notFound } from "next/navigation";

import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

import CinematicGallery from "@/components/product/cinematic-gallery";
import RelatedProducts from "@/components/product/related-products";
import RecentlyViewed from "@/components/product/recently-viewed";
import TrackProduct from "@/components/product/track-product";
import ProductActions from "@/components/product/product-actions";

import { supabase } from "@/lib/supabase";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

async function getProduct(slug: string) {
  const { data } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .single();

  return data;
}

async function getRelatedProducts(
  category: string
) {
  const { data } = await supabase
    .from("products")
    .select("*")
    .eq("category", category)
    .limit(4);

  return data || [];
}

export default async function ProductPage({
  params,
}: ProductPageProps) {
  const { slug } = await params;

  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts =
    await getRelatedProducts(
      product.category
    );

  return (
    <>
      <Navbar />

      <main className="relative overflow-hidden bg-[#050505] text-white">

        {/* ================= TRACK ================= */}
        <TrackProduct
          product={{
            id: product.id,
            title: product.title,
            slug: product.slug,
            image: product.image,
            price: product.price,
            category: product.category,
          }}
        />

        {/* ================= ATMOSPHERE ================= */}
        <div className="pointer-events-none fixed inset-0 overflow-hidden">

          <div className="absolute left-1/2 top-[-20%] h-[1000px] w-[1000px] -translate-x-1/2 rounded-full bg-[#B89B72]/[0.04] blur-[180px]" />

          <div className="absolute right-[-10%] top-[30%] h-[600px] w-[600px] rounded-full bg-[#B89B72]/[0.03] blur-[160px]" />

        </div>

        {/* ================= HERO ================= */}
        <section className="relative overflow-hidden pt-32">

          <div className="container-luxury relative z-10">

            <div className="grid items-start gap-16 xl:grid-cols-[1fr_0.85fr]">

              {/* ================= LEFT ================= */}
              <div>

                <div className="relative overflow-hidden rounded-[2.8rem] border border-white/[0.06] bg-white/[0.02]">

                  {/* Reflection */}
                  <div className="pointer-events-none absolute inset-y-0 left-[-20%] z-20 w-[20%] rotate-12 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent blur-3xl" />

                  {/* Gallery */}
                  <div className="relative z-10">

                    <CinematicGallery
                      images={[
                        product.image,
                        product.image,
                        product.image,
                        product.image,
                      ]}
                    />

                  </div>

                </div>

              </div>

              {/* ================= RIGHT ================= */}
              <div className="sticky top-28">

                {/* Category */}
                <p className="text-[10px] uppercase tracking-[0.45em] text-[#B89B72]/70">

                  {product.category}

                </p>

                {/* Title */}
                <h1 className="mt-8 max-w-[10ch] text-[4.5rem] font-light leading-[0.88] tracking-[-0.08em] text-white xl:text-[5.5rem]">

                  {product.title}

                </h1>

                {/* Divider */}
                <div className="mt-10 h-px w-20 bg-[#B89B72]/70" />

                {/* Description */}
                <p className="mt-10 max-w-[520px] text-[1.02rem] leading-[2] text-white/52">

                  {product.description}

                </p>

                {/* Price */}
                <div className="mt-14">

                  <p className="text-[2.7rem] font-light tracking-[-0.06em] text-white">

                    ₹
                    {product.price.toLocaleString(
                      "en-IN"
                    )}

                  </p>

                </div>

                {/* Actions */}
                <div className="mt-14">

                  <ProductActions
                    product={{
                      id: product.id,
                      title: product.title,
                      slug: product.slug,
                      image: product.image,
                      price: product.price,
                    }}
                  />

                </div>

                {/* Specs */}
                <div className="mt-20 border-t border-white/[0.06] pt-10">

                  <div className="grid gap-y-10 sm:grid-cols-2">

                    <LuxurySpec
                      label="Material"
                      value="Premium Sculptural Resin"
                    />

                    <LuxurySpec
                      label="Finish"
                      value="Architectural Matte"
                    />

                    <LuxurySpec
                      label="Dimensions"
                      value="42 × 28 × 18 cm"
                    />

                    <LuxurySpec
                      label="Craftsmanship"
                      value="Hand Finished"
                    />

                  </div>

                </div>

                {/* Pills */}
                <div className="mt-14 flex flex-wrap gap-3">

                  <LuxuryPill text="White Glove Delivery" />

                  <LuxuryPill text="Limited Edition" />

                  <LuxuryPill text="Curated Luxury Object" />

                </div>

              </div>

            </div>

          </div>

        </section>

        {/* ================= EDITORIAL ================= */}
        <section className="relative py-32">

          <div className="container-luxury">

            <div className="grid items-start gap-20 lg:grid-cols-2">

              {/* Left */}
              <div>

                <p className="text-[10px] uppercase tracking-[0.45em] text-[#B89B72]/70">

                  Crafted Presence

                </p>

                <h2 className="mt-8 text-5xl font-light leading-[0.92] tracking-[-0.08em] text-white md:text-6xl">

                  Designed
                  <br />
                  Through
                  <br />
                  Timeless
                  <br />
                  Materiality

                </h2>

              </div>

              {/* Right */}
              <div>

                <p className="max-w-[560px] text-[1.05rem] leading-[2.1] text-white/52">

                  Every sculptural detail is designed
                  through balance, restraint,
                  proportion, and atmospheric
                  composition.

                  <br />
                  <br />

                  The collection represents cinematic
                  luxury through silence,
                  craftsmanship, and timeless modern
                  presence.

                </p>

              </div>

            </div>

          </div>

        </section>

        {/* ================= FEATURE IMAGE ================= */}
        <section className="relative py-24">

          <div className="container-luxury">

            <div className="relative overflow-hidden rounded-[3rem] border border-white/[0.06]">

              <img
                src={product.image}
                alt={product.title}
                className="h-[85vh] w-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

              <div className="absolute bottom-0 left-0 p-10 md:p-16">

                <p className="text-[10px] uppercase tracking-[0.45em] text-[#B89B72]/80">

                  Architectural Presence

                </p>

                <h2 className="mt-6 text-5xl font-light leading-[0.9] tracking-[-0.08em] text-white md:text-6xl">

                  Designed
                  <br />
                  Through
                  <br />
                  Silence

                </h2>

              </div>

            </div>

          </div>

        </section>

        {/* ================= RELATED ================= */}
        <RelatedProducts
          products={relatedProducts.filter(
            (item) => item.id !== product.id
          )}
        />

        {/* ================= RECENTLY VIEWED ================= */}
        <RecentlyViewed />

        {/* ================= SPACING ================= */}
        <div className="h-24" />

      </main>

      <Footer />
    </>
  );
}

function LuxurySpec({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>

      <p className="text-[10px] uppercase tracking-[0.35em] text-white/30">

        {label}

      </p>

      <p className="mt-3 text-lg text-white/78">

        {value}

      </p>

    </div>
  );
}

function LuxuryPill({
  text,
}: {
  text: string;
}) {
  return (
    <div className="rounded-full border border-white/[0.06] bg-white/[0.03] px-5 py-3 text-[10px] uppercase tracking-[0.35em] text-white/55 backdrop-blur-xl">

      {text}

    </div>
  );
}