import { ActivityLevel, Gender, GoalType } from "../model/enums";

export interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  gender: Gender;
  heightCm: number;
  weightKg: number;
  targetWeight: number;
  activityLevel: ActivityLevel;
  goal: GoalType;
  createdAt: string; // ISO
  updatedAt: string; // ISO
}

// PATCH /users/me — все поля опциональные (меняешь только то, что нужно)
export type UpdateUserPayload = Partial<{
  name: string;
  email: string;
  password: string;
  age: number;
  gender: Gender;
  heightCm: number;
  weightKg: number;
  targetWeight: number;
  activityLevel: ActivityLevel;
  goal: GoalType;
}>;

export interface UsersListResponse {
  users: User[];
}
export interface UserResponse {
  user: User;
}
