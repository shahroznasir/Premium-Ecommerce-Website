"use client";

import {
  useEffect,
} from "react";

import {
  useScroll,
  useMotionValueEvent,
} from "framer-motion";

import {
  useScrollStore,
} from "@/stores/scroll-store";

export default function ScrollProgressProvider() {

  const { scrollYProgress } =
    useScroll();

  const setProgress =
    useScrollStore(
      (state) => state.setProgress
    );

  useMotionValueEvent(
    scrollYProgress,
    "change",
    (latest) => {
      setProgress(latest);
    }
  );

  useEffect(() => {
    return () => {
      setProgress(0);
    };
  }, [setProgress]);

  return null;
}