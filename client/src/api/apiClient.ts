import axios from "axios";
import { refreshAccessToken } from "./auth";
import { ERoutes } from "../types/links";

const API_URL = import.meta.env.VITE_API_URL;

export const apiClient = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

apiClient.defaults.headers.common["Content-Type"] = "application/json";

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const errMessage = error.response.data.message as string;

    if (
      errMessage.includes("You are not logged in!") &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      await refreshAccessToken();
      return apiClient(originalRequest);
    }
    if (error.response.data.message.includes("Failed to refresh")) {
      document.location.href = ERoutes.authpage;
    }
    return Promise.reject(error);
  }
);
