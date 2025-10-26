import { $api } from "@/shared/configs/axios";
import type {
  UsersListResponse,
  UserResponse,
  UpdateUserPayload,
} from "../types";
import { getAccessFromCookie } from "@/shared/helpers/cookies";

const getUsers = () => $api.get<UsersListResponse>("/users");

const getMe = () => $api.get<UserResponse>("/users/me");

const updateMe = (body: UpdateUserPayload) =>
  $api.patch<UserResponse>("/users/me", body);

const deleteMe = async (): Promise<void> => {
  const token = getAccessFromCookie();
  const res = await fetch(`${import.meta.env.VITE_BASE_URL}/users/me`, {
    method: "DELETE",
    credentials: "include",
    headers: {
      Accept: "application/json",
      ...(token
        ? { Authorization: `Bearer ${decodeURIComponent(token)}` }
        : {}),
    },
  });
  if (!res.ok) throw new Error(`DELETE /users/me failed: ${res.status}`);
};

export const UsersService = { getUsers, getMe, updateMe, deleteMe };
