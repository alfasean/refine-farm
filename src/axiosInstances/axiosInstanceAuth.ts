import { TOKEN_KEY } from "@/constants";
import axios from "axios";

export const axiosInstanceAuth = axios.create({
  baseURL: 'https://genius.tob-insurance.com/auth-api',
});

axiosInstanceAuth.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (config.headers) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});