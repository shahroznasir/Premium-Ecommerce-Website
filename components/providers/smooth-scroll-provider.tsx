"use client";

import { ReactNode, useEffect } from "react";

import Lenis from "lenis";

interface SmoothScrollProviderProps {
  children: ReactNode;
}

export default function SmoothScrollProvider({
  children,
}: SmoothScrollProviderProps) {

  useEffect(() => {

    const lenis = new Lenis({
      duration: 1.4,

      smoothWheel: true,

      touchMultiplier: 1.5,

      easing: (t: number) =>
        1 - Math.pow(1 - t, 4),
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };

  }, []);

  return <>{children}</>;
}