"use server";

import { mockClaims } from "../data/mock-claims";

export async function getMockClaims() {
  // Simulate delay
  await new Promise((res) => setTimeout(res, 300));
  return mockClaims;
}

