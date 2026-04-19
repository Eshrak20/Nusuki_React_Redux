import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function doubleLineBreaker(des: string){
  const splittedDescription = des?.split(/\.\s+/).map((p) => p.trim()).filter(Boolean);
  return splittedDescription
}

export const mapCabinClass = (className: string) => {
  const mapping: Record<string, string> = {
    "Economy": "Y",
    "Premium Economy": "S",
    "Business Class": "C",
    "First Class": "F"
  };
  return mapping[className] || "Y";
};

// Converts ISO string "2026-04-19T00:00:00Z" to "2026-04-19"
export const formatApiDate = (dateString: string) => dateString.split('T')[0];
