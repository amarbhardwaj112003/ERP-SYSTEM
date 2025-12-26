import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../auth/ProtectedRoute";

import OrderDashboard from "../modules/orders/pages/OrderDashboard";
import OrderList from "../modules/orders/pages/OrderList";
import AddOrder from "../modules/orders/pages/AddOrder";
import OrderDetails from "../modules/orders/pages/OrderDetails";

export default function OrderRoutes() {
  return (
    <Routes>
      <Route element={<ProtectedRoute allowedRoles={["SuperAdmin", "Manager", "Employee"]} />}>
        <Route index element={<OrderDashboard />} />
        <Route path="orders" element={<OrderList />} />
        <Route path="orders/add" element={<AddOrder />} />
        <Route path="orders/:id" element={<OrderDetails />} />
      </Route>
    </Routes>
  );
}
