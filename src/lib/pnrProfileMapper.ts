import type { PnrFormState } from "@/pages/main/Flight/FlightBooking/BookingFlightPNR/PassengerForm";
import { initialPnrFormState } from "./pnrFormDefaults";

export type UserProfile = {
  name?: string;
  first_name?: string;
  last_name?: string;
  given_name?: string;
  surname?: string;
  email?: string;
  phone?: string;
  mobile?: string;
  date_of_birth?: string;
  dob?: string;
  gender?: string;
  passport_number?: string;
  nationality?: string;
  issuing_country?: string;
  passport_expiry_date?: string;
};

const splitFullName = (name?: string) => {
  const parts = name?.trim().split(" ").filter(Boolean) ?? [];

  return {
    givenName: parts[0] ?? "",
    surname: parts.slice(1).join(" ") || "",
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getProfileFromResponse = (response: any): UserProfile | null => {
  return response?.data?.user ?? response?.data ?? response?.user ?? null;
};

const normalizeGender = (gender?: string): PnrFormState["gender"] => {
  if (!gender) return "M";

  const value = gender.toLowerCase();

  if (value === "male" || value === "m") return "M";
  if (value === "female" || value === "f") return "F";

  return "M";
};

export const mapProfileToPnrForm = (
  profile: UserProfile | null,
): PnrFormState => {
  if (!profile) return initialPnrFormState;

  const fullName = splitFullName(profile.name);

  const givenName =
    profile.given_name || profile.first_name || fullName.givenName || "";

  const surname =
    profile.surname || profile.last_name || fullName.surname || "";

  const phone = profile.phone || profile.mobile || "";

  return {
    ...initialPnrFormState,

    givenName,
    surname,

    dateOfBirth: profile.date_of_birth || profile.dob || "",
    gender: normalizeGender(profile.gender),

    travelerPhone: phone,
    contactEmail: profile.email || "",
    contactPhone: phone,

    passportNumber: profile.passport_number || "",
    nationality: profile.nationality || "BD",
    issuingCountry: profile.issuing_country || "BD",
    passportExpiryDate: profile.passport_expiry_date || "",

    sendBookingEmail: true,
  };
};