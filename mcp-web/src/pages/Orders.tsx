import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import OrderCard from "../components/OrderCard";
import { fetchAllOrders, fetchPartners, updateOrder } from "../services/api";
import { Order, User } from "../types";

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [partners, setPartners] = useState<User[]>([]);

  const loadData = async () => {
    const [orderData, partnerData] = await Promise.all([
      fetchAllOrders(),
      fetchPartners(),
    ]);
    setOrders(orderData);
    setPartners(partnerData);
  };

  useEffect(() => {
    loadData();
  }, []);

  // Use Partial<Order> instead of any
  const handleUpdate = async (id: string, data: Partial<Order>) => {
    await updateOrder(id, data);
    loadData();
  };

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
