import { notFound } from "next/navigation";

import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

import CinematicGallery from "@/components/product/cinematic-gallery";
import RelatedProducts from "@/components/product/related-products";
import RecentlyViewed from "@/components/product/recently-viewed";
import TrackProduct from "@/components/product/track-product";
import ProductActions from "@/components/product/product-actions";
import ProductAtmosphere from "@/components/product/product-atmosphere";

import ScrollNarrative from "@/components/common/scroll-narrative";
import CinematicHeading from "@/components/common/cinematic-heading";
import SpatialDepth from "@/components/common/spatial-depth";

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

  const product =
    await getProduct(slug);

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

        {/* =========================================================
            TRACK
        ========================================================== */}
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

        {/* =========================================================
            DYNAMIC ATMOSPHERE
        ========================================================== */}
        <ProductAtmosphere
          category={product.category}
          title={product.title}
        />

        {/* =========================================================
            HERO
        ========================================================== */}
        <section className="relative overflow-hidden pt-24 md:pt-32">

          <div className="container-luxury relative z-10">

            <div className="grid items-start gap-12 md:gap-16 xl:grid-cols-[1fr_0.85fr]">

              {/* =========================================================
                  GALLERY
              ========================================================== */}
              <ScrollNarrative>

                <SpatialDepth intensity={10}>

                  <div className="relative overflow-hidden rounded-[2rem] md:rounded-[2.8rem] border border-white/[0.06] bg-white/[0.02]">

                    {/* Reflection */}
                    <div className="pointer-events-none absolute inset-y-0 left-[-20%] z-20 hidden w-[20%] rotate-12 bg-gradient-to-r from-transparent via-white/[0.06] to-transparent blur-3xl md:block" />

                    {/* Ambient Glow */}
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(184,155,114,0.08),transparent_40%)] opacity-70" />

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

                    {/* Vignette */}
                    <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_80px_rgba(0,0,0,0.35)] md:shadow-[inset_0_0_140px_rgba(0,0,0,0.42)]" />

                  </div>

                </SpatialDepth>

              </ScrollNarrative>

              {/* =========================================================
                  PRODUCT STORY
              ========================================================== */}
              <div className="xl:sticky xl:top-28">

                {/* Category */}
                <ScrollNarrative delay={0.05}>

                  <p className="text-[9px] md:text-[10px] uppercase tracking-[0.42em] md:tracking-[0.48em] text-[#B89B72]/70">

                    {product.category}

                  </p>

                </ScrollNarrative>

                {/* Title */}
                <ScrollNarrative delay={0.1}>

                  <CinematicHeading
                    className="mt-6 md:mt-8 max-w-[10ch] text-[3rem] leading-[0.88] tracking-[-0.08em] text-white md:text-[4.5rem] xl:text-[5.5rem] font-light"
                  >

                    {product.title}

                  </CinematicHeading>

                </ScrollNarrative>

                {/* Divider */}
                <ScrollNarrative delay={0.15}>

                  <div className="mt-8 md:mt-10 h-px w-16 md:w-20 bg-gradient-to-r from-[#B89B72] to-transparent" />

                </ScrollNarrative>

                {/* Description */}
                <ScrollNarrative delay={0.2}>

                  <p className="mt-8 md:mt-10 max-w-[520px] text-[0.98rem] md:text-[1.02rem] leading-[1.95] md:leading-[2] text-white/50">

                    {product.description}

                  </p>

                </ScrollNarrative>

                {/* Price */}
                <ScrollNarrative delay={0.25}>

                  <div className="mt-10 md:mt-14">

                    <p className="text-[2.2rem] md:text-[2.7rem] font-light tracking-[-0.06em] text-white">

                      ₹
                      {product.price.toLocaleString(
                        "en-IN"
                      )}

                    </p>

                  </div>

                </ScrollNarrative>

                {/* Actions */}
                <ScrollNarrative delay={0.3}>

                  <div className="mt-10 md:mt-14">

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

                </ScrollNarrative>

                {/* Specs */}
                <ScrollNarrative delay={0.35}>

                  <div className="mt-14 md:mt-20 border-t border-white/[0.06] pt-8 md:pt-10">

                    <div className="grid gap-y-8 md:gap-y-10 sm:grid-cols-2">

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

                </ScrollNarrative>

                {/* Pills */}
                <ScrollNarrative delay={0.4}>

                  <div className="mt-10 md:mt-14 flex flex-wrap gap-3">

                    <LuxuryPill text="White Glove Delivery" />

                    <LuxuryPill text="Limited Edition" />

                    <LuxuryPill text="Curated Luxury Object" />

                  </div>

                </ScrollNarrative>

              </div>

            </div>

          </div>

        </section>

        {/* =========================================================
            EDITORIAL STORY
        ========================================================== */}
        <section className="relative py-24 md:py-36">

          <div className="container-luxury">

            <div className="grid items-start gap-12 md:gap-20 lg:grid-cols-2">

              {/* Left */}
              <div>

                <ScrollNarrative>

                  <p className="text-[9px] md:text-[10px] uppercase tracking-[0.42em] md:tracking-[0.48em] text-[#B89B72]/70">

                    Crafted Presence

                  </p>

                </ScrollNarrative>

                <ScrollNarrative delay={0.1}>

                  <CinematicHeading
                    className="mt-6 md:mt-8 text-4xl md:text-5xl font-light leading-[0.9] tracking-[-0.08em] text-white lg:text-6xl"
                  >

                    Designed
                    <br />
                    Through
                    <br />
                    Timeless
                    <br />
                    Materiality

                  </CinematicHeading>

                </ScrollNarrative>

              </div>

              {/* Right */}
              <div>

                <ScrollNarrative delay={0.2}>

                  <p className="max-w-[560px] text-[1rem] md:text-[1.05rem] leading-[2] md:leading-[2.1] text-white/50">

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

                </ScrollNarrative>

              </div>

            </div>

          </div>

        </section>

        {/* =========================================================
            MONUMENTAL IMAGE
        ========================================================== */}
        <section className="relative py-20 md:py-24">

          <div className="container-luxury">

            <ScrollNarrative>

              <SpatialDepth intensity={8}>

                <div className="group relative overflow-hidden rounded-[2rem] md:rounded-[3rem] border border-white/[0.06]">

                  <img
                    src={product.image}
                    alt={product.title}
                    className="h-[60vh] md:h-[85vh] w-full object-cover transition-transform duration-[4000ms] ease-out group-hover:scale-[1.03]"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                  {/* Vignette */}
                  <div className="absolute inset-0 shadow-[inset_0_0_80px_rgba(0,0,0,0.35)] md:shadow-[inset_0_0_140px_rgba(0,0,0,0.42)]" />

                  {/* Ambient Glow */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(184,155,114,0.08),transparent_45%)] opacity-70" />

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 p-8 md:p-16">

                    <ScrollNarrative delay={0.1}>

                      <p className="text-[9px] md:text-[10px] uppercase tracking-[0.42em] md:tracking-[0.48em] text-[#B89B72]/80">

                        Architectural Presence

                      </p>

                    </ScrollNarrative>

                    <ScrollNarrative delay={0.2}>

                      <CinematicHeading
                        className="mt-5 md:mt-6 text-4xl md:text-5xl font-light leading-[0.88] tracking-[-0.08em] text-white lg:text-6xl"
                      >

                        Designed
                        <br />
                        Through
                        <br />
                        Silence

                      </CinematicHeading>

                    </ScrollNarrative>

                  </div>

                </div>

              </SpatialDepth>

            </ScrollNarrative>

          </div>

        </section>

        {/* =========================================================
            RELATED PRODUCTS
        ========================================================== */}
        <RelatedProducts
          products={relatedProducts.filter(
            (item) => item.id !== product.id
          )}
        />

        {/* =========================================================
            RECENTLY VIEWED
        ========================================================== */}
        <RecentlyViewed />

        {/* =========================================================
            SPACING
        ========================================================== */}
        <div className="h-16 md:h-24" />

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

      <p className="text-[9px] md:text-[10px] uppercase tracking-[0.32em] md:tracking-[0.35em] text-white/30">

        {label}

      </p>

      <p className="mt-2 md:mt-3 text-base md:text-lg text-white/78">

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
    <div className="rounded-full border border-white/[0.06] bg-white/[0.03] px-4 py-2.5 md:px-5 md:py-3 text-[9px] md:text-[10px] uppercase tracking-[0.32em] md:tracking-[0.35em] text-white/55 backdrop-blur-xl transition-all duration-500 hover:border-[#B89B72]/30 hover:bg-white/[0.05]">

      {text}

    </div>
  );
}