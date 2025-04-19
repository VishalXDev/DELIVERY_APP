// Shared interfaces for the MCP System

export interface Order {
    _id: string;
    status: "pending" | "completed" | "cancelled";
    assignedTo: string;
    amount: number;
    // Add more fields as needed
  }
  
  export interface User {
    _id: string;
    name: string;
    email: string;
    role: "admin" | "partner";
    isActive: boolean;
    commission: number;
    // Add more fields if needed
  }
  
  export interface Wallet {
    balance: number;
    transactions: number;
  }
  
  export interface PartnerFormData {
    name: string;
    email: string;
    phone: string;
    commission: number;
  }
  
  export interface Transaction {
    _id: string;
    amount: number;
    date: string;
    type: "credit" | "debit";
    description: string;
  }
  
  export interface NotificationPayload {
    title?: string;
    body?: string;
    image?: string;
  }
  