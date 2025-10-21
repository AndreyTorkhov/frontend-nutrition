import { useState } from "react";
import { z } from "zod";
import { ProfileEditForm } from "../ui/ProfileEditForm";
import { useProfileEditForm } from "../lib/useProfileEditForm";
import { updateProfileSchema } from "../model/schema";
import { useUserStore } from "@/entities/user";

interface Props {
  onSuccess?: () => void;
}

export const ProfileEditFormContainer = ({ onSuccess }: Props) => {
  const form = useProfileEditForm();
  const updateMe = useUserStore((s) => s.updateMe);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: z.infer<typeof updateProfileSchema>) => {
    form.clearErrors("root");
    setIsLoading(true);
    try {
      const patch = Object.fromEntries(
        Object.entries(data).filter(
          ([, v]) => v !== undefined && v !== null && v !== "",
        ),
      );
      await updateMe(patch);
      onSuccess?.();
    } catch (e) {
      form.setError("root", {
        type: "manual",
        message: "Не удалось сохранить изменения",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ProfileEditForm
      form={form}
      isLoading={isLoading}
      onSubmit={handleSubmit}
    />
  );
};
