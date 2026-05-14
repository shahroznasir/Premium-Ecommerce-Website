"use client";

import {
  useEffect,
  useState,
} from "react";

import { useRouter } from "next/navigation";

import { motion } from "framer-motion";

import { createClient } from "@supabase/supabase-js";

import {
  ShoppingBag,
  Heart,
  User,
  ArrowRight,
} from "lucide-react";

/* =========================================================
   TYPES
========================================================== */

type Order = {
  id: string;
  order_number: string;
  total: number;
  fulfillment_status: string;
  tracking_status?: string;
};

type UserData = {
  email?: string;
  user_metadata?: {
    full_name?: string;
  };
};

/* =========================================================
   SUPABASE
========================================================== */

const supabase =
  createClient(
    process.env
      .NEXT_PUBLIC_SUPABASE_URL!,

    process.env
      .NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

/* =========================================================
   ACCOUNT PAGE
========================================================== */

export default function AccountPage() {

  const router =
    useRouter();

  const [user, setUser] =
    useState<UserData | null>(
      null
    );

  const [orders, setOrders] =
    useState<Order[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [
    activeTab,
    setActiveTab,
  ] = useState(
    "overview"
  );

  /* =======================================================
     LOAD ACCOUNT
  ======================================================== */

  useEffect(() => {

    async function loadAccount() {

      const {
        data: {
          user,
        },
      } =
        await supabase.auth.getUser();

      if (!user) {

        router.push(
          "/login"
        );

        return;
      }

      setUser({
        email: user.email,
        user_metadata:
          user.user_metadata,
      });

      const {
        data,
      } = await supabase
        .from("orders")
        .select("*")
        .eq(
          "email",
          user.email
        )
        .order(
          "created_at",
          {
            ascending: false,
          }
        );

      setOrders(
        (data as Order[]) ||
          []
      );

      setLoading(false);

      /* ===================================================
         REALTIME SYNC
      ==================================================== */

      const channel =
        supabase
          .channel(
            `account-${user.email}`
          )
          .on(
            "postgres_changes",
            {
              event: "UPDATE",
              schema: "public",
              table: "orders",
            },
            (
              payload
            ) => {

              setOrders(
                (
                  current
                ) =>
                  current.map(
                    (
                      order
                    ) =>
                      order.id ===
                      payload.new.id
                        ? {
                            ...order,
                            ...payload.new,
                          }
                        : order
                  )
              );
            }
          )
          .subscribe();

      return () => {

        supabase.removeChannel(
          channel
        );
      };
    }

    loadAccount();

  }, [router]);

  /* =======================================================
     TOTAL SPENT
  ======================================================== */

  const totalSpent =
    orders.reduce(
      (
        acc,
        order
      ) =>
        acc +
        Number(order.total),
      0
    );

  /* =======================================================
     LOADING
  ======================================================== */

  if (loading) {

    return (
      <main className="flex min-h-screen items-center justify-center bg-[#050505] text-white">

        Loading...

      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050505] text-white">

      {/* ================= ATMOSPHERE ================= */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        <div className="absolute left-1/2 top-[-10%] h-[1200px] w-[1200px] -translate-x-1/2 rounded-full bg-[#B89B72]/[0.04] blur-[220px]" />

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

              <div className="absolute right-[-10%] top-[-10%] h-[250px] w-[250px] rounded-full bg-[#B89B72]/10 blur-[120px]" />

              <div className="relative">

                {/* AVATAR */}
                <div className="flex h-20 w-20 items-center justify-center rounded-full border border-[#B89B72]/20 bg-[#B89B72]/10 text-2xl font-light text-[#B89B72]">

                  {
                    user?.user_metadata
                      ?.full_name?.[0] ||
                    "L"
                  }

                </div>

                {/* NAME */}
                <h2 className="mt-8 text-3xl font-light tracking-[-0.05em] text-white">

                  {
                    user?.user_metadata
                      ?.full_name ||
                    "Luxury Client"
                  }

                </h2>

                {/* ROLE */}
                <p className="mt-3 text-[10px] uppercase tracking-[0.45em] text-white/35">

                  Private Collector

                </p>

                {/* DIVIDER */}
                <div className="my-10 h-px bg-white/[0.06]" />

                {/* NAVIGATION */}
                <div className="space-y-3">

                  <SidebarItem
                    active={
                      activeTab ===
                      "overview"
                    }
                    onClick={() =>
                      setActiveTab(
                        "overview"
                      )
                    }
                    icon={<User className="h-4 w-4" />}
                    label="Overview"
                  />

                  <SidebarItem
                    active={
                      activeTab ===
                      "orders"
                    }
                    onClick={() =>
                      setActiveTab(
                        "orders"
                      )
                    }
                    icon={<ShoppingBag className="h-4 w-4" />}
                    label="Orders"
                  />

                  <SidebarItem
                    active={
                      activeTab ===
                      "wishlist"
                    }
                    onClick={() =>
                      setActiveTab(
                        "wishlist"
                      )
                    }
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

            {/* ================= OVERVIEW / ORDERS ================= */}
            {(activeTab ===
              "overview" ||
              activeTab ===
                "orders") && (
              <>
                {/* METRICS */}
                <div className="grid gap-6 md:grid-cols-3">

                  <MetricCard
                    label="Orders"
                    value={
                      orders.length.toString()
                    }
                  />

                  <MetricCard
                    label="Total Spent"
                    value={`Rs. ${totalSpent.toLocaleString("en-IN")}`}
                  />

                  <MetricCard
                    label="Delivered"
                    value={
                      orders
                        .filter(
                          (
                            order
                          ) =>
                            order.tracking_status ===
                            "delivered"
                        )
                        .length.toString()
                    }
                  />

                </div>

                {/* ORDERS */}
                <LuxuryCard
                  title="Recent Orders"
                >

                  <div className="space-y-5">

                    {orders.map(
                      (order) => (

                        <div
                          key={order.id}
                          className="group flex flex-col gap-6 rounded-[2rem] border border-white/[0.06] bg-white/[0.02] p-6 transition duration-700 hover:border-[#B89B72]/20 md:flex-row md:items-center md:justify-between"
                        >

                          <div>

                            <p className="text-[10px] uppercase tracking-[0.45em] text-[#B89B72]/70">

                              {
                                order.order_number
                              }

                            </p>

                            <h3 className="mt-4 text-2xl font-light tracking-[-0.04em] text-white">

                              Order Purchase

                            </h3>

                          </div>

                          <div className="flex items-center gap-10">

                            <div>

                              <p className="text-[10px] uppercase tracking-[0.35em] text-white/35">

                                Status

                              </p>

                              <p className="mt-3 text-white/70">

                                {
                                  order.tracking_status ||
                                  "processing"
                                }

                              </p>

                            </div>

                            <div>

                              <p className="text-[10px] uppercase tracking-[0.35em] text-white/35">

                                Total

                              </p>

                              <p className="mt-3 text-white">

                                Rs.
                                {Number(
                                  order.total
                                ).toLocaleString(
                                  "en-IN"
                                )}

                              </p>

                            </div>

                            <button
                              type="button"
                              onClick={() => {
                                router.push(
                                  `/account/orders/${order.id}`
                                );
                              }}
                              className="relative z-50 flex h-12 w-12 shrink-0 cursor-pointer items-center justify-center rounded-full border border-white/[0.06] bg-white/[0.03] transition duration-700 hover:border-[#B89B72]/20 hover:bg-[#B89B72]/10"
                            >

                              <ArrowRight className="h-4 w-4 text-white/70" />

                            </button>

                          </div>

                        </div>

                      )
                    )}

                    {/* EMPTY */}
                    {orders.length === 0 && (

                      <div className="rounded-[2rem] border border-white/[0.06] bg-white/[0.02] px-8 py-20 text-center">

                        <p className="text-2xl font-light text-white/55">

                          No orders yet.

                        </p>

                      </div>

                    )}

                  </div>

                </LuxuryCard>
              </>
            )}

            {/* ================= WISHLIST ================= */}
            {activeTab ===
              "wishlist" && (

              <LuxuryCard
                title="Saved Collections"
              >

                <div className="rounded-[2rem] border border-white/[0.06] bg-white/[0.02] px-8 py-20 text-center">

                  <p className="text-3xl font-light text-white">

                    Wishlist Coming Soon

                  </p>

                  <p className="mt-6 text-white/45">

                    Save your luxury selections and curate your private collection.

                  </p>

                </div>

              </LuxuryCard>

            )}

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
  onClick,
}: {
  label: string;
  icon: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
}) {

  return (
    <button
      onClick={onClick}
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