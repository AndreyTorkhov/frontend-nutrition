import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Введите корректный email"),
  password: z.string().min(1, "Пароль обязателен"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
