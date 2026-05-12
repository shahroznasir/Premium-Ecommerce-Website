import Razorpay from "razorpay";

import { NextResponse } from "next/server";

const razorpay = new Razorpay({
  key_id:
    process.env
      .NEXT_PUBLIC_RAZORPAY_KEY_ID!,
  key_secret:
    process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(
  request: Request
) {
  try {
    const body = await request.json();

    const { amount } = body;

    const order =
      await razorpay.orders.create({
        amount: amount * 100,
        currency: "INR",
      });

    return NextResponse.json(order);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          "Failed to create order",
      },
      {
        status: 500,
      }
    );
  }
}