import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import { useGetUserProfileQuery } from "@/redux/api/authApi/authApi";

const ProtectedRoute = () => {
  const location = useLocation();

  const { token, isAuthenticated } = useSelector(
    (state: RootState) => state.auth,
  );

  const { data, isLoading, isFetching, isError } = useGetUserProfileQuery(
    undefined,
    {
      skip: !token,
    },
  );

  const currentPath = location.pathname + location.search;

  if (!token || !isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: currentPath }} />;
  }

  if (isLoading || isFetching) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Checking session...</p>
      </div>
    );
  }

  if (isError || !data) {
    return <Navigate to="/login" replace state={{ from: currentPath }} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;