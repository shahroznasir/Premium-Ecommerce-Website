"use client";

import { useEffect } from "react";

import { useRecentlyViewed } from "@/stores/recently-viewed";

interface TrackProductProps {
  product: {
    id: string;
    title: string;
    slug: string;
    image: string;
    price: number;
    category: string;
  };
}

export default function TrackProduct({
  product,
}: TrackProductProps) {
  const { addProduct } =
    useRecentlyViewed();

  useEffect(() => {
    addProduct(product);
  }, []);

  return null;
}