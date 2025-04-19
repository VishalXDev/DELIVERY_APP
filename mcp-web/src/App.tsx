import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Partners from "./pages/Partners";
import Orders from "./pages/Orders";
import Wallet from "./pages/Wallet";
import Reports from "./pages/Reports";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const appRoutes = [
  { path: "/", element: <Dashboard /> },
  { path: "/partners", element: <Partners /> },
  { path: "/orders", element: <Orders /> },
  { path: "/wallet", element: <Wallet /> },
  { path: "/reports", element: <Reports /> },
];

function App() {
  return (
    <Router>
      <Routes>
        {appRoutes.map(({ path, element }, index) => (
          <Route key={index} path={path} element={element} />
        ))}
      </Routes>
      <ToastContainer position="top-right" />
    </Router>
  );
}

export default App;
