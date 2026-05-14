"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
  useRouter,
} from "next/navigation";

import { createClient } from "@supabase/supabase-js";

import {
  ArrowLeft,
  PackageCheck,
  Download,
  CheckCircle2,
  Circle,
} from "lucide-react";

/* =========================================================
   TYPES
========================================================== */

type OrderItem = {
  id?: string;
  name?: string;
  title?: string;
  image?: string;
  price?: number;
  quantity?: number;
};

type Order = {
  id: string;
  order_number: string;
  total: number;
  fulfillment_status: string;
  tracking_status?: string;
  created_at: string;
  customer_name?: string;
  email?: string;
  phone?: string;
  address?: string;
  items?: OrderItem[];
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
   PAGE
========================================================== */

export default function OrderDetailsPage() {

  const params =
    useParams();

  const router =
    useRouter();

  const [order, setOrder] =
    useState<Order | null>(
      null
    );

  const [loading, setLoading] =
    useState(true);

  /* =======================================================
     LOAD ORDER + REALTIME
  ======================================================== */

  useEffect(() => {

    async function loadOrder() {

      const {
        data,
      } = await supabase
        .from("orders")
        .select("*")
        .eq(
          "id",
          params.id
        )
        .single();

      if (data) {

        setOrder(
          data as Order
        );
      }

      setLoading(false);
    }

    loadOrder();

    /* =====================================================
       REALTIME ORDER TRACKING
    ====================================================== */

    const channel =
      supabase
        .channel(
          `order-${params.id}`
        )
        .on(
          "postgres_changes",
          {
            event: "UPDATE",
            schema: "public",
            table: "orders",
            filter: `id=eq.${params.id}`,
          },
          (payload) => {

            setOrder(
              payload.new as Order
            );
          }
        )
        .subscribe();

    return () => {

      supabase.removeChannel(
        channel
      );
    };

  }, [params.id]);

  /* =======================================================
     LOADING
  ======================================================== */

  if (loading) {

    return (
      <main className="flex min-h-screen items-center justify-center bg-[#050505] text-white">

        Loading Order...

      </main>
    );
  }

  /* =======================================================
     NOT FOUND
  ======================================================== */

  if (!order) {

    return (
      <main className="flex min-h-screen items-center justify-center bg-[#050505] text-white">

        Order not found.

      </main>
    );
  }

  const trackingStatus =
    order.tracking_status ||
    "processing";

  const status =
    order.fulfillment_status ||
    "processing";

  const statusColor =
    status === "delivered"
      ? "text-green-400 border-green-500/20 bg-green-500/10"
      : status === "shipped"
      ? "text-blue-400 border-blue-500/20 bg-blue-500/10"
      : "text-[#B89B72] border-[#B89B72]/20 bg-[#B89B72]/10";

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050505] px-6 py-20 text-white">

      {/* ATMOSPHERE */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        <div className="absolute left-1/2 top-[-10%] h-[1000px] w-[1000px] -translate-x-1/2 rounded-full bg-[#B89B72]/[0.04] blur-[180px]" />

      </div>

      <div className="relative z-10 mx-auto max-w-6xl">

        {/* BACK */}
        <button
          onClick={() =>
            router.push(
              "/account"
            )
          }
          className="mb-10 flex items-center gap-3 text-sm text-white/60 transition hover:text-white"
        >

          <ArrowLeft className="h-4 w-4" />

          Back to Account

        </button>

        {/* MAIN CARD */}
        <div className="overflow-hidden rounded-[3rem] border border-white/[0.06] bg-white/[0.03] p-8 backdrop-blur-3xl md:p-12">

          {/* HEADER */}
          <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">

            <div>

              <p className="text-[10px] uppercase tracking-[0.45em] text-[#B89B72]/80">

                Order Details

              </p>

              <h1 className="mt-6 text-5xl font-light tracking-[-0.07em] md:text-7xl">

                {
                  order.order_number
                }

              </h1>

              <p className="mt-6 text-white/45">

                Ordered on{" "}

                {new Date(
                  order.created_at
                ).toLocaleDateString(
                  "en-IN",
                  {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  }
                )}

              </p>

            </div>

            <div className="flex flex-col items-start gap-5 md:items-end">

              {/* STATUS */}
              <div
                className={`inline-flex items-center gap-3 rounded-full border px-6 py-4 ${statusColor}`}
              >

                <PackageCheck className="h-4 w-4" />

                <span className="text-xs uppercase tracking-[0.3em]">

                  {status}

                </span>

              </div>

              {/* INVOICE */}
              <a
                href={`/api/generate-invoice?orderId=${order.id}`}
                target="_blank"
                className="inline-flex items-center gap-3 rounded-full border border-white/[0.06] bg-white/[0.03] px-6 py-4 text-xs uppercase tracking-[0.3em] text-white/70 transition hover:border-[#B89B72]/20 hover:bg-[#B89B72]/10 hover:text-[#B89B72]"
              >

                <Download className="h-4 w-4" />

                Download Invoice

              </a>

            </div>

          </div>

          {/* TIMELINE */}
          <div className="mt-20">

            <p className="text-[10px] uppercase tracking-[0.45em] text-[#B89B72]/80">

              Order Timeline

            </p>

            <div className="mt-10 grid gap-6 md:grid-cols-5">

              <TimelineStep
                active
                label="Confirmed"
              />

              <TimelineStep
                active={
                  trackingStatus ===
                    "packed" ||
                  trackingStatus ===
                    "shipped" ||
                  trackingStatus ===
                    "out_for_delivery" ||
                  trackingStatus ===
                    "delivered"
                }
                label="Packed"
              />

              <TimelineStep
                active={
                  trackingStatus ===
                    "shipped" ||
                  trackingStatus ===
                    "out_for_delivery" ||
                  trackingStatus ===
                    "delivered"
                }
                label="Shipped"
              />

              <TimelineStep
                active={
                  trackingStatus ===
                    "out_for_delivery" ||
                  trackingStatus ===
                    "delivered"
                }
                label="Out for Delivery"
              />

              <TimelineStep
                active={
                  trackingStatus ===
                  "delivered"
                }
                label="Delivered"
              />

            </div>

          </div>

          {/* PRODUCTS */}
          <div className="mt-20">

            <p className="text-[10px] uppercase tracking-[0.45em] text-[#B89B72]/80">

              Ordered Products

            </p>

            <div className="mt-10 space-y-6">

              {order.items?.map(
                (
                  item,
                  index
                ) => (

                  <div
                    key={index}
                    className="flex flex-col gap-8 rounded-[2rem] border border-white/[0.06] bg-white/[0.02] p-6 md:flex-row md:items-center md:justify-between"
                  >

                    <div className="flex items-center gap-6">

                      {/* IMAGE */}
                      <div className="h-28 w-28 overflow-hidden rounded-[1.5rem] border border-white/[0.06] bg-white/[0.03]">

                        {item.image ? (

                          <img
                            src={
                              item.image
                            }
                            alt={
                              item.name
                            }
                            className="h-full w-full object-cover"
                          />

                        ) : (

                          <div className="flex h-full items-center justify-center text-white/20">

                            No Image

                          </div>

                        )}

                      </div>

                      {/* INFO */}
                      <div>

                        <h3 className="text-2xl font-light tracking-[-0.04em] text-white">

                          {item.name ||
                            item.title ||
                            "Luxury Product"}

                        </h3>

                        <p className="mt-3 text-sm uppercase tracking-[0.25em] text-white/35">

                          Quantity:
                          {" "}
                          {
                            item.quantity ||
                            1
                          }

                        </p>

                      </div>

                    </div>

                    {/* PRICE */}
                    <div className="text-right">

                      <p className="text-[10px] uppercase tracking-[0.35em] text-white/35">

                        Subtotal

                      </p>

                      <p className="mt-4 text-3xl font-light">

                        Rs.
                        {Number(
                          (
                            item.price ||
                            0
                          ) *
                            (
                              item.quantity ||
                              1
                            )
                        ).toLocaleString(
                          "en-IN"
                        )}

                      </p>

                    </div>

                  </div>

                )
              )}

            </div>

          </div>

          {/* CUSTOMER DETAILS */}
          <div className="mt-20 grid gap-8 md:grid-cols-2">

            <InfoCard
              label="Customer"
              value={
                order.customer_name ||
                "Luxury Client"
              }
            />

            <InfoCard
              label="Email"
              value={
                order.email ||
                "-"
              }
            />

            <InfoCard
              label="Phone"
              value={
                order.phone ||
                "-"
              }
            />

            <InfoCard
              label="Total"
              value={`Rs. ${Number(order.total).toLocaleString("en-IN")}`}
            />

          </div>

          {/* SHIPPING */}
          <div className="mt-8 rounded-[2rem] border border-white/[0.06] bg-white/[0.02] p-8">

            <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">

              <div>

                <p className="text-[10px] uppercase tracking-[0.35em] text-white/35">

                  Shipping Address

                </p>

                <p className="mt-5 max-w-2xl text-lg leading-8 text-white/70">

                  {
                    order.address ||
                    "No address found."
                  }

                </p>

              </div>

              <div>

                <p className="text-[10px] uppercase tracking-[0.35em] text-white/35">

                  Estimated Delivery

                </p>

                <p className="mt-5 text-lg text-white">

                  3-5 Business Days

                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </main>
  );
}

/* =========================================================
   TIMELINE
========================================================== */

function TimelineStep({
  label,
  active,
}: {
  label: string;
  active?: boolean;
}) {

  return (
    <div
      className={`rounded-[2rem] border p-6 ${
        active
          ? "border-[#B89B72]/20 bg-[#B89B72]/10"
          : "border-white/[0.06] bg-white/[0.02]"
      }`}
    >

      <div className="flex items-center gap-3">

        {active ? (

          <CheckCircle2 className="h-5 w-5 text-[#B89B72]" />

        ) : (

          <Circle className="h-5 w-5 text-white/20" />

        )}

        <span className="text-sm uppercase tracking-[0.25em] text-white/70">

          {label}

        </span>

      </div>

    </div>
  );
}

/* =========================================================
   INFO CARD
========================================================== */

function InfoCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {

  return (
    <div className="rounded-[2rem] border border-white/[0.06] bg-white/[0.02] p-8">

      <p className="text-[10px] uppercase tracking-[0.35em] text-white/35">

        {label}

      </p>

      <p className="mt-5 text-xl text-white">

        {value}

      </p>

    </div>
  );
}