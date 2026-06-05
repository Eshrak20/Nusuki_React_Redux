import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { useSignupMutation } from "@/redux/api/authApi/authApi";
import type { SignupErrors, SignupFormData } from "./AuthComponents/SignupForm";
import SignupForm from "./AuthComponents/SignupForm";
import SocialLogin from "./AuthComponents/SocialLogin";

type LaravelValidationError = {
  data?: {
    success?: boolean;
    message?: string;
    data?: Partial<Record<keyof SignupFormData, string[]>>;
    errors?: Partial<Record<keyof SignupFormData, string[]>>;
    code?: number;
  };
};

const getErrorMessage = (error: unknown) => {
  const apiError = error as LaravelValidationError;

  const fieldErrors = apiError.data?.data || apiError.data?.errors;
  const firstFieldError = fieldErrors
    ? Object.values(fieldErrors).flat()[0]
    : null;

  if (firstFieldError) {
    return firstFieldError;
  }

  if (apiError.data?.message) {
    return apiError.data.message;
  }

  return "Something went wrong. Please try again.";
};
const getLaravelFieldErrors = (error: unknown): SignupErrors => {
  const apiError = error as LaravelValidationError;

  const fieldErrors = apiError.data?.data || apiError.data?.errors;

  if (!fieldErrors) return {};

  return Object.entries(fieldErrors).reduce<SignupErrors>(
    (acc, [field, messages]) => {
      const key = field as keyof SignupFormData;

      if (Array.isArray(messages) && messages.length > 0) {
        acc[key] = messages[0];
      }

      return acc;
    },
    {},
  );
};

const isValidBangladeshiPhone = (phone: string) => {
  return /^01[3-9]\d{8}$/.test(phone);
};

const normalizeBangladeshiPhone = (phone: string) => {
  let cleanedPhone = phone.replace(/\D/g, "");

  if (cleanedPhone.startsWith("880")) {
    cleanedPhone = cleanedPhone.slice(3);
  }

  if (cleanedPhone.length === 10 && cleanedPhone.startsWith("1")) {
    cleanedPhone = `0${cleanedPhone}`;
  }

  return cleanedPhone;
};

const Signup = () => {
  const navigate = useNavigate();

  const [signup, { isLoading }] = useSignupMutation();

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<SignupErrors>({});

  const [formData, setFormData] = useState<SignupFormData>({
    email: "",
    phone_country_code: "+880",
    phone_number: "",
    password: "",
    password_confirmation: "",
  });

  const getNormalizedPhoneNumber = () => {
    if (formData.phone_country_code === "+880") {
      return normalizeBangladeshiPhone(formData.phone_number);
    }

    return formData.phone_number.replace(/\D/g, "").trim();
  };

  const validateForm = () => {
    const newErrors: SignupErrors = {};
    const trimmedPhoneNumber = getNormalizedPhoneNumber();
    const email = formData.email.trim().toLowerCase();

    if (
      trimmedPhoneNumber !== formData.phone_number &&
      formData.phone_country_code === "+880"
    ) {
      setFormData((prev) => ({
        ...prev,
        phone_number: trimmedPhoneNumber,
      }));
    }

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.phone_country_code.trim()) {
      newErrors.phone_country_code = "Please select your country code";
    }

    if (!trimmedPhoneNumber) {
      newErrors.phone_number = "Phone number is required";
    } else if (
      formData.phone_country_code === "+880" &&
      !isValidBangladeshiPhone(trimmedPhoneNumber)
    ) {
      newErrors.phone_number =
        "Please enter a valid Bangladeshi phone number like 01712345678";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      const firstError = Object.values(newErrors)[0];
      toast.error(firstError || "Please check your information");
      return false;
    }

    return true;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    let nextValue = value;

    if (id === "email") {
      nextValue = value.trim().toLowerCase();
    }

    if (id === "phone_number") {
      nextValue = value.replace(/\D/g, "");

      if (formData.phone_country_code === "+880") {
        if (nextValue.startsWith("880")) {
          nextValue = nextValue.slice(3);
        }

        if (nextValue.length === 10 && nextValue.startsWith("1")) {
          nextValue = `0${nextValue}`;
        }

        if (nextValue.length > 11) {
          nextValue = nextValue.slice(0, 11);
        }
      }
    }

    setFormData((prev) => ({
      ...prev,
      [id]: nextValue,
    }));

    setErrors((prev) => ({
      ...prev,
      [id]: "",
    }));
  };

  const handlePhoneBlur = () => {
    if (formData.phone_country_code !== "+880") return;

    const normalizedPhoneNumber = normalizeBangladeshiPhone(
      formData.phone_number,
    );

    setFormData((prev) => ({
      ...prev,
      phone_number: normalizedPhoneNumber,
    }));
  };

  const handleCountryCodeChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      phone_country_code: value,
      phone_number: "",
    }));

    setErrors((prev) => ({
      ...prev,
      phone_country_code: "",
      phone_number: "",
    }));
  };

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    const email = formData.email.trim().toLowerCase();
    const normalizedPhoneNumber = getNormalizedPhoneNumber();

    const payload: SignupFormData = {
      email,
      phone_country_code: formData.phone_country_code,
      phone_number: normalizedPhoneNumber,
      password: formData.password,
      password_confirmation: formData.password,
    };

    try {
      const res = await signup(payload).unwrap();

      toast.success(
        res.message || "Signup successful. Please verify your email.",
      );

      navigate("/verify-signup", {
        replace: true,
        state: {
          email,
        },
      });
    } catch (error) {
      const serverFieldErrors = getLaravelFieldErrors(error);

      if (Object.keys(serverFieldErrors).length > 0) {
        setErrors(serverFieldErrors);

        const firstError = Object.values(serverFieldErrors)[0];
        toast.error(firstError || "Validation failed");
        return;
      }

      toast.error(getErrorMessage(error));
    }
  };

  return (
    <main className="flex min-h-svh w-full items-center justify-center bg-[#edf4f8] px-4 py-3 dark:bg-slate-950 sm:px-6 lg:px-8">
      <SignupForm
        formData={formData}
        errors={errors}
        isLoading={isLoading}
        showPassword={showPassword}
        onChange={handleChange}
        onPhoneBlur={handlePhoneBlur}
        onCountryCodeChange={handleCountryCodeChange}
        onSubmit={handleSignup}
        onTogglePassword={() => setShowPassword((prev) => !prev)}
        socialLoginSlot={
          <SocialLogin redirectTo="/" disabled={isLoading} mode="signup" />
        }
      />
    </main>
  );
};

export default Signup;
