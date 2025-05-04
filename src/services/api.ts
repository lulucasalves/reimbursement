import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    const language = localStorage.getItem("language");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (language) {
      config.headers["Accept-Language"] = language;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // location.reload();
    }
    return Promise.reject(error);
  }
);

export default api;
