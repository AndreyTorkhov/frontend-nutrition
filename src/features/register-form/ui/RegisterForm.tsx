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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { Link } from "react-router-dom";
import { ROUTES } from "@/shared/configs/routes";
import type { RegisterFormValues } from "../model/schema";
import {
  GENDER_OPTIONS,
  ACTIVITY_OPTIONS,
  GOAL_OPTIONS,
} from "@/entities/user/model/enums";
import {
  GENDER_LABELS,
  ACTIVITY_LEVEL_LABELS,
  GOAL_LABELS,
} from "@/entities/user/model/constants";
import { ActivityLevel, Gender, GoalType } from "@/entities/user/model/enums";

interface Props {
  form: UseFormReturn<RegisterFormValues>;
  isLoading: boolean;
  onSubmit: (data: RegisterFormValues) => void;
}

export const RegisterForm = ({ form, isLoading, onSubmit }: Props) => {
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
    <div className="min-h-[80vh] w-full flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="rounded-2xl shadow-lg p-6 mt-10 md:p-8 bg-background/70 backdrop-blur border">
          <Form {...form}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              onChange={handleInputChange}
              className="flex flex-col gap-4"
            >
              <h1 className="text-2xl font-bold tracking-tight">Регистрация</h1>

              {errors.root && (
                <p className="text-destructive text-sm">
                  {errors.root.message}
                </p>
              )}

              <FormField
                control={control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Имя</FormLabel>
                    <FormControl>
                      <Input placeholder="Введите имя" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Введите email"
                        {...field}
                      />
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

              <FormField
                control={control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Возраст</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Введите возраст"
                        {...field}
                        value={field.value === 0 ? "" : field.value}
                        onChange={(e) => {
                          const val = e.target.value;
                          field.onChange(val === "" ? 0 : parseFloat(val));
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Пол</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите пол" />
                        </SelectTrigger>
                        <SelectContent>
                          {GENDER_OPTIONS.map((value: Gender) => (
                            <SelectItem key={value} value={value}>
                              {GENDER_LABELS[value]}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="heightCm"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Рост (см)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.1"
                        placeholder="Введите рост"
                        {...field}
                        value={field.value === 0 ? "" : field.value}
                        onChange={(e) => {
                          const val = e.target.value;
                          field.onChange(val === "" ? 0 : parseFloat(val));
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="weightKg"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Вес (кг)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.1"
                        placeholder="Введите вес"
                        {...field}
                        value={field.value === 0 ? "" : field.value}
                        onChange={(e) => {
                          const val = e.target.value;
                          field.onChange(val === "" ? 0 : parseFloat(val));
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="targetWeight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Целевой вес (кг)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.1"
                        placeholder="Введите целевой вес"
                        {...field}
                        value={field.value === 0 ? "" : field.value}
                        onChange={(e) => {
                          const val = e.target.value;
                          field.onChange(val === "" ? 0 : parseFloat(val));
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="activityLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Уровень активности</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите уровень активности" />
                        </SelectTrigger>
                        <SelectContent>
                          {ACTIVITY_OPTIONS.map((value: ActivityLevel) => (
                            <SelectItem key={value} value={value}>
                              {ACTIVITY_LEVEL_LABELS[value]}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="goal"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Цель</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите цель" />
                        </SelectTrigger>
                        <SelectContent>
                          {GOAL_OPTIONS.map((value: GoalType) => (
                            <SelectItem key={value} value={value}>
                              {GOAL_LABELS[value]}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={isLoading}
                aria-busy={isLoading}
                className="mt-2"
              >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Зарегистрироваться
              </Button>

              <p className="text-sm text-muted-foreground text-center">
                Уже есть аккаунт?{" "}
                <Link
                  to={ROUTES.LOGIN}
                  className="text-primary underline-offset-4 hover:underline"
                >
                  Войти
                </Link>
              </p>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};
