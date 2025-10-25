import { useMealsStore } from "@/entities/meal";
import { Card } from "@/shared/ui/card";
import { Input } from "@/shared/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { Skeleton } from "@/shared/ui/skeleton";
import { useMealsStatsFilters } from "../lib/useMealsStatsFilters";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export const MealsStats = () => {
  const { startDate, endDate, groupBy, setStartDate, setEndDate, setGroupBy } =
    useMealsStatsFilters();
  const { stats, isStatsLoading } = useMealsStore();

  return (
    <div className="space-y-3">
      {/* Фильтры */}
      <Card className="p-3">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="text-xs text-muted-foreground">С начала</label>
            <Input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div>
            <label className="text-xs text-muted-foreground">По</label>
            <Input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
          <div>
            <label className="text-xs text-muted-foreground">Группировка</label>
            <Select value={groupBy} onValueChange={(v: any) => setGroupBy(v)}>
              <SelectTrigger>
                <SelectValue placeholder="Группировка" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="day">По дням</SelectItem>
                <SelectItem value="week">По неделям</SelectItem>
                <SelectItem value="month">По месяцам</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Тоталы/средние */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {isStatsLoading || !stats ? (
          Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-20 w-full" />
          ))
        ) : (
          <>
            <StatCard
              label="Ккал всего"
              value={stats.total.calories.toFixed(0)}
            />
            <StatCard
              label="Белки ср."
              value={fmtAvg(stats.averages.protein)}
            />
            <StatCard label="Жиры ср." value={fmtAvg(stats.averages.fat)} />
            <StatCard
              label="Углеводы ср."
              value={fmtAvg(stats.averages.carbs)}
            />
          </>
        )}
      </div>

      {/* График */}
      <Card className="p-3">
        {isStatsLoading || !stats ? (
          <Skeleton className="h-56 w-full" />
        ) : stats.data.length === 0 ? (
          <div className="h-40 flex items-center justify-center text-sm text-muted-foreground">
            Нет данных за выбранный период
          </div>
        ) : (
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stats.data}>
                <defs>
                  <linearGradient id="kcal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopOpacity={0.35} />
                    <stop offset="95%" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="calories"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#kcal)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
      </Card>
    </div>
  );
};

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <Card className="p-3">
      <div className="text-[10px] uppercase tracking-wide text-muted-foreground">
        {label}
      </div>
      <div className="mt-1 text-lg font-semibold">{value}</div>
    </Card>
  );
}

function fmtAvg(n: number | null | undefined) {
  return n == null ? "—" : Number(n).toFixed(1);
}
