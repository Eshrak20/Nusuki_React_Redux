export const safeText = (
  value?: string | number | boolean | null,
  fallback = "N/A",
) => {
  if (value === null || value === undefined || value === "") {
    return fallback;
  }

  return String(value);
};

export const formatMoney = (
  value?: number | string | null,
  locale = "en-BD",
) => {
  if (value === null || value === undefined || value === "") {
    return "N/A";
  }

  const numericValue = Number(value);

  if (Number.isNaN(numericValue)) {
    return "N/A";
  }

  return new Intl.NumberFormat(locale).format(numericValue);
};

export const formatCurrency = (
  value?: number | string | null,
  currency?: string | null,
  locale = "en-BD",
) => {
  const safeCurrency = safeText(currency, "BDT");
  const formattedValue = formatMoney(value, locale);

  return `${safeCurrency} ${formattedValue}`;
};

export const createSearchParams = (
  params: Record<string, string | number | null | undefined>,
) => {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== undefined && value !== "") {
      searchParams.set(key, String(value));
    }
  });

  return searchParams.toString();
};

export const formatGuestText = (adults?: number | null, children?: number | null) => {
  const adultCount = adults ?? 0;
  const childCount = children ?? 0;

  return `${adultCount} ${adultCount === 1 ? "Adult" : "Adults"}, ${childCount} ${
    childCount === 1 ? "Child" : "Children"
  }`;
};

export const formatPolicyTime = <
  T extends {
    type?: string | null;
    value?: string | number | null;
  },
>(
  policies: T[] = [],
  type: string,
) => {
  const value = policies.find((item) => item.type === type)?.value;

  if (value === null || value === undefined || value === "") {
    return "N/A";
  }

  const text = String(value).padStart(4, "0");
  const hour = text.slice(0, 2);
  const minute = text.slice(2, 4);

  return `${hour}:${minute}`;
};

export const cleanText = (value?: string) => {
  return String(value || "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
};

export const formatTitle = (value?: string) => {
  if (!value) return "Details";

  return value
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/_/g, " ")
    .trim();
};