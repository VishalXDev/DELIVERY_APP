import axios from "axios";

const API = axios.create({
  baseURL: "https://delivery-app-gules-six.vercel.app/", // Replace with your backend base URL if different
});

// Example endpoints
export const fetchOrders = async () => {
  const res = await API.get("/orders");
  return res.data;
};

export const fetchUsers = async () => {
  const res = await API.get("/users");
  return res.data;
};

export const fetchAdminWallet = async () => {
  const res = await API.get("/wallet/admin");
  return res.data;
};
// Get all partners
export const fetchPartners = async () => {
  const res = await API.get("/users?role=partner");
  return res.data;
};

// Add a new partner
export const addPartner = async (partner: {
  name: string;
  email: string;
  phone: string;
  commission: number;
}) => {
  const res = await API.post("/users", partner);
  return res.data;
};

// Update a partner
export const updatePartner = async (
  id: string,
  data: { name?: string; email?: string; phone?: string; commission?: number }
) => {
  const res = await API.put(`/users/${id}`, data);
  return res.data;
};

// Delete a partner
export const deletePartner = async (id: string) => {
  const res = await API.delete(`/users/${id}`);
  return res.data;
};
// Fetch all orders
export const fetchAllOrders = async () => {
  const res = await API.get("/orders");
  return res.data;
};

// Update order (assign partner / status)
export const updateOrder = async (
  id: string,
  data: { status?: string; partnerId?: string }
) => {
  const res = await API.put(`/orders/${id}`, data);
  return res.data;
};
// Get admin wallet & transactions
export const fetchWalletData = async () => {
  const res = await API.get("/wallet");
  return res.data;
};

// Add money to wallet
export const addMoneyToWallet = async (amount: number) => {
  const res = await API.post("/wallet/add", { amount });
  return res.data;
};

// Approve payout request
export const approvePayout = async (requestId: string) => {
  const res = await API.put(`/wallet/payout/${requestId}/approve`);
  return res.data;
};
export const fetchAnalytics = async () => {
  const res = await API.get("/analytics");
  return res.data;
};
