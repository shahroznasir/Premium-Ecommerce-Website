"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Script from "next/script";

import { useCartStore } from "@/stores/cart-store";

/* =========================================================
   RAZORPAY TYPES
========================================================== */

declare global {
  interface Window {
    Razorpay: new (
      options: RazorpayOptions
    ) => {
      open: () => void;
    };
  }
}

type RazorpayResponse = {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
};

type RazorpayOptions = {
  key: string | undefined;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;

  handler: (
    response: RazorpayResponse
  ) => Promise<void>;

  prefill: {
    name: string;
    email: string;
    contact: string;
  };

  theme: {
    color: string;
  };
};

export default function CheckoutPage() {

  const items =
    useCartStore(
      (state) => state.items
    );

  const clearCart =
    useCartStore(
      (state) => state.clearCart
    );

  const total =
    items.reduce(
      (acc, item) =>
        acc +
        item.price *
          item.quantity,
      0
    );

  const [loading, setLoading] =
    useState(false);

  const [
    paymentMethod,
    setPaymentMethod,
  ] = useState("card");

  const [customer, setCustomer] =
    useState({
      name: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      postalCode: "",
    });

  /* =========================================================
     HANDLE PAYMENT
  ========================================================== */

  async function handlePayment() {

    if (
      !customer.name ||
      !customer.email ||
      !customer.phone ||
      !customer.address ||
      !customer.city ||
      !customer.state ||
      !customer.postalCode
    ) {

      alert(
        "Please fill all checkout fields."
      );

      return;
    }

    if (items.length === 0) {

      alert(
        "Your cart is empty."
      );

      return;
    }

    try {

      setLoading(true);

      /* =====================================================
         CREATE ORDER
      ====================================================== */

      const orderRes =
        await fetch(
          "/api/create-order",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              amount: total,
            }),
          }
        );

      if (!orderRes.ok) {

        throw new Error(
          "Failed to create Razorpay order."
        );
      }

      const orderData =
        await orderRes.json();

      /* =====================================================
         RAZORPAY OPTIONS
      ====================================================== */

      const options: RazorpayOptions = {
        key:
          process.env
            .NEXT_PUBLIC_RAZORPAY_KEY_ID,

        amount:
          orderData.amount,

        currency: "INR",

        name:
          "The Decor Art Studio",

        description:
          "Luxury Collection Purchase",

        order_id:
          orderData.id,

        handler:
          async function (
            response: RazorpayResponse
          ) {

            try {

              /* =============================================
                 VERIFY PAYMENT
              ============================================== */

              const verifyRes =
                await fetch(
                  "/api/verify-payment",
                  {
                    method: "POST",

                    headers: {
                      "Content-Type":
                        "application/json",
                    },

                    body: JSON.stringify(
                      {
                        razorpay_order_id:
                          response.razorpay_order_id,

                        razorpay_payment_id:
                          response.razorpay_payment_id,

                        razorpay_signature:
                          response.razorpay_signature,

                        items,

                        total,

                        customer,

                        paymentMethod,
                      }
                    ),
                  }
                );

              const verifyData =
                await verifyRes.json();

              if (
                !verifyRes.ok ||
                !verifyData.success
              ) {

                throw new Error(
                  verifyData.message ||
                    "Payment verification failed."
                );
              }

              /* =============================================
                 CLEAR CART
              ============================================== */

              clearCart();

              /* =============================================
                 REDIRECT TO SUCCESS
              ============================================== */

              window.location.href =
                `/checkout/success?order=${verifyData.orderNumber}`;

            } catch (error) {

              console.error(
                error
              );

              alert(
                "Payment verification failed."
              );
            }
          },

        prefill: {
          name:
            customer.name,

          email:
            customer.email,

          contact:
            customer.phone,
        },

        theme: {
          color:
            "#B89B72",
        },
      };

      /* =====================================================
         OPEN RAZORPAY
      ====================================================== */

      const razorpay =
        new window.Razorpay(
          options
        );

      razorpay.open();

    } catch (error) {

      console.error(error);

      alert(
        "Something went wrong. Please try again."
      );

    } finally {

      setLoading(false);
    }
  }

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />

      <main className="relative min-h-screen overflow-hidden bg-[#050505] text-white">

        {/* BACKGROUND */}
        <div className="pointer-events-none fixed inset-0 overflow-hidden">

          <div className="absolute left-1/2 top-[-15%] h-[1200px] w-[1200px] -translate-x-1/2 rounded-full bg-[#B89B72]/[0.04] blur-[220px]" />

          <div className="absolute right-[-10%] top-[20%] h-[700px] w-[700px] rounded-full bg-[#B89B72]/[0.03] blur-[180px]" />

        </div>

        <div className="container-luxury relative z-10 py-24 md:py-32">

          {/* HEADER */}
          <motion.div
            initial={{
              opacity: 0,
              y: 40,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 1,
            }}
            className="mb-16 md:mb-20"
          >

            <p className="text-[10px] uppercase tracking-[0.45em] text-[#B89B72]/80">

              Secure Checkout

            </p>

            <h1 className="mt-6 text-4xl font-light leading-[0.9] tracking-[-0.08em] text-white sm:text-5xl md:text-[7rem]">

              Complete
              <br />
              Your
              <br />
              Experience

            </h1>

          </motion.div>

          {/* GRID */}
          <div className="grid gap-8 lg:grid-cols-[1fr_420px] lg:gap-10">

            {/* LEFT */}
            <motion.div
              initial={{
                opacity: 0,
                y: 40,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 1,
                delay: 0.1,
              }}
              className="space-y-6 md:space-y-8"
            >

              {/* CONTACT */}
              <LuxuryCard title="Contact Information">

                <LuxuryInput
                  placeholder="Full Name"
                  onChange={(e) =>
                    setCustomer({
                      ...customer,
                      name:
                        e.target.value,
                    })
                  }
                />

                <LuxuryInput
                  placeholder="Email Address"
                  type="email"
                  onChange={(e) =>
                    setCustomer({
                      ...customer,
                      email:
                        e.target.value,
                    })
                  }
                />

                <LuxuryInput
                  placeholder="Phone Number"
                  type="tel"
                  onChange={(e) =>
                    setCustomer({
                      ...customer,
                      phone:
                        e.target.value,
                    })
                  }
                />

              </LuxuryCard>

              {/* ADDRESS */}
              <LuxuryCard title="Delivery Address">

                <LuxuryInput
                  placeholder="Street Address"
                  onChange={(e) =>
                    setCustomer({
                      ...customer,
                      address:
                        e.target.value,
                    })
                  }
                />

                <div className="grid gap-4 md:grid-cols-3">

                  <LuxuryInput
                    placeholder="City"
                    onChange={(e) =>
                      setCustomer({
                        ...customer,
                        city:
                          e.target.value,
                      })
                    }
                  />

                  <LuxuryInput
                    placeholder="State"
                    onChange={(e) =>
                      setCustomer({
                        ...customer,
                        state:
                          e.target.value,
                      })
                    }
                  />

                  <LuxuryInput
                    placeholder="Postal Code"
                    onChange={(e) =>
                      setCustomer({
                        ...customer,
                        postalCode:
                          e.target.value,
                      })
                    }
                  />

                </div>

              </LuxuryCard>

              {/* PAYMENT */}
              <LuxuryCard title="Payment Method">

                <PaymentOption
                  label="Credit / Debit Card"
                  active={
                    paymentMethod ===
                    "card"
                  }
                  onClick={() =>
                    setPaymentMethod(
                      "card"
                    )
                  }
                />

                <PaymentOption
                  label="UPI Payment"
                  active={
                    paymentMethod ===
                    "upi"
                  }
                  onClick={() =>
                    setPaymentMethod(
                      "upi"
                    )
                  }
                />

                <PaymentOption
                  label="Net Banking"
                  active={
                    paymentMethod ===
                    "netbanking"
                  }
                  onClick={() =>
                    setPaymentMethod(
                      "netbanking"
                    )
                  }
                />

              </LuxuryCard>

            </motion.div>

            {/* RIGHT */}
            <motion.div
              initial={{
                opacity: 0,
                x: 40,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: 1,
                delay: 0.2,
              }}
            >

              <div className="sticky top-10 overflow-hidden rounded-[2.5rem] border border-white/[0.06] bg-white/[0.03] p-6 backdrop-blur-3xl md:p-8">

                <p className="text-[10px] uppercase tracking-[0.45em] text-[#B89B72]/80">

                  Order Summary

                </p>

                <div className="mt-8 space-y-6">

                  {items.map((item) => (

                    <OrderItem
                      key={item.id}
                      title={item.title}
                      quantity={
                        item.quantity
                      }
                      price={`₹${(
                        item.price *
                        item.quantity
                      ).toLocaleString("en-IN")}`}
                    />

                  ))}

                </div>

                <div className="my-8 h-px bg-white/[0.06]" />

                <div className="space-y-5">

                  <SummaryRow
                    label="Subtotal"
                    value={`₹${total.toLocaleString("en-IN")}`}
                  />

                  <SummaryRow
                    label="Luxury Handling"
                    value="Complimentary"
                  />

                  <SummaryRow
                    label="Shipping"
                    value="Complimentary"
                  />

                </div>

                <div className="mt-10 flex items-end justify-between">

                  <div>

                    <p className="text-[10px] uppercase tracking-[0.45em] text-white/35">

                      Total

                    </p>

                    <p className="mt-3 text-4xl font-light tracking-[-0.06em] text-white md:text-5xl">

                      ₹
                      {total.toLocaleString(
                        "en-IN"
                      )}

                    </p>

                  </div>

                </div>

                <button
                  onClick={
                    handlePayment
                  }
                  disabled={loading}
                  className="group relative mt-10 w-full overflow-hidden rounded-full bg-[#B89B72] py-5 text-xs uppercase tracking-[0.35em] text-black transition duration-700 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60 md:text-sm"
                >

                  <span className="relative z-10">

                    {loading
                      ? "Processing..."
                      : "Complete Purchase"}

                  </span>

                </button>

              </div>

            </motion.div>

          </div>

        </div>

      </main>
    </>
  );
}

