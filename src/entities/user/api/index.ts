import { $api } from "@/shared/configs/axios";
import type {
  UsersListResponse,
  UserResponse,
  UpdateUserPayload,
} from "../types";

const getUsers = () => $api.get<UsersListResponse>("/users");

const getMe = () => $api.get<UserResponse>("/users/me");

const updateMe = (body: UpdateUserPayload) =>
  $api.patch<UserResponse>("/users/me", body);

const deleteMe = () =>
  $api.request<void>({ url: "/users/me", method: "DELETE" });

export const UsersService = { getUsers, getMe, updateMe, deleteMe };
