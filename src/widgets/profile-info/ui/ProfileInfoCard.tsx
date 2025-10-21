import { Card } from "@/shared/ui/card";
import { Badge } from "@/shared/ui/badge";
import { Separator } from "@/shared/ui/separator";
import { Skeleton } from "@/shared/ui/skeleton";
import { useUserStore } from "@/entities/user";
import {
  GENDER_LABELS,
  ACTIVITY_LEVEL_LABELS,
  GOAL_LABELS,
} from "@/entities/user/model/constants";

export const ProfileInfoCard = () => {
  const { me, isMeLoading } = useUserStore();

  if (isMeLoading) {
    return (
      <Card className="p-6 space-y-4">
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-4 w-72" />
        <Separator />
        <div className="grid grid-cols-2 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
      </Card>
    );
  }

  if (!me) {
    return (
      <Card className="p-6">
        <p className="text-sm text-muted-foreground">Профиль не загружен.</p>
      </Card>
    );
  }

  return (
    <Card className="p-6 space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold">{me.name}</h2>
          <p className="text-sm text-muted-foreground">{me.email}</p>
        </div>
        <Badge className="bg-primary/10 text-primary">
          {GOAL_LABELS[me.goal]}
        </Badge>
      </div>

      <Separator />

      <div className="grid md:grid-cols-3 gap-4">
        <Stat label="Пол" value={GENDER_LABELS[me.gender]} />
        <Stat label="Возраст" value={`${me.age}`} />
        <Stat
          label="Активность"
          value={ACTIVITY_LEVEL_LABELS[me.activityLevel]}
        />

        <Stat label="Рост" value={`${me.heightCm} см`} />
        <Stat label="Вес" value={`${me.weightKg} кг`} />
        <Stat label="Целевой вес" value={`${me.targetWeight} кг`} />
      </div>
    </Card>
  );
};

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border bg-card p-4">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="mt-1 text-base font-medium">{value}</div>
    </div>
  );
}
