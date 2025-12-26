import api from "./api"; // axios instance (baseURL + JWT header)

const CRM = {
  // ---------------- CUSTOMERS ----------------
  getCustomers: () => api.get("/crm/customers/").then((res) => res.data),
  getCustomer: (id) => api.get(`/crm/customers/${id}/`).then((res) => res.data),
  createCustomer: (data) => api.post("/crm/customers/", data).then((res) => res.data),
  updateCustomer: (id, data) => api.put(`/crm/customers/${id}/`, data).then((res) => res.data),
  deleteCustomer: (id) => api.delete(`/crm/customers/${id}/`).then((res) => res.data),

  // ---------------- LEADS ----------------
  getLeads: () => api.get("/crm/leads/").then((res) => res.data),
  getLead: (id) => api.get(`/crm/leads/${id}/`).then((res) => res.data),
  createLead: (data) => api.post("/crm/leads/", data).then((res) => res.data),
  updateLead: (id, data) => api.put(`/crm/leads/${id}/`, data).then((res) => res.data),
  deleteLead: (id) => api.delete(`/crm/leads/${id}/`).then((res) => res.data),

  // ---------------- INTERACTIONS ----------------
  getInteractions: () => api.get("/crm/interactions/").then((res) => res.data),
  createInteraction: (data) => api.post("/crm/interactions/", data).then((res) => res.data),

  // ---------------- CAMPAIGNS ----------------
  getCampaigns: () => api.get("/crm/campaigns/").then((res) => res.data),
  getCampaign: (id) => api.get(`/crm/campaigns/${id}/`).then((res) => res.data),
  createCampaign: (data) => api.post("/crm/campaigns/", data).then((res) => res.data),
  updateCampaign: (id, data) => api.put(`/crm/campaigns/${id}/`, data).then((res) => res.data),
  deleteCampaign: (id) => api.delete(`/crm/campaigns/${id}/`).then((res) => res.data),

  // ---------------- SUPPORT TICKETS ----------------
  getTickets: () => api.get("/crm/tickets/").then((res) => res.data),
  getTicket: (id) => api.get(`/crm/tickets/${id}/`).then((res) => res.data),
  createTicket: (data) => api.post("/crm/tickets/", data).then((res) => res.data),
  updateTicket: (id, data) => api.put(`/crm/tickets/${id}/`, data).then((res) => res.data),
  deleteTicket: (id) => api.delete(`/crm/tickets/${id}/`).then((res) => res.data),

  // -------- Helper Methods --------
  createItem: (type, data) => {
    if (type === "customer") return CRM.createCustomer(data);
    if (type === "lead") return CRM.createLead(data);
    if (type === "campaign") return CRM.createCampaign(data);
    if (type === "ticket") return CRM.createTicket(data);
    if (type === "interaction") return CRM.createInteraction(data);
  },

  updateItem: (type, id, data) => {
    if (type === "customer") return CRM.updateCustomer(id, data);
    if (type === "lead") return CRM.updateLead(id, data);
    if (type === "campaign") return CRM.updateCampaign(id, data);
    if (type === "ticket") return CRM.updateTicket(id, data);
  },

  deleteItem: (type, id) => {
    if (type === "customer") return CRM.deleteCustomer(id);
    if (type === "lead") return CRM.deleteLead(id);
    if (type === "campaign") return CRM.deleteCampaign(id);
    if (type === "ticket") return CRM.deleteTicket(id);
  },
};

export default CRM;
