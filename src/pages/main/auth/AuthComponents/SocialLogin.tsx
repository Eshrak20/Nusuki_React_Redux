import { flushSync } from "react-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { Loader2 } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { setCredentials, type AuthUser } from "@/redux/features/auth/authSlice";
import { useGoogleLoginMutation } from "@/redux/api/authApi/authApi";

type SocialLoginProps = {
  redirectTo?: string;
  disabled?: boolean;
  mode?: "login" | "signup";
};

type GoogleAuthResponse = {
  message?: string;
  data?: {
    token?: string;
    user?: AuthUser;
  };
  token?: string;
  user?: AuthUser;
};

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

  return "Google authentication failed. Please try again.";
};

const isValidAuthUser = (user: unknown): user is AuthUser => {
  return typeof user === "object" && user !== null;
};

const SocialLogin = ({
  redirectTo = "/",
  disabled = false,
  mode = "login",
}: SocialLoginProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [googleLoginApi, { isLoading }] = useGoogleLoginMutation();

  const loginWithGoogle = useGoogleLogin({
    flow: "implicit",
    scope: "openid email profile",

    onSuccess: async (tokenResponse) => {
      try {
        const accessToken = tokenResponse.access_token;

        if (!accessToken) {
          toast.error("Google access token not found");
          return;
        }

        const res = (await googleLoginApi({
          accessToken,
        }).unwrap()) as GoogleAuthResponse;

        const token = res.data?.token ?? res.token ?? null;
        const user = res.data?.user ?? res.user ?? null;

        if (!token || !isValidAuthUser(user)) {
          toast.error("Invalid authentication response from server");
          return;
        }

        flushSync(() => {
          dispatch(
            setCredentials({
              token,
              user,
            }),
          );
        });

        toast.success(
          res.message ||
            (mode === "signup" ? "Signup successful" : "Login successful"),
        );

        navigate(redirectTo, { replace: true });
      } catch (error) {
        toast.error(getErrorMessage(error));
      }
    },

    onError: () => {
      toast.error("Google login cancelled or failed");
    },
  });

  return (
    <div className="space-y-4">
      <div className="relative flex items-center">
        <div className="h-px flex-1 bg-border" />
        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-slate-200" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500">
            Or continue with
          </span>
          <div className="h-px flex-1 bg-slate-200" />
        </div>
        <div className="h-px flex-1 bg-border" />
      </div>

      <Button
        type="button"
        variant="outline"
        disabled={disabled || isLoading}
        onClick={() => loginWithGoogle()}
        className="group h-12 w-full rounded-xl border-border/70 bg-background/70 text-sm font-bold shadow-sm backdrop-blur transition-all hover:scale-[1.01] hover:border-primary/50 hover:bg-primary/5 hover:text-primary active:scale-[0.99] dark:bg-background/40"
      >
        {isLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <span className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-sm transition-transform group-hover:scale-110">
            <FcGoogle className="h-4 w-4" />
          </span>
        )}

        {isLoading
          ? "Connecting with Google..."
          : mode === "signup"
            ? "Sign up with Google"
            : "Sign in with Google"}
      </Button>
    </div>
  );
};

export default SocialLogin;
