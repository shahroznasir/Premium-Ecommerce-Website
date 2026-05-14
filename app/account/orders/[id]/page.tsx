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
  Truck,
  ExternalLink,
  Clock3,
  MapPin,
  CalendarDays,
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

type TrackingEvent = {
  location?: string;
  date?: string;
  activity?: string;
  status?: string;
};

type Order = {
  id: string;
  order_number: string;
  total: number;
  fulfillment_status: string;
  tracking_status?: string;
  courier_name?: string;
  awb_code?: string;
  tracking_url?: string;
  estimated_delivery?: string;
  tracking_events?: TrackingEvent[];
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
     LOAD ORDER
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

  const trackingEvents =
    order.tracking_events ||
    [];

  const statusColor =
    status === "delivered"
      ? "text-green-400 border-green-500/20 bg-green-500/10"
      : status === "shipped"
      ? "text-blue-400 border-blue-500/20 bg-blue-500/10"
      : "text-[#B89B72] border-[#B89B72]/20 bg-[#B89B72]/10";

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050505] px-6 py-20 text-white">

      {/* BACKGROUND */}
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

        {/* MAIN */}
        <div className="overflow-hidden rounded-[3rem] border border-white/[0.06] bg-white/[0.03] p-8 backdrop-blur-3xl md:p-12">

          {/* HEADER */}
          <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">

            <div>

              <p className="text-[10px] uppercase tracking-[0.45em] text-[#B89B72]/80">

                Luxury Shipment

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

              <div
                className={`inline-flex items-center gap-3 rounded-full border px-6 py-4 ${statusColor}`}
              >

                <PackageCheck className="h-4 w-4" />

                <span className="text-xs uppercase tracking-[0.3em]">

                  {status.replaceAll(
                    "_",
                    " "
                  )}

                </span>

              </div>

              {order.tracking_url && (

                <a
                  href={
                    order.tracking_url
                  }
                  target="_blank"
                  className="inline-flex items-center gap-3 rounded-full border border-[#B89B72]/20 bg-[#B89B72]/10 px-6 py-4 text-xs uppercase tracking-[0.3em] text-[#B89B72] transition hover:bg-[#B89B72] hover:text-black"
                >

                  <Truck className="h-4 w-4" />

                  Track Shipment

                  <ExternalLink className="h-4 w-4" />

                </a>

              )}

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

          {/* LOGISTICS */}
          {(order.awb_code ||
            order.courier_name) && (

            <div className="mt-14 grid gap-6 md:grid-cols-3">

              <InfoCard
                label="Courier Partner"
                value={
                  order.courier_name ||
                  "Assigned Soon"
                }
              />

              <InfoCard
                label="AWB Number"
                value={
                  order.awb_code ||
                  "Pending"
                }
              />

              <InfoCard
                label="Expected Delivery"
                value={
                  order.estimated_delivery
                    ? new Date(
                        order.estimated_delivery
                      ).toLocaleDateString(
                        "en-IN",
                        {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        }
                      )
                    : "3-5 Business Days"
                }
              />

            </div>

          )}

          {/* TIMELINE */}
          <div className="mt-20">

            <p className="text-[10px] uppercase tracking-[0.45em] text-[#B89B72]/80">

              Shipment Timeline

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

          {/* LIVE EVENTS */}
          {trackingEvents.length > 0 && (

            <div className="mt-20">

              <p className="text-[10px] uppercase tracking-[0.45em] text-[#B89B72]/80">

                Live Shipment Activity

              </p>

              <div className="mt-10 space-y-6">

                {trackingEvents.map(
                  (
                    event,
                    index
                  ) => (

                    <div
                      key={index}
                      className="rounded-[2rem] border border-white/[0.06] bg-white/[0.02] p-8"
                    >

                      <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">

                        <div>

                          <div className="flex items-center gap-3">

                            <CheckCircle2 className="h-5 w-5 text-[#B89B72]" />

                            <h3 className="text-xl font-light text-white">

                              {event.activity ||
                                "Shipment Update"}

                            </h3>

                          </div>

                          <div className="mt-5 flex flex-col gap-3 text-white/50">

                            <div className="flex items-center gap-3">

                              <MapPin className="h-4 w-4" />

                              <span>

                                {event.location ||
                                  "Location unavailable"}

                              </span>

                            </div>

                            <div className="flex items-center gap-3">

                              <Truck className="h-4 w-4" />

                              <span className="uppercase">

                                {event.status ||
                                  "In Transit"}

                              </span>

                            </div>

                          </div>

                        </div>

                        <div className="flex items-center gap-3 text-sm text-white/40">

                          <Clock3 className="h-4 w-4" />

                          <span>

                            {event.date ||
                              "Recently Updated"}

                          </span>

                        </div>

                      </div>

                    </div>

                  )
                )}

              </div>

            </div>

          )}

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

      <p className="mt-5 text-xl break-all text-white">

        {value}

      </p>

    </div>
  );
}