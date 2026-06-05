import { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { flushSync } from "react-dom";

import { setCredentials } from "@/redux/features/auth/authSlice";
import {
  useLoginMutation,
  useResendVerificationMutation,
} from "@/redux/api/authApi/authApi";
import type { LoginErrors, LoginFormData } from "./AuthComponents/LoginForm";
import LoginForm from "./AuthComponents/LoginForm";
import SocialLogin from "./AuthComponents/SocialLogin";
import UnverifiedEmailModal from "./AuthComponents/UnverifiedEmailModal";
import {
  getApiErrorMessage,
  getApiFieldErrors,
  getFirstApiFieldError,
  hasApiFieldErrors,
} from "@/lib/getApiErrorMessage";

type LoginErrorResponse = {
  status?: number;
  data?: {
    success?: boolean;
    message?: string;
    code?: number;
    data?: {
      email?: string;
      is_verified?: boolean;
    };
  };
};

const isUnverifiedEmailError = (error: unknown) => {
  const apiError = error as LoginErrorResponse;

  return (
    apiError.data?.code === 403 &&
    apiError.data?.data?.is_verified === false &&
    typeof apiError.data?.data?.email === "string"
  );
};

const getUnverifiedEmail = (error: unknown) => {
  const apiError = error as LoginErrorResponse;

  return apiError.data?.data?.email || "";
};

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [login, { isLoading }] = useLoginMutation();
  const [resendVerification, { isLoading: isResendingVerification }] =
    useResendVerificationMutation();

  const [showPassword, setShowPassword] = useState(false);
  const [unverifiedEmail, setUnverifiedEmail] = useState("");
  const [isUnverifiedModalOpen, setIsUnverifiedModalOpen] = useState(false);

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
    const email = formData.email.trim().toLowerCase();

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
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
      [id]: id === "email" ? value.trim().toLowerCase() : value,
    }));

    setErrors((prev) => ({
      ...prev,
      [id]: "",
    }));
  };

  const handleResendVerification = async () => {
    if (!unverifiedEmail) {
      toast.error("Email not found. Please try logging in again.");
      return;
    }

    try {
      const res = await resendVerification({
        email: unverifiedEmail,
      }).unwrap();

      toast.success(
        res.message ||
          `Verification OTP resent. It will expire in ${res.data.expires_in_minutes} minutes.`,
      );

      setIsUnverifiedModalOpen(false);

      navigate("/verify-signup", {
        replace: true,
        state: {
          email: res.data.email || unverifiedEmail,
          expiresInMinutes: res.data.expires_in_minutes,
        },
      });
    } catch (error) {
      toast.error(
        getApiErrorMessage(
          error,
          "Unable to resend verification code. Please try again.",
        ),
      );
    }
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const payload: LoginFormData = {
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
      };

      const res = await login(payload).unwrap();

      flushSync(() => {
        dispatch(
          setCredentials({
            token: res.data.token,
            user: res.data.user,
          }),
        );
      });

      toast.success(res.message || "Login successful");
      navigate(from, { replace: true });
    } catch (error) {
      if (isUnverifiedEmailError(error)) {
        const email = getUnverifiedEmail(error);

        setUnverifiedEmail(email);
        setIsUnverifiedModalOpen(true);

        setErrors((prev) => ({
          ...prev,
          email: "Please verify your email before logging in.",
        }));

        return;
      }

      const serverFieldErrors = getApiFieldErrors<LoginFormData>(error);

      if (hasApiFieldErrors(serverFieldErrors)) {
        setErrors(serverFieldErrors);
        toast.error(getFirstApiFieldError(serverFieldErrors));
        return;
      }

      toast.error(getApiErrorMessage(error));
    }
  };

  return (
    <>
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

      <UnverifiedEmailModal
        open={isUnverifiedModalOpen}
        email={unverifiedEmail}
        isLoading={isResendingVerification}
        onOpenChange={setIsUnverifiedModalOpen}
        onResend={handleResendVerification}
      />
    </>
  );
};

export default Login;