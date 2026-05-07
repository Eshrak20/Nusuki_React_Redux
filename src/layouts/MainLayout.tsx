import { Outlet, useLocation } from "react-router-dom";

import Navbar from "../shared/Navbar/Navbar";
import Footer from "../shared/Footer";

const hiddenLayoutRoutes = [
  "/login",
  "/signup",
  "/forgot-password",
  "/check-otp",
  "/reset-password",
  "/dashboard",
];

const MainLayout = () => {
  const location = useLocation();

  const shouldHideNavbarFooter = hiddenLayoutRoutes.some((route) =>
    location.pathname.startsWith(route)
  );

  return (
    <div className="min-h-screen">
      {!shouldHideNavbarFooter && <Navbar />}

      <Outlet />

      {!shouldHideNavbarFooter && <Footer />}
    </div>
  );
};

export default MainLayout;