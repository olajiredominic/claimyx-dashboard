"use client";

import { Card, CardContent } from '@/components/ui/card'
import React from 'react'
import { useDashboardStore } from '../store/useDashboardStore';

const SummaryCard: React.FC<{ amount: number, count: number, label: string, className?: string }> = ({ amount, count, label, className }) => {

  return (<Card className={className}>
    <CardContent className="space-y-2 p-4 text-center ">
      <h2 className="text-xl font-semibold">{label}</h2>
      <div>$ {(amount).toFixed(2)}</div>
      <div>{count} Claims</div>
    </CardContent>
  </Card>)
}

const Summary = () => {
  const { claims } = useDashboardStore();

  const statusSummary = ['Approved', 'Pending', 'Denied'].map((status) => {
    const filtered = claims.filter((c) => c.payment_status === status);
    const amount = filtered.reduce((acc, c) => acc + c.amount, 0);
    return { status, amount, count: filtered.length };
  });

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5'>
      <SummaryCard label="Total Billing Amount" className="" amount={claims.reduce((sum, c) => sum + c.amount, 0)} count={claims.length} />
      {
        statusSummary.map(status => (
          <SummaryCard {...status} key={status.status} label={`${status.status} amount`} className={`
            ${status.status === "Approved" && "from-green-400 to-teal-500 text-white bg-gradient-to-r"}
            ${status.status === "Denied" && "from-red-400 to-rose-500 text-white bg-gradient-to-r"}
            ${status.status === "Pending" && "from-yellow-400 to-orange-500 text-white bg-gradient-to-r"}
            `}
          />
        ))}
    </div>

  )
}

export default Summary