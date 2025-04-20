import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import OrderCard from "../components/OrderCard";
import { fetchAllOrders, fetchPartners, updateOrder } from "../services/api";
import { Order, User } from "../types";

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [partners, setPartners] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const [orderData, partnerData] = await Promise.all([
        fetchAllOrders(),
        fetchPartners(),
      ]);
      setOrders(orderData);
      setPartners(partnerData);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to load orders or partners. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Handle updates without reloading all data
  const handleUpdate = async (id: string, data: Partial<Order>) => {
    try {
      await updateOrder(id, data);

      // Optimized approach: Update the order locally after the update
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === id ? { ...order, ...data } : order
        )
      );
    } catch (err) {
      console.error("Error updating order:", err);
      setError("Failed to update the order. Please try again.");
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <h1 className="text-2xl font-bold">Loading...</h1>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <h1 className="text-2xl font-bold text-red-500">{error}</h1>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Order Management</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {orders.map((order) => (
          <OrderCard
            key={order._id}
            order={order}
            partners={partners}
            onUpdate={handleUpdate}
          />
        ))}
      </div>
    </Layout>
  );
}
