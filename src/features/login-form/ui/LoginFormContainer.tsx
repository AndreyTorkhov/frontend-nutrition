import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";

import { LoginForm } from "./LoginForm";
import { AuthService } from "@/entities/auth/api";
import { useUserStore } from "@/entities/user/store";
import { ROUTES } from "@/shared/configs/routes";
import { loginSchema, type LoginFormValues } from "../model/schema";

interface Props {
  onSuccess: () => void;
}

export const LoginFormContainer = ({ onSuccess }: Props) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { fetchMe } = useUserStore();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const handleSubmit = async (data: z.infer<typeof loginSchema>) => {
    setIsLoading(true);
    try {
      await AuthService.login(data);
      await fetchMe();
      navigate(ROUTES.HOME);
    } catch {
      form.setError("email", {
        type: "manual",
        message: "Неверный email или пароль",
      });
      form.setError("password", { type: "manual", message: " " });
    } finally {
      setIsLoading(false);
      onSuccess();
    }
  };

  return (
    <LoginForm form={form} isLoading={isLoading} onSubmit={handleSubmit} />
  );
};
