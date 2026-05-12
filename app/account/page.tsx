"use client";

import Link from "next/link";

import { motion } from "framer-motion";

import {
  ShoppingBag,
  Heart,
  User,
  ArrowRight,
} from "lucide-react";

const orders = [
  {
    id: "#TDAS-2048",
    item: "Aurelius Wall Clock",
    status: "Preparing",
    total: "₹1,24,999",
  },
  {
    id: "#TDAS-2041",
    item: "Architectural Lamp",
    status: "Delivered",
    total: "₹84,999",
  },
];

const wishlist = [
  {
    title: "Sculptural Accent Chair",
    category: "Furniture",
  },
  {
    title: "Obsidian Table Lamp",
    category: "Lighting",
  },
];

export default function AccountPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050505] text-white">

      {/* ================= ATMOSPHERE ================= */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        {/* Main Glow */}
        <div className="absolute left-1/2 top-[-10%] h-[1200px] w-[1200px] -translate-x-1/2 rounded-full bg-[#B89B72]/[0.04] blur-[220px]" />

        {/* Right Glow */}
        <div className="absolute right-[-10%] top-[30%] h-[700px] w-[700px] rounded-full bg-[#B89B72]/[0.03] blur-[180px]" />

      </div>

      <div className="container-luxury relative z-10 py-32">

        {/* ================= HEADER ================= */}
        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1,
          }}
          className="mb-20 flex flex-col justify-between gap-10 lg:flex-row lg:items-end"
        >

          {/* Left */}
          <div>

            <p className="text-[10px] uppercase tracking-[0.5em] text-[#B89B72]/80">

              Private Client Space

            </p>

            <h1 className="mt-6 text-5xl font-light leading-[0.88] tracking-[-0.08em] text-white md:text-[7rem]">

              Your
              <br />
              Collection

            </h1>

          </div>

          {/* Right */}
          <div className="max-w-md">

            <p className="text-lg leading-[2] text-white/45">

              Manage your curated luxury selections,
              orders, saved collections, and premium
              architectural commerce experience.

            </p>

          </div>

        </motion.div>

        {/* ================= GRID ================= */}
        <div className="grid gap-10 lg:grid-cols-[320px_1fr]">

          {/* ================= SIDEBAR ================= */}
          <motion.div
            initial={{
              opacity: 0,
              x: -30,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 1,
              delay: 0.1,
            }}
          >

            <div className="sticky top-10 overflow-hidden rounded-[2.5rem] border border-white/[0.06] bg-white/[0.03] p-8 backdrop-blur-3xl">

              {/* Glow */}
              <div className="absolute right-[-10%] top-[-10%] h-[250px] w-[250px] rounded-full bg-[#B89B72]/10 blur-[120px]" />

              <div className="relative">

                {/* Avatar */}
                <div className="flex h-20 w-20 items-center justify-center rounded-full border border-[#B89B72]/20 bg-[#B89B72]/10 text-2xl font-light text-[#B89B72]">

                  T

                </div>

                {/* Name */}
                <h2 className="mt-8 text-3xl font-light tracking-[-0.05em] text-white">

                  Tabish

                </h2>

                {/* Role */}
                <p className="mt-3 text-[10px] uppercase tracking-[0.45em] text-white/35">

                  Private Collector

                </p>

                {/* Divider */}
                <div className="my-10 h-px bg-white/[0.06]" />

                {/* Navigation */}
                <div className="space-y-3">

                  <SidebarItem
                    active
                    icon={<User className="h-4 w-4" />}
                    label="Overview"
                  />

                  <SidebarItem
                    icon={<ShoppingBag className="h-4 w-4" />}
                    label="Orders"
                  />

                  <SidebarItem
                    icon={<Heart className="h-4 w-4" />}
                    label="Wishlist"
                  />

                </div>

              </div>

            </div>

          </motion.div>

          {/* ================= CONTENT ================= */}
          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 1,
              delay: 0.2,
            }}
            className="space-y-10"
          >

            {/* ================= METRICS ================= */}
            <div className="grid gap-6 md:grid-cols-3">

              <MetricCard
                label="Orders"
                value="12"
              />

              <MetricCard
                label="Wishlist"
                value="08"
              />

              <MetricCard
                label="Collections"
                value="04"
              />

            </div>

            {/* ================= ORDERS ================= */}
            <LuxuryCard
              title="Recent Orders"
            >

              <div className="space-y-5">

                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="group flex flex-col gap-6 rounded-[2rem] border border-white/[0.06] bg-white/[0.02] p-6 transition duration-700 hover:border-[#B89B72]/20 md:flex-row md:items-center md:justify-between"
                  >

                    {/* Left */}
                    <div>

                      <p className="text-[10px] uppercase tracking-[0.45em] text-[#B89B72]/70">

                        {order.id}

                      </p>

                      <h3 className="mt-4 text-2xl font-light tracking-[-0.04em] text-white">

                        {order.item}

                      </h3>

                    </div>

                    {/* Right */}
                    <div className="flex items-center gap-10">

                      <div>

                        <p className="text-[10px] uppercase tracking-[0.35em] text-white/35">

                          Status

                        </p>

                        <p className="mt-3 text-white/70">

                          {order.status}

                        </p>

                      </div>

                      <div>

                        <p className="text-[10px] uppercase tracking-[0.35em] text-white/35">

                          Total

                        </p>

                        <p className="mt-3 text-white">

                          {order.total}

                        </p>

                      </div>

                      <button className="flex h-12 w-12 items-center justify-center rounded-full border border-white/[0.06] bg-white/[0.03] transition duration-700 hover:border-[#B89B72]/20 hover:bg-[#B89B72]/10">

                        <ArrowRight className="h-4 w-4 text-white/70" />

                      </button>

                    </div>

                  </div>
                ))}

              </div>

            </LuxuryCard>

            {/* ================= WISHLIST ================= */}
            <LuxuryCard
              title="Saved Collections"
            >

              <div className="grid gap-5 md:grid-cols-2">

                {wishlist.map((item) => (
                  <div
                    key={item.title}
                    className="group overflow-hidden rounded-[2rem] border border-white/[0.06] bg-white/[0.03] p-6 transition duration-700 hover:border-[#B89B72]/20"
                  >

                    <p className="text-[10px] uppercase tracking-[0.45em] text-[#B89B72]/70">

                      {item.category}

                    </p>

                    <h3 className="mt-6 text-3xl font-light leading-[1] tracking-[-0.05em] text-white">

                      {item.title}

                    </h3>

                    <button className="mt-10 flex items-center gap-3 text-[10px] uppercase tracking-[0.35em] text-white/40 transition duration-500 hover:text-[#B89B72]">

                      View Object

                      <ArrowRight className="h-3 w-3" />

                    </button>

                  </div>
                ))}

              </div>

            </LuxuryCard>

          </motion.div>

        </div>

      </div>

    </main>
  );
}

