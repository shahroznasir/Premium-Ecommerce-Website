"use client";

import React from "react";
import clsx from "clsx";

type SkeletonProps = {
  className?: string;
  width?: string | number;
  height?: string | number;
  circle?: boolean;
};

export default function Skeleton({
  className,
  width,
  height,
  circle = false,
}: SkeletonProps) {
  return (
    <div
      className={clsx(
        "animate-pulse bg-white/5 dark:bg-gray-800",
        circle ? "rounded-full" : "rounded-xl",
        className
      )}
      style={{
        width,
        height,
      }}
    />
  );
}