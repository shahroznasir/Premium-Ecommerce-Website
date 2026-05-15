type Order = {
  id: string;
  order_number: string;
  fulfillment_status?: string;
  customer_name?: string;
  total?: number;
  created_at?: string;
};

export default function LiveActivityFeed({
  orders,
}: {
  orders: Order[];
}) {

  const latestOrders =
    orders.slice(0, 8);

  return (
    <div className="overflow-hidden rounded-[2rem] border border-white/[0.06] bg-white/[0.03] p-8 backdrop-blur-3xl">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-[10px] uppercase tracking-[0.45em] text-[#B89B72]/80">

            Realtime Operations

          </p>

          <h2 className="mt-4 text-3xl font-light tracking-[-0.05em] text-white">

            Live Activity Feed

          </h2>

        </div>

        <div className="flex items-center gap-3 rounded-full border border-[#B89B72]/20 bg-[#B89B72]/10 px-5 py-3">

          <div className="h-2 w-2 rounded-full bg-[#B89B72] animate-pulse" />

          <span className="text-xs uppercase tracking-[0.3em] text-[#B89B72]">

            Live

          </span>

        </div>

      </div>

      <div className="mt-12 space-y-6">

        {latestOrders.map(
          (order) => (

            <div
              key={order.id}
              className="flex items-start justify-between rounded-[1.5rem] border border-white/[0.06] bg-white/[0.02] p-5"
            >

              <div>

                <p className="text-sm uppercase tracking-[0.25em] text-[#B89B72]">

                  {
                    order.fulfillment_status ||
                    "processing"
                  }

                </p>

                <h3 className="mt-3 text-lg font-light text-white">

                  {
                    order.order_number
                  }

                </h3>

                <p className="mt-2 text-sm text-white/40">

                  {
                    order.customer_name ||
                    "Luxury Client"
                  }

                </p>

              </div>

              <div className="text-right">

                <p className="text-lg font-light text-white">

                  ₹
                  {Number(
                    order.total || 0
                  ).toLocaleString(
                    "en-IN"
                  )}

                </p>

                <p className="mt-2 text-xs uppercase tracking-[0.25em] text-white/35">

                  {new Date(
                    order.created_at ||
                      ""
                  ).toLocaleDateString(
                    "en-IN",
                    {
                      day: "numeric",
                      month: "short",
                    }
                  )}

                </p>

              </div>

            </div>

          )
        )}

      </div>

    </div>
  );
}