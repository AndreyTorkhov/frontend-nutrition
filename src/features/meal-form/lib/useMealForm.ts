import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Meal } from "@/entities/meal";
import { mealSchema, type MealFormValues } from "../model/schema";
import { MealType } from "@/entities/meal/model/enums";

function makeDefaults(meal?: Meal | null): MealFormValues {
  if (!meal) {
    return {
      name: "",
      mealType: MealType.LUNCH,
      calories: 0,
      protein: 0,
      fat: 0,
      carbs: 0,
      description: "",
    };
  }
  return {
    name: meal.name,
    mealType: meal.mealType,
    calories: meal.calories,
    protein: meal.protein,
    fat: meal.fat,
    carbs: meal.carbs,
    description: meal.description ?? "",
  };
}

export const useMealForm = (meal?: Meal | null) => {
  const defaults = useMemo(() => makeDefaults(meal ?? undefined), [meal]);

  const form = useForm<MealFormValues>({
    resolver: zodResolver(mealSchema),
    defaultValues: defaults,
    mode: "onSubmit",
  });

  useEffect(() => {
    form.reset(defaults);
  }, [defaults, form]);

  return form;
};
