import { createClient } from "@supabase/supabase-js";

import {
  PackageCheck,
  IndianRupee,
  Users,
  TrendingUp,
  ShoppingBag,
  Truck,
} from "lucide-react";

import RevenueChart from "@/components/admin/revenue-chart";

import OrdersTable from "@/components/admin/orders-table";

import FulfillmentFunnel from "@/components/admin/fulfillment-funnel";

import LiveActivityFeed from "@/components/admin/live-activity-feed";

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
   ADMIN DASHBOARD
========================================================== */

export default async function AdminPage() {

  /* =======================================================
     FETCH ORDERS
  ======================================================== */

  const {
    data: orders,
  } = await supabase
    .from("orders")
    .select("*")
    .order(
      "created_at",
      {
        ascending: false,
      }
    );

  /* =======================================================
     ANALYTICS
  ======================================================== */

  const totalRevenue =
    orders?.reduce(
      (
        acc,
        order
      ) =>
        acc +
        Number(order.total),
      0
    ) || 0;

  const totalOrders =
    orders?.length || 0;

  const totalCustomers =
    new Set(
      orders?.map(
        (order) =>
          order.email
      )
    ).size || 0;

  const deliveredOrders =
    orders?.filter(
      (order) =>
        order.fulfillment_status ===
        "delivered"
    ).length || 0;

  const processingOrders =
    orders?.filter(
      (order) =>
        order.fulfillment_status ===
        "processing"
    ).length || 0;

  const packedOrders =
    orders?.filter(
      (order) =>
        order.fulfillment_status ===
        "packed"
    ).length || 0;

  const shippedOrders =
    orders?.filter(
      (order) =>
        order.fulfillment_status ===
        "shipped"
    ).length || 0;

  const deliveredPercentage =
    totalOrders > 0
      ? Math.round(
          (deliveredOrders /
            totalOrders) *
            100
        )
      : 0;

  const averageOrderValue =
    totalOrders > 0
      ? Math.round(
          totalRevenue /
            totalOrders
        )
      : 0;

  const today =
    new Date()
      .toISOString()
      .split("T")[0];

  const todayRevenue =
    orders?.filter(
      (order) =>
        order.created_at?.startsWith(
          today
        )
    )
      .reduce(
        (
          acc,
          order
        ) =>
          acc +
          Number(order.total),
        0
      ) || 0;

  /* =======================================================
     REVENUE CHART DATA
  ======================================================== */

  const revenueMap =
    new Map<
      string,
      number
    >();

  orders?.forEach(
    (order) => {

      const date =
        new Date(
          order.created_at
        ).toLocaleDateString(
          "en-IN",
          {
            day: "2-digit",
            month: "short",
          }
        );

      const currentRevenue =
        revenueMap.get(
          date
        ) || 0;

      revenueMap.set(
        date,
        currentRevenue +
          Number(
            order.total
          )
      );
    }
  );

  const revenueData =
    Array.from(
      revenueMap.entries()
    ).map(
      ([
        date,
        revenue,
      ]) => ({
        date,
        revenue,
      })
    );

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050505] text-white">

      {/* ===================================================
          ATMOSPHERIC BACKGROUND
      ==================================================== */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">

        <div className="absolute left-1/2 top-[-10%] h-[1200px] w-[1200px] -translate-x-1/2 rounded-full bg-[#B89B72]/[0.04] blur-[220px]" />

        <div className="absolute right-[-10%] top-[20%] h-[700px] w-[700px] rounded-full bg-[#B89B72]/[0.03] blur-[180px]" />

        <div className="absolute bottom-[-20%] left-1/2 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-[#B89B72]/[0.03] blur-[200px]" />

      </div>

      <div className="relative z-10 px-6 py-16 md:px-10 md:py-20">

        {/* =================================================
            HEADER
        ================================================== */}
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">

          <div>

            <p className="text-[10px] uppercase tracking-[0.5em] text-[#B89B72]/80">

              TDAS Administration

            </p>

            <h1 className="mt-6 text-5xl font-light leading-[0.9] tracking-[-0.08em] text-white md:text-7xl">

              Commerce
              <br />
              Control Center

            </h1>

          </div>

          <div className="max-w-md">

            <p className="text-sm leading-8 text-white/45">

              Monitor luxury commerce operations,
              fulfillment performance, customer
              activity, and transactional growth
              across the ecosystem.

            </p>

          </div>

        </div>

        {/* =================================================
            MAIN STATS
        ================================================== */}
        <div className="mt-16 grid gap-6 md:grid-cols-3">

          <StatCard
            icon={
              <IndianRupee
                size={22}
              />
            }
            label="Total Revenue"
            value={`₹${totalRevenue.toLocaleString("en-IN")}`}
          />

          <StatCard
            icon={
              <PackageCheck
                size={22}
              />
            }
            label="Total Orders"
            value={
              totalOrders.toString()
            }
          />

          <StatCard
            icon={
              <Users
                size={22}
              />
            }
            label="Customers"
            value={
              totalCustomers.toString()
            }
          />

        </div>

        {/* =================================================
            ADVANCED ANALYTICS
        ================================================== */}
        <div className="mt-16 grid gap-6 lg:grid-cols-3">

          <AnalyticsCard
            icon={
              <TrendingUp
                size={20}
              />
            }
            title="Today's Revenue"
            value={`₹${todayRevenue.toLocaleString("en-IN")}`}
            description="Total luxury transactions processed today."
          />

          <AnalyticsCard
            icon={
              <ShoppingBag
                size={20}
              />
            }
            title="Average Order Value"
            value={`₹${averageOrderValue.toLocaleString("en-IN")}`}
            description="Average customer purchase across all orders."
          />

          <AnalyticsCard
            icon={
              <Truck
                size={20}
              />
            }
            title="Delivered Orders"
            value={`${deliveredPercentage}%`}
            description="Percentage of completed fulfillment operations."
          />

        </div>

        {/* =================================================
            REVENUE CHART
        ================================================== */}
        <div className="mt-16">

          <RevenueChart
            data={revenueData}
          />

        </div>

        {/* =================================================
            FULFILLMENT OVERVIEW
        ================================================== */}
        <div className="mt-16 overflow-hidden rounded-[2rem] border border-white/[0.06] bg-white/[0.03] p-8 backdrop-blur-3xl">

          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

            <div>

              <p className="text-[10px] uppercase tracking-[0.45em] text-[#B89B72]/80">

                Fulfillment Performance

              </p>

              <h2 className="mt-4 text-3xl font-light tracking-[-0.05em] text-white">

                Operational Efficiency

              </h2>

            </div>

            <div className="rounded-full border border-[#B89B72]/20 bg-[#B89B72]/10 px-6 py-3">

              <span className="text-xs uppercase tracking-[0.3em] text-[#B89B72]">

                {deliveredPercentage}% Delivered

              </span>

            </div>

          </div>

          <div className="mt-12">

            <div className="h-3 overflow-hidden rounded-full bg-white/[0.06]">

              <div
                className="h-full rounded-full bg-[#B89B72] transition-all duration-1000"
                style={{
                  width: `${deliveredPercentage}%`,
                }}
              />

            </div>

            <div className="mt-5 flex items-center justify-between text-sm text-white/40">

              <span>
                Processing Pipeline
              </span>

              <span>
                {deliveredOrders}
                {" "}
                /
                {" "}
                {totalOrders}
                {" "}
                Delivered
              </span>

            </div>

          </div>

        </div>

        {/* =================================================
            OPERATIONS INTELLIGENCE
        ================================================== */}
        <div className="mt-16 grid gap-6 lg:grid-cols-2">

          <FulfillmentFunnel
            processing={processingOrders}
            packed={packedOrders}
            shipped={shippedOrders}
            delivered={deliveredOrders}
          />

          <LiveActivityFeed
            orders={orders || []}
          />

        </div>

        {/* =================================================
            ORDERS MANAGEMENT
        ================================================== */}
        <div className="mt-16">

          <OrdersTable
            orders={orders || []}
          />

        </div>

      </div>

    </main>
  );
}

