import { useEffect } from "react";
import { flushSync } from "react-dom";
import { useGoogleOneTapLogin } from "@react-oauth/google";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

import {
  setCredentials,
  type AuthUser,
} from "@/redux/features/auth/authSlice";
import type { RootState } from "@/redux/store";
import { useGoogleLoginMutation } from "@/redux/api/authApi/authApi";

declare global {
  interface Window {
    google?: {
      accounts?: {
        id?: {
          cancel?: () => void;
        };
      };
    };
  }
}

type GoogleOneTapAuthResponse = {
  message?: string;
  data?: {
    token?: string;
    user?: AuthUser;
  };
  token?: string;
  user?: AuthUser;
};

const blockedRoutes = [
  "/login",
  "/signup",
  "/forgot-password",
  "/reset-password",
];

const isValidAuthUser = (user: unknown): user is AuthUser => {
  return typeof user === "object" && user !== null;
};

const getErrorMessage = (error: unknown) => {
  if (typeof error === "object" && error !== null && "data" in error) {
    const data = error.data as {
      message?: string;
      errors?: Record<string, string[]>;
    };

    if (data.errors) {
      const firstError = Object.values(data.errors)[0]?.[0];
      if (firstError) return firstError;
    }

    if (data.message) return data.message;
  }

  return "Google authentication failed. Please try again.";
};

const GoogleOneTapLogin = () => {
  const dispatch = useDispatch();

  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  const [googleOneTapLoginApi] = useGoogleLoginMutation();

  const currentPath = window.location.pathname;

  const isBlockedRoute = blockedRoutes.some((route) =>
    currentPath.startsWith(route)
  );

  const shouldShowOneTap = !isAuthenticated && !isBlockedRoute;

  useEffect(() => {
    if (!shouldShowOneTap) {
      window.google?.accounts?.id?.cancel?.();
    }
  }, [shouldShowOneTap]);

  useGoogleOneTapLogin({
    disabled: !shouldShowOneTap,

    onSuccess: async (credentialResponse) => {
      try {
        const credential = credentialResponse.credential;

        if (!credential) {
          toast.error("Google credential not found");
          return;
        }

        /**
         * IMPORTANT:
         * One Tap gives credential, not access_token.
         * Your backend currently expects:
         * { access_token: "..." }
         *
         * So this API call will fail unless backend also accepts:
         * { credential: "..." }
         */
        const res = (await googleOneTapLoginApi({
          accessToken: credential,
        }).unwrap()) as GoogleOneTapAuthResponse;

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
            })
          );
        });

        toast.success(res.message || "Login successful");
      } catch (error) {
        toast.error(getErrorMessage(error));
      }
    },

    onError: () => {
      // Google/browser can block One Tap. Don't show toast every reload.
    },

    cancel_on_tap_outside: false,
    auto_select: false,
  });

  return null;
};

export default GoogleOneTapLogin;