"use client";

import React, { useEffect } from 'react'
import { Slider } from "@/components/ui/slider";
import { useDashboardStore } from "../store/useDashboardStore";
import SimulationResults from './simulation-results';

const ForecastTool = () => {
  const { probabilities, setProbability, simulation, runSimulation, isRunningSimulation } = useDashboardStore();

  useEffect(() => {
    runSimulation();
    return () => {
    }
  }, [runSimulation])


  return (
    <div className="space-y-4">
      <div className='bg-white p-4 py-10 rounded shadow'>
        <h2 className="text-xl font-semibold">Revenue Forecast Tool</h2>
        {(["Pending", "Approved", "Denied"] as const).map((status) => (
          <div key={status} className='py-3'>
            <label>{status}</label>
            <Slider
              defaultValue={[probabilities[status]]}
              max={1}
              step={0.01}
              trackColor={status === "Approved" ? "bg-green-400" : status === "Pending" ? "bg-yellow-400" : status === "Denied" ? "bg-red-400" : ""}
              onValueChange={([value]) => setProbability(status, value)}
            />
            <span className="text-sm">{(probabilities[status] * 100).toFixed(0)}%</span>
          </div>
        ))}
      </div>
      <SimulationResults simulation={simulation} isLoading={isRunningSimulation} />

    </div>
  );
}

export default ForecastTool