import { $api } from "@/shared/configs/axios";
import type { UploadResponse } from "@/features/photo-input/types";

export const MediaService = {
  uploadPhoto: (file: File) => {
    const form = new FormData();
    form.append("file", file);
    return $api.post<UploadResponse>("/media/photos", form, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
  deletePhoto: (id: string) => $api.delete(`/media/photos/${id}`),
};
