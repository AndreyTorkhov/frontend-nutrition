import { $api } from "@/shared/configs/axios";
import type {
  MealsListResponse,
  MealResponse,
  CreateMealPayload,
  UpdateMealPayload,
  MealsStatisticsResponse,
  StatsGroupBy,
} from "../types";
import { getAccessFromCookie } from "@/shared/helpers/cookies";
import { addDays } from "../helpers";

const getMyMeals = () => $api.get<MealsListResponse>("/meals/me");

const createMyMeal = (body: CreateMealPayload) =>
  $api.post<MealResponse>("/meals/me", body);

const updateMyMeal = (id: number, body: UpdateMealPayload) =>
  $api.patch<MealResponse>(`/meals/me/${id}`, body);

/**
Сразу не удалилось
 */
const deleteMyMeal = async (id: number) => {
  const token = getAccessFromCookie();
  const res = await fetch(`${import.meta.env.VITE_BASE_URL}/meals/me/${id}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      ...(token
        ? { Authorization: `Bearer ${decodeURIComponent(token)}` }
        : {}),
    },
    credentials: "include",
  });
  if (!res.ok) throw new Error(`DELETE failed: ${res.status}`);
  return res.json().catch(() => undefined);
};

const getMyMealsStatistics = (p: {
  startDate: string;
  endDate: string;
  groupBy?: StatsGroupBy;
}) => {
  const endExclusive = addDays(p.endDate, 2);
  const params = new URLSearchParams({
    startDate: p.startDate,
    endDate: endExclusive,
    ...(p.groupBy ? { groupBy: p.groupBy } : {}),
  });
  return $api.get<MealsStatisticsResponse>(
    `/meals/me/statistics?${params.toString()}`,
  );
};

export const MealsService = {
  getMyMeals,
  createMyMeal,
  updateMyMeal,
  deleteMyMeal,
  getMyMealsStatistics,
};
