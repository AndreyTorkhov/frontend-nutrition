import { MealType } from "../model/enums";

export interface Meal {
  id: number;
  name: string;
  mealType: MealType;
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
  description: string | null | string;
  createdAt: string; // ISO
  updatedAt: string; // ISO
}

export interface MealsListResponse {
  meals: Meal[];
}
export interface MealResponse {
  meal: Meal;
}

export interface CreateMealPayload {
  name: string;
  mealType: MealType;
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
  description?: string;
}

export type UpdateMealPayload = Partial<CreateMealPayload>;

export type StatsGroupBy = "day" | "week" | "month";

export interface MealsStatisticsResponse {
  statistics: {
    totalMeals: number;
    total: MacroSet;
    averages: Partial<MacroSet>;
    data: Array<{
      date: string; // ISO (если groupBy=day) или начало периода
      calories: number;
      protein: number;
      fat: number;
      carbs: number;
    }>;
  };
}

export interface MacroSet {
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
}
