"use client";

type Props = {
  processing: number;
  packed: number;
  shipped: number;
  delivered: number;
};

export default function FulfillmentFunnel({
  processing,
  packed,
  shipped,
  delivered,
}: Props) {

  const total =
    processing +
    packed +
    shipped +
    delivered;

  const steps = [
    {
      label: "Processing",
      value: processing,
    },
    {
      label: "Packed",
      value: packed,
    },
    {
      label: "Shipped",
      value: shipped,
    },
    {
      label: "Delivered",
      value: delivered,
    },
  ];

  return (
    <div className="overflow-hidden rounded-[2rem] border border-white/[0.06] bg-white/[0.03] p-8 backdrop-blur-3xl">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-[10px] uppercase tracking-[0.45em] text-[#B89B72]/80">

            Fulfillment Intelligence

          </p>

          <h2 className="mt-4 text-3xl font-light tracking-[-0.05em] text-white">

            Logistics Funnel

          </h2>

        </div>

        <div className="rounded-full border border-[#B89B72]/20 bg-[#B89B72]/10 px-5 py-3">

          <span className="text-xs uppercase tracking-[0.3em] text-[#B89B72]">

            {total} Orders

          </span>

        </div>

      </div>

      <div className="mt-12 space-y-8">

        {steps.map(
          (step) => {

            const percentage =
              total > 0
                ? (
                    (step.value /
                      total) *
                    100
                  ).toFixed(0)
                : 0;

            return (

              <div key={step.label}>

                <div className="flex items-center justify-between">

                  <p className="text-sm uppercase tracking-[0.3em] text-white/70">

                    {step.label}

                  </p>

                  <p className="text-sm text-white/40">

                    {step.value}
                    {" "}
                    (
                    {percentage}
                    %)

                  </p>

                </div>

                <div className="mt-4 h-3 overflow-hidden rounded-full bg-white/[0.06]">

                  <div
                    className="h-full rounded-full bg-[#B89B72] transition-all duration-1000"
                    style={{
                      width: `${percentage}%`,
                    }}
                  />

                </div>

              </div>

            );
          }
        )}

      </div>

    </div>
  );
}