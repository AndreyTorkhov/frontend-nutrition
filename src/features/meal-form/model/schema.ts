import { z } from "zod";
import { MEAL_TYPE_OPTIONS } from "@/entities/meal/model/constants";

export const mealSchema = z.object({
  name: z.string().min(2, "Минимум 2 символа"),
  mealType: z.enum(MEAL_TYPE_OPTIONS, "Выберите тип приёма пищи"),
  calories: z.number().positive("> 0").max(5000, "Слишком много калорий"),
  protein: z.number().min(0).max(500, "Слишком много белка"),
  fat: z.number().min(0).max(500, "Слишком много жиров"),
  carbs: z.number().min(0).max(800, "Слишком много углеводов"),
  description: z
    .string()
    .max(500, "Максимум 500 символов")
    .optional()
    .or(z.literal("")),
});

export type MealFormValues = z.infer<typeof mealSchema>;
