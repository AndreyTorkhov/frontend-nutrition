export interface BodyLoginRequest {
  email: string;
  password: string;
}

export interface BodyRegisterRequest {
  name: string;
  email: string;
  password: string;
  age: number;
  gender: "MALE" | "FEMALE";
  heightCm: number;
  weightKg: number;
  targetWeight: number;
  activityLevel:
    | "SEDENTARY"
    | "LIGHTLY_ACTIVE"
    | "MODERATELY_ACTIVE"
    | "VERY_ACTIVE";
  goal: "LOSE_WEIGHT" | "MAINTAIN_WEIGHT" | "GAIN_WEIGHT";
}
