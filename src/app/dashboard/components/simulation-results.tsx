'use client';

import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { DashboardState } from '../store/useDashboardStore';

ChartJS.register(BarElement, CategoryScale, LinearScale);

const SimulationResults: React.FC<{
  simulation: DashboardState["simulation"];
}> = ({ simulation }) => {

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
          <h2 className="text-2xl font-bold">{simulation.minRevenue.toLocaleString()}</h2>
        </div>
        <div>
          <p className="text-gray-500 text-md">Expected Revenue</p>
          <h2 className="text-5xl font-bold">{simulation.expectedRevenue.toLocaleString()}</h2>
        </div>
        <div>
          <p className="text-gray-500 text-sm">Max. Revenue</p>
          <h2 className="text-2xl font-bold">{simulation.maxRevenue.toLocaleString()}</h2>
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
    </div>
  );
};

export default SimulationResults;
