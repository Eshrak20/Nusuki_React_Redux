export const formatBDT = (value?: string | number | null) => {
  if (!value) return null;

  const amount = Number(value);
  if (Number.isNaN(amount)) return null;

  return `BDT ${amount.toLocaleString("en-BD")}`;
};

export const formatDate = (date?: string | null) => {
  if (!date) return "-";

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "2-digit",
  }).format(new Date(date));
};

export const htmlText = (html?: string | null) => {
  if (!html) return "";
  return html.replace(/<[^>]*>/g, "").trim();
};