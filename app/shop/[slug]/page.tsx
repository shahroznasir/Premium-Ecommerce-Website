import { notFound } from "next/navigation";

import Image from "next/image";

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

/* =========================================================
   GET PRODUCT
========================================================= */

async function getProduct(
  slug: string
) {

  const { data } =
    await supabase
      .from("products")
      .select("*")
      .eq("slug", slug)
      .single();

  return data;
}

/* =========================================================
   RELATED PRODUCTS
========================================================= */

async function getRelatedProducts(
  category: string
) {

  const { data } =
    await supabase
      .from("products")
      .select("*")
      .eq("category", category)
      .limit(4);

  return data || [];
}

/* =========================================================
   PAGE
========================================================= */

export default async function ProductPage({
  params,
}: ProductPageProps) {

  const { slug } =
    await params;

  const product =
    await getProduct(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts =
    await getRelatedProducts(
      product.category
    );

  const gallery =
    product.images?.length > 0
      ? product.images
      : [product.image];

  return (
    <>
      <Navbar />

      <main className="relative overflow-hidden bg-[#050505] text-white">

        {/* =====================================================
            ATMOSPHERIC BACKGROUND
        ====================================================== */}
        <ProductAtmosphere
          category={product.category}
        />

        {/* =====================================================
            PREMIUM GLOW
        ====================================================== */}
        <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[#B89B72]/[0.04] blur-[100px] md:h-[700px] md:w-[700px] md:blur-[120px]" />

        {/* =====================================================
            TRACK PRODUCT
        ====================================================== */}
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

        {/* =====================================================
            HERO
        ====================================================== */}
        <section className="relative overflow-hidden pt-24 md:pt-36">

          <div className="container-luxury relative z-10">

            <div className="grid gap-10 md:gap-14 xl:grid-cols-[1.05fr_0.95fr] xl:items-start">

              {/* =================================================
                  LEFT
              ================================================== */}
              <ScrollNarrative>

                <SpatialDepth intensity={2}>

                  <div className="relative overflow-hidden rounded-[2rem] border border-white/[0.05] bg-gradient-to-b from-white/[0.03] to-white/[0.01] shadow-[0_0_40px_rgba(0,0,0,0.35)] md:rounded-[3rem] md:shadow-[0_0_60px_rgba(0,0,0,0.45)]">

                    {/* Reflection */}
                    <div className="pointer-events-none absolute inset-y-0 left-[-10%] z-20 hidden w-[18%] rotate-12 bg-gradient-to-r from-transparent via-white/[0.04] to-transparent blur-2xl md:block" />

                    {/* Gallery */}
                    <div className="relative z-10">

                      <CinematicGallery
                        images={gallery}
                      />

                    </div>

                    {/* Vignette */}
                    <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_80px_rgba(0,0,0,0.45)] md:shadow-[inset_0_0_120px_rgba(0,0,0,0.55)]" />

                  </div>

                </SpatialDepth>

              </ScrollNarrative>

              {/* =================================================
                  RIGHT
              ================================================== */}
              <div className="xl:sticky xl:top-24">

                {/* CATEGORY */}
                <ScrollNarrative delay={0.05}>

                  <p className="text-[9px] uppercase tracking-[0.5em] text-[#B89B72]/68 md:text-[10px] md:tracking-[0.55em]">

                    {product.category}

                  </p>

                </ScrollNarrative>

                {/* TITLE */}
                <ScrollNarrative delay={0.1}>

                  <CinematicHeading
                    className="mt-4 max-w-[7ch] text-[2.9rem] font-light leading-[0.9] tracking-[-0.09em] text-white sm:text-[3.5rem] md:mt-5 md:text-[5rem] md:leading-[0.84] xl:text-[5.9rem]"
                  >

                    {product.title}

                  </CinematicHeading>

                </ScrollNarrative>

                {/* SUBTITLE */}
                <ScrollNarrative delay={0.14}>

                  <p className="mt-5 text-[9px] uppercase tracking-[0.42em] text-[#B89B72]/70 md:mt-6 md:text-[10px] md:tracking-[0.46em]">

                    {product.subtitle}

                  </p>

                </ScrollNarrative>

                {/* DIVIDER */}
                <div className="mt-7 h-px w-16 bg-gradient-to-r from-[#B89B72] to-transparent md:mt-8 md:w-20" />

                {/* STORY */}
                <ScrollNarrative delay={0.18}>

                  <div className="mt-8 max-w-[520px] space-y-5 md:mt-9">

                    <p className="text-[0.95rem] leading-[1.9] text-white/56 md:text-[1rem] md:leading-[1.95]">

                      Architectural illuminated object
                      crafted to transform overlooked
                      spaces into cinematic focal points.

                    </p>

                    <p className="text-[0.86rem] leading-[1.85] text-white/34 md:text-[0.92rem] md:leading-[1.9]">

                      Sculptural geometry. Ambient
                      atmosphere. Timeless architectural
                      language designed for refined
                      contemporary interiors.

                    </p>

                  </div>

                </ScrollNarrative>

                {/* PRODUCT ACTIONS */}
                <ScrollNarrative delay={0.24}>

                  <div className="mt-10 md:mt-12">

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

                {/* SPECS */}
                <ScrollNarrative delay={0.3}>

                  <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3 md:mt-12">

                    <LuxurySpec
                      label="Dimensions"
                      value={
                        product.dimensions ||
                        "Architectural Scale"
                      }
                    />

                    <LuxurySpec
                      label="Material"
                      value={
                        product.material ||
                        "Luxury Composite"
                      }
                    />

                    <LuxurySpec
                      label="Lighting"
                      value={
                        product.lighting ||
                        "Ambient Illumination"
                      }
                    />

                  </div>

                </ScrollNarrative>

                {/* TAGS */}
                <ScrollNarrative delay={0.34}>

                  <div className="mt-8 flex flex-wrap gap-3 md:mt-9">

                    <LuxuryPill text="Limited Edition" />

                    <LuxuryPill text="Architectural Luxury" />

                    <LuxuryPill text="Atmospheric Design" />

                  </div>

                </ScrollNarrative>

              </div>

            </div>

          </div>

        </section>

        {/* =====================================================
            MATERIALITY SECTION
        ====================================================== */}
        <section className="relative py-20 md:py-32">

          <div className="container-luxury">

            <div className="grid gap-12 xl:grid-cols-[0.8fr_1.2fr] xl:gap-24">

              {/* LEFT */}
              <ScrollNarrative>

                <div>

                  <p className="text-[9px] uppercase tracking-[0.46em] text-[#B89B72]/70 md:text-[10px]">

                    Design Philosophy

                  </p>

                  <CinematicHeading
                    className="mt-6 max-w-[7ch] text-[2.8rem] font-light leading-[0.9] tracking-[-0.08em] text-white md:text-[4.8rem] md:leading-[0.84]"
                  >

                    Designed
                    Through
                    Atmosphere

                  </CinematicHeading>

                </div>

              </ScrollNarrative>

              {/* RIGHT */}
              <ScrollNarrative delay={0.08}>

                <div className="space-y-8">

                  <p className="max-w-[760px] text-[1rem] leading-[2] text-white/52 md:text-[1.15rem] md:leading-[2.1]">

                    Every sculptural object is designed
                    to create emotional atmosphere
                    through restrained geometry,
                    material depth, and cinematic
                    illumination.

                  </p>

                  <p className="max-w-[720px] text-[0.92rem] leading-[2] text-white/34 md:text-[1rem]">

                    The interaction between shadow,
                    reflection, and ambient lighting
                    transforms the object beyond
                    decoration into spatial presence —
                    creating immersive architectural
                    rhythm within contemporary interiors.

                  </p>

                </div>

              </ScrollNarrative>

            </div>

          </div>

        </section>

        {/* =====================================================
            MONUMENTAL VISUAL
        ====================================================== */}
        <section className="relative py-20 md:py-36">

          <div className="container-luxury">

            <ScrollNarrative>

              <div className="group relative overflow-hidden rounded-[2rem] border border-white/[0.05] shadow-[0_0_40px_rgba(0,0,0,0.35)] md:rounded-[3rem] md:shadow-[0_0_60px_rgba(0,0,0,0.45)]">

                <Image
                  src={
                    gallery[2] ||
                    gallery[0]
                  }
                  alt={product.title}
                  width={1800}
                  height={1800}
                  quality={85}
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="h-[48vh] w-full object-cover will-change-transform transform-gpu transition-transform duration-[2500ms] ease-out md:h-[92vh] md:group-hover:scale-[1.02]"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />

                {/* Vignette */}
                <div className="absolute inset-0 shadow-[inset_0_0_80px_rgba(0,0,0,0.45)] md:shadow-[inset_0_0_120px_rgba(0,0,0,0.55)]" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 p-6 sm:p-8 md:p-20">

                  <p className="text-[9px] uppercase tracking-[0.42em] text-[#B89B72]/80 md:text-[10px] md:tracking-[0.48em]">

                    Spatial Presence

                  </p>

                  <CinematicHeading
                    className="mt-4 text-[2.6rem] font-light leading-[0.88] tracking-[-0.08em] text-white sm:text-[3.5rem] md:mt-6 md:text-7xl md:leading-[0.84]"
                  >

                    Monumental
                    <br />
                    Atmosphere

                  </CinematicHeading>

                </div>

              </div>

            </ScrollNarrative>

          </div>

        </section>

        {/* =====================================================
            RELATED PRODUCTS
        ====================================================== */}
        <RelatedProducts
          products={relatedProducts.filter(
            (item) =>
              item.id !==
              product.id
          )}
        />

        {/* =====================================================
            RECENTLY VIEWED
        ====================================================== */}
        <RecentlyViewed />

        <div className="h-16 md:h-20" />

      </main>

      <Footer />
    </>
  );
}

/* =========================================================
   SPEC
========================================================= */

function LuxurySpec({
  label,
  value,
}: {
  label: string;
  value: string;
}) {

  return (
    <div className="rounded-[1.5rem] border border-white/[0.05] bg-white/[0.025] p-5 backdrop-blur-md transition-all duration-500 hover:border-[#B89B72]/20 hover:bg-white/[0.04] md:rounded-[1.7rem] md:p-6">

      <p className="text-[9px] uppercase tracking-[0.34em] text-[#B89B72]/68 md:text-[10px] md:tracking-[0.38em]">

        {label}

      </p>

      <p className="mt-3 text-[13px] leading-relaxed text-white/72 md:mt-4 md:text-[14px]">

        {value}

      </p>

    </div>
  );
}

/* =========================================================
   PILL
========================================================= */

function LuxuryPill({
  text,
}: {
  text: string;
}) {

  return (
    <div className="rounded-[1rem] border border-white/[0.05] bg-white/[0.025] px-4 py-3 text-[9px] uppercase tracking-[0.28em] text-white/50 backdrop-blur-md transition-all duration-500 hover:border-[#B89B72]/20 hover:bg-white/[0.04] hover:text-white/72 md:rounded-[1.1rem] md:px-5 md:text-[10px] md:tracking-[0.34em]">

      {text}

    </div>
  );
}