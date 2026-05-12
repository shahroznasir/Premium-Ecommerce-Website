import {
  ReactNode,
} from "react";

interface ProductSceneProps {
  gallery: ReactNode;

  content: ReactNode;
}

export default function ProductScene({
  gallery,
  content,
}: ProductSceneProps) {
  return (
    <section className="relative">

      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[1.1fr_0.9fr]">

        {/* =========================================================
            STICKY GALLERY
        ========================================================== */}
        <div className="relative h-full">

          <div className="lg:sticky lg:top-0 lg:h-screen">

            {gallery}

          </div>

        </div>

        {/* =========================================================
            EDITORIAL CONTENT
        ========================================================== */}
        <div className="relative flex items-center">

          <div className="w-full px-8 py-20 lg:px-16 lg:py-32">

            {content}

          </div>

        </div>

      </div>

    </section>
  );
}