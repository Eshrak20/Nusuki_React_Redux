import { Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";
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
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onTogglePassword: () => void;
};

const LoginForm = ({
  formData,
  errors,
  isLoading,
  showPassword,
  onChange,
  onSubmit,
  onTogglePassword,
}: LoginFormProps) => {
  return (
    <div className="w-full max-w-md">
      <Card className="border-border/70 bg-card/95 shadow-2xl backdrop-blur-xl dark:shadow-black/40">
        <CardHeader className="space-y-3 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-xl font-bold text-primary-foreground shadow-lg shadow-primary/20">
            N
          </div>

          <div className="space-y-1">
            <CardTitle className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Welcome Back
            </CardTitle>

            <CardDescription className="text-sm text-muted-foreground">
              Login to continue your Nusuki journey
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
                <div className="flex items-center gap-3">
                  <FieldLabel htmlFor="password">Password</FieldLabel>

                  <Link
                    to="/forgot-password"
                    className="ml-auto text-sm font-medium text-primary underline-offset-4 hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>

                <div className="relative">
                  <LockKeyhole className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={onChange}
                    disabled={isLoading}
                    className={`pl-10 pr-11 ${
                      errors.password
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

                {errors.password ? (
                  <p className="text-sm text-destructive">{errors.password}</p>
                ) : null}
              </Field>

              <Field>
                <Button
                  type="submit"
                  className="h-11 w-full font-semibold shadow-lg shadow-primary/20"
                  disabled={isLoading}
                >
                  {isLoading ? "Logging in..." : "Login"}
                </Button>

                <FieldDescription className="text-center">
                  Don&apos;t have an account?{" "}
                  <Link
                    to="/signup"
                    className="font-medium text-primary underline-offset-4 hover:underline"
                  >
                    Sign up
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

export default LoginForm;