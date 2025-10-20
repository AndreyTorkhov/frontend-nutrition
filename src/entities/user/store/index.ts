import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User, UpdateUserPayload } from "../types";
import { UsersService } from "../api";

interface UserStoreState {
  me: User | null;
  isMeLoading: boolean;
  meError: string | null;

  list: User[];
  isListLoading: boolean;
  listError: string | null;

  setMe: (user: User | null) => void;
  fetchMe: () => Promise<void>;
  updateMe: (patch: UpdateUserPayload) => Promise<void>;
  deleteMe: () => Promise<void>;

  fetchUsers: () => Promise<void>;
  clear: () => void;
}

export const useUserStore = create<UserStoreState>()(
  persist(
    (set, _) => ({
      me: null,
      isMeLoading: false,
      meError: null,

      list: [],
      isListLoading: false,
      listError: null,

      setMe: (user) => set({ me: user }),

      fetchMe: async () => {
        set({ isMeLoading: true, meError: null });
        try {
          const { data } = await UsersService.getMe();
          set({ me: data.user });
        } catch (e) {
          set({ meError: "Не удалось получить профиль", me: null });
        } finally {
          set({ isMeLoading: false });
        }
      },

      updateMe: async (patch: UpdateUserPayload) => {
        set({ isMeLoading: true, meError: null });
        try {
          const { data } = await UsersService.updateMe(patch);
          set({ me: data.user });
        } catch (e) {
          set({ meError: "Не удалось обновить профиль" });
          throw e;
        } finally {
          set({ isMeLoading: false });
        }
      },

      deleteMe: async () => {
        set({ isMeLoading: true, meError: null });
        try {
          await UsersService.deleteMe();
          set({ me: null });
        } catch (e) {
          set({ meError: "Не удалось удалить профиль" });
          throw e;
        } finally {
          set({ isMeLoading: false });
        }
      },

      fetchUsers: async () => {
        set({ isListLoading: true, listError: null });
        try {
          const { data } = await UsersService.getUsers();
          set({ list: data.users });
        } catch (e) {
          set({
            listError: "Не удалось получить список пользователей",
            list: [],
          });
        } finally {
          set({ isListLoading: false });
        }
      },

      clear: () => set({ me: null, list: [] }),
    }),
    {
      name: "user-store",
      partialize: (s) => ({ me: s.me }),
    },
  ),
);
