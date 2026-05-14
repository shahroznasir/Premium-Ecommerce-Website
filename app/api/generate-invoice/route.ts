export const runtime = "nodejs";

import {
  PDFDocument,
  rgb,
  StandardFonts,
} from "pdf-lib";

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
   GENERATE INVOICE
========================================================== */

export async function GET(
  request: Request
) {

  try {

    const {
      searchParams,
    } = new URL(
      request.url
    );

    const orderId =
      searchParams.get(
        "orderId"
      );

    if (!orderId) {

      return Response.json(
        {
          success: false,
          message:
            "Missing order ID",
        },
        {
          status: 400,
        }
      );
    }

    /* =====================================================
       FETCH ORDER
    ====================================================== */

    const {
      data: order,
      error,
    } = await supabase
      .from("orders")
      .select("*")
      .eq("id", orderId)
      .single();

    if (
      error ||
      !order
    ) {

      console.error(error);

      return Response.json(
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
       SAFE PARSE ITEMS
    ====================================================== */

    let items = [];

    try {

      items =
        typeof order.items ===
        "string"
          ? JSON.parse(
              order.items
            )
          : order.items || [];

    } catch (parseError) {

      console.error(
        "Items parse error:",
        parseError
      );

      items = [];
    }

    /* =====================================================
       CREATE PDF
    ====================================================== */

    const pdfDoc =
      await PDFDocument.create();

    const page =
      pdfDoc.addPage([
        700,
        900,
      ]);

    const {
      width,
      height,
    } = page.getSize();

    const font =
      await pdfDoc.embedFont(
        StandardFonts.Helvetica
      );

    const boldFont =
      await pdfDoc.embedFont(
        StandardFonts.HelveticaBold
      );

    /* =====================================================
       BACKGROUND
    ====================================================== */

    page.drawRectangle({
      x: 0,
      y: 0,
      width,
      height,
      color: rgb(
        0.02,
        0.02,
        0.02
      ),
    });

    /* =====================================================
       HEADER
    ====================================================== */

    page.drawText(
      "THE DECOR ART STUDIO",
      {
        x: 50,
        y: 830,
        size: 24,
        font: boldFont,
        color: rgb(
          0.72,
          0.61,
          0.45
        ),
      }
    );

    page.drawText(
      "Luxury Commerce Invoice",
      {
        x: 50,
        y: 800,
        size: 12,
        font,
        color: rgb(
          0.8,
          0.8,
          0.8
        ),
      }
    );

    /* =====================================================
       ORDER DETAILS
    ====================================================== */

    page.drawText(
      `Invoice #: ${order.order_number || "N/A"}`,
      {
        x: 50,
        y: 740,
        size: 14,
        font: boldFont,
        color: rgb(1, 1, 1),
      }
    );

    page.drawText(
      `Payment ID: ${order.payment_id || "N/A"}`,
      {
        x: 50,
        y: 715,
        size: 12,
        font,
        color: rgb(
          0.8,
          0.8,
          0.8
        ),
      }
    );

    page.drawText(
      `Date: ${new Date(
        order.created_at
      ).toLocaleDateString(
        "en-IN"
      )}`,
      {
        x: 50,
        y: 690,
        size: 12,
        font,
        color: rgb(
          0.8,
          0.8,
          0.8
        ),
      }
    );

    /* =====================================================
       CUSTOMER
    ====================================================== */

    page.drawText(
      "Customer Information",
      {
        x: 50,
        y: 640,
        size: 16,
        font: boldFont,
        color: rgb(
          0.72,
          0.61,
          0.45
        ),
      }
    );

    const customerInfo = [
      order.customer_name || "",
      order.email || "",
      order.phone || "",
      `${order.address || ""}, ${order.city || ""}`,
      `${order.state || ""} - ${order.postal_code || ""}`,
    ];

    let customerY =
      610;

    customerInfo.forEach(
      (line: string) => {

        page.drawText(
          line,
          {
            x: 50,
            y: customerY,
            size: 12,
            font,
            color: rgb(
              1,
              1,
              1
            ),
          }
        );

        customerY -= 24;
      }
    );

    /* =====================================================
       PRODUCTS
    ====================================================== */

    page.drawText(
      "Purchased Products",
      {
        x: 50,
        y: 470,
        size: 16,
        font: boldFont,
        color: rgb(
          0.72,
          0.61,
          0.45
        ),
      }
    );

    let itemY =
      430;

    items.forEach(
      (
        item: {
          title?: string;
          quantity?: number;
          price?: number;
        }
      ) => {

        page.drawText(
          item.title || "Product",
          {
            x: 50,
            y: itemY,
            size: 13,
            font: boldFont,
            color: rgb(
              1,
              1,
              1
            ),
          }
        );

        page.drawText(
          `Qty: ${item.quantity || 1}`,
          {
            x: 400,
            y: itemY,
            size: 12,
            font,
            color: rgb(
              0.8,
              0.8,
              0.8
            ),
          }
        );

        page.drawText(
          `Rs. ${(
            (item.price || 0) *
            (item.quantity || 1)
          ).toLocaleString(
            "en-IN"
          )}`,
          {
            x: 520,
            y: itemY,
            size: 12,
            font: boldFont,
            color: rgb(
              1,
              1,
              1
            ),
          }
        );

        itemY -= 35;
      }
    );

    /* =====================================================
       TOTAL
    ====================================================== */

    page.drawLine({
      start: {
        x: 50,
        y: itemY - 10,
      },
      end: {
        x: 650,
        y: itemY - 10,
      },
      thickness: 1,
      color: rgb(
        0.3,
        0.3,
        0.3
      ),
    });

    page.drawText(
      `Total Paid: Rs. ${Number(
        order.total || 0
      ).toLocaleString(
        "en-IN"
      )}`,
      {
        x: 50,
        y: itemY - 50,
        size: 20,
        font: boldFont,
        color: rgb(
          0.72,
          0.61,
          0.45
        ),
      }
    );

    /* =====================================================
       FOOTER
    ====================================================== */

    page.drawText(
      "Thank you for choosing The Decor Art Studio.",
      {
        x: 50,
        y: 80,
        size: 12,
        font,
        color: rgb(
          0.7,
          0.7,
          0.7
        ),
      }
    );

    page.drawText(
      "Luxury Crafted. Cinematically Curated.",
      {
        x: 50,
        y: 55,
        size: 11,
        font,
        color: rgb(
          0.72,
          0.61,
          0.45
        ),
      }
    );

    /* =====================================================
       SAVE PDF
    ====================================================== */

    const pdfBytes =
      await pdfDoc.save();

    return new Response(
      new Uint8Array(
        pdfBytes
      ),
      {
        headers: {
          "Content-Type":
            "application/pdf",

          "Content-Disposition":
            `attachment; filename="Invoice-${order.order_number}.pdf"`,
        },
      }
    );

  } catch (error) {

    console.error(
      "Invoice generation error:",
      error
    );

    return Response.json(
      {
        success: false,
        message:
          "Failed to generate invoice",
      },
      {
        status: 500,
      }
    );
  }
}