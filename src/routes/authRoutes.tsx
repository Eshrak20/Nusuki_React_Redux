import Login from "@/pages/main/auth/Login";
import Signup from "@/pages/main/auth/Signup";
import ForgotPassword from "@/pages/main/auth/ForgotPassword";
import CheckOtp from "@/pages/main/auth/CheckOtp";
import ResetPassword from "@/pages/main/auth/ResetPassword";
import VerifySignup from "@/pages/main/auth/AuthComponents/VerifySignup";

export const authRoutes = [
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "signup",
    element: <Signup />,
  },
  {
    path: "forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "check-otp",
    element: <CheckOtp />,
  },
  {
    path: "verify-signup",
    element: <VerifySignup  />,
  },
  {
    path: "reset-password",
    element: <ResetPassword />,
  },
];