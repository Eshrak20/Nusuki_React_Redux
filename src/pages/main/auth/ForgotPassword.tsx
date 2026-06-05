import { useSendResetPasswordOtpMutation } from "@/redux/api/authApi/authApi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import type {
  ForgotPasswordErrors,
  ForgotPasswordFormData,
} from "./AuthComponents/ForgotPasswordForm";
import ForgotPasswordForm from "./AuthComponents/ForgotPasswordForm";
import {
  getApiErrorMessage,
  getApiFieldErrors,
  getFirstApiFieldError,
  hasApiFieldErrors,
} from "@/lib/getApiErrorMessage";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [sendResetPasswordOtp, { isLoading }] =
    useSendResetPasswordOtpMutation();

  const [formData, setFormData] = useState<ForgotPasswordFormData>({
    email: "",
  });

  const [errors, setErrors] = useState<ForgotPasswordErrors>({});

  const validateForm = () => {
    const newErrors: ForgotPasswordErrors = {};
    const email = formData.email.trim().toLowerCase();

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      toast.error(Object.values(newErrors)[0]);
      return false;
    }

    return true;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [id]: id === "email" ? value.trim().toLowerCase() : value,
    }));

    setErrors((prev) => ({
      ...prev,
      [id]: "",
    }));
  };

  const handleSendOtp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    const email = formData.email.trim().toLowerCase();

    try {
      const res = await sendResetPasswordOtp({
        email,
      }).unwrap();

      toast.success(
        res.message ||
          `OTP sent successfully. It will expire in ${res.data.expires_in_minutes} minutes.`,
      );

      navigate("/check-otp", {
        state: {
          email,
          expiresInMinutes: res.data.expires_in_minutes,
        },
      });
    } catch (error) {
      const serverFieldErrors = getApiFieldErrors<ForgotPasswordFormData>(error);

      if (hasApiFieldErrors(serverFieldErrors)) {
        setErrors(serverFieldErrors);
        toast.error(getFirstApiFieldError(serverFieldErrors));
        return;
      }

      toast.error(getApiErrorMessage(error));
    }
  };

  return (
    <main className="flex min-h-svh w-full items-center justify-center bg-[#edf4f8] px-4 py-3 dark:bg-slate-950 sm:px-6 lg:px-8">
      <ForgotPasswordForm
        formData={formData}
        errors={errors}
        isLoading={isLoading}
        onChange={handleChange}
        onSubmit={handleSendOtp}
      />
    </main>
  );
};

export default ForgotPassword;