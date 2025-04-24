import { IClaim, PaymentProbabilities } from "@/app/types/claims";
import { create } from "zustand";

export interface DashboardState {
  claims: IClaim[];
  simulation: {
    expectedRevenue: number;
    minRevenue: number;
    maxRevenue: number;
    distribution: Record<number, number>; // revenue => frequency
  };
  probabilities: {
    Pending: 0.7,
    Approved: 0.95,
    Denied: 0.1,
  };
  setClaims: (claims: IClaim[]) => void;
  setProbability: (status: keyof PaymentProbabilities, value: number) => void;
  runSimulation: () => void;
}

export const useDashboardStore = create<DashboardState>((set, get) => ({
  claims: [],
  probabilities: {
    Pending: 0.7,
    Approved: 0.95,
    Denied: 0.1,
  },

  simulation: {
    expectedRevenue: 0,
    minRevenue: 0,
    maxRevenue: 0,
    distribution: {},
  },
  setClaims: (claims) => {
    set(() => ({
      claims
    }));
  },

  setProbability: (status, value) => {
    set((state) => ({
      probabilities: {
        ...state.probabilities,
        [status]: value,
      },
    }));
    // Re-run the simulation after updating probability
    get().runSimulation();
  },

  runSimulation: () => {
    const { probabilities, claims } = get();
    const iterations = 2000;
    const results: number[] = [];

    for (let i = 0; i < iterations; i++) {
      let revenue = 0;

      for (const claim of claims) {
        const chance = probabilities[claim.payment_status as keyof typeof probabilities];
        if (Math.random() < chance) {
          revenue += claim.amount;
        }
      }

      results.push(revenue);
    }

    // Generate histogram
    const dist: Record<number, number> = {};
    results.forEach((rev) => {
      const bucket = Math.round(rev / 1000) * 1000;
      dist[bucket] = (dist[bucket] || 0) + 1;
    });

    const avg = results.reduce((a, b) => a + b, 0) / results.length;
    const max = results.length ? Math.max(...results) : 0;
    const min = results.length ? Math.min(...results) : 0;

    set(() => ({
      simulation: {
        expectedRevenue: Math.round(avg),
        minRevenue: min,
        maxRevenue: max,
        distribution: dist,
      },
    }));
  }
}));

