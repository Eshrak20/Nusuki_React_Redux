import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";

import type { RootState } from "@/redux/store";

const PublicOnlyRoute = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default PublicOnlyRoute;