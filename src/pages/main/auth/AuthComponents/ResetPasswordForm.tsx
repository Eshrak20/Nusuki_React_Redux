import { ArrowLeft, Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export type ResetPasswordFormData = {
  email: string;
  new_password: string;
  confirm_new_password: string;
};

export type ResetPasswordErrors = Partial<
  Record<keyof ResetPasswordFormData, string>
>;

type ResetPasswordFormProps = {
  formData: ResetPasswordFormData;
  errors: ResetPasswordErrors;
  isLoading: boolean;
  showPassword: boolean;
  showConfirmPassword: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onTogglePassword: () => void;
  onToggleConfirmPassword: () => void;
};

const ResetPasswordForm = ({
  formData,
  errors,
  isLoading,
  showPassword,
  showConfirmPassword,
  onChange,
  onSubmit,
  onTogglePassword,
  onToggleConfirmPassword,
}: ResetPasswordFormProps) => {
  return (
    <div className="w-full max-w-md">
      <Card className="border-border/70 bg-card/95 shadow-2xl backdrop-blur-xl dark:shadow-black/40">
        <CardHeader className="space-y-3 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-xl font-bold text-primary-foreground shadow-lg shadow-primary/20">
            N
          </div>

          <div className="space-y-1">
            <CardTitle className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Reset Password
            </CardTitle>

            <CardDescription className="text-sm text-muted-foreground">
              Create a new password for your account
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={onSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>

                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    value={formData.email}
                    onChange={onChange}
                    disabled={isLoading}
                    className={`pl-10 ${
                      errors.email
                        ? "border-destructive focus-visible:ring-destructive"
                        : ""
                    }`}
                  />
                </div>

                {errors.email ? (
                  <p className="text-sm text-destructive">{errors.email}</p>
                ) : null}
              </Field>

              <Field>
                <FieldLabel htmlFor="new_password">New Password</FieldLabel>

                <div className="relative">
                  <LockKeyhole className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                  <Input
                    id="new_password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter new password"
                    value={formData.new_password}
                    onChange={onChange}
                    disabled={isLoading}
                    className={`pl-10 pr-11 ${
                      errors.new_password
                        ? "border-destructive focus-visible:ring-destructive"
                        : ""
                    }`}
                  />

                  <button
                    type="button"
                    onClick={onTogglePassword}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition hover:text-foreground"
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>

                {errors.new_password ? (
                  <p className="text-sm text-destructive">
                    {errors.new_password}
                  </p>
                ) : null}
              </Field>

              <Field>
                <FieldLabel htmlFor="confirm_new_password">
                  Confirm New Password
                </FieldLabel>

                <div className="relative">
                  <LockKeyhole className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                  <Input
                    id="confirm_new_password"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm new password"
                    value={formData.confirm_new_password}
                    onChange={onChange}
                    disabled={isLoading}
                    className={`pl-10 pr-11 ${
                      errors.confirm_new_password
                        ? "border-destructive focus-visible:ring-destructive"
                        : ""
                    }`}
                  />

                  <button
                    type="button"
                    onClick={onToggleConfirmPassword}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition hover:text-foreground"
                    tabIndex={-1}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>

                {errors.confirm_new_password ? (
                  <p className="text-sm text-destructive">
                    {errors.confirm_new_password}
                  </p>
                ) : null}
              </Field>

              <Field>
                <Button
                  type="submit"
                  className="h-11 w-full font-semibold shadow-lg shadow-primary/20"
                  disabled={isLoading}
                >
                  {isLoading ? "Resetting password..." : "Reset Password"}
                </Button>

                <FieldDescription className="text-center">
                  <Link
                    to="/login"
                    className="inline-flex items-center gap-1 font-medium text-primary underline-offset-4 hover:underline"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" />
                    Back to login
                  </Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResetPasswordForm;