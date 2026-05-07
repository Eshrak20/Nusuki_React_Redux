import { Navigate, Outlet, useLocation } from "react-router";
import { useSelector } from "react-redux";

import type { RootState } from "@/redux/store";

const ProtectedRoute = () => {
  const location = useLocation();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;