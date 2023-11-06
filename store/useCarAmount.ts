import { create } from "zustand";

type useCarAmountProps = {
  carAmount: number;
  changeCarAmount: (by: number) => void;
};

export const useCarAmount = create<useCarAmountProps>((set) => ({
  carAmount: 0,
  changeCarAmount: (by) => set((state) => ({ carAmount: by })),
}));
