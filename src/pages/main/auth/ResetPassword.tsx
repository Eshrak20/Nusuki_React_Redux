import { useResetPasswordMutation } from "@/redux/api/authApi/authApi";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import type { ResetPasswordErrors, ResetPasswordFormData } from "./AuthComponents/ResetPasswordForm";
import ResetPasswordForm from "./AuthComponents/ResetPasswordForm";


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

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const emailFromState = location.state?.email || "";

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<ResetPasswordErrors>({});

  const [formData, setFormData] = useState<ResetPasswordFormData>({
    email: emailFromState,
    new_password: "",
    confirm_new_password: "",
  });

  const validateForm = () => {
    const newErrors: ResetPasswordErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.new_password.trim()) {
      newErrors.new_password = "New password is required";
    } else if (formData.new_password.length < 6) {
      newErrors.new_password = "Password must be at least 6 characters";
    }

    if (!formData.confirm_new_password.trim()) {
      newErrors.confirm_new_password = "Confirm password is required";
    } else if (formData.new_password !== formData.confirm_new_password) {
      newErrors.confirm_new_password =
        "New password and confirm password do not match";
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

  const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const res = await resetPassword({
        email: formData.email,
        new_password: formData.new_password,
        confirm_new_password: formData.confirm_new_password,
      }).unwrap();

      toast.success(res.message || "Password reset successfully");

      navigate("/login", {
        replace: true,
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

      <ResetPasswordForm
        formData={formData}
        errors={errors}
        isLoading={isLoading}
        showPassword={showPassword}
        showConfirmPassword={showConfirmPassword}
        onChange={handleChange}
        onSubmit={handleResetPassword}
        onTogglePassword={() => setShowPassword((prev) => !prev)}
        onToggleConfirmPassword={() =>
          setShowConfirmPassword((prev) => !prev)
        }
      />
    </div>
  );
};

export default ResetPassword;