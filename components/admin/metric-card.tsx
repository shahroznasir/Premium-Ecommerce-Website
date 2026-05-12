"use client";

import { motion } from "framer-motion";

interface MetricCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ReactNode;
}

export default function MetricCard({
  title,
  value,
  subtitle,
  icon,
}: MetricCardProps) {
  return (
    <motion.div
      whileHover={{
        y: -6,
      }}
      transition={{
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative min-h-[250px] overflow-hidden rounded-[2rem] border border-white/[0.06] bg-gradient-to-b from-white/[0.05] to-white/[0.02] p-7 backdrop-blur-3xl"
    >

      {/* Luxury Atmosphere */}
      <div className="absolute inset-0 overflow-hidden">

        {/* Main Glow */}
        <div className="absolute right-[-15%] top-[-20%] h-[260px] w-[260px] rounded-full bg-[#B89B72]/10 opacity-0 blur-[100px] transition duration-700 group-hover:opacity-100" />

        {/* Secondary Glow */}
        <div className="absolute bottom-[-30%] left-[-10%] h-[180px] w-[180px] rounded-full bg-[#B89B72]/5 blur-[80px]" />

        {/* Noise */}
        <div className="absolute inset-0 opacity-[0.02] mix-blend-soft-light">

          <div
            className="h-full w-full"
            style={{
              backgroundImage:
                "url('https://grainy-gradients.vercel.app/noise.svg')",
            }}
          />

        </div>

      </div>

      {/* Border Shine */}
      <div className="absolute inset-0 rounded-[2rem] border border-white/[0.03]" />

      {/* Content */}
      <div className="relative flex h-full flex-col justify-between">

        {/* Top */}
        <div className="flex items-start justify-between">

          {/* Left */}
          <div>

            {/* Label */}
            <p className="text-[10px] uppercase tracking-[0.42em] text-white/35">

              {title}

            </p>

            {/* Value */}
            <h2 className="mt-5 text-5xl font-light leading-none tracking-[-0.07em] text-white">

              {value}

            </h2>

            {/* Subtitle */}
            <p className="mt-4 text-sm leading-relaxed text-white/35">

              {subtitle}

            </p>

          </div>

          {/* Icon */}
          <div className="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border border-[#B89B72]/20 bg-[#B89B72]/10 text-[#B89B72]">

            {/* Icon Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(184,155,114,0.18),transparent_70%)] opacity-0 transition duration-700 group-hover:opacity-100" />

            <div className="relative z-10">

              {icon}

            </div>

          </div>

        </div>

        {/* Bottom */}
        <div className="mt-10 flex items-end justify-between">

          {/* Tiny Insight */}
          <div className="flex items-center gap-2">

            <div className="h-2 w-2 rounded-full bg-[#B89B72]" />

            <span className="text-xs uppercase tracking-[0.28em] text-[#B89B72]/75">

              Live Metrics

            </span>

          </div>

          {/* Wave */}
          <div className="opacity-90">

            <svg
              width="92"
              height="24"
              viewBox="0 0 92 24"
              fill="none"
            >

              <path
                d="M1 16C10 16 10 4 20 4C30 4 30 20 40 20C50 20 50 8 60 8C70 8 70 22 91 22"
                stroke="#B89B72"
                strokeWidth="2"
                strokeLinecap="round"
              />

            </svg>

          </div>

        </div>

      </div>

    </motion.div>
  );
}