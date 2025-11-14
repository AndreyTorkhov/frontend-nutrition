import { create } from "zustand";
import type { UploadResponse } from "@/features/photo-input/types";
import { MediaService } from "@/entities/camera/api"; // поправь путь если другой
import { toast } from "sonner";

type PhotoUploadState = {
  isUploading: boolean;
  lastResponse: UploadResponse | null;
  error: string | null;
  upload: (file: File) => Promise<UploadResponse | null>;
  reset: () => void;
};

export const usePhotoUploadStore = create<PhotoUploadState>((set) => ({
  isUploading: false,
  lastResponse: null,
  error: null,

  reset: () => set({ isUploading: false, lastResponse: null, error: null }),

  upload: async (file: File) => {
    set({ isUploading: true, error: null });

    try {
      const { data } = await MediaService.uploadPhoto(file);
      set({ isUploading: false, lastResponse: data });
      toast.success("Фото загружено");
      return data;
    } catch (e) {
      console.error(e);
      const msg = "Не удалось загрузить фото";
      set({ isUploading: false, error: msg });
      toast.error(msg);
      return null;
    }
  },
}));
