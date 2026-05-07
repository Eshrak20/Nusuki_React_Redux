import { useState } from "react";
import { toast } from "sonner";
import { ShieldCheck } from "lucide-react";


import {
  initialChangePasswordForm,
  type ChangePasswordFormValues,
} from "@/types/auth/passChange.type";
import { useChangePasswordMutation } from "@/redux/api/authApi/authApi";
import DashboardPageHeader from "../Common/DashboardPageHeader";
import ChangePasswordForm from "./ChangePasswordForm";
import SecurityTipsCard from "./SecurityTipsCard";

const ChangePassword = () => {
  const [form, setForm] = useState<ChangePasswordFormValues>(
    initialChangePasswordForm
  );

  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const handleChange = (
    key: keyof ChangePasswordFormValues,
    value: string
  ) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const resetForm = () => {
    setForm(initialChangePasswordForm);
  };

  const validateForm = () => {
    if (!form.current_password.trim()) {
      toast.error("Current password is required");
      return false;
    }

    if (!form.new_password.trim()) {
      toast.error("New password is required");
      return false;
    }

    if (form.new_password.length < 6) {
      toast.error("New password must be at least 6 characters");
      return false;
    }

    if (form.new_password !== form.new_password_confirmation) {
      toast.error("New password confirmation does not match");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const response = await changePassword(form).unwrap();

      toast.success(response?.message || "Password changed successfully");
      resetForm();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const message =
        error?.data?.message ||
        error?.message ||
        "Failed to change password. Please try again.";

      toast.error(message);
    }
  };

  return (
    <div className="min-h-screen bg-background px-4 py-6 text-foreground sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-6">
        <DashboardPageHeader
          title="Change Password"
          subtitle="Update your password to keep your account secure."
          icon={ShieldCheck}
          badgeTitle="Security"
          badgeText="Use a strong password"
        />

        <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
          <ChangePasswordForm
            form={form}
            isLoading={isLoading}
            onChange={handleChange}
            onReset={resetForm}
            onSubmit={handleSubmit}
          />

          <SecurityTipsCard />
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;