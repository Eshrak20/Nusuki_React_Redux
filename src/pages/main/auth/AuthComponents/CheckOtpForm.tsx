import { ArrowLeft, KeyRound, Mail } from "lucide-react";
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

export type CheckOtpFormData = {
  email: string;
  otp: string;
};

export type CheckOtpErrors = Partial<Record<keyof CheckOtpFormData, string>>;

type CheckOtpFormProps = {
  formData: CheckOtpFormData;
  errors: CheckOtpErrors;
  isLoading: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

const CheckOtpForm = ({
  formData,
  errors,
  isLoading,
  onChange,
  onSubmit,
}: CheckOtpFormProps) => {
  return (
    <div className="w-full max-w-md">
      <Card className="border-border/70 bg-card shadow-2xl backdrop-blur-xl dark:shadow-black/40 py-10">
        <CardHeader className="space-y-3 text-center">
          {/* <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-xl font-bold text-primary-foreground shadow-lg shadow-primary/20">
            N
          </div> */}

          <div className="space-y-1">
            <CardTitle className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Verify OTP
            </CardTitle>

            <CardDescription className="text-sm text-muted-foreground">
              Enter the OTP code sent to your email
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
                <FieldLabel htmlFor="otp">OTP Code</FieldLabel>

                <div className="relative">
                  <KeyRound className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                  <Input
                    id="otp"
                    type="text"
                    inputMode="numeric"
                    placeholder="672343"
                    value={formData.otp}
                    onChange={onChange}
                    disabled={isLoading}
                    maxLength={6}
                    className={`pl-10 tracking-[0.35em] ${
                      errors.otp
                        ? "border-destructive focus-visible:ring-destructive"
                        : ""
                    }`}
                  />
                </div>

                {errors.otp ? (
                  <p className="text-sm text-destructive">{errors.otp}</p>
                ) : null}
              </Field>

              <Field>
                <Button
                  type="submit"
                  className="h-11 w-full font-semibold shadow-lg shadow-primary/20"
                  disabled={isLoading}
                >
                  {isLoading ? "Verifying..." : "Verify OTP"}
                </Button>

                <FieldDescription className="text-center">
                  <Link
                    to="/forgot-password"
                    className="inline-flex items-center gap-1 font-medium text-primary underline-offset-4 hover:underline"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" />
                    Send OTP again
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

export default CheckOtpForm;