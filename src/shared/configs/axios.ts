import axios, { AxiosError } from "axios";
import {
  getAccessToken,
  setAccessToken,
  clearAccessToken,
} from "../helpers/cookies";

export const $api = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}/`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

$api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers = config.headers ?? {};
    (config.headers as any).Authorization = `Bearer ${token}`;
  }
  return config;
});

let refreshPromise: Promise<any> | null = null;

function refresh() {
  return $api.post("/auth/refresh").then((res) => {
    const newToken = (res.data as any)?.accessToken;
    if (newToken) setAccessToken(newToken);
    return res;
  });
}

async function refreshWithoutRepeats() {
  if (!refreshPromise) {
    refreshPromise = refresh().finally(() => {
      refreshPromise = null;
    });
  }
  return refreshPromise;
}

$api.interceptors.response.use(
  (res) => res,
  async (error: AxiosError<any, { _isRetry?: boolean }>) => {
    const original = error.config;

    if (original?.url?.includes("/auth/refresh")) {
      clearAccessToken();
      window.location.replace("/login");
      return Promise.reject(error);
    }

    if (
      error.response?.status === 401 &&
      original &&
      !(original.headers as any)._isRetry
    ) {
      (original.headers as any)._isRetry = true;
      try {
        await refreshWithoutRepeats();
        return $api.request(original);
      } catch {
        clearAccessToken();
        window.location.replace("/login");
      }
    }

    return Promise.reject(error);
  },
);
