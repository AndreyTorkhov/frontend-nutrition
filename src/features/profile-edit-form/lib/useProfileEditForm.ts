import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  updateProfileSchema,
  type UpdateProfileFormValues,
} from "../model/schema";
import { useUserStore } from "@/entities/user";
import { Gender, ActivityLevel, GoalType } from "@/entities/user/model/enums";

function makeDefaults(
  me: ReturnType<typeof useUserStore.getState>["me"],
): UpdateProfileFormValues {
  if (!me)
    return {
      name: "",
      email: "",
      age: 0,
      gender: Gender.MALE,
      heightCm: 0,
      weightKg: 0,
      targetWeight: 0,
      activityLevel: ActivityLevel.SEDENTARY,
      goal: GoalType.LOSE_WEIGHT,
    };
  return {
    name: me.name,
    email: me.email,
    age: me.age,
    gender: me.gender,
    heightCm: me.heightCm,
    weightKg: me.weightKg,
    targetWeight: me.targetWeight,
    activityLevel: me.activityLevel,
    goal: me.goal,
  };
}
export const useProfileEditForm = () => {
  const me = useUserStore((s) => s.me);

  const defaultValues = useMemo(() => makeDefaults(me), [me]);

  const form = useForm<UpdateProfileFormValues>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues,
    mode: "onSubmit",
  });

  useEffect(() => {
    form.reset(defaultValues);
  }, [defaultValues, form]);

  return form;
};
