import type { FlightResultItem } from "@/types/flight/flightResults.types";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function doubleLineBreaker(des: string) {
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

export const mapCabinCodeToLabel = (code: string) => {
  const mapping: Record<string, string> = {
    Y: "Economy",
    S: "Premium Economy",
    C: "Business Class",
    F: "First Class",
  };

  return mapping[code] || "Economy";
};

// Converts ISO string "2026-04-19T00:00:00Z" to "2026-04-19"
export const formatApiDate = (dateString: string) => dateString.split('T')[0];

export const getBaggage = (flight: FlightResultItem) => {
  const list = flight?.baggage_allowances || [];

  return {
    checked:
      list.find((b) => b.category === "checked") || flight?.baggage,
    hand: list.find((b) => b.category === "hand") || null,
  };
};


export const getInitials = (name: string) => {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
};


export const formatToBulletPoints = (text: string): string[] => {
  if (!text) return [];

  return text
    .split(/\d+\.\s+/) // split by "1. ", "2. ", etc.
    .map(item => item.trim())
    .filter(item => item.length > 0);
};


export type ApiTripType = "one_way" | "round_way" | "multi_way";

export const mapTripType = (tripType: "one-way" | "round-way" | "multi-way"): ApiTripType => {
  const mapping: Record<"one-way" | "round-way" | "multi-way", ApiTripType> = {
    "one-way": "one_way",
    "round-way": "round_way",
    "multi-way": "multi_way",
  };

  return mapping[tripType];
};

export type PaginationItem = number | "ellipsis";

interface GeneratePagesParams {
  currentPage: number;
  totalPages: number;
  maxVisible?: number; // optional (default 10)
}

export const generatePaginationPages = ({
  totalPages,
  maxVisible = 10,
}: GeneratePagesParams): PaginationItem[] => {
  const pages: PaginationItem[] = [];

  // If small → show all
  if (totalPages <= maxVisible) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }

  // Always show first pages
  for (let i = 1; i <= maxVisible; i++) {
    pages.push(i);
  }

  // Ellipsis
  pages.push("ellipsis");

  // Last page
  pages.push(totalPages);

  return pages;
};  