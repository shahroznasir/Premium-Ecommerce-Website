import { NextResponse } from "next/server";

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
   GET
   REQUIRED FOR SHIPROCKET VALIDATION
========================================================== */

export async function GET() {

  return NextResponse.json({
    success: true,
    message:
      "Shiprocket webhook active",
  });
}

/* =========================================================
   WEBHOOK
========================================================== */

export async function POST(
  request: Request
) {

  try {

    const body =
      await request.json();

    console.log(
      "SHIPROCKET WEBHOOK:",
      body
    );

    /* =====================================================
       EXTRACT DATA
    ====================================================== */

    const awb =
      body?.awb;

    const shipmentStatus =
      body?.current_status
        ?.toLowerCase()
        ?.replaceAll(
          " ",
          "_"
        );

    /* =====================================================
       MAP STATUS
    ====================================================== */

    let trackingStatus =
      "processing";

    if (
      shipmentStatus?.includes(
        "packed"
      )
    ) {

      trackingStatus =
        "packed";
    }

    if (
      shipmentStatus?.includes(
        "shipped"
      )
    ) {

      trackingStatus =
        "shipped";
    }

    if (
      shipmentStatus?.includes(
        "out_for_delivery"
      )
    ) {

      trackingStatus =
        "out_for_delivery";
    }

    if (
      shipmentStatus?.includes(
        "delivered"
      )
    ) {

      trackingStatus =
        "delivered";
    }

    /* =====================================================
       UPDATE ORDER
    ====================================================== */

    const {
      data: order,
      error,
    } = await supabase
      .from("orders")
      .update({
        tracking_status:
          trackingStatus,

        fulfillment_status:
          trackingStatus ===
          "out_for_delivery"
            ? "shipped"
            : trackingStatus,
      })
      .eq(
        "awb_code",
        awb
      )
      .select()
      .single();

    if (error) {

      console.error(
        "SUPABASE ERROR:",
        error
      );
    }

    /* =====================================================
       SEND CUSTOMER EMAIL
    ====================================================== */

    if (order) {

      await fetch(
        `${process.env.NEXT_PUBLIC_SITE_URL}/api/send-order-update`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            email:
              order.email,

            orderNumber:
              order.order_number ||
              order.id,

            trackingStatus:
              trackingStatus,
          }),
        }
      );
    }

    return NextResponse.json({
      success: true,
    });

  } catch (error) {

    console.error(
      error
    );

    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}