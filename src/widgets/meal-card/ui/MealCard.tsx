import { Card } from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";
import { Pencil } from "lucide-react";
import type { Meal } from "@/entities/meal";
import { DeleteMealDialog } from "@/features/meal-delete";

interface Props {
  meal: Meal;
  onEdit?: (meal: Meal) => void;
}

export const MealCard = ({ meal, onEdit }: Props) => {
  return (
    <Card className="p-3 flex flex-col gap-2">
      <div className="flex justify-between items-start gap-3">
        <div className="min-w-0">
          <div className="font-semibold truncate">{meal.name}</div>
          <div className="text-xs text-muted-foreground">
            {meal.mealType} · {meal.calories?.toFixed(0)} ккал · Б:
            {meal.protein} Ж:{meal.fat} У:{meal.carbs}
          </div>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => onEdit?.(meal)}
            aria-label="Редактировать блюдо"
            title="Редактировать"
          >
            <Pencil className="h-4 w-4" />
          </Button>

          <DeleteMealDialog
            mealId={meal.id}
            mealName={meal.name}
            triggerClassName="h-8 w-8 p-0"
          />
        </div>
      </div>

      {!!meal.description && (
        <p className="text-sm text-muted-foreground break-words">
          {meal.description}
        </p>
      )}
    </Card>
  );
};
