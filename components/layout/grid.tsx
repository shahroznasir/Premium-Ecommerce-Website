import clsx from "clsx";
import { ReactNode } from "react";

interface GridProps {
  children: ReactNode;
  className?: string;

  variant?: "default" | "editorial" | "immersive";
}

export default function Grid({
  children,
  className,
  variant = "default",
}: GridProps) {

  const variants = {
    default:
      "grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16",

    editorial:
      "grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-14 lg:gap-24 items-center",

    immersive:
      "grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-12 lg:gap-28 items-center",
  };

  return (
    <div
      className={clsx(
        variants[variant],
        className
      )}
    >
      {children}
    </div>
  );
}