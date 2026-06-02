import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { setCredentials } from "@/redux/features/auth/authSlice";
import { useSignupMutation } from "@/redux/api/authApi/authApi";
import type { SignupErrors, SignupFormData } from "./AuthComponents/SignupForm";
import SignupForm from "./AuthComponents/SignupForm";

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

const isValidBangladeshiPhone = (phone: string) => {
  return /^01[3-9]\d{8}$/.test(phone);
};

const normalizeBangladeshiPhone = (phone: string) => {
  let cleanedPhone = phone.replace(/\D/g, "");

  // Example: 8801309176398 -> 1309176398
  if (cleanedPhone.startsWith("880")) {
    cleanedPhone = cleanedPhone.slice(3);
  }

  // Example: 1309176398 -> 01309176398
  if (cleanedPhone.length === 10 && cleanedPhone.startsWith("1")) {
    cleanedPhone = `0${cleanedPhone}`;
  }

  return cleanedPhone;
};

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [signup, { isLoading }] = useSignupMutation();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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

    if (
      trimmedPhoneNumber !== formData.phone_number &&
      formData.phone_country_code === "+880"
    ) {
      setFormData((prev) => ({
        ...prev,
        phone_number: trimmedPhoneNumber,
      }));
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
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
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.password_confirmation.trim()) {
      newErrors.password_confirmation = "Confirm password is required";
    } else if (formData.password !== formData.password_confirmation) {
      newErrors.password_confirmation =
        "Password and confirm password do not match";
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
      formData.phone_number
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

    try {
      const normalizedPhoneNumber = getNormalizedPhoneNumber();

      const payload: SignupFormData = {
        email: formData.email.trim(),
        phone_country_code: formData.phone_country_code,
        phone_number: normalizedPhoneNumber,
        password: formData.password,
        password_confirmation: formData.password_confirmation,
      };

      const res = await signup(payload).unwrap();

      dispatch(
        setCredentials({
          token: res.data.token,
          user: res.data.user,
        })
      );

      toast.success(res.message || "Signup successful");
      navigate("/", { replace: true });
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <div className="relative min-h-svh overflow-hidden bg-background">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,hsl(var(--primary)/0.22),transparent_34%),radial-gradient(circle_at_bottom_right,hsl(var(--primary)/0.16),transparent_32%)]" />
      <div className="absolute left-8 top-10 -z-10 h-36 w-36 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute bottom-10 right-8 -z-10 h-44 w-44 rounded-full bg-primary/10 blur-3xl" />

      <SignupForm
        formData={formData}
        errors={errors}
        isLoading={isLoading}
        showPassword={showPassword}
        showConfirmPassword={showConfirmPassword}
        onChange={handleChange}
        onPhoneBlur={handlePhoneBlur}
        onCountryCodeChange={handleCountryCodeChange}
        onSubmit={handleSignup}
        onTogglePassword={() => setShowPassword((prev) => !prev)}
        onToggleConfirmPassword={() => setShowConfirmPassword((prev) => !prev)}
      />
    </div>
  );
};

export default Signup;