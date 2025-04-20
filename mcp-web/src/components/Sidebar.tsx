import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

export default function Sidebar() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const getLinkClass = (path: string) => {
    return location.pathname === path
      ? "text-blue-600 font-bold"
      : "hover:text-blue-600";
  };

  return (
    <div className="w-64 bg-white shadow-md p-4">
      <h2 className="text-2xl font-bold mb-6">MCP Admin</h2>

      {/* Desktop Sidebar */}
      <nav className="hidden md:flex flex-col space-y-4">
        <Link to="/" className={getLinkClass("/")}>Dashboard</Link>
        <Link to="/partners" className={getLinkClass("/partners")}>Pickup Partners</Link>
        <Link to="/orders" className={getLinkClass("/orders")}>Orders</Link>
        <Link to="/wallet" className={getLinkClass("/wallet")}>Wallet</Link>
        <Link to="/reports" className={getLinkClass("/reports")}>Reports</Link>
      </nav>

      {/* Mobile Sidebar */}
      <div className="md:hidden">
        <button
          onClick={toggleMobileMenu}
          className="p-2 text-gray-600 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        {isMobileMenuOpen && (
          <div className="flex flex-col space-y-4 mt-4">
            <Link to="/" className={getLinkClass("/")}>Dashboard</Link>
            <Link to="/partners" className={getLinkClass("/partners")}>Pickup Partners</Link>
            <Link to="/orders" className={getLinkClass("/orders")}>Orders</Link>
            <Link to="/wallet" className={getLinkClass("/wallet")}>Wallet</Link>
            <Link to="/reports" className={getLinkClass("/reports")}>Reports</Link>
          </div>
        )}
      </div>
    </div>
  );
}
