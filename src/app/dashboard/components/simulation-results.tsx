'use client';

import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { motion } from "framer-motion";
import { DashboardState } from '../store/useDashboardStore';
import { formatCurrency } from '@/lib/utils';

ChartJS.register(BarElement, CategoryScale, LinearScale);

const SimulationResults: React.FC<{
  simulation: DashboardState["simulation"];
  isLoading: boolean;
}> = ({ simulation, isLoading }) => {

  const chartData = {
    labels: Object.keys(simulation.distribution).map(Number).sort((a, b) => a - b),
    datasets: [
      {
        label: 'Iteration Count',
        data: Object.entries(simulation.distribution)
          .sort((a, b) => Number(a[0]) - Number(b[0]))
          .map(([, count]) => count),
        backgroundColor: '#3b82f6',
      },
    ],
  };

  return (
    <div className="space-y-6 flex flex-col lg:flex-row gap-5 lg:gap-10  h-120 ">
      <div className="bg-white p-4 rounded shadow text-center h-full w-full lg:w-1/2 flex lg:flex-row flex-col gap-10 items-center justify-center">
        <div>
          <p className="text-gray-500 text-sm">Min. Revenue</p>
          {isLoading ? (
            <div className="h-8 w-32 bg-gray-200 animate-pulse rounded-md" />
          ) : (
            <motion.h2
              key={simulation.minRevenue}
              className="text-2xl font-bold"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {formatCurrency(simulation.minRevenue, "USD")}
            </motion.h2>
          )}
        </div>

        <div>
          <p className="text-gray-500 text-md">Expected Revenue</p>
          {isLoading ? (
            <div className="h-8 w-32 bg-gray-200 animate-pulse rounded-md" />
          ) : (
            <motion.h2
              key={simulation.expectedRevenue}
              className="text-4xl font-bold"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {formatCurrency(simulation.expectedRevenue, "USD")}
            </motion.h2>
          )}
        </div>

        <div>
          <p className="text-gray-500 text-sm">Max. Revenue</p>
          {isLoading ? (
            <div className="h-8 w-32 bg-gray-200 animate-pulse rounded-md" />
          ) : (
            <motion.h2
              key={simulation.maxRevenue}
              className="text-2xl font-bold"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {formatCurrency(simulation.maxRevenue, "USD")}
            </motion.h2>
          )}
        </div>
      </div>

      <div className="bg-white p-4 rounded shadow w-full lg:w-1/2">
        <h3 className="text-lg font-semibold mb-2">Revenue Distribution</h3>
        <Bar
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              legend: { display: false },
            },
            scales: {
              x: {
                title: { display: true, text: 'Revenue Range ($)' },
              },
              y: {
                title: { display: true, text: 'Iteration Count' },
              },
            },
          }}
        />
      </div>
    </div >
  );
};

export default SimulationResults;
