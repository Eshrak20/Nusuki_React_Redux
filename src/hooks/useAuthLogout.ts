import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

import { logout as clearAuth } from "@/redux/features/auth/authSlice";
import { useLogoutMutation } from "@/redux/api/authApi/authApi";

type UseAuthLogoutOptions = {
  onSuccess?: () => void;
};

export const useAuthLogout = (options?: UseAuthLogoutOptions) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApi, { isLoading }] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logoutApi().unwrap();
      toast.success("Logout successful");
    } catch {
      toast.error("Logout API failed. Local session cleared.");
    } finally {
      dispatch(clearAuth());
      options?.onSuccess?.();
      navigate("/login", { replace: true });
    }
  };

  return {
    handleLogout,
    isLogoutLoading: isLoading,
  };
};