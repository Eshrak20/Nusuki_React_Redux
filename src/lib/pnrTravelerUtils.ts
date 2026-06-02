import type { PassengerType, PnrTravellerForm, SavedTraveller } from "@/types/flight/myTravellers.types";


type FlightSearchTravelers = {
  adults: number;
  children: number[]; // ages array
  infants: number;
};

export const createEmptyPnrTraveller = (
  passengerType: PassengerType,
): PnrTravellerForm => ({
  selectedSavedTravellerId: null,

  givenName: "",
  surname: "",
  title: passengerType === "ADT" ? "MR" : "MSTR",
  passengerType,
  gender: "M",
  dateOfBirth: "",
  travelerPhone: "",

  passportNumber: "",
  nationality: "BD",
  passportNationality: "BD",
  passportIssuingCountry: "BD",
  passportExpiryDate: "",
});

export const buildInitialPnrTravellers = (
  travelers: FlightSearchTravelers,
): PnrTravellerForm[] => {
  const adultCount = Math.max(1, travelers.adults || 1);
  const childCount = travelers.children?.length || 0;
  const infantCount = travelers.infants || 0;

  return [
    ...Array.from({ length: adultCount }, () => createEmptyPnrTraveller("ADT")),
    ...Array.from({ length: childCount }, () => createEmptyPnrTraveller("CHD")),
    ...Array.from({ length: infantCount }, () => createEmptyPnrTraveller("INF")),
  ];
};

export const mapSavedTravellerToPnrTraveller = (
  traveller: SavedTraveller,
): PnrTravellerForm => ({
  selectedSavedTravellerId: traveller.id,

  givenName: traveller.given_name || "",
  surname: traveller.surname || "",
  title: traveller.title || "MR",
  passengerType: traveller.passenger_type || "ADT",
  gender: traveller.gender || "M",
  dateOfBirth: traveller.date_of_birth || "",
  travelerPhone: traveller.phone || "",

  passportNumber: traveller.passport_no || "",
  nationality: traveller.nationality || "BD",
  passportNationality: traveller.passport_nationality || "BD",
  passportIssuingCountry: traveller.passport_issuing_country || "BD",
  passportExpiryDate: traveller.passport_expire_date || "",
});

export const getPassengerLabel = (
  passengerType: PassengerType,
  index: number,
) => {
  if (passengerType === "ADT") return `Adult ${index + 1}: (12+ yrs)`;
  if (passengerType === "CHD") return `Child ${index + 1}: (2 - 11 yrs)`;
  return `Infant ${index + 1}: (0 - 23 months)`;
};