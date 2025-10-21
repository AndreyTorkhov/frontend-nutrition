import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { useUserStore } from "@/entities/user";
import { ROUTES } from "@/shared/configs/routes";

interface Props {
  redirectTo?: string;
}

export const DeleteAccountDialog = ({
  redirectTo = ROUTES.REGISTER,
}: Props) => {
  const [open, setOpen] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const disabled = confirmText !== "DELETE" || loading;

  // странная тема, проверить надо
  const onConfirm = async () => {
    if (disabled) return;
    setLoading(true);
    try {
      await fetch(`${import.meta.env.VITE_BASE_URL}/users/me`, {
        method: "DELETE",
        credentials: "include",
      });

      useUserStore.getState().clear();
      setOpen(false);
      navigate(redirectTo);
    } catch (e) {
      console.error("Ошибка при удалении аккаунта", e);
    } finally {
      setLoading(false);
      setConfirmText("");
    }
  };
  return (
    <AlertDialog open={open} onOpenChange={(v) => !loading && setOpen(v)}>
      <AlertDialogTrigger asChild>
        <Button
          variant="destructive"
          className="gap-2 sm:w-auto w-full"
          onClick={() => setOpen(true)}
        >
          <Trash2 className="h-4 w-4" />
          Удалить аккаунт
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="w-full max-w-full h-dvh sm:h-auto sm:max-w-[440px] sm:rounded-xl rounded-none flex flex-col">
        <div className="flex-1 overflow-y-auto px-1">
          <AlertDialogHeader className="space-y-3 px-3 pt-3">
            <AlertDialogTitle>Подтвердите удаление аккаунта</AlertDialogTitle>
            <AlertDialogDescription className="space-y-2 px-0.5">
              <p>
                Это действие{" "}
                <span className="font-medium text-foreground">необратимо</span>.
              </p>
              <p className="text-muted-foreground">
                Введите{" "}
                <span className="font-mono px-1 py-0.5 rounded bg-muted text-foreground">
                  DELETE
                </span>{" "}
                для подтверждения.
              </p>
              <div className="pt-1">
                <Input
                  autoFocus
                  placeholder="Введите: DELETE"
                  value={confirmText}
                  onChange={(e) => setConfirmText(e.target.value)}
                />
              </div>
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
              onClick={onConfirm}
              disabled={disabled}
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
