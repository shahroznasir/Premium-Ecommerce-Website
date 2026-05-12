"use client";

import {
  CalendarDays,
  Clock3,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

export default function AdminHeader() {
  const [mounted, setMounted] =
    useState(false);

  const [time, setTime] =
    useState("");

  useEffect(() => {
    setMounted(true);

    const updateTime = () => {
      const now = new Date();

      setTime(
        now.toLocaleTimeString(
          [],
          {
            hour: "2-digit",
            minute: "2-digit",
          }
        )
      );
    };

    updateTime();

    const interval = setInterval(
      updateTime,
      1000
    );

    return () =>
      clearInterval(interval);
  }, []);

  if (!mounted) return null;

  const now = new Date();

  return (
    <div className="flex flex-col gap-12 xl:flex-row xl:items-start xl:justify-between">

      {/* LEFT */}
      <div className="max-w-4xl">

        {/* Label */}
        <div className="flex items-center gap-4">

          <div className="h-px w-16 bg-[#B89B72]/40" />

          <p className="text-[10px] uppercase tracking-[0.55em] text-[#B89B72]/75">

            Luxury Commerce System

          </p>

        </div>

        {/* Heading */}
        <h1 className="mt-7 text-[5rem] font-light leading-[0.88] tracking-[-0.08em] text-white md:text-[6.5rem]">

          Live
          <br />
          Control Center

        </h1>

        {/* Description */}
        <p className="mt-8 max-w-2xl text-lg leading-[1.9] text-white/42">

          Real-time overview of your luxury commerce
          operations, customer activity, and enterprise
          performance infrastructure.

        </p>

      </div>

      {/* RIGHT */}
      <div className="flex flex-wrap items-center gap-4">

        {/* LIVE STATUS */}
        <div className="group relative overflow-hidden rounded-full border border-[#B89B72]/20 bg-[#B89B72]/10 px-5 py-3 backdrop-blur-2xl">

          {/* Glow */}
          <div className="absolute inset-0 opacity-0 transition duration-700 group-hover:opacity-100">

            <div className="absolute left-0 top-0 h-20 w-20 rounded-full bg-[#B89B72]/20 blur-2xl" />

          </div>

          <div className="relative flex items-center gap-3">

            {/* Pulse */}
            <div className="relative">

              <div className="h-2.5 w-2.5 rounded-full bg-[#B89B72]" />

              <div className="absolute inset-0 animate-ping rounded-full bg-[#B89B72]/70" />

            </div>

            <span className="text-sm tracking-[0.02em] text-white/80">

              Realtime Active

            </span>

          </div>

        </div>

        {/* DATE */}
        <div className="group relative overflow-hidden rounded-full border border-white/[0.06] bg-white/[0.03] px-5 py-3 backdrop-blur-2xl">

          {/* Hover Glow */}
          <div className="absolute inset-0 opacity-0 transition duration-700 group-hover:opacity-100">

            <div className="absolute right-0 top-0 h-20 w-20 rounded-full bg-[#B89B72]/10 blur-2xl" />

          </div>

          <div className="relative flex items-center gap-3">

            <CalendarDays className="h-4 w-4 text-[#B89B72]" />

            <span className="text-sm text-white/70">

              {now.toLocaleDateString(
                "en-US",
                {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                }
              )}

            </span>

          </div>

        </div>

        {/* TIME */}
        <div className="group relative overflow-hidden rounded-full border border-white/[0.06] bg-white/[0.03] px-5 py-3 backdrop-blur-2xl">

          {/* Hover Glow */}
          <div className="absolute inset-0 opacity-0 transition duration-700 group-hover:opacity-100">

            <div className="absolute right-0 top-0 h-20 w-20 rounded-full bg-[#B89B72]/10 blur-2xl" />

          </div>

          <div className="relative flex items-center gap-3">

            <Clock3 className="h-4 w-4 text-[#B89B72]" />

            <span className="text-sm text-white/70">

              {time}

            </span>

          </div>

        </div>

      </div>

    </div>
  );
}