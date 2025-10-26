import { useEffect, useMemo, useState, useCallback } from "react";
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
  const meals = useMealsStore((s) => s.items);

  const refetch = useCallback(() => {
    fetchStats({ startDate, endDate, groupBy });
  }, [fetchStats, startDate, endDate, groupBy, meals]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return {
    startDate,
    endDate,
    groupBy,
    setStartDate,
    setEndDate,
    setGroupBy,
    refetch,
  };
};
