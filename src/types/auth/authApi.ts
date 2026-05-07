
// ===============================
// Common API Response Type
// ===============================

export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
  code: number;
};

// ===============================
// User/Profile Types
// ===============================

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

export type AuthUser = {
  id: number;
  name: string;
  email: string;
  profile: UserProfile | null;
};

export type AuthData = {
  token: string;
  user: AuthUser;
};

// ===============================
// Request Body Types
// ===============================

export type SignupRequest = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  given_name: string;
  surname: string;
  phone_country_code: string;
  phone_number: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type ChangePasswordRequest = {
  current_password: string;
  new_password: string;
  new_password_confirmation: string;
};

export type SendResetPasswordOtpRequest = {
  email: string;
};

export type CheckOtpRequest = {
  email: string;
  otp: string;
};

export type ResetPasswordRequest = {
  email: string;
  new_password: string;
  confirm_new_password: string;
};

// ===============================
// Update Profile Types
// ===============================

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

  profile_photo?: File | null;
  passport_image?: File | null;
  visa_image?: File | null;
};

// ===============================
// Response Data Types
// ===============================

export type SendResetPasswordOtpData = {
  email: string;
  expires_in_minutes: number;
};

export type CheckOtpData = {
  email: string;
  verified: boolean;
};

