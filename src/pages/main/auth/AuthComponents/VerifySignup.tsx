import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, MailCheck } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { setCredentials } from "@/redux/features/auth/authSlice";
import { useSignupOtpMutation } from "@/redux/api/authApi/authApi";

const OTP_LENGTH = 6;
const OTP_EXPIRE_SECONDS = 5 * 60;

const getErrorMessage = (error: unknown) => {
  if (
    typeof error === "object" &&
    error !== null &&
    "data" in error &&
    typeof error.data === "object" &&
    error.data !== null &&
    "message" in error.data
  ) {
    return String(error.data.message);
  }

  return "Something went wrong. Please try again.";
};

const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(
    remainingSeconds
  ).padStart(2, "0")}`;
};

const VerifySignup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [signupOtp, { isLoading }] = useSignupOtpMutation();

  const emailFromState =
    typeof location.state?.email === "string" ? location.state.email : "";

  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [timeLeft, setTimeLeft] = useState(OTP_EXPIRE_SECONDS);

  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const otpValue = useMemo(() => otp.join(""), [otp]);
  const isOtpComplete = otpValue.length === OTP_LENGTH;

  useEffect(() => {
    if (!emailFromState) {
      toast.error("Email not found. Please signup again.");
      navigate("/signup", { replace: true });
    }
  }, [emailFromState, navigate]);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = window.setInterval(() => {
      setTimeLeft((prev) => Math.max(prev - 1, 0));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [timeLeft]);

  const handleOtpChange = (index: number, value: string) => {
    const digit = value.replace(/\D/g, "").slice(-1);

    setOtp((prev) => {
      const nextOtp = [...prev];
      nextOtp[index] = digit;
      return nextOtp;
    });

    if (digit && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();

    const pastedOtp = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, OTP_LENGTH);

    if (!pastedOtp) return;

    const nextOtp = Array(OTP_LENGTH).fill("");

    pastedOtp.split("").forEach((digit, index) => {
      nextOtp[index] = digit;
    });

    setOtp(nextOtp);

    const nextFocusIndex = Math.min(pastedOtp.length, OTP_LENGTH - 1);
    inputRefs.current[nextFocusIndex]?.focus();
  };

  const handleVerifyOtp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (timeLeft <= 0) {
      toast.error("OTP expired. Please signup again.");
      return;
    }

    if (!isOtpComplete) {
      toast.error("Please enter the 6 digit OTP");
      return;
    }

    try {
      const res = await signupOtp({
        email: emailFromState,
        otp: otpValue,
      }).unwrap();

      dispatch(
        setCredentials({
          token: res.data.token,
          user: res.data.user,
        })
      );

      toast.success(res.message || "Email verified successfully");
      navigate("/", { replace: true });
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <main className="flex min-h-svh w-full items-center justify-center bg-[#edf4f8] px-4 py-3 dark:bg-slate-950 sm:px-6 lg:px-8">
      <Card className="w-full max-w-117.5 rounded-md border-0 bg-white shadow-sm dark:bg-slate-900 dark:shadow-none dark:ring-1 dark:ring-slate-800">
        <CardHeader className="px-5 pb-2.5 pt-4 sm:px-6 sm:pt-5">
          <Link
            to="/signup"
            className="mb-3 inline-flex h-7 w-7 items-center justify-center rounded-full text-primary transition hover:bg-primary/5 dark:hover:bg-primary/10"
            aria-label="Back to signup"
          >
            <ArrowLeft className="h-4.5 w-4.5" />
          </Link>

          <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
            <MailCheck className="h-5 w-5" />
          </div>

          <CardTitle className="text-lg font-bold tracking-tight text-slate-950 dark:text-slate-50 sm:text-xl">
            Verify Email
          </CardTitle>

          <CardDescription className="pt-0.5 text-xs leading-5 text-slate-600 dark:text-slate-400">
            We sent a 6 digit OTP to{" "}
            <span className="font-semibold text-slate-900 dark:text-slate-100">
              {emailFromState}
            </span>
            . The OTP will expire in 5 minutes.
          </CardDescription>
        </CardHeader>

        <CardContent className="px-5 pb-4 sm:px-6 sm:pb-5">
          <form onSubmit={handleVerifyOtp} className="space-y-3">
            <div className="flex items-center justify-between gap-2">
              {otp.map((digit, index) => (
                <Input
                  key={index}
                  ref={(el) => {
                    inputRefs.current[index] = el;
                  }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  disabled={isLoading || timeLeft <= 0}
                  className="h-10 w-10 rounded-md border-slate-200 bg-white p-0 text-center text-sm font-bold text-slate-950 shadow-none focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary/30 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100 dark:focus-visible:border-primary/70 sm:h-11 sm:w-11"
                />
              ))}
            </div>

            <div className="flex items-center justify-between text-xs">
              <p className="text-slate-600 dark:text-slate-400">
                Time left:{" "}
                <span
                  className={
                    timeLeft <= 60
                      ? "font-bold text-red-500 dark:text-red-400"
                      : "font-bold text-primary"
                  }
                >
                  {formatTime(timeLeft)}
                </span>
              </p>

              <button
                type="button"
                onClick={() => navigate("/signup", { replace: true })}
                className="font-semibold text-primary hover:underline"
              >
                Change email
              </button>
            </div>

            <Button
              type="submit"
              disabled={isLoading || !isOtpComplete || timeLeft <= 0}
              className="h-9 w-full rounded-md bg-primary text-sm font-semibold text-primary-foreground hover:bg-primary/90"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Verifying...
                </span>
              ) : (
                "Verify & Continue"
              )}
            </Button>

            {timeLeft <= 0 && (
              <p className="text-center text-[11px] font-medium text-red-500 dark:text-red-400">
                OTP expired. Please signup again to get a new OTP.
              </p>
            )}

            <p className="pt-0.5 text-center text-xs text-slate-600 dark:text-slate-400">
              Already verified?{" "}
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
    </main>
  );
};

export default VerifySignup;