import { Card } from "@/shared/ui/card";
import { DeleteAccountDialog } from "@/features/profile-delete";
import { ShieldAlert } from "lucide-react";

export const DangerZone = () => {
  return (
    <Card className="p-4 border-destructive/30">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-3">
          <ShieldAlert className="h-5 w-5 text-destructive mt-0.5 shrink-0" />
          <div>
            <h3 className="font-semibold">Внимание!</h3>
            <p className="text-sm text-muted-foreground">
              Удаление аккаунта приведёт к безвозвратной потере данных и
              прогресса.
            </p>
          </div>
        </div>
        <DeleteAccountDialog />
      </div>
    </Card>
  );
};
