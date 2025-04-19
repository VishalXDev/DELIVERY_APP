import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import StatCard from "../components/StatCard";
import { fetchOrders, fetchUsers, fetchAdminWallet } from "../services/api";
import { Order, User } from "../types";

export default function Dashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [walletBalance, setWalletBalance] = useState<number>(0);

  useEffect(() => {
    const loadData = async () => {
      const [orderData, userData, walletData] = await Promise.all([
        fetchOrders(),
        fetchUsers(),
        fetchAdminWallet()
      ]);

      setOrders(orderData);
      setUsers(userData);
      setWalletBalance(walletData.balance);
    };

    loadData();
  }, []);

  const totalOrders = orders.length;
  const completedOrders = orders.filter(o => o.status === "completed").length;
  const pickupPartners = users.filter(u => u.role === "partner").length;

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Welcome to the MCP Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard title="Wallet Balance" value={`₹${walletBalance}`} color="bg-green-500" />
        <StatCard title="Total Orders" value={totalOrders} color="bg-blue-500" />
        <StatCard title="Completed Orders" value={completedOrders} color="bg-purple-500" />
        <StatCard title="Pickup Partners" value={pickupPartners} color="bg-yellow-500" />
      </div>
    </Layout>
  );
}
