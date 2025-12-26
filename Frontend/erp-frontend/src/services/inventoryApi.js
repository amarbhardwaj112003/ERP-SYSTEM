import api from "./api"; // axios instance with baseURL and headers

const Inventory = {
  // Suppliers
  getSuppliers: () => api.get("/inventory/suppliers/"),
  getSupplier: (id) => api.get(`/inventory/suppliers/${id}/`),
  createSupplier: (data) => api.post("/inventory/suppliers/", data),
  updateSupplier: (id, data) => api.put(`/inventory/suppliers/${id}/`, data),
  deleteSupplier: (id) => api.delete(`/inventory/suppliers/${id}/`),

  // Raw Materials
  getRawMaterials: () => api.get("/inventory/raw-materials/"),
  getRawMaterial: (id) => api.get(`/inventory/raw-materials/${id}/`),
  createRawMaterial: (data) => api.post("/inventory/raw-materials/", data),
  updateRawMaterial: (id, data) => api.put(`/inventory/raw-materials/${id}/`, data),
  deleteRawMaterial: (id) => api.delete(`/inventory/raw-materials/${id}/`),

  // Finished Products
  getFinishedProducts: () => api.get("/inventory/finished-products/"),
  getFinishedProduct: (id) => api.get(`/inventory/finished-products/${id}/`),
  createFinishedProduct: (data) => api.post("/inventory/finished-products/", data),
  updateFinishedProduct: (id, data) =>
    api.put(`/inventory/finished-products/${id}/`, data),
  deleteFinishedProduct: (id) => api.delete(`/inventory/finished-products/${id}/`),

  // Inventory Audits
  getAudits: () => api.get("/inventory/audit/"),
  getAudit: (id) => api.get(`/inventory/audit/${id}/`),
  deleteAudit: (id) => api.delete(`/inventory/audit/${id}/`),

  // Generic helper for Dashboard
  createItem: (type, data) => {
    if (type === "raw-material") return Inventory.createRawMaterial(data);
    if (type === "finished-product") return Inventory.createFinishedProduct(data);
  },
  updateItem: (type, id, data) => {
    if (type === "raw-material") return Inventory.updateRawMaterial(id, data);
    if (type === "finished-product") return Inventory.updateFinishedProduct(id, data);
  },
  deleteItem: (type, id) => {
    if (type === "raw-material") return Inventory.deleteRawMaterial(id);
    if (type === "finished-product") return Inventory.deleteFinishedProduct(id);
    if (type === "supplier") return Inventory.deleteSupplier(id);
    if (type === "audit") return Inventory.deleteAudit(id);
  },
};

export default Inventory;