/* =========================================================
   LUXURY CARD
========================================================== */

function LuxuryCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-[2rem] border border-white/[0.06] bg-white/[0.03] p-6 backdrop-blur-3xl md:rounded-[2.5rem] md:p-8">

      <p className="text-[10px] uppercase tracking-[0.45em] text-[#B89B72]/80">

        {title}

      </p>

      <div className="mt-8 space-y-5">

        {children}

      </div>

    </div>
  );
}

/* =========================================================
   INPUT
========================================================== */

function LuxuryInput({
  placeholder,
  type = "text",
  onChange,
}: {
  placeholder: string;
  type?: string;

  onChange?: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      className="h-14 w-full rounded-full border border-white/[0.06] bg-white/[0.03] px-5 text-sm tracking-[0.08em] text-white outline-none transition duration-500 placeholder:text-white/30 focus:border-[#B89B72]/40 md:h-16 md:px-6"
    />
  );
}

/* =========================================================
   PAYMENT OPTION
========================================================== */

function PaymentOption({
  label,
  active,
  onClick,
}: {
  label: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center justify-between rounded-full border px-5 py-4 transition duration-500 md:px-6 md:py-5 ${
        active
          ? "border-[#B89B72]/40 bg-[#B89B72]/10"
          : "border-white/[0.06] bg-white/[0.03]"
      }`}
    >

      <span className="text-xs tracking-[0.08em] text-white md:text-sm">

        {label}

      </span>

      <div
        className={`flex h-5 w-5 items-center justify-center rounded-full border ${
          active
            ? "border-[#B89B72]"
            : "border-white/20"
        }`}
      >

        <div
          className={`h-2.5 w-2.5 rounded-full ${
            active
              ? "bg-[#B89B72]"
              : "bg-transparent"
          }`}
        />

      </div>

    </button>
  );
}

/* =========================================================
   ORDER ITEM
========================================================== */

function OrderItem({
  title,
  quantity,
  price,
}: {
  title: string;
  quantity: number;
  price: string;
}) {
  return (
    <div className="flex items-start justify-between gap-5">

      <div>

        <p className="text-base font-light tracking-[-0.04em] text-white md:text-lg">

          {title}

        </p>

        <p className="mt-2 text-xs text-white/35 md:text-sm">

          Quantity: {quantity}

        </p>

      </div>

      <p className="text-base text-white/70 md:text-lg">

        {price}

      </p>

    </div>
  );
}

/* =========================================================
   SUMMARY ROW
========================================================== */

function SummaryRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between">

      <p className="text-sm text-white/40">

        {label}

      </p>

      <p className="text-sm text-white/70">

        {value}

      </p>

    </div>
  );
}