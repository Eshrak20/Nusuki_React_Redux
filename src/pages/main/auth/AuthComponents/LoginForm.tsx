import { Eye, EyeOff, LockKeyhole, Mail, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"; // Highly recommended for that "premium" feel

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
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-background p-4">
      {/* --- Animated Background Elements --- */}
      {/* <div className="absolute inset-0 z-0">
        <div className="absolute -top-[10%] -left-[10%] h-[40%] w-[40%] animate-blob rounded-full bg-primary/20 blur-[120px]" />
        <div className="absolute top-[20%] -right-[10%] h-[35%] w-[35%] animate-blob animation-delay-2000 rounded-full bg-primary/10 blur-[100px]" />
        <div className="absolute -bottom-[10%] left-[20%] h-[30%] w-[30%] animate-blob animation-delay-4000 rounded-full bg-primary/15 blur-[110px]" />
      </div> */}

      <div className="relative z-10 w-full max-w-md">
        {/* --- Back to Home Button --- */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Link 
            to="/" 
            className="group flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
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
            {/* Top accent bar */}
            <div className="h-1.5 w-full bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
            
            <CardHeader className="space-y-4 pt-8 text-center">
              {/* <motion.div 
                whileHover={{ scale: 1.05 }}
                className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-2xl font-bold text-primary-foreground shadow-xl shadow-primary/30"
              >
                N
              </motion.div> */}

              <div className="space-y-1">
                <CardTitle className="text-3xl font-bold tracking-tight">
                  Welcome Back
                </CardTitle>
                <CardDescription className="text-balance text-muted-foreground">
                  Enter your credentials to access your Nusuki account
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent className="pb-8">
              <form onSubmit={onSubmit} className="space-y-6">
                <FieldGroup className="space-y-4">
                  <Field className="space-y-2">
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/70" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="name@example.com"
                        value={formData.email}
                        onChange={onChange}
                        disabled={isLoading}
                        className={`h-11 pl-10 transition-all focus:ring-2 ${
                          errors.email
                            ? "border-destructive ring-destructive/20"
                            : "border-border/50 focus:border-primary/50"
                        }`}
                      />
                    </div>
                    {errors.email && (
                      <p className="animate-in fade-in slide-in-from-top-1 text-xs font-medium text-destructive">
                        {errors.email}
                      </p>
                    )}
                  </Field>

                  <Field className="space-y-2">
                    <div className="flex items-center justify-between">
                      <FieldLabel htmlFor="password">Password</FieldLabel>
                      <Link
                        to="/forgot-password"
                        className="text-xs font-semibold text-primary/80 transition-colors hover:text-primary hover:underline"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <div className="relative">
                      <LockKeyhole className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/70" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={onChange}
                        disabled={isLoading}
                        className={`h-11 pl-10 pr-11 transition-all focus:ring-2 ${
                          errors.password
                            ? "border-destructive ring-destructive/20"
                            : "border-border/50 focus:border-primary/50"
                        }`}
                      />
                      <button
                        type="button"
                        onClick={onTogglePassword}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition hover:text-foreground"
                        tabIndex={-1}
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="animate-in fade-in slide-in-from-top-1 text-xs font-medium text-destructive">
                        {errors.password}
                      </p>
                    )}
                  </Field>
                </FieldGroup>

                <Button
                  type="submit"
                  className="relative h-12 w-full overflow-hidden bg-primary font-bold shadow-lg shadow-primary/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      Authenticating...
                    </span>
                  ) : (
                    "Sign In"
                  )}
                </Button>

                <div className="text-center text-sm text-muted-foreground">
                  New to Nusuki?{" "}
                  <Link
                    to="/signup"
                    className="font-bold text-primary transition-colors hover:text-primary/80"
                  >
                    Create an account
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginForm;