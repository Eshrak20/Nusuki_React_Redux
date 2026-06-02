import type {
  Gender,
  PnrFormState,
  PnrTravellerForm,
} from "@/types/flight/myTravellers.types";

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

const normalizeGender = (gender?: string): Gender => {
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

export const mapProfileToPnrTraveller = (
  profile: UserProfile | null,
): PnrTravellerForm | null => {
  if (!profile) return null;

  const fullName = splitFullName(profile.name);

  const givenName = profile.given_name || fullName.givenName || "";
  const surname = profile.surname || fullName.surname || "";

  const phone = buildPhoneNumber(
    profile.phone_country_code,
    profile.phone_number,
  );

  return {
    selectedSavedTravellerId: null,

    givenName,
    surname,
    title: normalizeGender(profile.gender) === "F" ? "MS" : "MR",
    passengerType: "ADT",
    gender: normalizeGender(profile.gender),
    dateOfBirth: profile.date_of_birth || "",
    travelerPhone: phone,

    passportNumber: profile.passport_no || "",
    nationality: profile.nationality || "BD",
    passportNationality: profile.nationality || "BD",
    passportIssuingCountry: profile.nationality || "BD",
    passportExpiryDate: profile.passport_expire_date || "",
  };
};

export const mapProfileToPnrForm = (
  profile: UserProfile | null,
): PnrFormState => {
  if (!profile) return initialPnrFormState;

  const phone = buildPhoneNumber(
    profile.phone_country_code,
    profile.phone_number,
  );

  const profileTraveller = mapProfileToPnrTraveller(profile);

  return {
    ...initialPnrFormState,

    travelers: profileTraveller ? [profileTraveller] : [],

    contactEmail: profile.email || "",
    contactPhone: phone,

    sendBookingEmail: true,
    paymentMethod: "CK",
    receivedFrom: "NUSUKI WEB",
    saveTravellers: true,
  };
};