/* =========================================================
   STAT CARD
========================================================== */

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-white/[0.06] bg-white/[0.03] p-8 backdrop-blur-3xl">

      <div className="absolute right-[-10%] top-[-20%] h-[220px] w-[220px] rounded-full bg-[#B89B72]/10 blur-[120px]" />

      <div className="relative">

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#B89B72]/20 bg-[#B89B72]/10 text-[#B89B72]">

          {icon}

        </div>

        <p className="mt-8 text-[10px] uppercase tracking-[0.45em] text-white/35">

          {label}

        </p>

        <h3 className="mt-5 text-4xl font-light tracking-[-0.06em] text-white">

          {value}

        </h3>

      </div>

    </div>
  );
}

/* =========================================================
   ANALYTICS CARD
========================================================== */

function AnalyticsCard({
  icon,
  title,
  value,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  description: string;
}) {
  return (
    <div className="overflow-hidden rounded-[2rem] border border-white/[0.06] bg-white/[0.03] p-8 backdrop-blur-3xl">

      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#B89B72]/20 bg-[#B89B72]/10 text-[#B89B72]">

        {icon}

      </div>

      <p className="mt-8 text-[10px] uppercase tracking-[0.4em] text-white/35">

        {title}

      </p>

      <h3 className="mt-5 text-4xl font-light tracking-[-0.06em] text-white">

        {value}

      </h3>

      <p className="mt-6 text-sm leading-7 text-white/40">

        {description}

      </p>

    </div>
  );
}