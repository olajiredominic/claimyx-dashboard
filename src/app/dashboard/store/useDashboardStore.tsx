import { IClaim } from "@/app/types/claims";
import { create } from "zustand";

interface DashboardState {
  claims: IClaim[];
  setClaims: (claims: IClaim[]) => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  claims: [],

  setClaims: (claims) => {
    set(() => ({
      claims
    }));
  },
}));