/* ================= SIDEBAR ITEM ================= */

function SidebarItem({
  label,
  icon,
  active,
}: {
  label: string;
  icon: React.ReactNode;
  active?: boolean;
}) {
  return (
    <button
      className={`flex w-full items-center gap-4 rounded-full px-5 py-4 text-left transition duration-700 ${
        active
          ? "border border-[#B89B72]/20 bg-[#B89B72]/10 text-white"
          : "border border-transparent text-white/45 hover:border-white/[0.06] hover:bg-white/[0.03] hover:text-white"
      }`}
    >

      {icon}

      <span className="text-sm tracking-[0.08em]">

        {label}

      </span>

    </button>
  );
}

/* ================= CARD ================= */

function LuxuryCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-[2.5rem] border border-white/[0.06] bg-white/[0.03] p-8 backdrop-blur-3xl">

      <p className="text-[10px] uppercase tracking-[0.45em] text-[#B89B72]/80">

        {title}

      </p>

      <div className="mt-10">

        {children}

      </div>

    </div>
  );
}

/* ================= METRIC ================= */

function MetricCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="overflow-hidden rounded-[2rem] border border-white/[0.06] bg-white/[0.03] p-8 backdrop-blur-3xl">

      <p className="text-[10px] uppercase tracking-[0.45em] text-white/35">

        {label}

      </p>

      <h3 className="mt-6 text-5xl font-light tracking-[-0.06em] text-white">

        {value}

      </h3>

    </div>
  );
}