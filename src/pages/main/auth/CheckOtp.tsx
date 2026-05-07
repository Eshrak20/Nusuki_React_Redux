import { useCheckOtpMutation } from "@/redux/api/authApi/authApi";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import type {
  CheckOtpErrors,
  CheckOtpFormData,
} from "./AuthComponents/CheckOtpForm";
import CheckOtpForm from "./AuthComponents/CheckOtpForm";

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

const CheckOtp = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [checkOtp, { isLoading }] = useCheckOtpMutation();

  const emailFromState = location.state?.email || "";

  const [formData, setFormData] = useState<CheckOtpFormData>({
    email: emailFromState,
    otp: "",
  });

  const [errors, setErrors] = useState<CheckOtpErrors>({});

  const validateForm = () => {
    const newErrors: CheckOtpErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.otp.trim()) {
      newErrors.otp = "OTP is required";
    } else if (!/^\d{6}$/.test(formData.otp)) {
      newErrors.otp = "OTP must be 6 digits";
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

    const nextValue = id === "otp" ? value.replace(/\D/g, "") : value;

    setFormData((prev) => ({
      ...prev,
      [id]: nextValue,
    }));

    setErrors((prev) => ({
      ...prev,
      [id]: "",
    }));
  };

  const handleCheckOtp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const res = await checkOtp({
        email: formData.email,
        otp: formData.otp,
      }).unwrap();

      toast.success(res.message || "OTP verified successfully");

      navigate("/reset-password", {
        state: {
          email: res.data.email || formData.email,
        },
      });
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <div className="relative flex min-h-svh w-full items-center justify-center overflow-hidden bg-background px-4 py-8 sm:px-6 md:p-10">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,hsl(var(--primary)/0.20),transparent_35%),radial-gradient(circle_at_bottom_left,hsl(var(--primary)/0.12),transparent_35%)]" />
      <div className="absolute right-10 top-10 -z-10 h-32 w-32 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute bottom-10 left-10 -z-10 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />

      <CheckOtpForm
        formData={formData}
        errors={errors}
        isLoading={isLoading}
        onChange={handleChange}
        onSubmit={handleCheckOtp}
      />
    </div>
  );
};

export default CheckOtp;
