import api from "./api"; // your existing axios instance with JWT setup

const FinanceAPI = {
  // Accounts
  getAccounts: () => api.get("/finance/accounts/"),
  getAccount: (id) => api.get(`/finance/accounts/${id}/`),
  createAccount: (data) => api.post("/finance/accounts/", data),
  updateAccount: (id, data) => api.put(`/finance/accounts/${id}/`, data),
  deleteAccount: (id) => api.delete(`/finance/accounts/${id}/`),

  // Transactions
  getTransactions: () => api.get("/finance/transactions/"),
  getTransaction: (id) => api.get(`/finance/transactions/${id}/`),
  createTransaction: (data) => api.post("/finance/transactions/", data),
  updateTransaction: (id, data) => api.put(`/finance/transactions/${id}/`, data),
  deleteTransaction: (id) => api.delete(`/finance/transactions/${id}/`),

  // Invoices
  getInvoices: () => api.get("/finance/invoices/"),
  getInvoice: (id) => api.get(`/finance/invoices/${id}/`),
  createInvoice: (data) => api.post("/finance/invoices/", data),
  updateInvoice: (id, data) => api.put(`/finance/invoices/${id}/`, data),
  deleteInvoice: (id) => api.delete(`/finance/invoices/${id}/`),

  // Audit Logs
  getAuditLogs: () => api.get("/finance/audit-logs/"),
  getAuditLog: (id) => api.get(`/finance/audit-logs/${id}/`),
  createAuditLog: (data) => api.post("/finance/audit-logs/", data),
  deleteAuditLog: (id) => api.delete(`/finance/audit-logs/${id}/`),
};

export default FinanceAPI;
