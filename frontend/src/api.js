import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "/api",
  timeout: 8000,
  headers: { "Content-Type": "application/json" },
});

let accessToken = null;

export function setAccessToken(token) {
  accessToken = token;
}

api.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error)) {
      const message =
        typeof error.response?.data?.error === "string"
          ? error.response.data.error
          : typeof error.response?.data?.message === "string"
            ? error.response.data.message
            : error.code === "ECONNABORTED"
              ? "The API request timed out."
              : error.message;
      return Promise.reject(new Error(message));
    }
    return Promise.reject(error);
  },
);
