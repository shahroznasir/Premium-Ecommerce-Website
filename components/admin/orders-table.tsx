"use client";

import { useMemo, useState } from "react";

import Link from "next/link";

import Image from "next/image";

import {
  Eye,
  ArrowUpRight,
  Search,
} from "lucide-react";

import { motion } from "framer-motion";

import LuxurySkeleton from "@/components/ui/luxury-skeleton";

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
   STATUS COLORS
========================================================== */

const statusStyles: Record<
  string,
  string
> = {
  processing:
    "border-yellow-500/20 bg-yellow-500/10 text-yellow-200",

  packed:
    "border-blue-500/20 bg-blue-500/10 text-blue-200",

  shipped:
    "border-purple-500/20 bg-purple-500/10 text-purple-200",

  delivered:
    "border-emerald-500/20 bg-emerald-500/10 text-emerald-200",
};

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
     TEMP LOADING STATE
  ======================================================== */

  const loading = false;

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
    <div className="overflow-hidden rounded-[2.5rem] border border-white/[0.06] bg-white/[0.03] backdrop-blur-3xl">

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
          <div className="flex items-center gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.03] px-5 py-4 transition-all duration-500 focus-within:border-[#B89B72]/20">

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
                    className={`rounded-full border px-5 py-3 text-xs uppercase tracking-[0.3em] transition-all duration-500 ${
                      isActive
                        ? "border-[#B89B72]/30 bg-[#B89B72]/10 text-[#B89B72]"
                        : "border-white/[0.08] bg-white/[0.03] text-white hover:-translate-y-[2px] hover:border-[#B89B72]/20 hover:bg-[#B89B72]/10 hover:text-[#B89B72]"
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

            {loading ? (

              Array.from({
                length: 6,
              }).map((_, index) => (

                <tr
                  key={index}
                  className="border-b border-white/[0.04]"
                >

                  <td
                    colSpan={6}
                    className="px-6 py-6"
                  >

                    <LuxurySkeleton
                      showImage={false}
                      lines={2}
                      className="rounded-[2rem]"
                      contentClassName="px-6 py-6"
                    />

                  </td>

                </tr>

              ))

            ) : (

              filteredOrders.map(
                (
                  order,
                  index
                ) => {

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

                    <motion.tr
                      key={order.id}
                      initial={{
                        opacity: 0,
                        y: 20,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        duration: 0.45,
                        delay:
                          index * 0.03,
                      }}
                      className="group border-b border-white/[0.04] transition duration-500 hover:bg-white/[0.02]"
                    >

                      {/* ===================================================
                          ORDER
                      ==================================================== */}
                      <td className="px-8 py-6">

                        <div className="flex items-center gap-5">

                          <div className="relative h-20 w-20 overflow-hidden rounded-[1.4rem] border border-white/[0.05] bg-white/[0.03]">

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
                                className="object-cover transition duration-700 group-hover:scale-105"
                              />

                            )}

                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                          </div>

                          <div>

                            <p className="text-[10px] uppercase tracking-[0.32em] text-[#B89B72]/75">

                              Order Number

                            </p>

                            <h3 className="mt-3 text-lg font-light tracking-[-0.03em] text-white">

                              {
                                order.order_number
                              }

                            </h3>

                            <p className="mt-2 text-xs text-white/35">

                              {
                                firstItem?.title
                              }

                            </p>

                          </div>

                        </div>

                      </td>

                      {/* ===================================================
                          CUSTOMER
                      ==================================================== */}
                      <td className="px-8 py-6">

                        <div>

                          <p className="text-base font-light text-white">

                            {
                              order.customer_name
                            }

                          </p>

                          <p className="mt-2 text-sm text-white/38">

                            {order.email}

                          </p>

                        </div>

                      </td>

                      {/* ===================================================
                          TOTAL
                      ==================================================== */}
                      <td className="px-8 py-6">

                        <p className="text-xl font-light tracking-[-0.04em] text-white">

                          ₹
                          {order.total.toLocaleString(
                            "en-IN"
                          )}

                        </p>

                      </td>

                      {/* ===================================================
                          STATUS
                      ==================================================== */}
                      <td className="px-8 py-6">

                        <div
                          className={`inline-flex rounded-full border px-5 py-3 text-[10px] uppercase tracking-[0.32em] ${
                            statusStyles[
                              order.fulfillment_status
                            ] ||
                            "border-white/[0.08] bg-white/[0.03] text-white"
                          }`}
                        >

                          {
                            order.fulfillment_status
                          }

                        </div>

                      </td>

                      {/* ===================================================
                          DATE
                      ==================================================== */}
                      <td className="px-8 py-6">

                        <p className="text-sm text-white/50">

                          {new Date(
                            order.created_at
                          ).toLocaleDateString(
                            "en-IN",
                            {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            }
                          )}

                        </p>

                      </td>

                      {/* ===================================================
                          ACTION
                      ==================================================== */}
                      <td className="px-8 py-6">

                        <Link
                          href={`/admin/orders/${order.id}`}
                          className="group/button inline-flex items-center gap-3 rounded-full border border-white/[0.08] bg-white/[0.03] px-5 py-3 text-[10px] uppercase tracking-[0.3em] text-white transition-all duration-500 hover:border-[#B89B72]/30 hover:bg-[#B89B72]/10 hover:text-[#B89B72]"
                        >

                          <Eye
                            size={14}
                          />

                          View

                          <ArrowUpRight
                            size={14}
                            className="transition-transform duration-500 group-hover/button:translate-x-[2px] group-hover/button:-translate-y-[2px]"
                          />

                        </Link>

                      </td>

                    </motion.tr>

                  );
                }
              )

            )}

          </tbody>

        </table>

      </div>

      {/* ===================================================
          EMPTY STATE
      ==================================================== */}
      {!loading &&
        filteredOrders.length === 0 && (

        <div className="px-8 py-24 text-center">

          <p className="text-[10px] uppercase tracking-[0.42em] text-[#B89B72]/70">

            No Results

          </p>

          <h3 className="mt-6 text-3xl font-light tracking-[-0.05em] text-white">

            No Matching Orders Found

          </h3>

          <p className="mx-auto mt-6 max-w-md text-sm leading-8 text-white/40">

            Try adjusting your search
            terms or fulfillment filters
            to locate the desired orders.

          </p>

        </div>

      )}

    </div>
  );
}