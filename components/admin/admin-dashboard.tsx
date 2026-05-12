"use client";

import {
  Activity,
  DollarSign,
  ShoppingBag,
  Users,
  ArrowRight,
} from "lucide-react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import {
  useEffect,
  useState,
} from "react";

import { supabase } from "@/lib/supabase";

import AdminSidebar from "./admin-sidebar";
import AdminHeader from "./admin-header";
import MetricCard from "./metric-card";

interface Order {
  id: string;
  total: number;
  status: string;
  created_at: string;
}

export default function AdminDashboard() {
  const [orders, setOrders] =
    useState<Order[]>([]);

  /* Fetch Orders */
  async function fetchOrders() {
    const { data } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

    if (data) {
      setOrders(data);
    }
  }

  /* Realtime */
  useEffect(() => {
    fetchOrders();

    const channel = supabase
      .channel("orders-live")

      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "orders",
        },
        () => {
          fetchOrders();
        }
      )

      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  /* Revenue */
  const revenue = orders.reduce(
    (acc, order) =>
      acc + Number(order.total),
    0
  );

  return (
    <main className="flex min-h-screen bg-[#050505] text-white">

      {/* Sidebar */}
      <AdminSidebar />

      {/* Main */}
      <div className="relative flex-1 overflow-hidden">

        {/* Luxury Atmosphere */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">

          {/* Glow 1 */}
          <div className="absolute left-[10%] top-[-10%] h-[700px] w-[700px] rounded-full bg-[#B89B72]/[0.05] blur-[180px]" />

          {/* Glow 2 */}
          <div className="absolute bottom-[-20%] right-[-10%] h-[900px] w-[900px] rounded-full bg-[#B89B72]/[0.04] blur-[220px]" />

          {/* Cinematic Gradient */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(184,155,114,0.05),transparent_42%)]" />

          {/* Grid */}
          <div className="absolute inset-0 opacity-[0.03]">

            <div
              className="h-full w-full"
              style={{
                backgroundImage: `
                  linear-gradient(
                    rgba(255,255,255,0.05) 1px,
                    transparent 1px
                  ),
                  linear-gradient(
                    90deg,
                    rgba(255,255,255,0.05) 1px,
                    transparent 1px
                  )
                `,
                backgroundSize: "80px 80px",
              }}
            />

          </div>

        </div>

        {/* Content */}
        <div className="relative z-10 mx-auto max-w-[1600px] px-8 py-8">

          {/* Header */}
          <AdminHeader />

          {/* Metrics */}
          <div className="mt-16 grid grid-cols-2 gap-6 2xl:grid-cols-4">

            <MetricCard
              title="Total Revenue"
              value={`₹${revenue.toLocaleString()}`}
              subtitle="All-time revenue"
              icon={
                <DollarSign className="h-6 w-6" />
              }
            />

            <MetricCard
              title="Total Orders"
              value={String(
                orders.length
              )}
              subtitle="Completed purchases"
              icon={
                <ShoppingBag className="h-6 w-6" />
              }
            />

            <MetricCard
              title="Customers"
              value="0"
              subtitle="Registered clients"
              icon={
                <Users className="h-6 w-6" />
              }
            />

            <MetricCard
              title="System Status"
              value="Live"
              subtitle="Realtime synchronized"
              icon={
                <Activity className="h-6 w-6" />
              }
            />

          </div>

          {/* Orders Section */}
          <div className="mt-16 overflow-hidden rounded-[2.5rem] border border-white/[0.06] bg-white/[0.03] backdrop-blur-3xl">

            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/[0.06] px-10 py-8">

              {/* Left */}
              <div className="flex items-center gap-8">

                <div className="flex items-center gap-4">

                  <p className="text-[11px] uppercase tracking-[0.45em] text-white">

                    Live Orders Feed

                  </p>

                  <div className="h-2 w-2 rounded-full bg-[#B89B72] shadow-[0_0_14px_rgba(184,155,114,0.8)]" />

                </div>

                <p className="text-sm text-[#B89B72]">

                  Realtime updates

                </p>

              </div>

              {/* Button */}
              <button className="group flex items-center gap-3 rounded-full border border-white/[0.06] bg-white/[0.03] px-6 py-3 text-sm text-white/70 transition duration-500 hover:border-[#B89B72]/20 hover:bg-[#B89B72]/10 hover:text-white">

                View All Orders

                <ArrowRight className="h-4 w-4 transition duration-500 group-hover:translate-x-1" />

              </button>

            </div>

            {/* Table Head */}
            <div className="grid grid-cols-4 border-b border-white/[0.06] px-10 py-5 text-[10px] uppercase tracking-[0.35em] text-white/35">

              <p>Order ID</p>

              <p>Amount</p>

              <p>Status</p>

              <p>Date & Time</p>

            </div>

            {/* Orders */}
            <div>

              <AnimatePresence>

                {orders.length > 0 ? (
                  orders.map((order) => (
                    <motion.div
                      key={order.id}
                      initial={{
                        opacity: 0,
                        y: 20,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      exit={{
                        opacity: 0,
                      }}
                      className="grid grid-cols-4 items-center border-b border-white/[0.04] px-10 py-7 transition duration-500 hover:bg-white/[0.02]"
                    >

                      {/* Order */}
                      <div>

                        <h3 className="text-base tracking-[-0.03em] text-white">

                          {order.id.slice(0, 8)}

                        </h3>

                      </div>

                      {/* Amount */}
                      <div>

                        <h3 className="text-base text-white">

                          ₹
                          {Number(
                            order.total
                          ).toLocaleString()}

                        </h3>

                      </div>

                      {/* Status */}
                      <div>

                        <div className="inline-flex items-center gap-3 rounded-full border border-[#B89B72]/20 bg-[#B89B72]/10 px-4 py-2">

                          <div className="h-2 w-2 rounded-full bg-[#B89B72]" />

                          <span className="text-sm text-white/80">

                            {order.status}

                          </span>

                        </div>

                      </div>

                      {/* Date */}
                      <div className="text-sm text-white/50">

                        {new Date(
                          order.created_at
                        ).toLocaleString()}

                      </div>

                    </motion.div>
                  ))
                ) : (
                  <div className="flex min-h-[420px] flex-col items-center justify-center">

                    {/* Icon */}
                    <div className="flex h-28 w-28 items-center justify-center rounded-full border border-white/[0.06] bg-white/[0.03]">

                      <ShoppingBag className="h-10 w-10 text-[#B89B72]" />

                    </div>

                    {/* Text */}
                    <h3 className="mt-10 text-4xl font-light tracking-[-0.05em] text-white">

                      No orders yet

                    </h3>

                    <p className="mt-5 text-lg text-white/40">

                      New orders will appear here in realtime.

                    </p>

                  </div>
                )}

              </AnimatePresence>

            </div>

          </div>

        </div>

      </div>

    </main>
  );
}