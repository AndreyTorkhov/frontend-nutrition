import { type UseFormReturn } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";
import { Loader2 } from "lucide-react";
import type { LoginFormValues } from "../model/schema";

interface Props {
  form: UseFormReturn<LoginFormValues>;
  isLoading: boolean;
  onSubmit: (data: LoginFormValues) => void;
}

export const LoginForm = ({ form, isLoading, onSubmit }: Props) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    clearErrors,
  } = form;

  const handleInputChange = () => {
    if (errors.root) clearErrors("root");
  };

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        onChange={handleInputChange}
        className="flex flex-col gap-4 max-w-md w-full"
      >
        <h1 className="text-2xl font-bold">Авторизация</h1>

        {errors.root && (
          <p className="text-destructive text-sm">{errors.root.message}</p>
        )}

        <FormField
          control={control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Введите email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Пароль</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Введите пароль"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isLoading} aria-busy={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Войти
        </Button>
      </form>
    </Form>
  );
};
