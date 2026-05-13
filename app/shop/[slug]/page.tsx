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

  const gallery =
    product.images?.length > 0
      ? product.images
      : [product.image];

  return (
    <>
      <Navbar />

      <main className="relative overflow-hidden bg-[#050505] text-white">

        {/* ATMOSPHERIC BACKGROUND */}
        <ProductAtmosphere
          category={product.category}
        />

        {/* PREMIUM GLOW */}
        <div className="pointer-events-none absolute left-1/2 top-0 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-[#B89B72]/[0.05] blur-[120px]" />

        {/* TRACK PRODUCT */}
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

        {/* HERO */}
        <section className="relative overflow-hidden pt-32 md:pt-36">

          <div className="container-luxury relative z-10">

            <div className="grid gap-14 xl:grid-cols-[1.05fr_0.95fr] xl:items-start">

              {/* LEFT */}
              <ScrollNarrative>

                <SpatialDepth intensity={2}>

                  <div className="relative overflow-hidden rounded-[3rem] border border-white/[0.05] bg-gradient-to-b from-white/[0.03] to-white/[0.01] shadow-[0_0_60px_rgba(0,0,0,0.45)]">

                    {/* Reflection */}
                    <div className="pointer-events-none absolute inset-y-0 left-[-10%] z-20 hidden w-[18%] rotate-12 bg-gradient-to-r from-transparent via-white/[0.04] to-transparent blur-2xl md:block" />

                    {/* Gallery */}
                    <div className="relative z-10">

                      <CinematicGallery
                        images={gallery}
                      />

                    </div>

                    {/* Luxury Vignette */}
                    <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_120px_rgba(0,0,0,0.55)]" />

                  </div>

                </SpatialDepth>

              </ScrollNarrative>

              {/* RIGHT */}
              <div className="xl:sticky xl:top-24">

                {/* CATEGORY */}
                <ScrollNarrative delay={0.05}>

                  <p className="text-[10px] uppercase tracking-[0.55em] text-[#B89B72]/68">

                    {product.category}

                  </p>

                </ScrollNarrative>

                {/* TITLE */}
                <ScrollNarrative delay={0.1}>

                  <CinematicHeading
                    className="mt-5 max-w-[7ch] text-[4rem] font-light leading-[0.84] tracking-[-0.11em] text-white md:text-[5.4rem] xl:text-[5.9rem]"
                  >

                    {product.title}

                  </CinematicHeading>

                </ScrollNarrative>

                {/* SUBTITLE */}
                <ScrollNarrative delay={0.14}>

                  <p className="mt-6 text-[10px] uppercase tracking-[0.46em] text-[#B89B72]/70">

                    {product.subtitle}

                  </p>

                </ScrollNarrative>

                {/* DIVIDER */}
                <div className="mt-8 h-px w-20 bg-gradient-to-r from-[#B89B72] to-transparent" />

                {/* STORY */}
                <ScrollNarrative delay={0.18}>

                  <div className="mt-9 max-w-[520px] space-y-5">

                    <p className="text-[1rem] leading-[1.95] text-white/56">

                      Architectural illuminated timepiece
                      crafted to transform overlooked corners
                      into cinematic focal points.

                    </p>

                    <p className="text-[0.92rem] leading-[1.9] text-white/34">

                      Celestial artistry. Ambient illumination.
                      Sculptural geometry designed for refined
                      contemporary interiors.

                    </p>

                  </div>

                </ScrollNarrative>

                {/* PRODUCT ACTIONS */}
                <ScrollNarrative delay={0.24}>

                  <div className="mt-12">

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

                  <div className="mt-12 grid gap-4 sm:grid-cols-3">

                    <LuxurySpec
                      label="Dimensions"
                      value={
                        product.dimensions ||
                        "Corner Mounted"
                      }
                    />

                    <LuxurySpec
                      label="Material"
                      value={
                        product.material ||
                        "Illuminated Acrylic"
                      }
                    />

                    <LuxurySpec
                      label="Lighting"
                      value={
                        product.lighting ||
                        "Warm Ambient LED"
                      }
                    />

                  </div>

                </ScrollNarrative>

                {/* TAGS */}
                <ScrollNarrative delay={0.34}>

                  <div className="mt-9 flex flex-wrap gap-3">

                    <LuxuryPill text="Limited Edition" />

                    <LuxuryPill text="Architectural Luxury" />

                    <LuxuryPill text="Ambient Illumination" />

                  </div>

                </ScrollNarrative>

              </div>

            </div>

          </div>

        </section>

        {/* MONUMENTAL VISUAL */}
        <section className="relative py-24 md:py-36">

          <div className="container-luxury">

            <ScrollNarrative>

              <div className="group relative overflow-hidden rounded-[3rem] border border-white/[0.05] shadow-[0_0_60px_rgba(0,0,0,0.45)]">

                <Image
                  src={gallery[2]}
                  alt={product.title}
                  width={1800}
                  height={1800}
                  quality={85}
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="h-[72vh] w-full object-cover will-change-transform transform-gpu transition-transform duration-[2500ms] ease-out group-hover:scale-[1.02] md:h-[92vh]"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />

                {/* Vignette */}
                <div className="absolute inset-0 shadow-[inset_0_0_120px_rgba(0,0,0,0.55)]" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 p-10 md:p-20">

                  <p className="text-[10px] uppercase tracking-[0.48em] text-[#B89B72]/80">

                    Architectural Presence

                  </p>

                  <CinematicHeading
                    className="mt-6 text-5xl font-light leading-[0.84] tracking-[-0.09em] text-white md:text-7xl"
                  >

                    Designed
                    <br />
                    Through
                    <br />
                    Atmosphere

                  </CinematicHeading>

                </div>

              </div>

            </ScrollNarrative>

          </div>

        </section>

        {/* RELATED */}
        <RelatedProducts
          products={relatedProducts.filter(
            (item) => item.id !== product.id
          )}
        />

        {/* RECENTLY VIEWED */}
        <RecentlyViewed />

        <div className="h-20" />

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
    <div className="rounded-[1.7rem] border border-white/[0.05] bg-white/[0.025] p-6 backdrop-blur-md transition-all duration-500 hover:border-[#B89B72]/20 hover:bg-white/[0.04]">

      <p className="text-[10px] uppercase tracking-[0.38em] text-[#B89B72]/68">

        {label}

      </p>

      <p className="mt-4 text-[14px] leading-relaxed text-white/72">

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
    <div className="rounded-[1.1rem] border border-white/[0.05] bg-white/[0.025] px-5 py-3 text-[10px] uppercase tracking-[0.34em] text-white/50 backdrop-blur-md transition-all duration-500 hover:border-[#B89B72]/20 hover:bg-white/[0.04] hover:text-white/72">

      {text}

    </div>
  );
}