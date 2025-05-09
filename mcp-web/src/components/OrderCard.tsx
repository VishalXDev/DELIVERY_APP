import { Order, User } from "../types";

type Props = {
  order: Order;
  partners: User[];
  onUpdate: (id: string, data: Partial<Order>) => void;
};

export default function OrderCard({ order, partners, onUpdate }: Props) {
  const handleAssign = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onUpdate(order._id, { assignedTo: e.target.value });
  };

  const handleStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onUpdate(order._id, { status: e.target.value as Order["status"] });
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow space-y-2">
      <div className="flex justify-between items-start gap-4">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold">Order #{order._id?.slice(-6)}</h3>
          <p className="text-sm text-gray-600">Amount: ₹{order.amount}</p>
          <p className="text-sm">
            Status:
            <span
              className={`ml-1 font-semibold ${
                order.status === "completed"
                  ? "text-green-600"
                  : order.status === "cancelled"
                  ? "text-red-600"
                  : "text-blue-600"
              }`}
            >
              {order.status.toUpperCase()}
            </span>
          </p>
        </div>

        <div className="flex flex-col gap-2 text-sm">
          <select
            value={order.assignedTo}
            onChange={handleAssign}
            className="border rounded px-2 py-1"
          >
            <option value="">Assign Partner</option>
            {partners.map((p) => (
              <option key={p._id} value={p._id}>
                {p.name}
              </option>
            ))}
          </select>

          <select
            value={order.status}
            onChange={handleStatus}
            className="border rounded px-2 py-1"
          >
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>
    </div>
  );
}
