import { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { flushSync } from "react-dom";

import { setCredentials } from "@/redux/features/auth/authSlice";
import { useLoginMutation } from "@/redux/api/authApi/authApi";
import type { LoginErrors, LoginFormData } from "./AuthComponents/LoginForm";
import LoginForm from "./AuthComponents/LoginForm";
import SocialLogin from "./AuthComponents/SocialLogin";

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

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [login, { isLoading }] = useLoginMutation();
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<LoginErrors>({});

  const searchParams = new URLSearchParams(location.search);
  const redirectFromQuery = searchParams.get("redirect");

  const from =
    typeof location.state?.from === "string"
      ? location.state.from
      : redirectFromQuery || "/";

  const validateForm = () => {
    const newErrors: LoginErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
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

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const res = await login(formData).unwrap();

      flushSync(() => {
        dispatch(
          setCredentials({
            token: res.data.token,
            user: res.data.user,
          })
        );
      });

      toast.success(res.message || "Login successful");
      navigate(from, { replace: true });
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <main className="flex min-h-svh w-full items-center justify-center bg-[#edf4f8] px-4 py-3 dark:bg-slate-950 sm:px-6 lg:px-8">
      <LoginForm
        formData={formData}
        errors={errors}
        isLoading={isLoading}
        showPassword={showPassword}
        onChange={handleChange}
        onSubmit={handleLogin}
        onTogglePassword={() => setShowPassword((prev) => !prev)}
        socialLoginSlot={
          <SocialLogin redirectTo={from} disabled={isLoading} mode="login" />
        }
      />
    </main>
  );
};

export default Login;