import DashboardLayout from "@/layouts/DashboardLayout";

import DashboardHome from "@/pages/dashboard/DashboardHome";
import UpdateUserProfile from "@/pages/dashboard/UpdateUserProfile";
import ChangePassword from "@/pages/dashboard/ChangePassword";
import FlightBookingHistory from "@/pages/dashboard/FlightBookingHistory";
import FlightBookingDetails from "@/pages/dashboard/FlightBookingDetails";

export const dashboardRoutes = [
  {
    path: "dashboard",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <DashboardHome />,
      },
      {
        path: "profile",
        element: <UpdateUserProfile />,
      },
      {
        path: "change-password",
        element: <ChangePassword />,
      },
      {
        path: "flight-bookings",
        element: <FlightBookingHistory />,
      },
      {
        path: "flight-bookings/:bookingId",
        element: <FlightBookingDetails />,
      },
    ],
  },
];