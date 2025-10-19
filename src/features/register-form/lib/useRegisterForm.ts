import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterFormValues } from "../model/schema";

export const useRegisterForm = () =>
  useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      age: 0,
      gender: undefined,
      heightCm: 0,
      weightKg: 0,
      targetWeight: 0,
      activityLevel: undefined,
      goal: undefined,
    },
    mode: "onSubmit",
  });
