import {
  ArrowLeft,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  Phone,
  User,
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
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  given_name: string;
  surname: string;
  phone_country_code: string;
  phone_number: string;
};

export type SignupErrors = Partial<Record<keyof SignupFormData, string>>;

type SignupFormProps = {
  formData: SignupFormData;
  errors: SignupErrors;
  isLoading: boolean;
  showPassword: boolean;
  showConfirmPassword: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
  onCountryCodeChange,
  onSubmit,
  onTogglePassword,
  onToggleConfirmPassword,
}: SignupFormProps) => {
  const inputErrorClass = (field: keyof SignupFormData) =>
    errors[field]
      ? "border-destructive ring-destructive/20 focus-visible:ring-destructive"
      : "border-border/50 focus:border-primary/50";

  const selectedCountry = countryCodes.find(
    (country) => country.code === formData.phone_country_code
  );

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-background p-4 py-12">
      {/* Animated Background Elements */}
      <div className="relative z-10 w-full max-w-3xl">
        {/* Back to Home Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Link
            to="/"
            className="group inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to home
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="overflow-hidden border-border/40 bg-card/60 shadow-2xl backdrop-blur-2xl dark:bg-card/40">
            <div className="h-1.5 w-full bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />

            <CardHeader className="space-y-4 pt-8 text-center">
              {/* <motion.div
                whileHover={{ scale: 1.05 }}
                className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-2xl font-bold text-primary-foreground shadow-xl shadow-primary/30"
              >
                Nusuk
              </motion.div> */}

              <div className="space-y-1">
                <CardTitle className="text-3xl font-bold tracking-tight">
                  Create an Account
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  Join Nusuki today and start your journey
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent className="pb-10">
              <form onSubmit={onSubmit} className="space-y-8">
                <FieldGroup className="grid gap-6 md:grid-cols-2">
                  {/* Full Name */}
                  <Field className="space-y-2">
                    <FieldLabel htmlFor="name">Full Name</FieldLabel>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/70" />
                      <Input
                        id="name"
                        name="name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={onChange}
                        disabled={isLoading}
                        className={`h-11 pl-10 transition-all ${inputErrorClass(
                          "name"
                        )}`}
                      />
                    </div>
                    {errors.name && (
                      <p className="text-xs font-medium text-destructive">
                        {errors.name}
                      </p>
                    )}
                  </Field>

                  {/* Email */}
                  <Field className="space-y-2">
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/70" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={onChange}
                        disabled={isLoading}
                        className={`h-11 pl-10 transition-all ${inputErrorClass(
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

                  {/* Given Name */}
                  <Field className="space-y-2">
                    <FieldLabel htmlFor="given_name">Given Name</FieldLabel>
                    <Input
                      id="given_name"
                      name="given_name"
                      placeholder="John"
                      value={formData.given_name}
                      onChange={onChange}
                      disabled={isLoading}
                      className={`h-11 transition-all ${inputErrorClass(
                        "given_name"
                      )}`}
                    />
                    {errors.given_name && (
                      <p className="text-xs font-medium text-destructive">
                        {errors.given_name}
                      </p>
                    )}
                  </Field>

                  {/* Surname */}
                  <Field className="space-y-2">
                    <FieldLabel htmlFor="surname">Surname</FieldLabel>
                    <Input
                      id="surname"
                      name="surname"
                      placeholder="Doe"
                      value={formData.surname}
                      onChange={onChange}
                      disabled={isLoading}
                      className={`h-11 transition-all ${inputErrorClass(
                        "surname"
                      )}`}
                    />
                    {errors.surname && (
                      <p className="text-xs font-medium text-destructive">
                        {errors.surname}
                      </p>
                    )}
                  </Field>

                  {/* Country Code & Phone */}
                  <div className="grid grid-cols-1 gap-3 md:col-span-2 md:grid-cols-3">
                    <Field className="space-y-2">
                      <FieldLabel htmlFor="phone_country_code">
                        Country Code
                      </FieldLabel>

                      <Select
                        value={formData.phone_country_code}
                        onValueChange={onCountryCodeChange}
                        disabled={isLoading}
                      >
                        <SelectTrigger
                          id="phone_country_code"
                          className={`h-11 transition-all ${inputErrorClass(
                            "phone_country_code"
                          )}`}
                        >
                        
                          <SelectValue placeholder="Select code">
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

                    <Field className="space-y-2 md:col-span-2">
                      <FieldLabel htmlFor="phone_number">
                        Phone Number
                      </FieldLabel>

                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/70" />
                        <Input
                          id="phone_number"
                          name="phone_number"
                          type="tel"
                          inputMode="numeric"
                          placeholder={
                            formData.phone_country_code === "+880"
                              ? "01812345678"
                              : "Phone number"
                          }
                          value={formData.phone_number}
                          onChange={onChange}
                          disabled={isLoading}
                          className={`h-11 pl-10 transition-all ${inputErrorClass(
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
                          Use Bangladeshi format: 01812345678
                        </FieldDescription>
                      )}
                    </Field>
                  </div>

                  {/* Password */}
                  <Field className="space-y-2">
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <div className="relative">
                      <LockKeyhole className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/70" />
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={onChange}
                        disabled={isLoading}
                        className={`h-11 pl-10 pr-11 transition-all ${inputErrorClass(
                          "password"
                        )}`}
                      />
                      <button
                        type="button"
                        onClick={onTogglePassword}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                      >
                        {showPassword ? (
                          <EyeOff size={16} />
                        ) : (
                          <Eye size={16} />
                        )}
                      </button>
                    </div>

                    {errors.password && (
                      <p className="text-xs font-medium text-destructive">
                        {errors.password}
                      </p>
                    )}
                  </Field>

                  {/* Confirm Password */}
                  <Field className="space-y-2">
                    <FieldLabel htmlFor="password_confirmation">
                      Confirm Password
                    </FieldLabel>
                    <div className="relative">
                      <LockKeyhole className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/70" />
                      <Input
                        id="password_confirmation"
                        name="password_confirmation"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={formData.password_confirmation}
                        onChange={onChange}
                        disabled={isLoading}
                        className={`h-11 pl-10 pr-11 transition-all ${inputErrorClass(
                          "password_confirmation"
                        )}`}
                      />
                      <button
                        type="button"
                        onClick={onToggleConfirmPassword}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                        aria-label={
                          showConfirmPassword
                            ? "Hide confirm password"
                            : "Show confirm password"
                        }
                      >
                        {showConfirmPassword ? (
                          <EyeOff size={16} />
                        ) : (
                          <Eye size={16} />
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

                <div className="space-y-4">
                  <Button
                    type="submit"
                    className="h-12 w-full bg-primary font-bold shadow-lg shadow-primary/25 transition-all hover:scale-[1.01] active:scale-[0.99]"
                    disabled={isLoading}
                  >
                    {isLoading ? "Creating Account..." : "Get Started"}
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
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default SignupForm;