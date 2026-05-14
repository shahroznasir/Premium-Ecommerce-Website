import crypto from "crypto";

import { NextResponse } from "next/server";

import { createClient } from "@supabase/supabase-js";

import { resend } from "@/lib/resend";

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
   VERIFY PAYMENT
========================================================== */

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

      paymentMethod,
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
       GENERATE ORDER NUMBER
    ====================================================== */

    const orderNumber =
      `TDAS-${new Date().getFullYear()}-${Math.floor(
        1000 +
          Math.random() * 9000
      )}`;

    /* =====================================================
       SAVE ORDER TO SUPABASE
    ====================================================== */

    const { error } =
      await supabase
        .from("orders")
        .insert([
          {
            order_number:
              orderNumber,

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

            payment_method:
              paymentMethod,
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

    /* =====================================================
       CUSTOMER EMAIL
    ====================================================== */

    await resend.emails.send({
      from:
        "The Decor Art Studio <orders@thedecorartstudio.in>",

      to:
        customer.email,

      subject:
        `Order Confirmed - ${orderNumber}`,

      html: `
        <div
          style="
            background:#050505;
            padding:40px;
            color:white;
            font-family:Arial,sans-serif;
          "
        >

          <p
            style="
              letter-spacing:6px;
              font-size:11px;
              color:#B89B72;
              text-transform:uppercase;
            "
          >
            The Decor Art Studio
          </p>

          <h1
            style="
              font-size:42px;
              margin-top:24px;
              font-weight:300;
            "
          >
            Thank You
            For Your Purchase
          </h1>

          <p
            style="
              margin-top:28px;
              line-height:1.9;
              color:#cccccc;
              max-width:600px;
            "
          >
            Your luxury order has been confirmed
            and is now being prepared using
            premium packaging and protected
            delivery handling.
          </p>

          <div
            style="
              margin-top:40px;
              padding:24px;
              border:1px solid rgba(255,255,255,0.08);
              border-radius:20px;
              background:rgba(255,255,255,0.03);
            "
          >

            <p>
              <strong>
                Order Number:
              </strong>

              ${orderNumber}
            </p>

            <p>
              <strong>
                Order Total:
              </strong>

              ₹${total}
            </p>

            <p>
              <strong>
                Payment ID:
              </strong>

              ${razorpay_payment_id}
            </p>

          </div>

        </div>
      `,
    });

    /* =====================================================
       ADMIN EMAIL
    ====================================================== */

    await resend.emails.send({
      from:
        "The Decor Art Studio <orders@thedecorartstudio.in>",

      to:
        "YOUR-REAL-EMAIL@gmail.com",

      subject:
        `New Order - ${orderNumber}`,

      html: `
        <div
          style="
            font-family:Arial,sans-serif;
            padding:40px;
          "
        >

          <h1>
            New Luxury Order Received
          </h1>

          <p>
            <strong>
              Order Number:
            </strong>

            ${orderNumber}
          </p>

          <p>
            <strong>
              Customer:
            </strong>

            ${customer.name}
          </p>

          <p>
            <strong>
              Email:
            </strong>

            ${customer.email}
          </p>

          <p>
            <strong>
              Phone:
            </strong>

            ${customer.phone}
          </p>

          <p>
            <strong>
              Total:
            </strong>

            ₹${total}
          </p>

          <p>
            <strong>
              Payment ID:
            </strong>

            ${razorpay_payment_id}
          </p>

        </div>
      `,
    });

    /* =====================================================
       SUCCESS
    ====================================================== */

    return NextResponse.json({
      success: true,

      orderNumber,
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