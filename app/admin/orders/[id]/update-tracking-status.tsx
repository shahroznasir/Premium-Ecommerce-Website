"use client";

import { useState } from "react";

import { createClient } from "@supabase/supabase-js";

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
   COMPONENT
========================================================== */

export default function UpdateTrackingStatus({
  orderId,
  currentTrackingStatus,
  customerEmail,
  orderNumber,
}: {
  orderId: string;
  currentTrackingStatus: string;
  customerEmail: string;
  orderNumber: string;
}) {

  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    activeStatus,
    setActiveStatus,
  ] = useState(
    currentTrackingStatus
  );

  /* =======================================================
     UPDATE STATUS
  ======================================================== */

  async function updateStatus(
    status: string
  ) {

    try {

      setLoading(true);

      setActiveStatus(
        status
      );

      /* ===================================================
         UPDATE TRACKING STATUS
      ==================================================== */

      await supabase
        .from("orders")
        .update({
          tracking_status:
            status,

          /* ===============================================
             AUTO SYNC FULFILLMENT STATUS
          ================================================ */

          fulfillment_status:
            status ===
            "out_for_delivery"
              ? "shipped"
              : status,
        })
        .eq(
          "id",
          orderId
        );

      /* ===================================================
         CREATE SHIPMENT AUTOMATICALLY
      ==================================================== */

      if (
        status ===
        "shipped"
      ) {

        await fetch(
          "/api/create-shipment",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              orderId,
            }),
          }
        );
      }

      /* ===================================================
         SEND CUSTOMER EMAIL
      ==================================================== */

      await fetch(
        "/api/send-order-update",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            email:
              customerEmail,

            orderNumber:
              orderNumber,

            trackingStatus:
              status,
          }),
        }
      );

    } catch (error) {

      console.error(
        error
      );

      alert(
        "Failed to update logistics status."
      );

    } finally {

      setLoading(false);
    }
  }

  return (
    <div className="flex flex-wrap gap-4">

      {[
        "processing",
        "packed",
        "shipped",
        "out_for_delivery",
        "delivered",
      ].map((status) => (

        <button
          key={status}
          disabled={loading}
          onClick={() =>
            updateStatus(
              status
            )
          }
          className={`rounded-full px-6 py-4 text-xs uppercase tracking-[0.3em] transition duration-500 ${
            activeStatus ===
            status
              ? "bg-[#B89B72] text-black"
              : "border border-white/[0.06] bg-white/[0.03] text-white/60 hover:border-[#B89B72]/20 hover:text-white"
          } ${
            loading
              ? "cursor-not-allowed opacity-60"
              : ""
          }`}
        >

          {loading &&
          activeStatus ===
            status
            ? "Updating..."
            : status.replaceAll(
                "_",
                " "
              )}

        </button>

      ))}

    </div>
  );
}