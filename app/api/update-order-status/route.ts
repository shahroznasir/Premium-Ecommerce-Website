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
   UPDATE ORDER STATUS
========================================================== */

export async function POST(
  request: Request
) {

  try {

    const body =
      await request.json();

    const {
      orderId,
      status,
    } = body;

    /* =====================================================
       VALIDATION
    ====================================================== */

    if (
      !orderId ||
      !status
    ) {

      return NextResponse.json(
        {
          success: false,
          message:
            "Missing fields",
        },
        {
          status: 400,
        }
      );
    }

    /* =====================================================
       UPDATE ORDER
    ====================================================== */

    const {
      error,
    } = await supabase
      .from("orders")
      .update({
        fulfillment_status:
          status,
      })
      .eq(
        "id",
        orderId
      );

    if (error) {

      console.error(
        error
      );

      return NextResponse.json(
        {
          success: false,
          message:
            "Failed to update order",
        },
        {
          status: 500,
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
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Server error",
      },
      {
        status: 500,
      }
    );
  }
}