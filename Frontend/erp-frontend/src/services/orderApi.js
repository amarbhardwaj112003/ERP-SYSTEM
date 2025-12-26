import api from "./api"; // pre-configured axios instance with baseURL and headers

const OrderAPI = {
  // Customers
  getCustomers: () => api.get("/orders/customers/"),
  getCustomer: (id) => api.get(`/orders/customers/${id}/`),
  createCustomer: (data) => api.post("/orders/customers/", data),
  updateCustomer: (id, data) => api.put(`/orders/customers/${id}/`, data),
  deleteCustomer: (id) => api.delete(`/orders/customers/${id}/`),

  // Products
  getProducts: () => api.get("/orders/products/"),
  getProduct: (id) => api.get(`/orders/products/${id}/`),
  createProduct: (data) => api.post("/orders/products/", data),
  updateProduct: (id, data) => api.put(`/orders/products/${id}/`, data),
  deleteProduct: (id) => api.delete(`/orders/products/${id}/`),

  // Orders
  getOrders: () => api.get("/orders/orders/"),
  getOrder: (id) => api.get(`/orders/orders/${id}/`),
  createOrder: (data) => api.post("/orders/orders/", data),
  updateOrder: (id, data) => api.put(`/orders/orders/${id}/`, data),
  deleteOrder: (id) => api.delete(`/orders/orders/${id}/`),

  // Update order status
  updateStatus: (id, status) =>
    api.post(`/orders/orders/${id}/update_status/`, { status }),

  // Generic helpers for Dashboard or modals
  createItem: (type, data) => {
    if (type === "customer") return OrderAPI.createCustomer(data);
    if (type === "product") return OrderAPI.createProduct(data);
    if (type === "order") return OrderAPI.createOrder(data);
  },
  updateItem: (type, id, data) => {
    if (type === "customer") return OrderAPI.updateCustomer(id, data);
    if (type === "product") return OrderAPI.updateProduct(id, data);
    if (type === "order") return OrderAPI.updateOrder(id, data);
  },
  deleteItem: (type, id) => {
    if (type === "customer") return OrderAPI.deleteCustomer(id);
    if (type === "product") return OrderAPI.deleteProduct(id);
    if (type === "order") return OrderAPI.deleteOrder(id);
  },
};

export default OrderAPI;
