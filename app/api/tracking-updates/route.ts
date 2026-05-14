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
========================================================== */

export async function GET() {

  return NextResponse.json({
    success: true,
    message:
      "Shiprocket webhook active",
  });
}

/* =========================================================
   POST
========================================================== */

export async function POST(
  request: Request
) {

  try {

    /* =====================================================
       AUTH VALIDATION
    ====================================================== */

    const apiKey =
      request.headers.get(
        "x-api-key"
      );

    if (
      apiKey !==
      process.env
        .SHIPROCKET_WEBHOOK_SECRET
    ) {

      return NextResponse.json(
        {
          success: false,
          message:
            "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    /* =====================================================
       SAFE BODY PARSE
    ====================================================== */

    let body:
      Record<
        string,
        unknown
      > = {};

    try {

      body =
        await request.json();

    } catch {

      return NextResponse.json({
        success: true,
        message:
          "Webhook test received",
      });
    }

    console.log(
      "SHIPROCKET WEBHOOK:",
      body
    );

    /* =====================================================
       EXTRACT DATA
    ====================================================== */

    const awb =
      body?.awb as
        | string
        | undefined;

    const orderId =
      body?.order_id as
        | string
        | undefined;

    const shipmentStatus =
      (
        body?.current_status as
          | string
          | undefined
      )
        ?.toLowerCase()
        ?.replaceAll(
          " ",
          "_"
        );

    const trackingEvents =
      body?.scans || [];

    /* =====================================================
       TEST WEBHOOK
    ====================================================== */

    if (
      !shipmentStatus
    ) {

      return NextResponse.json({
        success: true,
        message:
          "Webhook received successfully",
      });
    }

    /* =====================================================
       MAP STATUS
    ====================================================== */

    let trackingStatus =
      "processing";

    if (
      shipmentStatus.includes(
        "packed"
      )
    ) {

      trackingStatus =
        "packed";
    }

    if (
      shipmentStatus.includes(
        "shipped"
      )
    ) {

      trackingStatus =
        "shipped";
    }

    if (
      shipmentStatus.includes(
        "out_for_delivery"
      )
    ) {

      trackingStatus =
        "out_for_delivery";
    }

    if (
      shipmentStatus.includes(
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

        tracking_events:
          trackingEvents,
      })
      .match(
        awb
          ? {
              awb_code:
                awb,
            }
          : {
              id:
                orderId,
            }
      )
      .select();

    if (error) {

      console.error(
        "SUPABASE ERROR:",
        error
      );
    }

    /* =====================================================
       SEND EMAIL
    ====================================================== */

    if (
      order &&
      order.length > 0
    ) {

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
              order[0].email,

            orderNumber:
              order[0]
                .order_number ||
              order[0].id,

            trackingStatus:
              trackingStatus,
          }),
        }
      );
    }

    /* =====================================================
       SUCCESS
    ====================================================== */

    return NextResponse.json({
      success: true,
    });

  } catch (error) {

    console.error(
      "WEBHOOK ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Webhook failed",
      },
      {
        status: 500,
      }
    );
  }
}