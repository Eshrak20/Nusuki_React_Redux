import type { ChangeEvent, FormEvent, ReactNode } from "react";
import { ArrowLeft, Eye, EyeOff, LockKeyhole, Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { countryCodes } from "@/data/countryCodes";

export type SignupFormData = {
  email: string;
  phone_number: string;
  phone_country_code: string;
  password: string;
  password_confirmation?: string;
};

export type SignupErrors = Partial<Record<keyof SignupFormData, string>>;

type SignupFormProps = {
  formData: SignupFormData;
  errors: SignupErrors;
  isLoading: boolean;
  showPassword: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onPhoneBlur: () => void;
  onCountryCodeChange: (value: string) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onTogglePassword: () => void;
  socialLoginSlot?: ReactNode;
};

const SignupForm = ({
  formData,
  errors,
  isLoading,
  showPassword,
  onChange,
  onPhoneBlur,
  onCountryCodeChange,
  onSubmit,
  onTogglePassword,
  socialLoginSlot,
}: SignupFormProps) => {
  const selectedCountry = countryCodes.find(
    (country) => country.code === formData.phone_country_code
  );

  const inputClass = (hasError?: boolean) =>
    `h-9 rounded-sm border pl-9 text-sm shadow-none transition-all placeholder:text-slate-400 focus-visible:ring-1 dark:placeholder:text-slate-500 ${
      hasError
        ? "border-red-300 bg-red-50/70 text-red-900 focus-visible:ring-red-300 dark:border-red-500/60 dark:bg-red-950/20 dark:text-red-100 dark:focus-visible:ring-red-500/40"
        : "border-slate-200 bg-white text-slate-950 focus-visible:border-primary focus-visible:ring-primary/30 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100 dark:focus-visible:border-primary/70 dark:focus-visible:ring-primary/30"
    }`;

  const phoneBoxClass =
    errors.phone_number || errors.phone_country_code
      ? "border-red-300 bg-red-50/70 dark:border-red-500/60 dark:bg-red-950/20"
      : "border-slate-200 bg-white focus-within:border-primary focus-within:ring-1 focus-within:ring-primary/30 dark:border-slate-800 dark:bg-slate-950 dark:focus-within:border-primary/70 dark:focus-within:ring-primary/30";

  return (
    <Card className="w-full max-w-[470px] rounded-sm border-0 bg-white shadow-sm dark:bg-slate-900 dark:shadow-none dark:ring-1 dark:ring-slate-800">
      <CardHeader className="px-5 pb-2.5 pt-4 sm:px-6 sm:pt-5">
        <Link
          to="/"
          className="mb-3 inline-flex h-7 w-7 items-center justify-center rounded-full text-primary transition hover:bg-primary/5 dark:hover:bg-primary/10"
          aria-label="Back to home"
        >
          <ArrowLeft className="h-4.5 w-4.5" />
        </Link>

        <CardTitle className="text-lg font-bold tracking-tight text-slate-950 dark:text-slate-50 sm:text-xl">
          Sign Up
        </CardTitle>

        <CardDescription className="pt-0.5 text-xs text-slate-600 dark:text-slate-400">
          Create an account to easily use our services.
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
              <FieldLabel htmlFor="phone_number" className="sr-only">
                Mobile
              </FieldLabel>

              <div
                className={`flex h-9 overflow-hidden rounded-sm border transition-all ${phoneBoxClass}`}
              >
                <div className="flex w-[118px] shrink-0 items-center border-r border-slate-200 pl-3 dark:border-slate-800">
                  <Phone className="mr-2 h-3.5 w-3.5 text-slate-400 dark:text-slate-500" />

                  <Select
                    value={formData.phone_country_code}
                    onValueChange={onCountryCodeChange}
                    disabled={isLoading}
                  >
                    <SelectTrigger className="h-8 border-0 bg-transparent px-0 text-xs text-slate-950 shadow-none focus:ring-0 dark:text-slate-100">
                      <SelectValue placeholder="Code">
                        {selectedCountry ? (
                          <span className="flex items-center gap-1.5">
                            <span>{selectedCountry.flag}</span>
                            <span>{selectedCountry.code}</span>
                          </span>
                        ) : (
                          <span>+880</span>
                        )}
                      </SelectValue>
                    </SelectTrigger>

                    <SelectContent className="max-h-64 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100">
                      {countryCodes.map((country) => (
                        <SelectItem
                          key={`${country.code}-${country.label}`}
                          value={country.code}
                        >
                          <span className="flex items-center gap-2">
                            <span>{country.flag}</span>
                            <span className="font-medium">
                              {country.label}
                            </span>
                            <span className="text-slate-500 dark:text-slate-400">
                              {country.code}
                            </span>
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Input
                  id="phone_number"
                  name="phone_number"
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel-national"
                  maxLength={formData.phone_country_code === "+880" ? 11 : 20}
                  placeholder={
                    formData.phone_country_code === "+880"
                      ? "1XXX XXXXXX"
                      : "Phone number"
                  }
                  value={formData.phone_number}
                  onChange={onChange}
                  onBlur={onPhoneBlur}
                  disabled={isLoading}
                  className="h-full flex-1 border-0 bg-transparent px-3 text-sm text-slate-950 shadow-none placeholder:text-slate-400 focus-visible:ring-0 dark:text-slate-100 dark:placeholder:text-slate-500"
                />
              </div>

              {(errors.phone_country_code || errors.phone_number) && (
                <p className="text-[11px] font-medium text-red-500 dark:text-red-400">
                  {errors.phone_country_code || errors.phone_number}
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
                  autoComplete="new-password"
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
          </FieldGroup>

          <label className="flex items-start gap-2 text-[11px] leading-4 text-slate-600 dark:text-slate-400">
            <Checkbox className="mt-0.5 h-4 w-4 border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground" />

            <span>
              By creating an account, I agree to the{" "}
              <Link
                to="/support-center"
                className="font-semibold text-primary hover:underline"
              >
                Terms & Conditions
              </Link>{" "}
              and{" "}
              <Link
                to="/privacy-policy"
                className="font-semibold text-primary hover:underline"
              >
                Privacy Policy
              </Link>
              .
            </span>
          </label>

          <Button
            type="submit"
            disabled={isLoading}
            className="h-9 w-full rounded-sm bg-primary text-sm font-semibold text-primary-foreground hover:bg-primary/90"
          >
            {isLoading ? "Creating account..." : "Sign Up"}
          </Button>

          {socialLoginSlot && <div className="pt-0.5">{socialLoginSlot}</div>}

          <p className="pt-0.5 text-center text-xs text-slate-600 dark:text-slate-400">
            Already have an Account?{" "}
            <Link
              to="/login"
              className="font-bold text-primary hover:underline"
            >
              Sign In
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
};

export default SignupForm;