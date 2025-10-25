import { MealType } from "./enums";

export const MEAL_TYPE_LABELS: Record<MealType, string> = {
  [MealType.BREAKFAST]: "Завтрак",
  [MealType.LUNCH]: "Обед",
  [MealType.DINNER]: "Ужин",
  [MealType.SNACK]: "Перекус",
};

export const MEAL_TYPE_OPTIONS: MealType[] = Object.values(MealType);
