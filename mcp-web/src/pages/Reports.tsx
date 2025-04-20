import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { fetchAnalytics } from "../services/api";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";

interface OrderStats {
  date: string;
  count: number;
}

interface PartnerStats {
  name: string;
  completedOrders: number;
}

interface StatusStats {
  status: string;
  count: number;
}

export default function Reports() {
  const [orderStats, setOrderStats] = useState<OrderStats[]>([]);
  const [partnerStats, setPartnerStats] = useState<PartnerStats[]>([]);
  const [statusStats, setStatusStats] = useState<StatusStats[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const COLORS = ["#4ade80", "#60a5fa", "#f87171"];

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = await fetchAnalytics();
        setOrderStats(data.orderTrend);
        setPartnerStats(
          data.partnerPerformance.map((partner: { partnerId: string; performanceMetric: number }) => ({
            name: partner.partnerId,
            completedOrders: partner.performanceMetric,
          }))
        );
        setStatusStats(data.statusDistribution);
      } catch (err) {
        setError("Failed to load analytics data. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) {
    return (
      <Layout>
        <h1 className="text-2xl font-bold mb-4">Reports & Analytics</h1>
        <p>Loading analytics data...</p>
        {/* Optionally include a loading spinner */}
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <h1 className="text-2xl font-bold mb-4">Reports & Analytics</h1>
        <p className="text-red-500">{error}</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Reports & Analytics</h1>

      <div className="grid md:grid-cols-3 gap-4">
        {/* Line Chart - Order Trend */}
        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-2">Orders Over Time</h2>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={orderStats}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart - Partner Performance */}
        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-2">Top Partners</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={partnerStats}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="completedOrders" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart - Order Status */}
        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-2">Order Status</h2>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={statusStats} dataKey="count" nameKey="status" cx="50%" cy="50%" outerRadius={60} label>
                {statusStats.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Layout>
  );
}
