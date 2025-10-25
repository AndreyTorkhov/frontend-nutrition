import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/shared/ui/alert-dialog";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Loader2, Trash2 } from "lucide-react";
import { useMealsStore } from "@/entities/meal";

interface Props {
  mealId: number;
  mealName?: string;
  triggerClassName?: string;
  onDeleted?: () => void;
}

export const DeleteMealDialog = ({
  mealId,
  mealName,
  triggerClassName,
  onDeleted,
}: Props) => {
  const [open, setOpen] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const [loading, setLoading] = useState(false);
  const deleteMeal = useMealsStore((s) => s.deleteMeal);

  const disabled = confirmText !== "DELETE" || loading;

  const onConfirm = async () => {
    if (disabled) return;
    setLoading(true);
    try {
      await deleteMeal(mealId);
      setOpen(false);
      onDeleted?.();
    } finally {
      setLoading(false);
      setConfirmText("");
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={(v) => !loading && setOpen(v)}>
      <AlertDialogTrigger asChild>
        <Button
          size="sm"
          variant="destructive"
          className={triggerClassName ?? "gap-2 w-full sm:w-auto"}
          onClick={() => setOpen(true)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="w-full max-w-full h-dvh sm:h-auto sm:max-w-[440px] sm:rounded-xl rounded-none flex flex-col">
        <div className="flex-1 overflow-y-auto px-1">
          <AlertDialogHeader className="space-y-3 px-3 pt-3">
            <AlertDialogTitle>Удалить блюдо?</AlertDialogTitle>
            <AlertDialogDescription className="space-y-2">
              <p>
                Действие необратимо. Будет удалено блюдо
                {mealName ? ` «${mealName}»` : ""}.
              </p>
              <p className="text-muted-foreground">
                Для подтверждения введите{" "}
                <span className="font-mono bg-muted px-1 rounded">DELETE</span>.
              </p>
              <Input
                autoFocus
                placeholder="Введите: DELETE"
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                className="mt-1"
              />
            </AlertDialogDescription>
          </AlertDialogHeader>
        </div>

        <AlertDialogFooter className="px-3 pb-4 pt-2 border-t bg-background">
          <AlertDialogCancel disabled={loading} className="w-full sm:w-auto">
            Отмена
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              variant="destructive"
              disabled={disabled}
              onClick={onConfirm}
              className="w-full sm:w-auto gap-2"
            >
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              Да, удалить
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
