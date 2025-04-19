import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Partners from "./pages/Partners";
import Orders from "./pages/Orders";
import Wallet from "./pages/Wallet";
import Reports from "./pages/Reports";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const routes = [
  { path: "/", component: <Dashboard /> },
  { path: "/partners", component: <Partners /> },
  { path: "/orders", component: <Orders /> },
  { path: "/wallet", component: <Wallet /> },
  { path: "/reports", component: <Reports /> },
];

function App() {
  return (
    <Router>
      <Routes>
        {routes.map(({ path, component }, index) => (
          <Route key={index} path={path} element={component} />
        ))}
        <ToastContainer position="top-right" />
      </Routes>
    </Router>
  );
}

export default App;
