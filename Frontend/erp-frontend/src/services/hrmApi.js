import api from "./api";

const HRM = {
  // Departments
  getDepartments: () => api.get("/hrm/departments/"),
  getDepartment: (id) => api.get(`/hrm/departments/${id}/`),
  createDepartment: (data) => api.post("/hrm/departments/", data),
  updateDepartment: (id, data) => api.put(`/hrm/departments/${id}/`, data),
  deleteDepartment: (id) => api.delete(`/hrm/departments/${id}/`),

  // Employees
  getEmployees: () => api.get("/hrm/employees/"),
  getEmployee: (id) => api.get(`/hrm/employees/${id}/`),
  createEmployee: (data) => api.post("/hrm/employees/", data),
  updateEmployee: (id, data) => api.put(`/hrm/employees/${id}/`, data),
  deleteEmployee: (id) => api.delete(`/hrm/employees/${id}/`),

  // Attendance
  getAttendance: () => api.get("/hrm/attendance/"),
  markAttendance: (data) => api.post("/hrm/attendance/", data),

  // Leaves
  getLeaves: () => api.get("/hrm/leaves/"),
  createLeave: (data) => api.post("/hrm/leaves/", data),

  // Salaries
  getSalaries: () => api.get("/hrm/salaries/"),
  createSalary: (data) => api.post("/hrm/salaries/", data),

  // Documents
  getDocuments: () => api.get("/hrm/documents/"),
  uploadDocument: (formData) =>
    api.post("/hrm/documents/", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  // Performance Reviews
  getReviews: () => api.get("/hrm/reviews/"),
  createReview: (data) => api.post("/hrm/reviews/", data),
};

export default HRM;
