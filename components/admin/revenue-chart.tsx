"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  Tooltip,
} from "recharts";

/* =========================================================
   TYPES
========================================================== */

type RevenueChartProps = {
  data: {
    date: string;
    revenue: number;
  }[];
};

/* =========================================================
   REVENUE CHART
========================================================== */

export default function RevenueChart({
  data,
}: RevenueChartProps) {

  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-white/[0.06] bg-white/[0.03] p-8 backdrop-blur-3xl">

      {/* Glow */}
      <div className="absolute right-[-10%] top-[-20%] h-[260px] w-[260px] rounded-full bg-[#B89B72]/10 blur-[140px]" />

      <div className="relative">

        {/* =================================================
            HEADER
        ================================================== */}
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">

          <div>

            <p className="text-[10px] uppercase tracking-[0.45em] text-[#B89B72]/80">

              Revenue Analytics

            </p>

            <h2 className="mt-4 text-3xl font-light tracking-[-0.05em] text-white">

              Commerce Performance

            </h2>

          </div>

          <div className="rounded-full border border-[#B89B72]/20 bg-[#B89B72]/10 px-5 py-3">

            <span className="text-xs uppercase tracking-[0.3em] text-[#B89B72]">

              Live Revenue Data

            </span>

          </div>

        </div>

        {/* =================================================
            CHART
        ================================================== */}
        <div className="mt-12 h-[320px] min-w-0 w-full">

          <ResponsiveContainer
            width="100%"
            height={320}
          >

            <LineChart
              data={data}
            >

              <XAxis
                dataKey="date"
                tick={{
                  fill:
                    "rgba(255,255,255,0.35)",
                  fontSize: 12,
                }}
                axisLine={false}
                tickLine={false}
              />

              <Tooltip
                contentStyle={{
                  background:
                    "#111111",
                  border:
                    "1px solid rgba(255,255,255,0.06)",
                  borderRadius:
                    "20px",
                  color:
                    "white",
                }}
              />

              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#B89B72"
                strokeWidth={3}
                dot={{
                  r: 4,
                  fill:
                    "#B89B72",
                }}
                activeDot={{
                  r: 6,
                }}
              />

            </LineChart>

          </ResponsiveContainer>

        </div>

      </div>

    </div>
  );
}