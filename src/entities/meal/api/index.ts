import { $api } from "@/shared/configs/axios";
import type {
  MealsListResponse,
  MealResponse,
  CreateMealPayload,
  UpdateMealPayload,
  MealsStatisticsResponse,
  StatsGroupBy,
} from "../types";

const getMyMeals = () => $api.get<MealsListResponse>("/meals/me");

const createMyMeal = (body: CreateMealPayload) =>
  $api.post<MealResponse>("/meals/me", body);

const updateMyMeal = (id: number, body: UpdateMealPayload) =>
  $api.patch<MealResponse>(`/meals/me/${id}`, body);

/**
Сразу не удалилось
 */
const deleteMyMeal = async (id: number) => {
  $api.delete<MealResponse>(`/meals/me/${id}`);
};

const getMyMealsStatistics = (p: {
  startDate: string;
  endDate: string;
  groupBy?: StatsGroupBy;
}) => {
  const params = new URLSearchParams({
    startDate: p.startDate,
    endDate: p.endDate,
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
