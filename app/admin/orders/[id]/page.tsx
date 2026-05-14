import Link from "next/link";

import { notFound } from "next/navigation";

import { createClient } from "@supabase/supabase-js";

import {
  ArrowLeft,
  PackageCheck,
  CreditCard,
  MapPin,
  Phone,
  Mail,
  Download,
  Truck,
} from "lucide-react";

import UpdateStatusButtons from "./update-status-buttons";
import UpdateTrackingStatus from "./update-tracking-status";

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
   ORDER DETAILS PAGE
========================================================== */

export default async function OrderDetailsPage({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {

  const { id } =
    await params;

  /* =======================================================
     FETCH ORDER
  ======================================================== */

  const {
    data: order,
  } = await supabase
    .from("orders")
    .select("*")
    .eq("id", id)
    .single();

  if (!order) {
    notFound();
  }

  /* =======================================================
     PARSE ITEMS
  ======================================================== */

  const items =
    typeof order.items ===
    "string"
      ? JSON.parse(order.items)
      : order.items;

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050505] text-white">

      {/* ===================================================
          BACKGROUND
      ==================================================== */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">

        <div className="absolute left-1/2 top-[-10%] h-[1200px] w-[1200px] -translate-x-1/2 rounded-full bg-[#B89B72]/[0.04] blur-[220px]" />

        <div className="absolute right-[-10%] top-[20%] h-[700px] w-[700px] rounded-full bg-[#B89B72]/[0.03] blur-[180px]" />

      </div>

      <div className="relative z-10 px-6 py-16 md:px-10 md:py-20">

        {/* =================================================
            BACK BUTTON
        ================================================== */}
        <Link href="/admin">

          <button className="inline-flex items-center gap-3 rounded-full border border-white/[0.08] bg-white/[0.03] px-6 py-4 text-xs uppercase tracking-[0.3em] text-white transition duration-500 hover:border-[#B89B72]/30 hover:bg-[#B89B72]/10 hover:text-[#B89B72]">

            <ArrowLeft size={16} />

            Back To Dashboard

          </button>

        </Link>

        {/* =================================================
            HEADER
        ================================================== */}
        <div className="mt-14 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">

          <div>

            <p className="text-[10px] uppercase tracking-[0.45em] text-[#B89B72]/80">

              Luxury Order Details

            </p>

            <h1 className="mt-6 text-5xl font-light leading-[0.9] tracking-[-0.08em] text-white md:text-7xl">

              {
                order.order_number
              }

            </h1>

          </div>

          <div className="inline-flex items-center gap-3 rounded-full border border-[#B89B72]/20 bg-[#B89B72]/10 px-6 py-4">

            <div className="h-2 w-2 rounded-full bg-[#B89B72]" />

            <span className="text-xs uppercase tracking-[0.3em] text-[#B89B72]">

              {
                order.fulfillment_status ||
                "processing"
              }

            </span>

          </div>

        </div>

        {/* =================================================
            STATUS CONTROLS
        ================================================== */}
        <div className="mt-10">

          <UpdateStatusButtons
            orderId={order.id}
            currentStatus={
              order.fulfillment_status ||
              "processing"
            }
          />

        </div>

        {/* =================================================
            TRACKING STATUS
        ================================================== */}
        <div className="mt-8 overflow-hidden rounded-[2rem] border border-white/[0.06] bg-white/[0.03] p-8 backdrop-blur-3xl">

          <div className="flex items-center gap-4">

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#B89B72]/20 bg-[#B89B72]/10 text-[#B89B72]">

              <Truck size={22} />

            </div>

            <div>

              <p className="text-[10px] uppercase tracking-[0.45em] text-[#B89B72]/80">

                Logistics Tracking

              </p>

              <p className="mt-3 text-sm text-white/45">

                Update live delivery progress for customer tracking.

              </p>

            </div>

          </div>

          <div className="mt-8">

            <UpdateTrackingStatus
              orderId={order.id}
              currentTrackingStatus={
                order.tracking_status ||
                "processing"
              }
              customerEmail={
                order.email
              }
              orderNumber={
                order.order_number ||
                order.id
              }
            />

          </div>

        </div>

        {/* =================================================
            GRID
        ================================================== */}
        <div className="mt-16 grid gap-8 lg:grid-cols-[1fr_420px]">

          {/* LEFT */}
          <div className="space-y-8">

            {/* CUSTOMER */}
            <LuxuryCard
              title="Customer Information"
            >

              <InfoRow
                icon={<Mail size={18} />}
                label="Email"
                value={order.email}
              />

              <InfoRow
                icon={<Phone size={18} />}
                label="Phone"
                value={order.phone}
              />

            </LuxuryCard>

            {/* ADDRESS */}
            <LuxuryCard
              title="Shipping Address"
            >

              <InfoRow
                icon={<MapPin size={18} />}
                label="Address"
                value={`${order.address}, ${order.city}, ${order.state} - ${order.postal_code}`}
              />

            </LuxuryCard>

            {/* ITEMS */}
            <LuxuryCard
              title="Purchased Products"
            >

              <div className="space-y-6">

                {items?.map(
                  (
                    item: {
                      id: string;
                      title: string;
                      quantity: number;
                      price: number;
                    }
                  ) => (

                    <div
                      key={item.id}
                      className="flex items-center justify-between border-b border-white/[0.06] pb-6 last:border-none last:pb-0"
                    >

                      <div>

                        <p className="text-lg font-light text-white">

                          {item.title}

                        </p>

                        <p className="mt-2 text-sm text-white/40">

                          Quantity:
                          {" "}
                          {item.quantity}

                        </p>

                      </div>

                      <p className="text-lg text-white">

                        ₹
                        {(
                          item.price *
                          item.quantity
                        ).toLocaleString(
                          "en-IN"
                        )}

                      </p>

                    </div>

                  )
                )}

              </div>

            </LuxuryCard>

          </div>

          {/* RIGHT */}
          <div className="space-y-8">

            {/* PAYMENT */}
            <LuxuryCard
              title="Payment Information"
            >

              <InfoRow
                icon={
                  <CreditCard
                    size={18}
                  />
                }
                label="Payment ID"
                value={
                  order.payment_id
                }
              />

              <InfoRow
                icon={
                  <PackageCheck
                    size={18}
                  />
                }
                label="Payment Method"
                value={
                  order.payment_method
                }
              />

            </LuxuryCard>

            {/* SUMMARY */}
            <LuxuryCard
              title="Order Summary"
            >

              <div className="space-y-6">

                <SummaryRow
                  label="Order Number"
                  value={
                    order.order_number
                  }
                />

                <SummaryRow
                  label="Date"
                  value={new Date(
                    order.created_at
                  ).toLocaleDateString(
                    "en-IN",
                    {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    }
                  )}
                />

                <SummaryRow
                  label="Fulfillment"
                  value={
                    order.fulfillment_status ||
                    "processing"
                  }
                />

                <SummaryRow
                  label="Tracking"
                  value={
                    order.tracking_status ||
                    "processing"
                  }
                />

              </div>

              {/* TOTAL */}
              <div className="mt-10 border-t border-white/[0.06] pt-8">

                <div className="flex items-end justify-between">

                  <div>

                    <p className="text-[10px] uppercase tracking-[0.4em] text-white/35">

                      Total

                    </p>

                    <p className="mt-4 text-5xl font-light tracking-[-0.06em] text-white">

                      ₹
                      {Number(
                        order.total
                      ).toLocaleString(
                        "en-IN"
                      )}

                    </p>

                  </div>

                </div>

              </div>

              {/* DOWNLOAD INVOICE */}
              <div className="mt-10">

                <a
                  href={`/api/generate-invoice?orderId=${order.id}`}
                  target="_blank"
                >

                  <button className="flex w-full items-center justify-center gap-3 rounded-full border border-[#B89B72]/20 bg-[#B89B72]/10 px-6 py-5 text-xs uppercase tracking-[0.35em] text-[#B89B72] transition duration-500 hover:border-[#B89B72]/40 hover:bg-[#B89B72]/20">

                    <Download
                      size={16}
                    />

                    Download Luxury Invoice

                  </button>

                </a>

              </div>

            </LuxuryCard>

          </div>

        </div>

      </div>

    </main>
  );
}

/* =========================================================
   LUXURY CARD
========================================================== */

function LuxuryCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-[2rem] border border-white/[0.06] bg-white/[0.03] p-8 backdrop-blur-3xl">

      <p className="text-[10px] uppercase tracking-[0.45em] text-[#B89B72]/80">

        {title}

      </p>

      <div className="mt-8">

        {children}

      </div>

    </div>
  );
}

/* =========================================================
   INFO ROW
========================================================== */

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-5 border-b border-white/[0.06] pb-6 last:border-none last:pb-0">

      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#B89B72]/20 bg-[#B89B72]/10 text-[#B89B72]">

        {icon}

      </div>

      <div>

        <p className="text-[10px] uppercase tracking-[0.35em] text-white/35">

          {label}

        </p>

        <p className="mt-3 text-sm leading-7 text-white/70">

          {value}

        </p>

      </div>

    </div>
  );
}

/* =========================================================
   SUMMARY ROW
========================================================== */

function SummaryRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between">

      <p className="text-sm text-white/40">

        {label}

      </p>

      <p className="text-sm text-white/75">

        {value}

      </p>

    </div>
  );
}