import { useState, useMemo } from "react";
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

type Metric = "calories" | "protein" | "fat" | "carbs";

export const MealsStats = () => {
  const { startDate, endDate, groupBy, setStartDate, setEndDate, setGroupBy } =
    useMealsStatsFilters();

  const { stats, isStatsLoading } = useMealsStore();
  const [metric, setMetric] = useState<Metric>("calories");

  const data = useMemo(() => stats?.data ?? [], [stats]);

  return (
    <div className="space-y-3">
      {/* Фильтры */}
      <Card className="p-3">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
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

          {/* выбор метрики */}
          <div>
            <label className="text-xs text-muted-foreground">Метрика</label>
            <Select value={metric} onValueChange={(v: Metric) => setMetric(v)}>
              <SelectTrigger>
                <SelectValue placeholder="Метрика" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="calories">Калории</SelectItem>
                <SelectItem value="protein">Белки</SelectItem>
                <SelectItem value="fat">Жиры</SelectItem>
                <SelectItem value="carbs">Углеводы</SelectItem>
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

      <Card className="p-3 space-y-4">
        {isStatsLoading || !stats ? (
          <>
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-48 w-full" />
          </>
        ) : data.length === 0 ? (
          <div className="h-40 flex items-center justify-center text-sm text-muted-foreground">
            Нет данных за выбранный период
          </div>
        ) : (
          <>
            {/* Чарт 1 — Калории */}
            <div className="h-[220px] md:h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} syncId="meals-sync">
                  <defs>
                    <linearGradient id="g-cal" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="5%"
                        stopColor="var(--color-chart-1)"
                        stopOpacity={0.35}
                      />
                      <stop
                        offset="95%"
                        stopColor="var(--color-chart-1)"
                        stopOpacity={0.05}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="label" tick={{ fontSize: 12 }} />
                  <YAxis
                    tick={{ fontSize: 12 }}
                    domain={[0, "auto"]}
                    allowDecimals={false}
                  />
                  <Tooltip
                    formatter={(v: any) => [Number(v).toFixed(0), "Калории"]}
                    labelFormatter={(l: any) => `Дата: ${l}`}
                    contentStyle={{
                      background: "var(--popover)",
                      borderColor: "var(--border)",
                      color: "var(--popover-foreground)",
                    }}
                    labelStyle={{ color: "var(--popover-foreground)" }}
                    itemStyle={{ color: "var(--popover-foreground)" }}
                    wrapperStyle={{ outline: "none" }}
                  />
                  <Area
                    type="monotone"
                    dataKey="calories"
                    name="Калории"
                    stroke="var(--color-chart-1)"
                    strokeWidth={2}
                    fill="url(#g-cal)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Чарт 2 — Б/Ж/У */}
            <div className="h-[220px] md:h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} syncId="meals-sync">
                  <defs>
                    <linearGradient id="g-pro" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="5%"
                        stopColor="var(--color-chart-2)"
                        stopOpacity={0.35}
                      />
                      <stop
                        offset="95%"
                        stopColor="var(--color-chart-2)"
                        stopOpacity={0.05}
                      />
                    </linearGradient>
                    <linearGradient id="g-fat" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="5%"
                        stopColor="var(--color-chart-3)"
                        stopOpacity={0.35}
                      />
                      <stop
                        offset="95%"
                        stopColor="var(--color-chart-3)"
                        stopOpacity={0.05}
                      />
                    </linearGradient>
                    <linearGradient id="g-carbs" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="5%"
                        stopColor="var(--color-chart-4)"
                        stopOpacity={0.35}
                      />
                      <stop
                        offset="95%"
                        stopColor="var(--color-chart-4)"
                        stopOpacity={0.05}
                      />
                    </linearGradient>
                  </defs>

                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="label" tick={{ fontSize: 12 }} />
                  <YAxis
                    tick={{ fontSize: 12 }}
                    domain={[0, "auto"]}
                    allowDecimals
                  />
                  <Tooltip
                    formatter={(v: any, n: string) => {
                      const map: Record<string, string> = {
                        protein: "Белки",
                        fat: "Жиры",
                        carbs: "Углеводы",
                      };
                      return [Number(v).toFixed(1), map[n] ?? n];
                    }}
                    labelFormatter={(l: any) => `Дата: ${l}`}
                    contentStyle={{
                      background: "var(--popover)",
                      borderColor: "var(--border)",
                      color: "var(--popover-foreground)",
                    }}
                    labelStyle={{ color: "var(--popover-foreground)" }}
                    itemStyle={{ color: "var(--popover-foreground)" }}
                    wrapperStyle={{ outline: "none" }}
                  />
                  {/* Легенда компактнее на мобилке можно скрыть, но оставим */}
                  {/* <Legend verticalAlign="top" height={24} wrapperStyle={{ color: "var(--foreground)" }} /> */}

                  <Area
                    type="monotone"
                    dataKey="protein"
                    name="Белки"
                    stroke="var(--color-chart-2)"
                    strokeWidth={2}
                    fill="url(#g-pro)"
                  />
                  <Area
                    type="monotone"
                    dataKey="fat"
                    name="Жиры"
                    stroke="var(--color-chart-3)"
                    strokeWidth={2}
                    fill="url(#g-fat)"
                  />
                  <Area
                    type="monotone"
                    dataKey="carbs"
                    name="Углеводы"
                    stroke="var(--color-chart-4)"
                    strokeWidth={2}
                    fill="url(#g-carbs)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </>
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
