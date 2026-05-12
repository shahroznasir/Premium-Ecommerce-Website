import { ReactNode } from "react";
import clsx from "clsx";

import Reveal from "@/components/common/reveal";

interface SectionProps {
  children: ReactNode;
  className?: string;

  bordered?: boolean;
  reveal?: boolean;

  delay?: number;
}

export default function Section({
  children,
  className,
  bordered = false,
  reveal = false,
  delay = 0,
}: SectionProps) {
  const content = (
    <section
      className={clsx(
        "relative z-10 overflow-hidden",
        bordered && "border-t border-white/[0.04]",
        className
      )}
    >
      {children}
    </section>
  );

  if (reveal) {
    return <Reveal delay={delay}>{content}</Reveal>;
  }

  return content;
}