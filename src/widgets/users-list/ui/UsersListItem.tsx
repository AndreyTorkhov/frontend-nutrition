import type { User } from "@/entities/user";
import { Badge } from "@/shared/ui/badge";
import {
  GENDER_LABELS,
  ACTIVITY_LEVEL_LABELS,
  GOAL_LABELS,
} from "@/entities/user/model/constants";

export const UsersListItem = ({ user }: { user: User }) => {
  return (
    <div className="rounded-xl border p-4 bg-card">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="text-base font-medium truncate">{user.name}</div>
          <div className="text-xs text-muted-foreground truncate">
            {user.email}
          </div>
        </div>
        <Badge className="bg-primary/10 text-primary shrink-0">
          {GOAL_LABELS[user.goal]}
        </Badge>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
        <Field label="Пол" value={GENDER_LABELS[user.gender]} />
        <Field label="Возраст" value={`${user.age}`} />
        <Field label="Рост" value={`${user.heightCm} см`} />
        <Field label="Вес" value={`${user.weightKg} кг`} />
        <Field label="Цель" value={`${user.targetWeight} кг`} />
        <Field
          label="Активность"
          value={ACTIVITY_LEVEL_LABELS[user.activityLevel]}
        />
      </div>
    </div>
  );
};

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border bg-background px-3 py-2">
      <div className="text-[10px] uppercase tracking-wide text-muted-foreground">
        {label}
      </div>
      <div className="mt-0.5 font-medium">{value}</div>
    </div>
  );
}
