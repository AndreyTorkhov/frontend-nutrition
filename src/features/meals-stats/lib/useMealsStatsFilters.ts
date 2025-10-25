import { useEffect, useMemo, useState } from "react";
import { useMealsStore } from "@/entities/meal";

const fmt = (d: Date) => d.toISOString().slice(0, 10);

export const useMealsStatsFilters = () => {
  const today = useMemo(() => new Date(), []);
  const startDefault = useMemo(() => {
    const d = new Date(today);
    d.setDate(d.getDate() - 13);
    return d;
  }, [today]);

  const [startDate, setStartDate] = useState(fmt(startDefault));
  const [endDate, setEndDate] = useState(fmt(today));
  const [groupBy, setGroupBy] = useState<"day" | "week" | "month">("day");

  const fetchStats = useMealsStore((s) => s.fetchStats);

  useEffect(() => {
    fetchStats({ startDate, endDate, groupBy });
  }, [startDate, endDate, groupBy, fetchStats]);

  return { startDate, endDate, groupBy, setStartDate, setEndDate, setGroupBy };
};
