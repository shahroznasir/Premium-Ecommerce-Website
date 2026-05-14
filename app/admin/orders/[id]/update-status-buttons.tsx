"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

const statuses = [
  "processing",
  "packed",
  "shipped",
  "delivered",
];

/* =========================================================
   UPDATE STATUS BUTTONS
========================================================== */

export default function UpdateStatusButtons({
  orderId,
  currentStatus,
}: {
  orderId: string;
  currentStatus: string;
}) {

  const router =
    useRouter();

  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    activeStatus,
    setActiveStatus,
  ] = useState(
    currentStatus
  );

  /* =======================================================
     UPDATE STATUS
  ======================================================== */

  async function updateStatus(
    status: string
  ) {

    try {

      setLoading(true);

      const response =
        await fetch(
          "/api/update-order-status",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              orderId,
              status,
            }),
          }
        );

      const data =
        await response.json();

      if (
        !response.ok ||
        !data.success
      ) {

        throw new Error(
          data.message ||
            "Failed to update status"
        );
      }

      setActiveStatus(
        status
      );

      router.refresh();

    } catch (error) {

      console.error(error);

      alert(
        "Failed to update order status."
      );

    } finally {

      setLoading(false);
    }
  }

  return (
    <div className="overflow-hidden rounded-[2rem] border border-white/[0.06] bg-white/[0.03] p-6 backdrop-blur-3xl md:p-8">

      {/* ===================================================
          HEADER
      ==================================================== */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        <div>

          <p className="text-[10px] uppercase tracking-[0.45em] text-[#B89B72]/80">

            Fulfillment Controls

          </p>

          <h2 className="mt-4 text-2xl font-light tracking-[-0.05em] text-white">

            Update Order Status

          </h2>

        </div>

        <div className="inline-flex items-center gap-3 rounded-full border border-[#B89B72]/20 bg-[#B89B72]/10 px-5 py-3">

          <div className="h-2 w-2 rounded-full bg-[#B89B72]" />

          <span className="text-xs uppercase tracking-[0.3em] text-[#B89B72]">

            {activeStatus}

          </span>

        </div>

      </div>

      {/* ===================================================
          BUTTONS
      ==================================================== */}
      <div className="mt-10 flex flex-wrap gap-4">

        {statuses.map(
          (status) => {

            const isActive =
              activeStatus ===
              status;

            return (

              <button
                key={status}
                disabled={loading}
                onClick={() =>
                  updateStatus(
                    status
                  )
                }
                className={`rounded-full border px-6 py-4 text-xs uppercase tracking-[0.3em] transition duration-500 ${
                  isActive
                    ? "border-[#B89B72]/30 bg-[#B89B72]/10 text-[#B89B72]"
                    : "border-white/[0.08] bg-white/[0.03] text-white hover:border-[#B89B72]/20 hover:bg-[#B89B72]/10 hover:text-[#B89B72]"
                } ${
                  loading
                    ? "cursor-not-allowed opacity-60"
                    : ""
                }`}
              >

                {loading &&
                isActive
                  ? "Updating..."
                  : status}

              </button>

            );
          }
        )}

      </div>

      {/* ===================================================
          INFO
      ==================================================== */}
      <p className="mt-8 text-sm leading-8 text-white/40">

        Updating fulfillment status automatically
        synchronizes operational workflow and
        sends a branded transactional email to
        the customer.

      </p>

    </div>
  );
}