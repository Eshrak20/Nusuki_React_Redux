import { useState } from "react";
import { Loader2, LockKeyhole, Save } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import PasswordInput from "./PasswordInput";
import type { ChangePasswordFormValues } from "@/types/auth/passChange.type";

type ChangePasswordFormProps = {
  form: ChangePasswordFormValues;
  isLoading: boolean;
  onChange: (key: keyof ChangePasswordFormValues, value: string) => void;
  onReset: () => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

const ChangePasswordForm = ({
  form,
  isLoading,
  onChange,
  onReset,
  onSubmit,
}: ChangePasswordFormProps) => {
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const toggleShow = (key: keyof typeof showPassword) => {
    setShowPassword((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <Card className="rounded-2xl shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <LockKeyhole className="h-5 w-5 text-primary" />
          Password Information
        </CardTitle>

        <CardDescription>
          Enter your current password and set a new password.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={onSubmit} className="space-y-5">
          <PasswordInput
            label="Current Password"
            value={form.current_password}
            placeholder="Enter current password"
            show={showPassword.current}
            onToggleShow={() => toggleShow("current")}
            onChange={(value) => onChange("current_password", value)}
          />

          <Separator />

          <div className="grid gap-5 sm:grid-cols-2">
            <PasswordInput
              label="New Password"
              value={form.new_password}
              placeholder="Enter new password"
              show={showPassword.new}
              onToggleShow={() => toggleShow("new")}
              onChange={(value) => onChange("new_password", value)}
            />

            <PasswordInput
              label="Confirm New Password"
              value={form.new_password_confirmation}
              placeholder="Confirm new password"
              show={showPassword.confirm}
              onToggleShow={() => toggleShow("confirm")}
              onChange={(value) =>
                onChange("new_password_confirmation", value)
              }
            />
          </div>

          <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={onReset}
              disabled={isLoading}
              className="h-11 rounded-xl"
            >
              Reset
            </Button>

            <Button type="submit" disabled={isLoading} className="h-11 rounded-xl">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Change Password
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ChangePasswordForm;