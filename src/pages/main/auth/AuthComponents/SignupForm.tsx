import {
  ArrowLeft,
  CheckCircle2,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  Phone,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

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
  password_confirmation: string;
};

export type SignupErrors = Partial<Record<keyof SignupFormData, string>>;

type SignupFormProps = {
  formData: SignupFormData;
  errors: SignupErrors;
  isLoading: boolean;
  showPassword: boolean;
  showConfirmPassword: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPhoneBlur: () => void;
  onCountryCodeChange: (value: string) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onTogglePassword: () => void;
  onToggleConfirmPassword: () => void;
};

const SignupForm = ({
  formData,
  errors,
  isLoading,
  showPassword,
  showConfirmPassword,
  onChange,
  onPhoneBlur,
  onCountryCodeChange,
  onSubmit,
  onTogglePassword,
  onToggleConfirmPassword,
}: SignupFormProps) => {
  const inputErrorClass = (field: keyof SignupFormData) =>
    errors[field]
      ? "border-destructive bg-destructive/5 ring-destructive/20 focus-visible:ring-destructive"
      : "border-border/60 bg-background/70 focus:border-primary/60 focus-visible:ring-primary/20";

  const selectedCountry = countryCodes.find(
    (country) => country.code === formData.phone_country_code
  );

  return (
    <div className="flex min-h-svh w-full items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
      <div className="w-full max-w-6xl">
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Link
            to="/"
            className="group inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/70 px-4 py-2 text-sm font-medium text-muted-foreground shadow-sm backdrop-blur transition-all hover:border-primary/40 hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to home
          </Link>
        </motion.div>

        <div className="grid overflow-hidden rounded-[2rem] border border-border/50 bg-card/70 shadow-2xl backdrop-blur-2xl lg:grid-cols-[0.95fr_1.05fr]">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45 }}
            className="relative hidden overflow-hidden bg-primary p-10 text-primary-foreground lg:block"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.28),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.18),transparent_34%)]" />
            <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -right-24 top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

            <div className="relative z-10 flex h-full flex-col justify-between">
              <div>
                <div className="mb-8 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 shadow-lg backdrop-blur">
                  <Sparkles className="h-7 w-7" />
                </div>

                <h1 className="max-w-sm text-4xl font-black leading-tight tracking-tight">
                  Create your account in seconds.
                </h1>

                <p className="mt-4 max-w-md text-sm leading-7 text-primary-foreground/80">
                  Use your email and phone number to sign up securely. Simple,
                  fast, and clean signup experience for every device.
                </p>
              </div>

              <div className="mt-10 space-y-4">
                <div className="flex items-start gap-3 rounded-2xl bg-white/10 p-4 backdrop-blur">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
                  <div>
                    <p className="font-semibold">Simple information</p>
                    <p className="mt-1 text-sm text-primary-foreground/75">
                      Only email, phone number, and password required.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-2xl bg-white/10 p-4 backdrop-blur">
                  <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0" />
                  <div>
                    <p className="font-semibold">Secure validation</p>
                    <p className="mt-1 text-sm text-primary-foreground/75">
                      Password confirmation and Bangladesh phone validation
                      included.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="p-4 sm:p-6 md:p-8"
          >
            <Card className="border-0 bg-transparent shadow-none">
              <CardHeader className="px-0 pb-6 pt-2 text-center sm:text-left">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary sm:mx-0 lg:hidden">
                  <Sparkles className="h-7 w-7" />
                </div>

                <CardTitle className="text-2xl font-black tracking-tight sm:text-3xl">
                  Sign up
                </CardTitle>

                <CardDescription className="text-muted-foreground">
                  Enter your details below to create your account.
                </CardDescription>
              </CardHeader>

              <CardContent className="px-0 pb-2">
                <form onSubmit={onSubmit} className="space-y-6">
                  <FieldGroup className="grid gap-5">
                    <Field className="space-y-2">
                      <FieldLabel htmlFor="email">Email address</FieldLabel>

                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          placeholder="user@example.com"
                          value={formData.email}
                          onChange={onChange}
                          disabled={isLoading}
                          className={`h-12 rounded-xl pl-10 text-sm transition-all ${inputErrorClass(
                            "email"
                          )}`}
                        />
                      </div>

                      {errors.email && (
                        <p className="text-xs font-medium text-destructive">
                          {errors.email}
                        </p>
                      )}
                    </Field>

                    <div className="grid gap-4 sm:grid-cols-[150px_1fr]">
                      <Field className="space-y-2">
                        <FieldLabel htmlFor="phone_country_code">
                          Country code
                        </FieldLabel>

                        <Select
                          value={formData.phone_country_code}
                          onValueChange={onCountryCodeChange}
                          disabled={isLoading}
                        >
                          <SelectTrigger
                            id="phone_country_code"
                            className={`h-12 rounded-xl transition-all ${inputErrorClass(
                              "phone_country_code"
                            )}`}
                          >
                            <SelectValue placeholder="Code">
                              {selectedCountry ? (
                                <span className="flex items-center gap-2">
                                  <span>{selectedCountry.flag}</span>
                                  <span>{selectedCountry.code}</span>
                                </span>
                              ) : null}
                            </SelectValue>
                          </SelectTrigger>

                          <SelectContent>
                            {countryCodes.map((country) => (
                              <SelectItem
                                key={`${country.code}-${country.label}`}
                                value={country.code}
                              >
                                <span className="flex items-center gap-2">
                                  <span>{country.flag}</span>
                                  <span className="font-medium">
                                    {country.code}
                                  </span>
                                  <span className="text-muted-foreground">
                                    {country.label}
                                  </span>
                                </span>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        {errors.phone_country_code && (
                          <p className="text-xs font-medium text-destructive">
                            {errors.phone_country_code}
                          </p>
                        )}
                      </Field>

                      <Field className="space-y-2">
                        <FieldLabel htmlFor="phone_number">
                          Phone number
                        </FieldLabel>

                        <div className="relative">
                          <Phone className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          <Input
                            id="phone_number"
                            name="phone_number"
                            type="tel"
                            inputMode="numeric"
                            autoComplete="tel-national"
                            maxLength={
                              formData.phone_country_code === "+880" ? 11 : 20
                            }
                            placeholder={
                              formData.phone_country_code === "+880"
                                ? "01712345678"
                                : "Phone number"
                            }
                            value={formData.phone_number}
                            onChange={onChange}
                            onBlur={onPhoneBlur}
                            disabled={isLoading}
                            className={`h-12 rounded-xl pl-10 text-sm transition-all ${inputErrorClass(
                              "phone_number"
                            )}`}
                          />
                        </div>

                        {errors.phone_number && (
                          <p className="text-xs font-medium text-destructive">
                            {errors.phone_number}
                          </p>
                        )}

                        {formData.phone_country_code === "+880" && (
                          <FieldDescription>
                            Use Bangladeshi format: 01712345678
                          </FieldDescription>
                        )}
                      </Field>
                    </div>

                    <Field className="space-y-2">
                      <FieldLabel htmlFor="password">Password</FieldLabel>

                      <div className="relative">
                        <LockKeyhole className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          autoComplete="new-password"
                          placeholder="Enter your password"
                          value={formData.password}
                          onChange={onChange}
                          disabled={isLoading}
                          className={`h-12 rounded-xl pl-10 pr-11 text-sm transition-all ${inputErrorClass(
                            "password"
                          )}`}
                        />

                        <button
                          type="button"
                          onClick={onTogglePassword}
                          disabled={isLoading}
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground disabled:cursor-not-allowed disabled:opacity-60"
                          aria-label={
                            showPassword ? "Hide password" : "Show password"
                          }
                        >
                          {showPassword ? (
                            <EyeOff size={17} />
                          ) : (
                            <Eye size={17} />
                          )}
                        </button>
                      </div>

                      {errors.password && (
                        <p className="text-xs font-medium text-destructive">
                          {errors.password}
                        </p>
                      )}
                    </Field>

                    <Field className="space-y-2">
                      <FieldLabel htmlFor="password_confirmation">
                        Confirm password
                      </FieldLabel>

                      <div className="relative">
                        <LockKeyhole className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="password_confirmation"
                          name="password_confirmation"
                          type={showConfirmPassword ? "text" : "password"}
                          autoComplete="new-password"
                          placeholder="Confirm your password"
                          value={formData.password_confirmation}
                          onChange={onChange}
                          disabled={isLoading}
                          className={`h-12 rounded-xl pl-10 pr-11 text-sm transition-all ${inputErrorClass(
                            "password_confirmation"
                          )}`}
                        />

                        <button
                          type="button"
                          onClick={onToggleConfirmPassword}
                          disabled={isLoading}
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground disabled:cursor-not-allowed disabled:opacity-60"
                          aria-label={
                            showConfirmPassword
                              ? "Hide confirm password"
                              : "Show confirm password"
                          }
                        >
                          {showConfirmPassword ? (
                            <EyeOff size={17} />
                          ) : (
                            <Eye size={17} />
                          )}
                        </button>
                      </div>

                      {errors.password_confirmation && (
                        <p className="text-xs font-medium text-destructive">
                          {errors.password_confirmation}
                        </p>
                      )}
                    </Field>
                  </FieldGroup>

                  <Button
                    type="submit"
                    className="h-12 w-full rounded-xl text-sm font-bold shadow-lg shadow-primary/25 transition-all hover:scale-[1.01] active:scale-[0.99]"
                    disabled={isLoading}
                  >
                    {isLoading ? "Creating account..." : "Create account"}
                  </Button>

                  <p className="text-center text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <Link
                      to="/login"
                      className="font-bold text-primary underline-offset-4 hover:underline"
                    >
                      Login
                    </Link>
                  </p>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;