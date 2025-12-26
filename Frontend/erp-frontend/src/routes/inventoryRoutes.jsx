import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../auth/ProtectedRoute";

// Inventory Pages
import InventoryDashboard from "../modules/inventory/InventoryDashboard";

// Suppliers
import SupplierList from "../modules/inventory/pages/suppliers/SupplierList";
import AddSupplier from "../modules/inventory/pages/suppliers/AddSupplier";

// Raw Materials
import RawMaterialList from "../modules/inventory/pages/rawMaterials/RawMaterialList";
import AddRawMaterial from "../modules/inventory/pages/rawMaterials/AddRawMaterial";

// Finished Products
import FinishedProductList from "../modules/inventory/pages/finishedProducts/FinishedProductList";
import AddFinishedProduct from "../modules/inventory/pages/finishedProducts/AddFinishedProduct";

// Inventory Audit
import InventoryAuditList from "../modules/inventory/pages/audit/InventoryAuditList";

export default function InventoryRoutes() {
  return (
    <Routes>
      <Route element={<ProtectedRoute allowedRoles={["SuperAdmin", "Manager", "HR Manager"]} />}>
        
        {/* Dashboard */}
        <Route index element={<InventoryDashboard />} />

        {/* Suppliers */}
        <Route path="suppliers" element={<SupplierList />} />
        <Route path="suppliers/add" element={<AddSupplier />} />

        {/* Raw Materials */}
        <Route path="raw-materials" element={<RawMaterialList />} />
        <Route path="raw-materials/add" element={<AddRawMaterial />} />

        {/* Finished Products */}
        <Route path="finished-products" element={<FinishedProductList />} />
        <Route path="finished-products/add" element={<AddFinishedProduct />} />

        {/* Inventory Audit */}
        <Route path="audit" element={<InventoryAuditList />} />

      </Route>
    </Routes>
  );
}
