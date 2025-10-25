import { z } from "zod";
import { type UseFormReturn } from "react-hook-form";
import { Card } from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Textarea } from "@/shared/ui/textarea";
import { Loader2 } from "lucide-react";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/shared/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";

import { mealSchema, type MealFormValues } from "../model/schema";
import { MealType } from "@/entities/meal/model/enums";
import {
  MEAL_TYPE_LABELS,
  MEAL_TYPE_OPTIONS,
} from "@/entities/meal/model/constants";

interface Props {
  form: UseFormReturn<MealFormValues>;
  isLoading: boolean;
  onSubmit: (data: z.infer<typeof mealSchema>) => void;
  submitLabel?: string;
}

export const MealForm = ({
  form,
  isLoading,
  onSubmit,
  submitLabel = "Сохранить",
}: Props) => {
  return (
    <>
      <Card className="p-4 shadow-sm">
        <Form {...form}>
          <form
            className="grid grid-cols-1 gap-3"
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit(onSubmit)(e);
            }}
          >
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Название блюда</FormLabel>
                  <FormControl>
                    <Input placeholder="Напр.: Куриный салат" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="mealType"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Тип приёма</FormLabel>
                  <Select
                    value={field.value ?? undefined}
                    onValueChange={field.onChange}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите тип" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="max-h-64">
                      {MEAL_TYPE_OPTIONS.map((t: MealType) => (
                        <SelectItem key={t} value={t}>
                          {MEAL_TYPE_LABELS[t]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Макросы */}
            <div className="grid grid-cols-3 gap-3">
              <FormField
                name="calories"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ккал</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        inputMode="decimal"
                        value={field.value === 0 ? "" : field.value}
                        onChange={(e) => {
                          const val = e.target.value;
                          field.onChange(val === "" ? 0 : parseFloat(val));
                        }}
                        placeholder="0"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="protein"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Белки, г</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        inputMode="decimal"
                        step="0.1"
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
                name="fat"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Жиры, г</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        inputMode="decimal"
                        step="0.1"
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
            </div>

            <FormField
              name="carbs"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Углеводы, г</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      inputMode="decimal"
                      step="0.1"
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
              name="description"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Описание</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Коротко опиши блюдо, ингредиенты и т.п."
                      value={field.value ?? ""}
                      onChange={(e: { target: { value: any } }) =>
                        field.onChange(e.target.value)
                      }
                      rows={4}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="h-2" />
          </form>
        </Form>
      </Card>

      <div className="fixed bottom-0 left-0 right-0 md:hidden border-t bg-background/85 backdrop-blur px-4 py-3">
        <Button
          className="w-full"
          onClick={() => form.handleSubmit(onSubmit)()}
          disabled={isLoading}
        >
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {submitLabel}
        </Button>
      </div>

      <div className="hidden md:flex justify-end">
        <Button
          onClick={() => form.handleSubmit(onSubmit)()}
          disabled={isLoading}
        >
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {submitLabel}
        </Button>
      </div>
    </>
  );
};
