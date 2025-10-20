import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useRegisterForm } from "../lib/useRegisterForm";
import { RegisterForm } from "../ui/RegisterForm";
import { registerSchema } from "../model/schema";
import { AuthService } from "@/entities/auth/api";
import { useUserStore } from "@/entities/user";
import { ROUTES } from "@/shared/configs/routes";

interface Props {
  onSuccess: () => void;
}

export const RegisterFormContainer = ({ onSuccess }: Props) => {
  const form = useRegisterForm();
  const navigate = useNavigate();
  const fetchMe = useUserStore((s) => s.fetchMe);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: z.infer<typeof registerSchema>) => {
    form.clearErrors("root");
    setIsLoading(true);
    try {
      await AuthService.register(data);
      await fetchMe();
      navigate(ROUTES.HOME);
      onSuccess();
    } catch (e: any) {
      form.setError("root", { type: "manual", message: "Ошибка регистрации" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <RegisterForm form={form} isLoading={isLoading} onSubmit={handleSubmit} />
  );
};
