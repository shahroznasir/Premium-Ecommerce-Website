import { ReactNode } from "react";

import clsx from "clsx";

import Reveal from "@/components/common/reveal";

interface SectionProps {
  children: ReactNode;

  className?: string;

  reveal?: boolean;

  delay?: number;

  /* =========================================================
     OPTIONAL BORDER SUPPORT
  ========================================================== */
  bordered?: boolean;

  /* =========================================================
     CINEMATIC SPACING SYSTEM
  ========================================================== */
  spacing?:
    | "none"
    | "tight"
    | "default"
    | "relaxed"
    | "cinematic";
}

export default function Section({
  children,
  className,

  reveal = false,

  delay = 0,

  bordered = false,

  spacing = "default",
}: SectionProps) {

  /* =========================================================
     SEAMLESS LUXURY SPACING
  ========================================================== */

  const spacingStyles = {
    none: "",

    /* Minimal editorial rhythm */
    tight:
      "py-4 md:py-6",

    /* Natural cinematic flow */
    default:
      "",

    /* Soft breathing space */
    relaxed:
      "py-10 md:py-16",

    /* Monumental showcase spacing */
    cinematic:
      "py-16 md:py-24",
  };

  const content = (
    <section
      className={clsx(

        /* =====================================================
           SEAMLESS CINEMATIC CANVAS
        ====================================================== */
        "relative z-10",

        /* =====================================================
           CONTROLLED SPACING
        ====================================================== */
        spacingStyles[spacing],

        /* =====================================================
           OPTIONAL SUBTLE DIVIDER
        ====================================================== */
        bordered &&
          "border-t border-white/[0.03]",

        /* =====================================================
           CUSTOM SECTION CONTROL
        ====================================================== */
        className
      )}
    >

      {/* =========================================================
          CONTENT
      ========================================================== */}
      <div className="relative z-10">

        {children}

      </div>

    </section>
  );

  if (reveal) {
    return (
      <Reveal delay={delay}>

        {content}

      </Reveal>
    );
  }

  return content;
}