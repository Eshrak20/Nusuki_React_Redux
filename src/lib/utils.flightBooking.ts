import { format } from "date-fns";

export const formatMoney = (amount?: string | number, currency = "BDT") => {
  const numericAmount = Number(amount ?? 0);

  return new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(numericAmount);
};

export const formatBookingDate = (date?: string | null) => {
  if (!date) return "N/A";

  try {
    return format(new Date(date), "dd MMM yyyy");
  } catch {
    return "N/A";
  }
};

export const formatBookingDateTime = (date?: string | null) => {
  if (!date) return "N/A";

  try {
    return format(new Date(date), "dd MMM yyyy, hh:mm a");
  } catch {
    return "N/A";
  }
};

export const formatDuration = (minutes?: number) => {
  if (!minutes) return "N/A";

  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  if (hours <= 0) return `${mins}m`;

  return `${hours}h ${mins}m`;
};

export const cabinClassLabel = (cabin?: string | null) => {
  const cabinMap: Record<string, string> = {
    Y: "Economy",
    S: "Premium Economy",
    C: "Business",
    F: "First Class",
  };

  return cabin ? cabinMap[cabin] ?? cabin : "N/A";
};

export const tripTypeLabel = (tripType?: string) => {
  const tripMap: Record<string, string> = {
    one_way: "One Way",
    round_way: "Round Way",
    multi_way: "Multi City",
  };

  return tripType ? tripMap[tripType] ?? tripType : "N/A";
};

export const getBaggageLabel = (baggage?: string | null) => {
  if (!baggage) return "N/A";

  try {
    const parsed = JSON.parse(baggage) as {
      label?: string;
      weight?: number;
      unit?: string;
    };

    if (parsed.label) return parsed.label;
    if (parsed.weight && parsed.unit) return `${parsed.weight} ${parsed.unit}`;

    return "N/A";
  } catch {
    return "N/A";
  }
};