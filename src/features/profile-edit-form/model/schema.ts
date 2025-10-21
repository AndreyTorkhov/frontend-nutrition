import { z } from "zod";
import {
  ACTIVITY_OPTIONS,
  GENDER_OPTIONS,
  GOAL_OPTIONS,
} from "@/entities/user/model/enums";

export const updateProfileSchema = z.object({
  name: z.string().min(2, "Имя должно содержать минимум 2 символа"),
  email: z.email("Введите корректный email"),
  age: z
    .number()
    .min(16, "Возраст должен быть не менее 16 лет")
    .max(120, "Некорректный возраст"),
  gender: z.enum(GENDER_OPTIONS, "Необходимо сделать выбор"),
  heightCm: z
    .number()
    .min(100, "Рост должен быть не менее 100 см")
    .max(250, "Некорректный рост"),
  weightKg: z
    .number()
    .min(30, "Вес должен быть не менее 30 кг")
    .max(300, "Некорректный вес"),
  targetWeight: z
    .number()
    .min(30, "Целевой вес должен быть не менее 30 кг")
    .max(300, "Некорректный целевой вес"),
  activityLevel: z.enum(ACTIVITY_OPTIONS, "Необходимо сделать выбор"),
  goal: z.enum(GOAL_OPTIONS, "Необходимо сделать выбор"),
});

export type UpdateProfileFormValues = z.infer<typeof updateProfileSchema>;
