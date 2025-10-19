import { ActivityLevel, Gender, GoalType } from "./enums";

export const GENDER_LABELS: Record<Gender, string> = {
  [Gender.MALE]: "Мужской",
  [Gender.FEMALE]: "Женский",
};

export const ACTIVITY_LEVEL_LABELS: Record<ActivityLevel, string> = {
  [ActivityLevel.SEDENTARY]: "Сидячий",
  [ActivityLevel.LIGHTLY_ACTIVE]: "Легкая активность",
  [ActivityLevel.MODERATELY_ACTIVE]: "Умеренная активность",
  [ActivityLevel.VERY_ACTIVE]: "Высокая активность",
};

export const GOAL_LABELS: Record<GoalType, string> = {
  [GoalType.LOSE_WEIGHT]: "Похудеть",
  [GoalType.MAINTAIN_WEIGHT]: "Поддерживать вес",
  [GoalType.GAIN_WEIGHT]: "Набрать вес",
};
