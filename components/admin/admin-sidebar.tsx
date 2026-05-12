"use client";

import {
  LayoutGrid,
  ShoppingBag,
  Boxes,
  Users,
  LineChart,
  Settings,
  ChevronDown,
} from "lucide-react";

const links = [
  {
    label: "Overview",
    icon: LayoutGrid,
    active: true,
  },
  {
    label: "Orders",
    icon: ShoppingBag,
  },
  {
    label: "Products",
    icon: Boxes,
  },
  {
    label: "Customers",
    icon: Users,
  },
  {
    label: "Analytics",
    icon: LineChart,
  },
  {
    label: "Settings",
    icon: Settings,
  },
];

export default function AdminSidebar() {
  return (
    <aside className="relative hidden h-screen w-[290px] shrink-0 flex-col justify-between overflow-hidden border-r border-white/[0.05] bg-black/40 px-7 py-8 backdrop-blur-3xl xl:flex">

      {/* Luxury Atmosphere */}
      <div className="absolute inset-0 overflow-hidden">

        {/* Main Glow */}
        <div className="absolute left-[-20%] top-[-10%] h-[420px] w-[420px] rounded-full bg-[#B89B72]/10 blur-[120px]" />

        {/* Bottom Glow */}
        <div className="absolute bottom-[-15%] left-[10%] h-[300px] w-[300px] rounded-full bg-[#B89B72]/5 blur-[100px]" />

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

      {/* TOP */}
      <div className="relative z-10">

        {/* Brand */}
        <div className="rounded-[2rem] border border-white/[0.06] bg-white/[0.03] p-5 shadow-[0_0_60px_rgba(0,0,0,0.4)] backdrop-blur-2xl">

          <div className="flex items-center gap-4">

            {/* Icon */}
            <div className="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-[1.4rem] border border-[#B89B72]/20 bg-[#B89B72]/10">

              {/* Glow */}
              <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(184,155,114,0.18),transparent_70%)]" />

              {/* Mark */}
              <div className="relative h-6 w-6 rounded-full border border-[#B89B72]">

                <div className="absolute inset-[5px] rounded-full bg-[#B89B72]" />

              </div>

            </div>

            {/* Text */}
            <div>

              <p className="text-[13px] font-medium uppercase tracking-[0.22em] text-white">

                The Decor

              </p>

              <p className="mt-1 text-[13px] uppercase tracking-[0.22em] text-white/50">

                Art Studio

              </p>

            </div>

          </div>

        </div>

        {/* Navigation */}
        <div className="mt-14">

          <p className="mb-6 px-2 text-[10px] uppercase tracking-[0.5em] text-[#B89B72]/65">

            Control Center

          </p>

          <div className="space-y-2">

            {links.map((item) => {
              const Icon = item.icon;

              return (
                <button
                  key={item.label}
                  className={`group relative flex w-full items-center gap-4 overflow-hidden rounded-2xl px-5 py-4 transition-all duration-500 ${
                    item.active
                      ? "border border-[#B89B72]/15 bg-[#B89B72]/10 text-white shadow-[0_0_40px_rgba(184,155,114,0.08)]"
                      : "text-white/50 hover:bg-white/[0.04] hover:text-white"
                  }`}
                >

                  {/* Hover Glow */}
                  <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">

                    <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-[#B89B72]/10 blur-2xl" />

                  </div>

                  {/* Icon */}
                  <Icon className="relative z-10 h-[18px] w-[18px]" />

                  {/* Label */}
                  <span className="relative z-10 text-sm tracking-[0.01em]">

                    {item.label}

                  </span>

                </button>
              );
            })}

          </div>

        </div>

      </div>

      {/* BOTTOM */}
      <div className="relative z-10">

        {/* System Status */}
        <div className="rounded-[2rem] border border-white/[0.06] bg-white/[0.03] p-6 backdrop-blur-2xl">

          <p className="text-[10px] uppercase tracking-[0.45em] text-[#B89B72]/65">

            System Status

          </p>

          <div className="mt-5 flex items-start gap-4">

            {/* Pulse */}
            <div className="relative mt-1">

              <div className="h-3 w-3 rounded-full bg-[#B89B72]" />

              <div className="absolute inset-0 animate-ping rounded-full bg-[#B89B72]/60" />

            </div>

            {/* Text */}
            <div>

              <p className="text-sm text-white">

                Live System

              </p>

              <p className="mt-1 text-sm leading-relaxed text-white/40">

                All systems operational

              </p>

            </div>

          </div>

        </div>

        {/* Admin Profile */}
        <div className="mt-5 flex items-center justify-between rounded-[2rem] border border-white/[0.06] bg-white/[0.03] p-5 backdrop-blur-2xl">

          <div className="flex items-center gap-4">

            {/* Avatar */}
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#B89B72]/20 bg-[#B89B72]/10 text-sm font-medium text-[#B89B72]">

              A

            </div>

            {/* Info */}
            <div>

              <p className="text-sm text-white">

                Admin

              </p>

              <p className="mt-1 text-xs text-white/40">

                Administrator

              </p>

            </div>

          </div>

          <ChevronDown className="h-4 w-4 text-white/35" />

        </div>

      </div>

    </aside>
  );
}