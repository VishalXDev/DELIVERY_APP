import axios, { AxiosError } from "axios";

// Define your base API URL here
const API = axios.create({
  baseURL: "https://delivery-app-gules-six.vercel.app/", // Replace with your backend base URL if different
});

// Example: Response types for the API
interface Order {
  _id: string;
  status: string;
  // Add other order fields here
}

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  // Add other user fields here
}

interface Wallet {
  balance: number;
  transactions: Transaction[];
}

interface Transaction {
  _id: string;
  amount: number;
  date: string;
  // Add other transaction fields here
}

interface Analytics {
  orderTrend: { date: string; count: number }[]; // Define your order trend data structure
  partnerPerformance: { partnerId: string; performanceMetric: number }[]; // Define your partner performance data structure
  statusDistribution: { status: string; count: number }[]; // Define your status distribution data structure
}

// Utility function to handle errors
const handleError = (error: AxiosError) => {
  console.error(error.response?.data || error.message);
  const errorMessage =
    (error.response?.data as { message?: string })?.message ||
    "An error occurred";
  throw new Error(errorMessage);
};

// Example endpoints
export const fetchOrders = async (): Promise<Order[]> => {
  try {
    const res = await API.get("/orders");
    return res.data;
  } catch (error) {
    handleError(error as AxiosError);
    return [];
  }
};

export const fetchUsers = async (): Promise<User[]> => {
  try {
    const res = await API.get("/users");
    return res.data;
  } catch (error) {
    handleError(error as AxiosError);
    return [];
  }
};

export const fetchAdminWallet = async (): Promise<Wallet> => {
  try {
    const res = await API.get("/wallet/admin");
    return res.data;
  } catch (error) {
    handleError(error as AxiosError);
    return { balance: 0, transactions: [] };
  }
};

// Get all partners
export const fetchPartners = async (): Promise<User[]> => {
  try {
    const res = await API.get("/users?role=partner");
    return res.data;
  } catch (error) {
    handleError(error as AxiosError);
    return [];
  }
};

// Add a new partner
export const addPartner = async (partner: {
  name: string;
  email: string;
  phone: string;
  commission: number;
}): Promise<User> => {
  try {
    const res = await API.post("/users", partner);
    return res.data;
  } catch (error) {
    handleError(error as AxiosError);
    return {} as User;
  }
};

// Update a partner
export const updatePartner = async (
  id: string,
  data: { name?: string; email?: string; phone?: string; commission?: number }
): Promise<User> => {
  try {
    const res = await API.put(`/users/${id}`, data);
    return res.data;
  } catch (error) {
    handleError(error as AxiosError);
    return {} as User;
  }
};

// Delete a partner
export const deletePartner = async (id: string): Promise<void> => {
  try {
    const res = await API.delete(`/users/${id}`);
    return res.data;
  } catch (error) {
    handleError(error as AxiosError);
    return;
  }
};

// Fetch all orders
export const fetchAllOrders = async (): Promise<Order[]> => {
  try {
    const res = await API.get("/orders");
    return res.data;
  } catch (error) {
    handleError(error as AxiosError);
    return [];
  }
};

// Update order (assign partner / status)
export const updateOrder = async (
  id: string,
  data: { status?: string; partnerId?: string }
): Promise<Order> => {
  try {
    const res = await API.put(`/orders/${id}`, data);
    return res.data;
  } catch (error) {
    handleError(error as AxiosError);
    return {} as Order;
  }
};

// Get admin wallet & transactions
export const fetchWalletData = async (): Promise<Wallet> => {
  try {
    const res = await API.get("/wallet");
    return res.data;
  } catch (error) {
    handleError(error as AxiosError);
    return { balance: 0, transactions: [] };
  }
};

// Add money to wallet
export const addMoneyToWallet = async (amount: number): Promise<Wallet> => {
  try {
    const res = await API.post("/wallet/add", { amount });
    return res.data;
  } catch (error) {
    handleError(error as AxiosError);
    return { balance: 0, transactions: [] };
  }
};

// Approve payout request
export const approvePayout = async (requestId: string): Promise<void> => {
  try {
    const res = await API.put(`/wallet/payout/${requestId}/approve`);
    return res.data;
  } catch (error) {
    handleError(error as AxiosError);
    return;
  }
};

export const fetchAnalytics = async (): Promise<Analytics> => {
  try {
    const res = await API.get("/analytics");
    return res.data;
  } catch (error) {
    handleError(error as AxiosError);
    return {
      orderTrend: [],
      partnerPerformance: [],
      statusDistribution: [],
    };
  }
};
