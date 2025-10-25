import { useEffect, useState } from "react";
import { Card } from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";
import { Plus, RefreshCw } from "lucide-react";
import { useMealsStore } from "@/entities/meal";
import { MealFormContainer } from "@/features/meal-form";
import { MealsStats } from "@/features/meals-stats";
import { MealCard } from "@/widgets/meal-card";

export const HomePage = () => {
  const { items, fetchMyMeals, isLoading } = useMealsStore();

  const [isCreating, setIsCreating] = useState(false);
  const [editingMeal, setEditingMeal] = useState<number | null>(null);

  useEffect(() => {
    if (items.length === 0) fetchMyMeals();
  }, [items.length, fetchMyMeals]);

  const editingEntity = items.find((m) => m.id === editingMeal) ?? null;

  return (
    <div className="h-full max-w-screen-sm mx-auto flex flex-col">
      <div className="px-4 pt-4 pb-3 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Мои блюда</h1>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => fetchMyMeals()}
            disabled={isLoading}
          >
            <RefreshCw className="h-4 w-4 mr-1" /> Обновить
          </Button>
          <Button size="sm" onClick={() => setIsCreating((v) => !v)}>
            <Plus className="h-4 w-4 mr-1" /> Добавить
          </Button>
        </div>
      </div>

      <div className="px-4 md:pb-6 space-y-4 overflow-y-auto">
        {isCreating && (
          <MealFormContainer onSuccess={() => setIsCreating(false)} />
        )}

        {editingEntity && (
          <MealFormContainer
            meal={editingEntity}
            onSuccess={() => setEditingMeal(null)}
          />
        )}

        <MealsStats />

        <Card className="p-2">
          <div className="space-y-2">
            {items.map((m) => (
              <MealCard
                key={m.id}
                meal={m}
                onEdit={() => setEditingMeal(m.id)}
              />
            ))}
            {items.length === 0 && (
              <div className="py-10 text-center text-sm text-muted-foreground">
                Ещё нет блюд. Добавь первое блюдо!
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};
