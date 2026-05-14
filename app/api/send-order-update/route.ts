import { NextResponse } from "next/server";

import { Resend } from "resend";

/* =========================================================
   RESEND
========================================================== */

const resend =
  new Resend(
    process.env.RESEND_API_KEY
  );

/* =========================================================
   ROUTE
========================================================== */

export async function POST(
  request: Request
) {

  try {

    const body =
      await request.json();

    const {
      email,
      orderNumber,
      trackingStatus,
    } = body;

    /* =====================================================
       FORMAT STATUS
    ====================================================== */

    const formattedStatus =
      trackingStatus
        .replaceAll(
          "_",
          " "
        )
        .toUpperCase();

    /* =====================================================
       FALLBACK ORDER NUMBER
    ====================================================== */

    const finalOrderNumber =
      orderNumber ||
      "TDAS-LUXURY-ORDER";

    /* =====================================================
       SEND EMAIL
    ====================================================== */

    await resend.emails.send({

      from:
        "The Decor Art Studio <orders@thedecorartstudio.in>",

      to: email,

      subject:
        `Order ${formattedStatus} • The Decor Art Studio`,

      html: `
        <div
          style="
            background:#050505;
            padding:60px 20px;
            font-family:Arial,sans-serif;
            color:white;
          "
        >

          <div
            style="
              max-width:680px;
              margin:auto;
              background:#0B0B0B;
              border:1px solid rgba(255,255,255,0.06);
              border-radius:36px;
              overflow:hidden;
            "
          >

            <!-- TOP SECTION -->
            <div
              style="
                padding:60px;
              "
            >

              <p
                style="
                  font-size:11px;
                  letter-spacing:0.45em;
                  text-transform:uppercase;
                  color:#B89B72;
                  margin:0;
                "
              >
                THE DECOR ART STUDIO
              </p>

              <h1
                style="
                  font-size:56px;
                  line-height:1.05;
                  font-weight:300;
                  margin-top:32px;
                  margin-bottom:0;
                  color:white;
                "
              >
                Your Order Is
                <br />
                ${formattedStatus}
              </h1>

              <p
                style="
                  margin-top:32px;
                  font-size:16px;
                  line-height:1.9;
                  color:rgba(255,255,255,0.65);
                "
              >
                Your luxury order journey has been updated.
                You can track your live order progress inside your private client dashboard.
              </p>

              <!-- ORDER BOX -->
              <div
                style="
                  margin-top:48px;
                  padding:32px;
                  border-radius:28px;
                  background:#111111;
                  border:1px solid rgba(255,255,255,0.06);
                "
              >

                <p
                  style="
                    margin:0;
                    font-size:11px;
                    letter-spacing:0.35em;
                    text-transform:uppercase;
                    color:#B89B72;
                  "
                >
                  ORDER REFERENCE
                </p>

                <p
                  style="
                    margin-top:18px;
                    margin-bottom:0;
                    font-size:18px;
                    line-height:1.8;
                    color:white;
                    word-break:break-word;
                  "
                >
                  ${finalOrderNumber}
                </p>

              </div>

              <!-- STATUS BOX -->
              <div
                style="
                  margin-top:24px;
                  padding:32px;
                  border-radius:28px;
                  background:#111111;
                  border:1px solid rgba(255,255,255,0.06);
                "
              >

                <p
                  style="
                    margin:0;
                    font-size:11px;
                    letter-spacing:0.35em;
                    text-transform:uppercase;
                    color:#B89B72;
                  "
                >
                  CURRENT STATUS
                </p>

                <p
                  style="
                    margin-top:18px;
                    margin-bottom:0;
                    font-size:24px;
                    line-height:1.4;
                    color:white;
                    text-transform:capitalize;
                  "
                >
                  ${trackingStatus.replaceAll("_", " ")}
                </p>

              </div>

              <!-- BUTTON -->
              <div
                style="
                  margin-top:50px;
                "
              >

                <a
                  href="https://thedecorartstudio.in/account"
                  style="
                    display:inline-block;
                    padding:18px 34px;
                    border-radius:999px;
                    background:#B89B72;
                    color:black;
                    text-decoration:none;
                    font-size:12px;
                    letter-spacing:0.3em;
                    text-transform:uppercase;
                    font-weight:700;
                  "
                >
                  View Order
                </a>

              </div>

            </div>

          </div>

        </div>
      `,
    });

    /* =====================================================
       RESPONSE
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
      },
      {
        status: 500,
      }
    );
  }
}