import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// import { useAuthStore } from "@/entities/auth";
import { LoginForm } from "./LoginForm";
import { loginSchema, type LoginFormValues } from "../model/schema";
// import { useEffect } from "react";

interface Props {
  onSuccess: () => void;
}

export const LoginFormContainer = ({ onSuccess }: Props) => {
  // const { login, isLoading, error } = useAuthStore();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const { clearErrors } = form;

  // useEffect(() => {
  //   if (error) {
  //     setError("email", { type: "manual", message: " " });
  //     setError("password", { type: "manual", message: " " });
  //     setError("root", { type: "manual", message: error });
  //   }
  // }, [error, setError]);

  const handleSubmit = async () => {
    clearErrors("root");
    // const success = await login(data.email, data.password);
    const success = true;
    if (success) onSuccess();
  };

  return <LoginForm form={form} isLoading={false} onSubmit={handleSubmit} />;
};
