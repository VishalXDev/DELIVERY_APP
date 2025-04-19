import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-64 bg-white shadow-md p-4">
      <h2 className="text-2xl font-bold mb-6">MCP Admin</h2>
      <nav className="flex flex-col space-y-4">
        <Link to="/" className="hover:text-blue-600">Dashboard</Link>
        <Link to="/partners" className="hover:text-blue-600">Pickup Partners</Link>
        <Link to="/orders" className="hover:text-blue-600">Orders</Link>
        <Link to="/wallet" className="hover:text-blue-600">Wallet</Link>
        <Link to="/reports" className="hover:text-blue-600">Reports</Link>
      </nav>
    </div>
  );
}
