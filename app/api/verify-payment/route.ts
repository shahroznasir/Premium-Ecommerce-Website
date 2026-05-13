import crypto from "crypto";

import { NextResponse } from "next/server";

import { createClient } from "@supabase/supabase-js";

const supabase =
  createClient(
    process.env
      .NEXT_PUBLIC_SUPABASE_URL!,

    process.env
      .NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

export async function POST(
  request: Request
) {

  try {

    const body =
      await request.json();

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,

      items,
      total,

      customer,
    } = body;

    /* =====================================================
       VERIFY SIGNATURE
    ====================================================== */

    const generatedSignature =
      crypto
        .createHmac(
          "sha256",

          process.env
            .RAZORPAY_KEY_SECRET!
        )

        .update(
          `${razorpay_order_id}|${razorpay_payment_id}`
        )

        .digest("hex");

    const isAuthentic =
      generatedSignature ===
      razorpay_signature;

    if (!isAuthentic) {

      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid payment signature",
        },
        {
          status: 400,
        }
      );
    }

    /* =====================================================
       SAVE ORDER TO SUPABASE
    ====================================================== */

    const { error } =
      await supabase
        .from("orders")
        .insert([
          {
            total,

            items,

            payment_id:
              razorpay_payment_id,

            status: "paid",

            customer_name:
              customer.name,

            email:
              customer.email,

            phone:
              customer.phone,

            address:
              customer.address,

            city:
              customer.city,

            state:
              customer.state,

            postal_code:
              customer.postalCode,
          },
        ]);

    if (error) {

      console.error(error);

      return NextResponse.json(
        {
          success: false,
          message:
            "Failed to save order",
        },
        {
          status: 500,
        }
      );
    }

    return NextResponse.json({
      success: true,
    });

  } catch (error) {

    console.error(error);

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