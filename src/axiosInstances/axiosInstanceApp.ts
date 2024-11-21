import axios from "axios";
import { TOKEN_KEY } from "@/constants";

function getBaseUrl() {
  console.log(import.meta.env.MODE);
  switch (import.meta.env.MODE) {
    case "development":
      return "https://dev.tob-insurance.com/rlc-api-staging/api";
    case "uat":
      return "https://dev.tob-insurance.com/rlc-api-uat/api";
    case "production":
      return "https://genius.tob-insurance.com/firm-api/api";
    default:
      return "";
  }
}

export const axiosInstanceApp = axios.create({
  baseURL: getBaseUrl(),
});
axiosInstanceApp.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (config.headers) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});