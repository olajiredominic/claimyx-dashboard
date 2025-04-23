export interface IClaim {
  patient_id: string;
  patient_name: string;
  billing_code: string;
  amount: number;
  insurance_provider: string;
  payment_status: 'Pending' | 'Approved' | 'Denied';
  claim_date: string;
}

export type PaymentProbabilities = {
  Pending: number;
  Approved: number;
  Denied: number;
};
