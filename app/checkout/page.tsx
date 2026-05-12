"use client";

import { motion } from "framer-motion";

export default function CheckoutPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050505] text-white">

      {/* ================= ATMOSPHERE ================= */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">

        {/* Main Glow */}
        <div className="absolute left-1/2 top-[-15%] h-[1200px] w-[1200px] -translate-x-1/2 rounded-full bg-[#B89B72]/[0.04] blur-[220px]" />

        {/* Right Glow */}
        <div className="absolute right-[-10%] top-[20%] h-[700px] w-[700px] rounded-full bg-[#B89B72]/[0.03] blur-[180px]" />

      </div>

      <div className="container-luxury relative z-10 py-32">

        {/* ================= HEADER ================= */}
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
          className="mb-20"
        >

          {/* Label */}
          <p className="text-[10px] uppercase tracking-[0.45em] text-[#B89B72]/80">

            Secure Checkout

          </p>

          {/* Title */}
          <h1 className="mt-6 text-5xl font-light leading-[0.88] tracking-[-0.08em] text-white md:text-[7rem]">

            Complete
            <br />
            Your
            <br />
            Experience

          </h1>

        </motion.div>

        {/* ================= GRID ================= */}
        <div className="grid gap-10 lg:grid-cols-[1fr_420px]">

          {/* ================= LEFT ================= */}
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
            className="space-y-8"
          >

            {/* Contact */}
            <LuxuryCard
              title="Contact Information"
            >

              <LuxuryInput
                placeholder="Full Name"
              />

              <LuxuryInput
                placeholder="Email Address"
              />

              <LuxuryInput
                placeholder="Phone Number"
              />

            </LuxuryCard>

            {/* Delivery */}
            <LuxuryCard
              title="Delivery Address"
            >

              <LuxuryInput
                placeholder="Street Address"
              />

              <LuxuryInput
                placeholder="Apartment / Suite"
              />

              <div className="grid gap-4 md:grid-cols-2">

                <LuxuryInput
                  placeholder="City"
                />

                <LuxuryInput
                  placeholder="Postal Code"
                />

              </div>

            </LuxuryCard>

            {/* Payment */}
            <LuxuryCard
              title="Payment Method"
            >

              <PaymentOption
                active
                label="Credit / Debit Card"
              />

              <PaymentOption
                label="UPI Payment"
              />

              <PaymentOption
                label="Net Banking"
              />

            </LuxuryCard>

          </motion.div>

          {/* ================= RIGHT ================= */}
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

            <div className="sticky top-10 overflow-hidden rounded-[2.5rem] border border-white/[0.06] bg-white/[0.03] p-8 backdrop-blur-3xl">

              {/* Glow */}
              <div className="pointer-events-none absolute right-[-20%] top-[-10%] h-[300px] w-[300px] rounded-full bg-[#B89B72]/10 blur-[120px]" />

              {/* Label */}
              <p className="relative text-[10px] uppercase tracking-[0.45em] text-[#B89B72]/80">

                Order Summary

              </p>

              {/* Items */}
              <div className="relative mt-10 space-y-6">

                <OrderItem
                  title="Aurelius Wall Clock"
                  price="₹1,24,999"
                />

                <OrderItem
                  title="Architectural Lamp"
                  price="₹84,999"
                />

              </div>

              {/* Divider */}
              <div className="relative my-10 h-px bg-white/[0.06]" />

              {/* Totals */}
              <div className="relative space-y-5">

                <SummaryRow
                  label="Subtotal"
                  value="₹2,09,998"
                />

                <SummaryRow
                  label="Luxury Handling"
                  value="₹2,000"
                />

                <SummaryRow
                  label="Shipping"
                  value="Complimentary"
                />

              </div>

              {/* Total */}
              <div className="relative mt-10 flex items-end justify-between">

                <div>

                  <p className="text-[10px] uppercase tracking-[0.45em] text-white/35">

                    Total

                  </p>

                  <p className="mt-3 text-5xl font-light tracking-[-0.06em] text-white">

                    ₹2,11,998

                  </p>

                </div>

              </div>

              {/* CTA */}
              <button className="group relative mt-10 w-full overflow-hidden rounded-full bg-[#B89B72] py-5 text-sm uppercase tracking-[0.35em] text-black transition duration-700 hover:scale-[1.02]">

                {/* Sweep */}
                <div className="absolute inset-y-0 left-[-30%] w-[30%] rotate-12 bg-white/30 blur-2xl transition duration-1000 group-hover:left-[120%]" />

                <span className="relative z-10">

                  Complete Purchase

                </span>

              </button>

            </div>

          </motion.div>

        </div>

      </div>

    </main>
  );
}

/* ================= LUXURY CARD ================= */

function LuxuryCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-[2.5rem] border border-white/[0.06] bg-white/[0.03] p-8 backdrop-blur-3xl">

      <p className="text-[10px] uppercase tracking-[0.45em] text-[#B89B72]/80">

        {title}

      </p>

      <div className="mt-8 space-y-5">

        {children}

      </div>

    </div>
  );
}

/* ================= INPUT ================= */

function LuxuryInput({
  placeholder,
}: {
  placeholder: string;
}) {
  return (
    <input
      placeholder={placeholder}
      className="h-16 w-full rounded-full border border-white/[0.06] bg-white/[0.03] px-6 text-sm tracking-[0.08em] text-white outline-none transition duration-500 placeholder:text-white/30 focus:border-[#B89B72]/40"
    />
  );
}

/* ================= PAYMENT ================= */

function PaymentOption({
  label,
  active,
}: {
  label: string;
  active?: boolean;
}) {
  return (
    <button
      className={`flex w-full items-center justify-between rounded-full border px-6 py-5 transition duration-500 ${
        active
          ? "border-[#B89B72]/40 bg-[#B89B72]/10"
          : "border-white/[0.06] bg-white/[0.03]"
      }`}
    >

      <span className="text-sm tracking-[0.08em] text-white">

        {label}

      </span>

      <div
        className={`h-4 w-4 rounded-full border ${
          active
            ? "border-[#B89B72] bg-[#B89B72]"
            : "border-white/20"
        }`}
      />

    </button>
  );
}

/* ================= ORDER ITEM ================= */

function OrderItem({
  title,
  price,
}: {
  title: string;
  price: string;
}) {
  return (
    <div className="flex items-center justify-between">

      <div>

        <p className="text-lg font-light tracking-[-0.04em] text-white">

          {title}

        </p>

        <p className="mt-2 text-sm text-white/35">

          Sculptural luxury object

        </p>

      </div>

      <p className="text-lg text-white/70">

        {price}

      </p>

    </div>
  );
}

/* ================= SUMMARY ROW ================= */

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