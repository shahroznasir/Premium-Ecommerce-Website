import { NextResponse } from "next/server";

import { createClient } from "@supabase/supabase-js";

import { getShiprocketToken } from "@/lib/shiprocket";

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
   CREATE SHIPMENT
========================================================== */

export async function POST(
  request: Request
) {

  try {

    const body =
      await request.json();

    const {
      orderId,
    } = body;

    /* =====================================================
       GET ORDER
    ====================================================== */

    const {
      data: order,
      error,
    } = await supabase
      .from("orders")
      .select("*")
      .eq(
        "id",
        orderId
      )
      .single();

    if (
      error ||
      !order
    ) {

      return NextResponse.json(
        {
          success: false,
          message:
            "Order not found",
        },
        {
          status: 404,
        }
      );
    }

    /* =====================================================
       SHIPROCKET TOKEN
    ====================================================== */

    const token =
      await getShiprocketToken();

    /* =====================================================
       ITEMS
    ====================================================== */

    const items =
      typeof order.items ===
      "string"
        ? JSON.parse(
            order.items
          )
        : order.items;

    /* =====================================================
       CREATE SHIPMENT
    ====================================================== */

    const shipmentResponse =
      await fetch(
        "https://apiv2.shiprocket.in/v1/external/orders/create/adhoc",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",

            Authorization:
              `Bearer ${token}`,
          },

          body: JSON.stringify({
            order_id:
              order.order_number ||
              order.id,

            order_date:
              new Date(
                order.created_at
              )
                .toISOString()
                .split("T")[0],

            pickup_location:
              "Home",

            billing_customer_name:
              order.customer_name,

            billing_last_name:
              "",

            billing_address:
              order.address,

            billing_city:
              order.city,

            billing_pincode:
              order.postal_code,

            billing_state:
              order.state,

            billing_country:
              "India",

            billing_email:
              order.email,

            billing_phone:
              order.phone,

            shipping_is_billing:
              true,

            order_items:
              items.map(
                (
                  item: {
                    title?: string;
                    name?: string;
                    quantity?: number;
                    price?: number;
                  }
                ) => ({
                  name:
                    item.title ||
                    item.name ||
                    "Luxury Product",

                  sku:
                    "TDAS-LUXURY",

                  units:
                    item.quantity ||
                    1,

                  selling_price:
                    item.price ||
                    0,
                })
              ),

            payment_method:
              "Prepaid",

            sub_total:
              order.total,

            length: 20,
            breadth: 20,
            height: 10,
            weight: 1,
          }),
        }
      );

    const shipmentData =
      await shipmentResponse.json();

    console.log(
      "SHIPMENT RESPONSE:",
      shipmentData
    );

    /* =====================================================
       VALIDATE SHIPMENT
    ====================================================== */

    if (
      !shipmentResponse.ok
    ) {

      return NextResponse.json(
        {
          success: false,
          message:
            shipmentData?.message ||
            "Failed to create shipment",
          shipmentData,
        },
        {
          status: 500,
        }
      );
    }

    /* =====================================================
       EXTRACT SHIPMENT DATA
    ====================================================== */

    const shipmentId =
      shipmentData
        ?.shipment_id ||
      shipmentData
        ?.shipment_response
        ?.shipment_id ||
      null;

    const awbCode =
      shipmentData
        ?.awb_code ||
      shipmentData
        ?.shipment_response
        ?.awb_code ||
      "";

    const courierName =
      shipmentData
        ?.courier_name ||
      shipmentData
        ?.shipment_response
        ?.courier_name ||
      "";

    const trackingUrl =
      shipmentData
        ?.tracking_url ||
      shipmentData
        ?.tracking_data
        ?.track_url ||
      shipmentData
        ?.shipment_response
        ?.tracking_url ||
      "";

    const estimatedDelivery =
      shipmentData
        ?.etd ||
      shipmentData
        ?.shipment_response
        ?.etd ||
      "";

    /* =====================================================
       SAVE SHIPMENT DATA
    ====================================================== */

    await supabase
      .from("orders")
      .update({
        shipment_id:
          shipmentId,

        awb_code:
          awbCode,

        courier_name:
          courierName,

        tracking_url:
          trackingUrl,

        estimated_delivery:
          estimatedDelivery,

        tracking_status:
          "packed",

        fulfillment_status:
          "packed",
      })
      .eq(
        "id",
        orderId
      );

    /* =====================================================
       RESPONSE
    ====================================================== */

    return NextResponse.json({
      success: true,
      shipmentId,
      awbCode,
      courierName,
      trackingUrl,
      estimatedDelivery,
      shipmentData,
    });

  } catch (error) {

    console.error(
      "CREATE SHIPMENT ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Shipment creation failed",
      },
      {
        status: 500,
      }
    );
  }
}