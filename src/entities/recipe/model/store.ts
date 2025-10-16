import { makeAutoObservable } from "mobx";
import type { Recipe } from "./types";
import { mockRecipes } from "../../../shared/api/mock";
import { searchStore } from "../../../features/search-recipe/model/store";
import { filterStore } from "../../../features/filter-recipe/model/store";

class RecipesStore {
  items: Recipe[] = [];
  current: Recipe | null = null;

  constructor() {
    makeAutoObservable(this);
    this.items = mockRecipes; // TODO: заменить на API
  }

  get filtered(): Recipe[] {
    const q = searchStore.query.trim().toLowerCase();
    const { tags, maxTime } = filterStore;
    return this.items.filter((r) => {
      const byQuery =
        !q ||
        r.title.toLowerCase().includes(q) ||
        r.short.toLowerCase().includes(q);
      const byTags = !tags.length || tags.every((t) => r.tags.includes(t));
      const byTime = !maxTime || r.timeMin <= maxTime;
      return byQuery && byTags && byTime;
    });
  }

  loadById(id: string) {
    this.current = this.items.find((r) => r.id === id) ?? null;
  }
}

export const recipesStore = new RecipesStore();
