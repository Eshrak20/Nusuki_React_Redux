import { ArrowLeft, Mail } from "lucide-react";
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

export type ForgotPasswordFormData = {
  email: string;
};

export type ForgotPasswordErrors = Partial<
  Record<keyof ForgotPasswordFormData, string>
>;

type ForgotPasswordFormProps = {
  formData: ForgotPasswordFormData;
  errors: ForgotPasswordErrors;
  isLoading: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

const ForgotPasswordForm = ({
  formData,
  errors,
  isLoading,
  onChange,
  onSubmit,
}: ForgotPasswordFormProps) => {
  return (
    <div className="w-full max-w-md">
      <Card className="border-border/70 bg-card shadow-2xl backdrop-blur-xl dark:shadow-black/40 py-10">
        <CardHeader className="space-y-3  text-center">
          <div className="space-y-1">
            <CardTitle className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Forgot Password?
            </CardTitle>

            <CardDescription className="text-sm text-muted-foreground">
              Enter your email address and we will send you an OTP
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
                <Button
                  type="submit"
                  className="h-11 w-full font-semibold shadow-lg shadow-primary/20"
                  disabled={isLoading}
                >
                  {isLoading ? "Sending OTP..." : "Send OTP"}
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

export default ForgotPasswordForm;