import axios from "axios";
import toast from "react-hot-toast";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

const ERROR_MESSAGES = {
  401: "Unauthorized. Please log in again.",
  403: "You don't have permission to perform this action.",
  500: "Server error. Please try again later.",
};

api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error("API Error:", error.response || error.message);
    const status = error.response?.status;
    const message =
      ERROR_MESSAGES[status] ??
      error.response?.data?.message ??
      (error.request ? "Network error or CORS blocked." : "Something went wrong.");

    toast.error(message);

    if (status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  },
);

export default api;
