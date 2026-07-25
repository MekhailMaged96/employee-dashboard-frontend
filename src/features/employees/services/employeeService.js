import api from "../../../services/api";

export const getEmployees = () => api.get("/employee/all");
export const getEmployee = (id) => api.get(`/employee/${id}`);
export const createEmployee = (data) => api.post("/employee/create", data);
export const updateEmployee = (id, data) =>
  api.put(`/employee/update/${id}`, data);
export const deleteEmployee = (id) => api.delete(`/employee/delete/${id}`);
