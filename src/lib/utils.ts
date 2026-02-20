import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function doubleLineBreaker(des: string){
  const splittedDescription = des?.split(/\.\s+/).map((p) => p.trim()).filter(Boolean);
  return splittedDescription
}
