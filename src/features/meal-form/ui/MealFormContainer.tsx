import { useState } from "react";
import { z } from "zod";
import type { Meal } from "@/entities/meal";
import { useMealsStore } from "@/entities/meal";
import { useMealForm } from "../lib/useMealForm";
import { mealSchema } from "../model/schema";
import { MealForm } from "../ui/MealForm";

interface Props {
  meal?: Meal | null;
  onSuccess?: (saved: Meal) => void;
}

export const MealFormContainer = ({ meal, onSuccess }: Props) => {
  const form = useMealForm(meal);
  const createMeal = useMealsStore((s) => s.createMeal);
  const updateMeal = useMealsStore((s) => s.updateMeal);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: z.infer<typeof mealSchema>) => {
    form.clearErrors("root");
    setIsLoading(true);
    try {
      const payload = {
        name: data.name.trim(),
        mealType: data.mealType,
        calories: Number(data.calories),
        protein: Number(data.protein),
        fat: Number(data.fat),
        carbs: Number(data.carbs),
        description: data.description?.trim() || "",
      };

      const saved = meal
        ? await updateMeal(meal.id, payload)
        : await createMeal(payload);

      onSuccess?.(saved);
    } catch (e) {
      form.setError("root", {
        type: "manual",
        message: "Не удалось сохранить блюдо",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MealForm
      form={form}
      isLoading={isLoading}
      onSubmit={handleSubmit}
      submitLabel={meal ? "Сохранить изменения" : "Добавить блюдо"}
    />
  );
};
