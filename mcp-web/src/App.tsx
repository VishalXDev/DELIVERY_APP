import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import React, { Suspense, lazy } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Lazy loading components
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Partners = lazy(() => import("./pages/Partners"));
const Orders = lazy(() => import("./pages/Orders"));
const Wallet = lazy(() => import("./pages/Wallet"));
const Reports = lazy(() => import("./pages/Reports"));

// Error Boundary component
class ErrorBoundary extends React.Component<{ children: React.ReactNode }> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("Error caught by boundary:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}

// Mock authentication function (replace with real logic)
const isAuthenticated = true; // Change this as per your authentication logic

// Protected Route Component
const ProtectedRoute = ({ element }: { element: React.ReactNode }) => {
  return isAuthenticated ? element : <Navigate to="/" />;
};

// Routes configuration
const appRoutes = [
  { path: "/", element: <Dashboard /> },
  { path: "/partners", element: <Partners /> },
  { path: "/orders", element: <Orders /> },
  { path: "/wallet", element: <Wallet /> },
  { path: "/reports", element: <Reports /> },
];

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            {appRoutes.map(({ path, element }, index) => (
              <Route
                key={index}
                path={path}
                element={<ProtectedRoute element={element} />}
              />
            ))}
          </Routes>
        </Suspense>
        <ToastContainer position="top-right" />
      </Router>
    </ErrorBoundary>
  );
}

export default App;
