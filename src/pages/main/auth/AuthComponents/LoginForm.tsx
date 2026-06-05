import type { ChangeEvent, FormEvent, ReactNode } from "react";
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
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export type LoginFormData = {
  email: string;
  password: string;
};

export type LoginErrors = Partial<Record<keyof LoginFormData, string>>;

type LoginFormProps = {
  formData: LoginFormData;
  errors: LoginErrors;
  isLoading: boolean;
  showPassword: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onTogglePassword: () => void;
  socialLoginSlot?: ReactNode;
};

const LoginForm = ({
  formData,
  errors,
  isLoading,
  showPassword,
  onChange,
  onSubmit,
  onTogglePassword,
  socialLoginSlot,
}: LoginFormProps) => {
  const inputClass = (hasError?: boolean) =>
    `h-9 rounded-md border pl-9 text-sm shadow-none transition-all placeholder:text-slate-400 focus-visible:ring-1 dark:placeholder:text-slate-500 ${
      hasError
        ? "border-red-300 bg-red-50/70 text-red-900 focus-visible:ring-red-300 dark:border-red-500/60 dark:bg-red-950/20 dark:text-red-100 dark:focus-visible:ring-red-500/40"
        : "border-slate-200 bg-white text-slate-950 focus-visible:border-primary focus-visible:ring-primary/30 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100 dark:focus-visible:border-primary/70 dark:focus-visible:ring-primary/30"
    }`;

  return (
    <Card className="w-full max-w-[470px] rounded-md border-0 bg-white shadow-sm dark:bg-slate-900 dark:shadow-none dark:ring-1 dark:ring-slate-800">
      <CardHeader className="px-5 pb-2.5 pt-4 sm:px-6 sm:pt-5">
        <Link
          to="/"
          className="mb-3 inline-flex h-7 w-7 items-center justify-center rounded-full text-primary transition hover:bg-primary/5 dark:hover:bg-primary/10"
          aria-label="Back to home"
        >
          <ArrowLeft className="h-4.5 w-4.5" />
        </Link>

        <CardTitle className="text-lg font-bold tracking-tight text-slate-950 dark:text-slate-50 sm:text-xl">
          Sign In
        </CardTitle>

        <CardDescription className="pt-0.5 text-xs text-slate-600 dark:text-slate-400">
          Enter your credentials to access your account.
        </CardDescription>
      </CardHeader>

      <CardContent className="px-5 pb-4 sm:px-6 sm:pb-5">
        <form onSubmit={onSubmit} className="space-y-3">
          <FieldGroup className="-space-y-2.5">
            <Field className="space-y-1">
              <FieldLabel htmlFor="email" className="sr-only">
                Email
              </FieldLabel>

              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400 dark:text-slate-500" />

                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="someone@example.com"
                  value={formData.email}
                  onChange={onChange}
                  disabled={isLoading}
                  className={inputClass(Boolean(errors.email))}
                />
              </div>

              {errors.email && (
                <p className="text-[11px] font-medium text-red-500 dark:text-red-400">
                  {errors.email}
                </p>
              )}
            </Field>

            <Field className="space-y-1">
              <FieldLabel htmlFor="password" className="sr-only">
                Password
              </FieldLabel>

              <div className="relative">
                <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400 dark:text-slate-500" />

                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={onChange}
                  disabled={isLoading}
                  className={`${inputClass(Boolean(errors.password))} pr-9`}
                />

                <button
                  type="button"
                  onClick={onTogglePassword}
                  disabled={isLoading}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-60 dark:text-slate-500 dark:hover:text-slate-200"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>

              {errors.password && (
                <p className="text-[11px] font-medium text-red-500 dark:text-red-400">
                  {errors.password}
                </p>
              )}
            </Field>

            <div className="flex justify-end">
              <Link
                to="/forgot-password"
                className="text-[11px] font-semibold text-primary hover:underline"
              >
                Forgot password?
              </Link>
            </div>
          </FieldGroup>

          <Button
            type="submit"
            disabled={isLoading}
            className="h-9 w-full rounded-md bg-primary text-sm font-semibold text-primary-foreground hover:bg-primary/90"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Signing in...
              </span>
            ) : (
              "Sign In"
            )}
          </Button>

          {socialLoginSlot && <div className="pt-0.5">{socialLoginSlot}</div>}

          <p className="pt-0.5 text-center text-xs text-slate-600 dark:text-slate-400">
            New here?{" "}
            <Link
              to="/signup"
              className="font-bold text-primary hover:underline"
            >
              Create an account
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
};

export default LoginForm;