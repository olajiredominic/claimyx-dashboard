'use client';

import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useDashboardStore } from '../store/useDashboardStore';
import { IClaim } from '@/app/types/claims';

ChartJS.register(ArcElement, Tooltip, Legend);

const ClaimsPieChart = () => {
  const { claims } = useDashboardStore();
  const statusCounts = {
    Approved: claims.filter((claim: IClaim) => claim.payment_status === 'Approved').length,
    Pending: claims.filter((claim: IClaim) => claim.payment_status === 'Pending').length,
    Denied: claims.filter((claim: IClaim) => claim.payment_status === 'Denied').length,
  };

  const data = {
    labels: Object.keys(statusCounts),
    datasets: [
      {
        label: 'Claims Count',
        data: Object.values(statusCounts),
        backgroundColor: ['#22c55e', '#facc15', '#ef4444'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-white p-4 rounded shadow">
      <h3 className="text-lg font-bold mb-4">Claim Distribution</h3>
      <Pie data={data} />
    </div>
  );
};

export default ClaimsPieChart;
