export enum GoalType {
  LOSE_WEIGHT = "LOSE_WEIGHT",
  MAINTAIN_WEIGHT = "MAINTAIN_WEIGHT",
  GAIN_WEIGHT = "GAIN_WEIGHT",
}

export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
}

export enum ActivityLevel {
  SEDENTARY = "SEDENTARY",
  LIGHTLY_ACTIVE = "LIGHTLY_ACTIVE",
  MODERATELY_ACTIVE = "MODERATELY_ACTIVE",
  VERY_ACTIVE = "VERY_ACTIVE",
}

export const GOAL_OPTIONS: GoalType[] = Object.values(GoalType);
export const GENDER_OPTIONS: Gender[] = Object.values(Gender);
export const ACTIVITY_OPTIONS: ActivityLevel[] = Object.values(ActivityLevel);
