"use client";

interface LuxurySkeletonProps {
  className?: string;
  imageClassName?: string;
  contentClassName?: string;
  showImage?: boolean;
  lines?: number;
}

export default function LuxurySkeleton({
  className = "",
  imageClassName = "",
  contentClassName = "",
  showImage = true,
  lines = 3,
}: LuxurySkeletonProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-[2.6rem] border border-white/[0.05] bg-[#0A0A0A]/90 backdrop-blur-xl ${className}`}
    >
      {/* =====================================================
          SHIMMER LAYER
      ====================================================== */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_2.8s_infinite] bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      </div>

      {/* =====================================================
          IMAGE SKELETON
      ====================================================== */}
      {showImage && (
        <div
          className={`aspect-[0.72] w-full bg-gradient-to-br from-white/[0.05] to-white/[0.02] ${imageClassName}`}
        />
      )}

      {/* =====================================================
          CONTENT
      ====================================================== */}
      <div className={`px-8 pb-8 pt-7 ${contentClassName}`}>
        {/* CATEGORY */}
        <div className="h-3 w-24 rounded-full bg-white/[0.05]" />

        {/* TITLE */}
        <div className="mt-6 space-y-3">
          <div className="h-8 w-2/3 rounded-full bg-white/[0.07]" />

          <div className="h-8 w-1/2 rounded-full bg-white/[0.05]" />
        </div>

        {/* DESCRIPTION */}
        <div className="mt-7 space-y-3">
          {Array.from({ length: lines }).map((_, index) => (
            <div
              key={index}
              className={`h-3 rounded-full bg-white/[0.04] ${
                index === lines - 1
                  ? "w-2/3"
                  : index === lines - 2
                  ? "w-5/6"
                  : "w-full"
              }`}
            />
          ))}
        </div>

        {/* BOTTOM */}
        <div className="mt-10 flex items-center justify-between">
          {/* PRICE */}
          <div>
            <div className="h-3 w-20 rounded-full bg-white/[0.04]" />

            <div className="mt-4 h-8 w-28 rounded-full bg-white/[0.07]" />
          </div>

          {/* ACTIONS */}
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-full bg-white/[0.05]" />

            <div className="h-11 w-24 rounded-full bg-white/[0.07]" />
          </div>
        </div>
      </div>

      {/* =====================================================
          LUXURY GLOW
      ====================================================== */}
      <div className="pointer-events-none absolute inset-0 rounded-[2.6rem] ring-1 ring-white/[0.03]" />
    </div>
  );
}