import { useUserStore } from "@/entities/user";
import type { BodyLoginRequest, BodyRegisterRequest } from "../types";
import { $api } from "@/shared/configs/axios";

const ACCESS_COOKIE = "access";
const ACCESS_TTL_SEC = 60 * 60;

export interface LoginResponse<User = any> {
  accessToken: string;
  user: User;
}

const login = async (body: BodyLoginRequest) => {
  const { data } = await $api.post<LoginResponse>("/auth/login", body);
  if (data?.accessToken) {
    document.cookie = `${ACCESS_COOKIE}=${encodeURIComponent(
      data.accessToken,
    )}; Path=/; SameSite=Lax; Max-Age=${ACCESS_TTL_SEC}`;
  }
  return data;
};

const register = async (body: BodyRegisterRequest) => {
  const { data } = await $api.post<LoginResponse>("/auth/register", body);
  if (data?.accessToken) {
    document.cookie = `access=${encodeURIComponent(
      data.accessToken,
    )}; Path=/; SameSite=Lax; Max-Age=${ACCESS_TTL_SEC}`;
  }
  return data;
};

const logout = async (): Promise<void> => {
  try {
    await $api.get("/auth/logout");
  } finally {
    document.cookie = `access=; Path=/; Max-Age=0; SameSite=Lax`;
    useUserStore.getState().clear?.();
  }
};
export const AuthService = { login, register, logout };
