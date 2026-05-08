import type { PnrFormState } from "@/pages/main/Flight/FlightBooking/BookingFlightPNR/PassengerForm";
import { initialPnrFormState } from "./pnrFormDefaults";

export type UserProfile = {
  name?: string;
  email?: string;

  given_name?: string;
  surname?: string;
  gender?: string;

  phone_country_code?: string;
  phone_number?: string;

  date_of_birth?: string;
  nationality?: string;
  address?: string;
  post_code?: string;

  frequent_flyer_no?: string;

  passport_no?: string;
  passport_expire_date?: string;

  meal_type?: string;

  profile_photo_url?: string;
  passport_image_url?: string;
  visa_image_url?: string;
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
  const user = response?.data;

  if (!user) return null;

  return {
    name: user.name,
    email: user.email,

    ...user.profile,
  };
};

const normalizeGender = (gender?: string): PnrFormState["gender"] => {
  if (!gender) return "M";

  const value = gender.toLowerCase();

  if (value === "male" || value === "m") return "M";
  if (value === "female" || value === "f") return "F";

  return "M";
};

const buildPhoneNumber = (countryCode?: string, phoneNumber?: string) => {
  if (!phoneNumber) return "";

  if (!countryCode) return phoneNumber;

  return `${countryCode}${phoneNumber}`;
};

export const mapProfileToPnrForm = (
  profile: UserProfile | null,
): PnrFormState => {
  if (!profile) return initialPnrFormState;

  const fullName = splitFullName(profile.name);

  const givenName = profile.given_name || fullName.givenName || "";
  const surname = profile.surname || fullName.surname || "";

  const phone = buildPhoneNumber(
    profile.phone_country_code,
    profile.phone_number,
  );

  return {
    ...initialPnrFormState,

    givenName,
    surname,

    dateOfBirth: profile.date_of_birth || "",
    gender: normalizeGender(profile.gender),

    travelerPhone: phone,
    contactEmail: profile.email || "",
    contactPhone: phone,

    passportNumber: profile.passport_no || "",
    nationality: profile.nationality || "BD",
    issuingCountry: profile.nationality || "BD",
    passportExpiryDate: profile.passport_expire_date || "",

    sendBookingEmail: true,
  };
};