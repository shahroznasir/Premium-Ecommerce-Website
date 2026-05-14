"use client";

import { useMemo, useState } from "react";

import Link from "next/link";

import Image from "next/image";

import {
  Eye,
  ArrowUpRight,
  Search,
} from "lucide-react";

/* =========================================================
   TYPES
========================================================== */

type OrderItem = {
  id?: string;
  title?: string;
  image?: string;
  quantity?: number;
  price?: number;
};

type Order = {
  id: string;
  order_number: string;
  payment_id: string;
  customer_name: string;
  email: string;
  total: number;
  fulfillment_status: string;
  created_at: string;

  items:
    | OrderItem[]
    | string;
};

/* =========================================================
   STATUS FILTERS
========================================================== */

const filters = [
  "all",
  "processing",
  "packed",
  "shipped",
  "delivered",
];

/* =========================================================
   ORDERS TABLE
========================================================== */

export default function OrdersTable({
  orders,
}: {
  orders: Order[];
}) {

  const [
    search,
    setSearch,
  ] = useState("");

  const [
    activeFilter,
    setActiveFilter,
  ] = useState("all");

  /* =======================================================
     FILTERED ORDERS
  ======================================================== */

  const filteredOrders =
    useMemo(() => {

      return orders.filter(
        (order) => {

          const matchesSearch =
            order.order_number
              ?.toLowerCase()
              .includes(
                search.toLowerCase()
              ) ||

            order.customer_name
              ?.toLowerCase()
              .includes(
                search.toLowerCase()
              ) ||

            order.email
              ?.toLowerCase()
              .includes(
                search.toLowerCase()
              );

          const matchesFilter =
            activeFilter ===
              "all" ||
            order.fulfillment_status ===
              activeFilter;

          return (
            matchesSearch &&
            matchesFilter
          );
        }
      );
    }, [
      orders,
      search,
      activeFilter,
    ]);

  return (
    <div className="overflow-hidden rounded-[2rem] border border-white/[0.06] bg-white/[0.03] backdrop-blur-3xl">

      {/* ===================================================
          HEADER
      ==================================================== */}
      <div className="border-b border-white/[0.06] px-6 py-8 md:px-8">

        <div className="flex flex-col gap-6">

          {/* TOP */}
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">

            <div>

              <p className="text-[10px] uppercase tracking-[0.45em] text-[#B89B72]/80">

                Order Operations

              </p>

              <h2 className="mt-4 text-2xl font-light tracking-[-0.05em] text-white">

                Search & Fulfillment Control

              </h2>

            </div>

          </div>

          {/* SEARCH */}
          <div className="flex items-center gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.03] px-5 py-4">

            <Search
              size={18}
              className="text-[#B89B72]"
            />

            <input
              type="text"
              placeholder="Search order number, customer, email..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/25"
            />

          </div>

          {/* FILTERS */}
          <div className="flex flex-wrap gap-3">

            {filters.map(
              (filter) => {

                const isActive =
                  activeFilter ===
                  filter;

                return (

                  <button
                    key={filter}
                    onClick={() =>
                      setActiveFilter(
                        filter
                      )
                    }
                    className={`rounded-full border px-5 py-3 text-xs uppercase tracking-[0.3em] transition duration-500 ${
                      isActive
                        ? "border-[#B89B72]/30 bg-[#B89B72]/10 text-[#B89B72]"
                        : "border-white/[0.08] bg-white/[0.03] text-white hover:border-[#B89B72]/20 hover:bg-[#B89B72]/10 hover:text-[#B89B72]"
                    }`}
                  >

                    {filter}

                  </button>

                );
              }
            )}

          </div>

        </div>

      </div>

      {/* ===================================================
          TABLE
      ==================================================== */}
      <div className="overflow-x-auto">

        <table className="w-full min-w-[1200px]">

          <thead>

            <tr className="border-b border-white/[0.06] text-left">

              <th className="px-8 py-5 text-[10px] font-medium uppercase tracking-[0.35em] text-white/35">

                Order

              </th>

              <th className="px-8 py-5 text-[10px] font-medium uppercase tracking-[0.35em] text-white/35">

                Customer

              </th>

              <th className="px-8 py-5 text-[10px] font-medium uppercase tracking-[0.35em] text-white/35">

                Total

              </th>

              <th className="px-8 py-5 text-[10px] font-medium uppercase tracking-[0.35em] text-white/35">

                Status

              </th>

              <th className="px-8 py-5 text-[10px] font-medium uppercase tracking-[0.35em] text-white/35">

                Date

              </th>

              <th className="px-8 py-5 text-[10px] font-medium uppercase tracking-[0.35em] text-white/35">

                Action

              </th>

            </tr>

          </thead>

          <tbody>

            {filteredOrders.map(
              (order) => {

                const parsedItems: OrderItem[] =
                  typeof order.items ===
                  "string"
                    ? JSON.parse(
                        order.items
                      )
                    : order.items || [];

                const firstItem =
                  parsedItems[0];

                return (

                  <tr
                    key={order.id}
                    className="group border-b border-white/[0.04] transition duration-300 hover:bg-white/[0.02]"
                  >

                    {/* ORDER */}
                    <td className="px-8 py-6">

                      <div className="flex items-center gap-5">

                        {/* PRODUCT IMAGE */}
                        <div className="relative h-20 w-20 overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03]">

                          {firstItem?.image && (

                            <Image
                              src={
                                firstItem.image
                              }
                              alt={
                                firstItem.title ||
                                "Product"
                              }
                              fill
                              className="object-cover"
                            />

                          )}

                        </div>

                        {/* ORDER INFO */}
                        <div>

                          <p className="text-sm tracking-[0.08em] text-white">

                            {
                              order.order_number
                            }

                          </p>

                          <p className="mt-2 text-xs text-white/35">

                            {
                              firstItem?.title ||
                              "Luxury Product"
                            }

                          </p>

                          <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-[#B89B72]/20 bg-[#B89B72]/10 px-3 py-1">

                            <span className="text-[10px] uppercase tracking-[0.25em] text-[#B89B72]">

                              {
                                parsedItems.length
                              }
                              {" "}
                              Item
                              {parsedItems.length >
                              1
                                ? "s"
                                : ""}

                            </span>

                          </div>

                        </div>

                      </div>

                    </td>

                    {/* CUSTOMER */}
                    <td className="px-8 py-6">

                      <div>

                        <p className="text-sm text-white">

                          {
                            order.customer_name
                          }

                        </p>

                        <p className="mt-2 text-xs text-white/35">

                          {
                            order.email
                          }

                        </p>

                      </div>

                    </td>

                    {/* TOTAL */}
                    <td className="px-8 py-6 text-sm text-white">

                      Rs.
                      {" "}
                      {Number(
                        order.total
                      ).toLocaleString(
                        "en-IN"
                      )}

                    </td>

                    {/* STATUS */}
                    <td className="px-8 py-6">

                      <div className="inline-flex items-center gap-2 rounded-full border border-[#B89B72]/20 bg-[#B89B72]/10 px-4 py-2">

                        <div className="h-2 w-2 rounded-full bg-[#B89B72]" />

                        <span className="text-xs uppercase tracking-[0.25em] text-[#B89B72]">

                          {
                            order.fulfillment_status ||
                            "processing"
                          }

                        </span>

                      </div>

                    </td>

                    {/* DATE */}
                    <td className="px-8 py-6 text-sm text-white/55">

                      {new Date(
                        order.created_at
                      ).toLocaleDateString(
                        "en-IN",
                        {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        }
                      )}

                    </td>

                    {/* ACTION */}
                    <td className="px-8 py-6">

                      <Link
                        href={`/admin/orders/${order.id}`}
                      >

                        <button className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-5 py-3 text-xs uppercase tracking-[0.25em] text-white transition duration-500 hover:border-[#B89B72]/30 hover:bg-[#B89B72]/10 hover:text-[#B89B72]">

                          <Eye
                            size={14}
                          />

                          View

                          <ArrowUpRight
                            size={14}
                          />

                        </button>

                      </Link>

                    </td>

                  </tr>

                );
              }
            )}

          </tbody>

        </table>

      </div>

      {/* ===================================================
          EMPTY STATE
      ==================================================== */}
      {filteredOrders.length === 0 && (

        <div className="px-8 py-20 text-center">

          <p className="text-lg font-light text-white/60">

            No matching orders found.

          </p>

        </div>

      )}

    </div>
  );
}