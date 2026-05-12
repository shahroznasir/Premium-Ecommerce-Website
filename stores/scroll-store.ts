import { create } from "zustand";

interface ScrollState {
  progress: number;

  setProgress: (
    value: number
  ) => void;
}

export const useScrollStore =
  create<ScrollState>((set) => ({
    progress: 0,

    setProgress: (value) =>
      set({
        progress: value,
      }),
  }));