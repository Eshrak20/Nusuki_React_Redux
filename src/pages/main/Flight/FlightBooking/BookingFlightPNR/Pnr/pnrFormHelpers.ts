import type { PnrTravellerForm } from "@/types/flight/myTravellers.types";

export type MissingFieldTarget = {
  accordionValue?: string;
  fieldId?: string;
  autoOpenKey?: string | null;
};

export const getStringValue = (value: unknown): string => {
  if (typeof value === "string") return value;
  if (typeof value === "number") return String(value);
  return "";
};

export const isEmpty = (value?: string | null) =>
  !String(value ?? "").trim();

export const errorBorderClass =
  "border-red-500 ring-1 ring-red-500/20 focus:border-red-500 focus:ring-red-500/20 dark:border-red-400 dark:ring-red-400/20";

export const FieldError = ({ message }: { message?: string }) => {
  if (!message) return null;

  alert(message)
};

export const getTravellerFieldKey = (
  travellerIndex: number,
  field: keyof PnrTravellerForm,
) => `traveller-${travellerIndex}-${field}`;

export const dropdownLikeFields: Array<keyof PnrTravellerForm> = [
  "title",
  "gender",
  "dateOfBirth",
  "passportExpiryDate",
];