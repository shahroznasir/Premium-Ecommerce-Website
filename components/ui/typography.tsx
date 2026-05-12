import clsx from "clsx";
import { ReactNode } from "react";

interface TypographyProps {
  children: ReactNode;
  className?: string;
}

export function Display({
  children,
  className,
}: TypographyProps) {
  return (
    <h1
      className={clsx(
        "font-light tracking-[-0.04em] leading-[0.9] text-white",
        "text-5xl sm:text-6xl md:text-7xl lg:text-8xl",
        className
      )}
    >
      {children}
    </h1>
  );
}

export function Heading({
  children,
  className,
}: TypographyProps) {
  return (
    <h2
      className={clsx(
        "font-light tracking-[-0.03em] leading-tight text-white",
        "text-3xl sm:text-4xl md:text-5xl lg:text-6xl",
        className
      )}
    >
      {children}
    </h2>
  );
}

export function Subheading({
  children,
  className,
}: TypographyProps) {
  return (
    <p
      className={clsx(
        "font-light leading-relaxed text-white/70",
        "text-base sm:text-lg md:text-xl",
        className
      )}
    >
      {children}
    </p>
  );
}

export function Eyebrow({
  children,
  className,
}: TypographyProps) {
  return (
    <span
      className={clsx(
        "uppercase tracking-[0.35em] text-xs text-[#B89B72]",
        className
      )}
    >
      {children}
    </span>
  );
}