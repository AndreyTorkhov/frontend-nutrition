import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function truncateName(name: string, maxLength: number = 20) {
  return name.length > maxLength ? name.slice(0, maxLength) + "…" : name;
}
