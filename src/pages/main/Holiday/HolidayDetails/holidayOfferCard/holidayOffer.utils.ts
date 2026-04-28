import { formatBDT, formatDate } from "../holidayDetails.helpers";

export interface Offer {
  id: number;
  name: string;
  valid_from?: string | null;
  valid_until?: string | null;
  departs?: string | null;
  price_per_person_single?: string | null;
  price_per_person_double?: string | null;
  price_per_person_twin?: string | null;
  price_per_person_triple?: string | null;
  price_per_person_child_3_to_6?: string | null;
  price_per_person_child_7_to_12?: string | null;
  description?: string | null;
}

export const phoneNumber = "01712345678";
export const whatsappNumber = "8801714742454";

export const priceRows = [
  ["Single", "price_per_person_single"],
  ["Double", "price_per_person_double"],
  ["Twin", "price_per_person_twin"],
  ["Triple", "price_per_person_triple"],
  ["Child 3 to 6", "price_per_person_child_3_to_6"],
  ["Child 7 to 12", "price_per_person_child_7_to_12"],
] as const;

export const stripHtml = (html?: string | null) => {
  if (!html) return "-";
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
};

export const getOfferPrices = (offer: Offer) =>
  priceRows
    .map(([label, key]) => ({
      label,
      price: formatBDT(offer[key]),
    }))
    .filter((item) => item.price);

export const buildOfferDescription = (
  offer: Offer,
  note: string,
) => {
  const prices = getOfferPrices(offer)
    .map((item) => `${item.label}: ${item.price}`)
    .join("\n");

  return `
Holiday Offer Inquiry

Offer Name: ${offer.name}
Valid From: ${formatDate(offer.valid_from)}
Valid Till: ${formatDate(offer.valid_until)}
Departs: ${offer.departs || "-"}

Prices:
${prices || "-"}

Offer Details:
${stripHtml(offer.description)}

User Note:
${note || "-"}
  `.trim();
};