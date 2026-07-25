import api from "../../../services/api";

export const getDepartments = () => api.get("/departments");
