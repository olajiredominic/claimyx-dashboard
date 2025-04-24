"use client";

import { Card, CardContent } from '@/components/ui/card';
import { Table, TableHead, TableHeader, TableRow, TableCell, TableBody } from "@/components/ui/table";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button'; // Import Button
import React, { useMemo, useState, useEffect } from 'react'; // Import useEffect
import { useDashboardStore } from '../store/useDashboardStore';
import { formatCurrency } from '@/lib/utils';

// Define how many items to show per page
const ITEMS_PER_PAGE = 10;

const ClaimsTable = () => {
  const { claims } = useDashboardStore();
  const [query, setQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1); // State for current page

  // Memoized calculation for filtered and sorted claims
  const filteredAndSortedClaims = useMemo(() => {
    let filtered = claims.filter((claim) =>
      Object.values(claim).some((val) =>
        val.toString().toLowerCase().includes(query.toLowerCase())
      )
    );

    if (filterStatus) {
      filtered = filtered.filter((claim) => claim.payment_status === filterStatus);
    }

    if (sortKey) {
      // Create a stable sort by adding index as a secondary sort factor if needed,
      // but for simple cases, direct sort is usually fine.
      filtered = [...filtered].sort((a, b) => {
        const valA = a[sortKey as keyof typeof a];
        const valB = b[sortKey as keyof typeof b];

        // Handle different data types for comparison if necessary (e.g., dates, numbers)
        // This example assumes string or comparable types
        let comparison = 0;
        if (valA < valB) {
          comparison = -1;
        } else if (valA > valB) {
          comparison = 1;
        }

        return sortDir === "asc" ? comparison : comparison * -1;
      });
    }

    return filtered;
  }, [query, filterStatus, sortKey, sortDir, claims]);

  // Reset to first page whenever filters, search, or sorting changes
  useEffect(() => {
    setCurrentPage(1);
  }, [query, filterStatus, sortKey, sortDir]);


  // Calculate pagination variables based on the filtered/sorted data
  const totalItems = filteredAndSortedClaims.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  // Get the claims for the current page
  const paginatedClaims = useMemo(() => {
    console.log(`Paginating: page ${currentPage}, total ${totalItems}, start ${startIndex}, end ${endIndex}`); // Debug log
    return filteredAndSortedClaims.slice(startIndex, endIndex);
  }, [currentPage, totalItems, startIndex, endIndex, filteredAndSortedClaims]); // Add dependencies


  // Handle page changes
  const goToPreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1)); // Ensure page doesn't go below 1
  };

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages)); // Ensure page doesn't exceed totalPages
  };


  return (
    <div>
      <Card>
        <CardContent className="space-y-4 p-4 ">
          <h2 className="text-xl font-semibold">Claims Table</h2>
          <div className="flex flex-wrap gap-4 mt-10 items-center"> {/* Use flex-wrap for responsiveness */}
            <Input
              placeholder="Search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="max-w-sm flex-grow sm:flex-grow-0" // Allow input to grow on small screens
            />
            <select
              className="border p-2 rounded text-sm" // Adjusted padding and text size
              value={filterStatus ?? ""}
              onChange={(e) => setFilterStatus(e.target.value || null)}
            >
              <option value="">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Denied">Denied</option>
            </select>
          </div>

          {/* Table */}
          <div className="overflow-x-auto min-h-[45vh]"> {/* Add horizontal scroll for small screens */}
            <Table>
              <TableHeader>
                <TableRow>
                  {[
                    { key: 'patient_name', label: 'Patient Name' },
                    { key: 'billing_code', label: 'Billing Code' },
                    { key: 'amount', label: 'Amount' },
                    { key: 'insurance_provider', label: 'Insurance Provider' },
                    { key: 'payment_status', label: 'Payment Status' },
                    { key: 'claim_date', label: 'Claim Date' }
                  ].map(({ key, label }) => (
                    <TableHead
                      key={key}
                      className={`cursor-pointer hover:bg-muted font-semibold ${sortKey === key ? "bg-muted font-semibold" : ""}`} // Add font-semibold for active sort
                      onClick={() => {
                        // If clicking the same key, toggle direction, otherwise set key and default to 'asc'
                        const newSortDir = (sortKey === key && sortDir === "asc") ? "desc" : "asc";
                        setSortKey(key);
                        setSortDir(newSortDir);
                      }}
                    >
                      {label}
                      {sortKey === key ? (sortDir === "asc" ? ' ▲' : ' ▼') : ''}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedClaims.length > 0 ? (
                  paginatedClaims.map((claim, i) => (
                    <TableRow key={claim.billing_code ?? i}>
                      <TableCell>{claim.patient_name}</TableCell>
                      <TableCell>{claim.billing_code}</TableCell>
                      <TableCell>{typeof claim.amount === 'number' ? formatCurrency(claim.amount, "USD") : 'N/A'}</TableCell>
                      <TableCell>{claim.insurance_provider}</TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${claim.payment_status === 'Approved'
                            ? 'bg-emerald-100 text-emerald-700'
                            : claim.payment_status === 'Pending'
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-red-100 text-red-700'
                            }`}
                        >
                          {claim.payment_status}
                        </span>
                      </TableCell>
                      <TableCell>{claim.claim_date}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-muted-foreground">
                      No claims found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {totalPages > 1 && (
            <div className="flex justify-between items-center pt-4">
              <div>
                <span className="text-sm text-muted-foreground">
                  Page {currentPage} of {totalPages} (Total: {totalItems} claims)
                </span>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={goToPreviousPage}
                  disabled={currentPage === 1}
                  variant="outline"
                  size="sm"
                >
                  Previous
                </Button>
                <Button
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                  variant="outline"
                  size="sm"
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default ClaimsTable;