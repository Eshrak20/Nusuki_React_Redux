import type { CountdownParts, FlightDetailResultItem, PriceSummaryItem } from "@/types/flight/flightTicket.types";
import { format, parseISO } from "date-fns";


export const formatBDT = (amount: number | string) => {
  const value = Number(amount || 0);

  return `৳ ${value.toLocaleString("en-BD", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  })}`;
};

export const formatNumber = (amount: number | string) => {
  const value = Number(amount || 0);
  return value.toLocaleString("en-BD");
};

export const formatDateLabel = (date?: string) => {
  if (!date) return "";
  try {
    return format(parseISO(date), "yyyy-MM-dd");
  } catch {
    return date;
  }
};

export const formatFullDate = (date?: string) => {
  if (!date) return "";
  try {
    return format(parseISO(date), "EEE dd MMM yyyy");
  } catch {
    return date;
  }
};

export const formatTime = (date?: string) => {
  if (!date) return "--:--";
  try {
    return format(parseISO(date), "HH:mm");
  } catch {
    return "--:--";
  }
};

export const getTripTitle = (flight?: FlightDetailResultItem) => {
  if (!flight?.segments?.length) return "TRIP DETAILS";

  const destinationCity =
    flight.segments[0]?.destination?.city_name ||
    flight.segments[0]?.destination?.airport ||
    "DESTINATION";

  const destinationCountry =
    flight.segments[0]?.destination?.country_name || "COUNTRY";

  return `TRIP TO ${destinationCity.toUpperCase()} - ${destinationCountry.toUpperCase()}`;
};

export const getAitAmount = (flight?: FlightDetailResultItem) => {
  const breakdown = flight?.pricing?.passenger_breakdown?.[0]?.tax_breakdown ?? [];

  const aitItem = breakdown.find((item) =>
    item.description.toLowerCase().includes("advance income tax")
  );

  return Number(aitItem?.amount || 140);
};

export const getPayableAmount = (flight?: FlightDetailResultItem) => {
  const total = Number(flight?.pricing?.total || 0);
  const discount = Number(flight?.pricing?.discount || 0);
  return total - discount;
};

export const getPriceSummaryItems = (
  flight?: FlightDetailResultItem
): PriceSummaryItem[] => {
  if (!flight) return [];

  return [
    {
      label: "Base Fare",
      value: Number(flight.pricing.base || 0),
      labelClassName: "text-[#b8891f] dark:text-[#d7a83a]",
      valueClassName: "text-[#b8891f] dark:text-[#d7a83a]",
    },
    {
      label: "Tax",
      value: Number(flight.pricing.tax || 0),
    },
    {
      label: "AIT",
      value: getAitAmount(flight),
    },
    {
      label: "Total Price",
      value: Number(flight.pricing.total || 0),
    },
    {
      label: "Discount",
      value: Number(flight.pricing.discount || 0),
      labelClassName: "text-[#f28a14] dark:text-[#ff9e38]",
      valueClassName: "text-[#f28a14] dark:text-[#ff9e38]",
    },
  ];
};

export const getCountdownParts = (secondsLeft: number): CountdownParts => {
  const safe = Math.max(0, secondsLeft);
  const minutes = Math.floor(safe / 60);
  const seconds = safe % 60;

  return {
    minutes: String(minutes).padStart(2, "0"),
    seconds: String(seconds).padStart(2, "0"),
  };
};