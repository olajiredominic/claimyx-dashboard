'use client';

import { useEffect } from 'react';
import type { IClaim } from '@/app/types/claims';
import { useDashboardStore } from '../store/useDashboardStore';

export default function StoreInitializer({ claims }: { claims: IClaim[] }) {
  const { setClaims } = useDashboardStore();

  useEffect(() => {
    setClaims(claims);
  }, [claims, setClaims]);

  return null; // It doesn't render anything
}
