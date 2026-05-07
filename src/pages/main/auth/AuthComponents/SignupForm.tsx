import { Eye, EyeOff, LockKeyhole, Mail, Phone, User } from "lucide-react";
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
  onSubmit,
  onTogglePassword,
  onToggleConfirmPassword,
}: SignupFormProps) => {
  const inputErrorClass = (field: keyof SignupFormData) =>
    errors[field] ? "border-destructive focus-visible:ring-destructive" : "";

  return (
    <div className="w-full max-w-2xl">
      <Card className="border-border/70 bg-card/95 shadow-2xl backdrop-blur-xl dark:shadow-black/40">
        <CardHeader className="space-y-3 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-xl font-bold text-primary-foreground shadow-lg shadow-primary/20">
            N
          </div>

          <div className="space-y-1">
            <CardTitle className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Create an Account
            </CardTitle>

            <CardDescription className="text-sm text-muted-foreground">
              Start your Nusuki journey with a secure account
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={onSubmit}>
            <FieldGroup>
              <div className="grid gap-4 md:grid-cols-2">
                <Field>
                  <FieldLabel htmlFor="name">Full Name</FieldLabel>

                  <div className="relative">
                    <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="Eshrak"
                      value={formData.name}
                      onChange={onChange}
                      disabled={isLoading}
                      className={`pl-10 ${inputErrorClass("name")}`}
                    />
                  </div>

                  {errors.name ? (
                    <p className="text-sm text-destructive">{errors.name}</p>
                  ) : null}
                </Field>

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
                      className={`pl-10 ${inputErrorClass("email")}`}
                    />
                  </div>

                  {errors.email ? (
                    <p className="text-sm text-destructive">{errors.email}</p>
                  ) : null}
                </Field>

                <Field>
                  <FieldLabel htmlFor="given_name">Given Name</FieldLabel>
                  <Input
                    id="given_name"
                    type="text"
                    placeholder="Mizanur"
                    value={formData.given_name}
                    onChange={onChange}
                    disabled={isLoading}
                    className={inputErrorClass("given_name")}
                  />

                  {errors.given_name ? (
                    <p className="text-sm text-destructive">
                      {errors.given_name}
                    </p>
                  ) : null}
                </Field>

                <Field>
                  <FieldLabel htmlFor="surname">Surname</FieldLabel>
                  <Input
                    id="surname"
                    type="text"
                    placeholder="Rahman"
                    value={formData.surname}
                    onChange={onChange}
                    disabled={isLoading}
                    className={inputErrorClass("surname")}
                  />

                  {errors.surname ? (
                    <p className="text-sm text-destructive">
                      {errors.surname}
                    </p>
                  ) : null}
                </Field>

                <Field>
                  <FieldLabel htmlFor="phone_country_code">
                    Phone Country Code
                  </FieldLabel>
                  <Input
                    id="phone_country_code"
                    type="text"
                    placeholder="+880"
                    value={formData.phone_country_code}
                    onChange={onChange}
                    disabled={isLoading}
                    className={inputErrorClass("phone_country_code")}
                  />

                  {errors.phone_country_code ? (
                    <p className="text-sm text-destructive">
                      {errors.phone_country_code}
                    </p>
                  ) : null}
                </Field>

                <Field>
                  <FieldLabel htmlFor="phone_number">Phone Number</FieldLabel>

                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="phone_number"
                      type="tel"
                      placeholder="01812345678"
                      value={formData.phone_number}
                      onChange={onChange}
                      disabled={isLoading}
                      className={`pl-10 ${inputErrorClass("phone_number")}`}
                    />
                  </div>

                  {errors.phone_number ? (
                    <p className="text-sm text-destructive">
                      {errors.phone_number}
                    </p>
                  ) : null}
                </Field>

                <Field>
                  <FieldLabel htmlFor="password">Password</FieldLabel>

                  <div className="relative">
                    <LockKeyhole className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter password"
                      value={formData.password}
                      onChange={onChange}
                      disabled={isLoading}
                      className={`pl-10 pr-11 ${inputErrorClass("password")}`}
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

                  {errors.password ? (
                    <p className="text-sm text-destructive">
                      {errors.password}
                    </p>
                  ) : null}
                </Field>

                <Field>
                  <FieldLabel htmlFor="password_confirmation">
                    Confirm Password
                  </FieldLabel>

                  <div className="relative">
                    <LockKeyhole className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                    <Input
                      id="password_confirmation"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm password"
                      value={formData.password_confirmation}
                      onChange={onChange}
                      disabled={isLoading}
                      className={`pl-10 pr-11 ${inputErrorClass(
                        "password_confirmation"
                      )}`}
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

                  {errors.password_confirmation ? (
                    <p className="text-sm text-destructive">
                      {errors.password_confirmation}
                    </p>
                  ) : null}
                </Field>
              </div>

              <Field>
                <Button
                  type="submit"
                  className="h-11 w-full font-semibold shadow-lg shadow-primary/20"
                  disabled={isLoading}
                >
                  {isLoading ? "Creating account..." : "Create Account"}
                </Button>

                <FieldDescription className="text-center">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="font-medium text-primary underline-offset-4 hover:underline"
                  >
                    Login
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

export default SignupForm;