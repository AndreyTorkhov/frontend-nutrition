import { create } from "zustand";
import { persist } from "zustand/middleware";
import { MealsService } from "../api";
import type {
  Meal,
  CreateMealPayload,
  UpdateMealPayload,
  MealsStatisticsResponse,
  StatsGroupBy,
} from "../types";

interface MealsState {
  items: Meal[];
  isLoading: boolean;
  error: string | null;

  stats: MealsStatisticsResponse["statistics"] | null;
  isStatsLoading: boolean;
  statsError: string | null;

  fetchMyMeals: () => Promise<void>;
  createMeal: (payload: CreateMealPayload) => Promise<Meal>;
  updateMeal: (id: number, payload: UpdateMealPayload) => Promise<Meal>;
  deleteMeal: (id: number) => Promise<void>;

  fetchStats: (p: {
    startDate: string;
    endDate: string;
    groupBy?: StatsGroupBy;
  }) => Promise<void>;
  clear: () => void;
}

export const useMealsStore = create<MealsState>()(
  persist(
    (set, get) => ({
      items: [],
      isLoading: false,
      error: null,

      stats: null,
      isStatsLoading: false,
      statsError: null,

      fetchMyMeals: async () => {
        set({ isLoading: true, error: null });
        try {
          const { data } = await MealsService.getMyMeals();
          set({ items: data.meals });
        } catch (e) {
          set({ error: "Не удалось загрузить блюда", items: [] });
        } finally {
          set({ isLoading: false });
        }
      },

      createMeal: async (payload) => {
        set({ isLoading: true, error: null });
        try {
          const { data } = await MealsService.createMyMeal(payload);
          set({ items: [data.meal, ...get().items] });
          return data.meal;
        } catch (e) {
          set({ error: "Не удалось создать блюдо" });
          throw e;
        } finally {
          set({ isLoading: false });
        }
      },

      updateMeal: async (id, payload) => {
        set({ isLoading: true, error: null });
        try {
          const { data } = await MealsService.updateMyMeal(id, payload);
          set({
            items: get().items.map((m) => (m.id === id ? data.meal : m)),
          });
          return data.meal;
        } catch (e) {
          set({ error: "Не удалось обновить блюдо" });
          throw e;
        } finally {
          set({ isLoading: false });
        }
      },

      deleteMeal: async (id) => {
        set({ isLoading: true, error: null });
        const prev = get().items;
        // оптимистично удаляем из стора
        set({ items: prev.filter((m) => m.id !== id) });
        try {
          await MealsService.deleteMyMeal(id);
        } catch (e) {
          // откат на случай ошибки
          set({ error: "Не удалось удалить блюдо", items: prev });
          throw e;
        } finally {
          set({ isLoading: false });
        }
      },

      fetchStats: async (p) => {
        set({ isStatsLoading: true, statsError: null });
        try {
          const { data } = await MealsService.getMyMealsStatistics(p);
          set({ stats: data.statistics });
        } catch (e) {
          set({ statsError: "Не удалось получить статистику", stats: null });
        } finally {
          set({ isStatsLoading: false });
        }
      },

      clear: () =>
        set({ items: [], stats: null, error: null, statsError: null }),
    }),
    {
      name: "meals-store",
      partialize: (s) => ({ items: s.items }),
    },
  ),
);
