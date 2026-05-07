import { useSendResetPasswordOtpMutation } from "@/redux/api/authApi/authApi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import type { ForgotPasswordErrors, ForgotPasswordFormData } from "./AuthComponents/ForgotPasswordForm";
import ForgotPasswordForm from "./AuthComponents/ForgotPasswordForm";




const getErrorMessage = (error: unknown) => {
  if (
    typeof error === "object" &&
    error !== null &&
    "data" in error &&
    typeof error.data === "object" &&
    error.data !== null &&
    "message" in error.data
  ) {
    return String(error.data.message);
  }

  return "Something went wrong. Please try again.";
};

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

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
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
      [id]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [id]: "",
    }));
  };

  const handleSendOtp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const res = await sendResetPasswordOtp({
        email: formData.email,
      }).unwrap();

      toast.success(
        res.message ||
          `OTP sent successfully. It will expire in ${res.data.expires_in_minutes} minutes.`
      );

      navigate("/check-otp", {
        state: {
          email: formData.email,
        },
      });
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <div className="relative flex min-h-svh w-full items-center justify-center overflow-hidden bg-background px-4 py-8 sm:px-6 md:p-10">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,hsl(var(--primary)/0.20),transparent_35%),radial-gradient(circle_at_bottom_right,hsl(var(--primary)/0.12),transparent_35%)]" />
      <div className="absolute left-10 top-10 -z-10 h-32 w-32 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute bottom-10 right-10 -z-10 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />

      <ForgotPasswordForm
        formData={formData}
        errors={errors}
        isLoading={isLoading}
        onChange={handleChange}
        onSubmit={handleSendOtp}
      />
    </div>
  );
};

export default ForgotPassword;