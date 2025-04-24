import { IClaim, PaymentProbabilities } from "@/app/types/claims";
import { create } from "zustand";

export interface DashboardState {
  claims: IClaim[];
  isRunningSimulation: boolean;
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
  isRunningSimulation: false,
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
    const worker = new Worker(new URL('../workers/simulationWorker.js', import.meta.url));
    set({ isRunningSimulation: true })
    worker.postMessage({ probabilities, claims, iterations: 2000 });

    worker.onmessage = (e) => {
      const { avg, min, max, dist } = e.data
      set({
        simulation: {
          expectedRevenue: Math.round(avg),
          minRevenue: min,
          maxRevenue: max,
          distribution: dist,
        },
        isRunningSimulation: false
      });
      worker.terminate(); // Clean up
    };
  }
}));

