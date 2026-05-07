export type UploadFieldName = "profile_photo" | "passport_image" | "visa_image";

export type UserProfile = {
  id: number;
  given_name: string | null;
  surname: string | null;
  gender: string | null;
  phone_country_code: string | null;
  phone_number: string | null;
  date_of_birth: string | null;
  nationality: string | null;
  address: string | null;
  post_code: string | null;
  frequent_flyer_no: string | null;
  passport_no: string | null;
  passport_expire_date: string | null;
  meal_type: string | null;
  profile_photo_path: string | null;
  profile_photo_url: string | null;
  passport_image_path: string | null;
  passport_image_url: string | null;
  visa_image_path: string | null;
  visa_image_url: string | null;
};

export type AuthUserProfileData = {
  id: number;
  name: string;
  email: string;
  profile: UserProfile | null;
};

export type GetUserProfileResponse = {
  success: boolean;
  message: string;
  data: AuthUserProfileData;
  code: number;
};

export type UpdateUserProfileRequest = {
  name?: string;
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
  profile_photo?: File;
  passport_image?: File;
  visa_image?: File;
};

export type UpdateProfileForm = {
  name: string;
  given_name: string;
  surname: string;
  gender: string;
  phone_country_code: string;
  phone_number: string;
  date_of_birth: string;
  nationality: string;
  address: string;
  post_code: string;
  frequent_flyer_no: string;
  passport_no: string;
  passport_expire_date: string;
  meal_type: string;
  profile_photo?: File | null;
  passport_image?: File | null;
  visa_image?: File | null;
};

export const initialProfileForm: UpdateProfileForm = {
  name: "",
  given_name: "",
  surname: "",
  gender: "",
  phone_country_code: "+88",
  phone_number: "",
  date_of_birth: "",
  nationality: "BD",
  address: "",
  post_code: "",
  frequent_flyer_no: "",
  passport_no: "",
  passport_expire_date: "",
  meal_type: "",
  profile_photo: null,
  passport_image: null,
  visa_image: null,
};

export const mapProfileToForm = (
  data?: AuthUserProfileData
): UpdateProfileForm => {
  const profile = data?.profile;

  return {
    name: data?.name ?? "",
    given_name: profile?.given_name ?? "",
    surname: profile?.surname ?? "",
    gender: profile?.gender ?? "",
    phone_country_code: profile?.phone_country_code ?? "+88",
    phone_number: profile?.phone_number ?? "",
    date_of_birth: profile?.date_of_birth ?? "",
    nationality: profile?.nationality ?? "BD",
    address: profile?.address ?? "",
    post_code: profile?.post_code ?? "",
    frequent_flyer_no: profile?.frequent_flyer_no ?? "",
    passport_no: profile?.passport_no ?? "",
    passport_expire_date: profile?.passport_expire_date ?? "",
    meal_type: profile?.meal_type ?? "",
    profile_photo: null,
    passport_image: null,
    visa_image: null,
  };
};