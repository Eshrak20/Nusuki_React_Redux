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

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [signup, { isLoading }] = useSignupMutation();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<SignupErrors>({});

  const [formData, setFormData] = useState<SignupFormData>({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    given_name: "",
    surname: "",
    phone_country_code: "+880",
    phone_number: "",
  });

  const validateForm = () => {
    const newErrors: SignupErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.given_name.trim()) {
      newErrors.given_name = "Given name is required";
    }

    if (!formData.surname.trim()) {
      newErrors.surname = "Surname is required";
    }

    if (!formData.phone_country_code.trim()) {
      newErrors.phone_country_code = "Phone country code is required";
    }

    if (!formData.phone_number.trim()) {
      newErrors.phone_number = "Phone number is required";
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

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const res = await signup(formData).unwrap();

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
    <div className="relative flex min-h-svh w-full items-center justify-center overflow-hidden bg-background px-4 py-8 sm:px-6 md:p-10">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,hsl(var(--primary)/0.20),transparent_35%),radial-gradient(circle_at_bottom_left,hsl(var(--primary)/0.12),transparent_35%)]" />
      <div className="absolute right-10 top-10 -z-10 h-32 w-32 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute bottom-10 left-10 -z-10 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />

      <SignupForm
        formData={formData}
        errors={errors}
        isLoading={isLoading}
        showPassword={showPassword}
        showConfirmPassword={showConfirmPassword}
        onChange={handleChange}
        onSubmit={handleSignup}
        onTogglePassword={() => setShowPassword((prev) => !prev)}
        onToggleConfirmPassword={() =>
          setShowConfirmPassword((prev) => !prev)
        }
      />
    </div>
  );
};

export default Signup;