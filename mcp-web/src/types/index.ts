// Shared interfaces for the MCP System

export interface Order {
  _id: string;
  status: "pending" | "completed" | "cancelled";
  assignedTo: string; // User ID (partner/admin)
  amount: number;
  createdAt: string; // Date the order was created
  updatedAt: string; // Date the order was last updated
}

export interface User {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "partner";
  isActive: boolean;
  commission: number;
  createdAt: string; // Date when the user was created
  updatedAt: string; // Date when the user was last updated
}

export interface Wallet {
  balance: number;
  transactions: Transaction[]; // Array of transactions
}

export interface PartnerFormData {
  name: string;
  email: string;
  phone: string;
  commission: number;
}

export interface Transaction {
  _id: string; // Standardized _id field for consistency
  amount: number;
  date: string; // Date of the transaction
  type: "credit" | "debit"; // Transaction type, credit or debit
  description: string; // Description of the transaction (e.g., reason for the credit/debit)
}

export interface NotificationPayload {
  title?: string;
  body?: string;
  image?: string;
  // Ensure only one of these fields is populated at a time
  // Use a union type to enforce this constraint
  notificationType?: "title" | "body" | "image";
}

// Fetch wallet data function
export async function fetchWalletData(): Promise<Wallet> {
  // Implement logic to fetch wallet data
  // Ensure the returned data matches the Wallet structure
}
