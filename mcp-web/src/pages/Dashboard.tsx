import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import StatCard from "../components/StatCard";
import { fetchOrders, fetchUsers, fetchAdminWallet } from "../services/api";
import { Order, User } from "../types";

export default function Dashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [walletBalance, setWalletBalance] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null); // Error state

  useEffect(() => {
    const loadData = async () => {
      try {
        // Ensure the data fetched conforms to the expected types
        const [orderData, userData, walletData] = await Promise.all([
          fetchOrders(),
          fetchUsers(),
          fetchAdminWallet()
        ]);

        // Check if the fetched data matches expected shape before setting state
        if (Array.isArray(orderData) && Array.isArray(userData)) {
          setOrders(orderData); // Data matches the expected Order[] type
          setUsers(userData); // Data matches the expected User[] type
        } else {
          throw new Error("Invalid data structure received");
        }

        setWalletBalance(walletData.balance);
      } catch (error) {
        setError("Failed to load data. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const totalOrders = orders.length;
  const completedOrders = orders.filter(o => o.status === "completed").length;
  const pickupPartners = users.filter(u => u.role === "partner").length;

  if (isLoading) {
    return (
      <Layout>
        <h1 className="text-2xl font-bold mb-4">Loading...</h1>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <h1 className="text-2xl font-bold mb-4">{error}</h1> {/* Displaying error */}
      </Layout>
    );
  }

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
