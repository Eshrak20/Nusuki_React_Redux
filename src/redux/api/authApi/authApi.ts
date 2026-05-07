import type { ApiResponse, AuthData, AuthUser, ChangePasswordRequest, CheckOtpData, CheckOtpRequest, LoginRequest, ResetPasswordRequest, SendResetPasswordOtpData, SendResetPasswordOtpRequest, SignupRequest, UpdateUserProfileRequest } from "@/types/auth/authApi";
import { laravelApi } from "../laravelApi";

export const authApi = laravelApi.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation<ApiResponse<AuthData>, SignupRequest>({
      query: (body) => ({
        url: "/signup",
        method: "POST",
        body,
      }),
    }),

    login: builder.mutation<ApiResponse<AuthData>, LoginRequest>({
      query: (body) => ({
        url: "/login",
        method: "POST",
        body,
      }),
    }),

    changePassword: builder.mutation<ApiResponse<null>,ChangePasswordRequest>({
      query: (body) => ({
        url: "/change-password",
        method: "POST",
        body,
      }),
    }),

    updateUserProfile: builder.mutation<ApiResponse<AuthUser>,UpdateUserProfileRequest>({
      query: (body) => {
        const formData = new FormData();

        Object.entries(body).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            formData.append(key, value);
          }
        });

        return {
          url: "/update-userprofile",
          method: "POST",
          body: formData,
        };
      },
    }),

    logout: builder.mutation<ApiResponse<null>, void>({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
    }),

    sendResetPasswordOtp: builder.mutation<ApiResponse<SendResetPasswordOtpData>,SendResetPasswordOtpRequest>({
      query: (body) => ({
        url: "/send-reset-password-otp",
        method: "POST",
        body,
      }),
    }),

    checkOtp: builder.mutation<ApiResponse<CheckOtpData>, CheckOtpRequest>({
      query: (body) => ({
        url: "/check-otp",
        method: "POST",
        body,
      }),
    }),

    resetPassword: builder.mutation<ApiResponse<null>, ResetPasswordRequest>({
      query: (body) => ({
        url: "/reset-password",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useSignupMutation,
  useLoginMutation,
  useChangePasswordMutation,
  useUpdateUserProfileMutation,
  useLogoutMutation,
  useSendResetPasswordOtpMutation,
  useCheckOtpMutation,
  useResetPasswordMutation,
} = authApi;