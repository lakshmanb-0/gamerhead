import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function truncate(str: string) {
  return str?.length > 250 ? str?.substring(0, 240) + "..." : str;
}
