'use client';

import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useDashboardStore } from '../store/useDashboardStore';
import { IClaim } from '@/app/types/claims';

ChartJS.register(ArcElement, Tooltip, Legend);

const ClaimsPieChart = () => {
  const { claims } = useDashboardStore();

  const statuses = ['Approved', 'Pending', 'Denied'];

  const statusCounts: Record<string, number> = {};
  const statusAmounts: Record<string, number> = {};

  statuses.forEach(status => {
    const filtered = claims.filter((claim: IClaim) => claim.payment_status === status);
    statusCounts[status] = filtered.length;
    statusAmounts[status] = filtered.reduce((sum, claim) => sum + claim.amount, 0);
  });

  const data = {
    labels: statuses,
    datasets: [
      {
        label: 'Claims Count',
        data: statuses.map(status => statusCounts[status]),
        backgroundColor: ['#22c55e', '#facc15', '#ef4444'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context: { label: string }) {
            const status = context.label;
            const count = statusCounts[status];
            const amount = statusAmounts[status].toLocaleString(undefined, {
              style: 'currency',
              currency: 'USD',
            });
            return `${status}: ${count} claims, ${amount}`;
          },
        },
      },
    },
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-white p-4 rounded shadow">
      <h3 className="text-lg font-bold mb-4">Claim Distribution</h3>
      <Pie data={data} options={options} />
    </div>
  );
};

export default ClaimsPieChart;
