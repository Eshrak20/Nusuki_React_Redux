import DashboardLayout from "@/layouts/DashboardLayout";

import DashboardHome from "@/pages/dashboard/DashboardHome";
import UpdateUserProfile from "@/pages/dashboard/UpdateUserProfile/UpdateUserProfile";
import ChangePassword from "@/pages/dashboard/ChangePass/ChangePassword";
import FlightBookings from "@/pages/dashboard/FlightBookings/FlightBookings";
import FlightBookingDetails from "@/pages/dashboard/FlightBookingDetails/FlightBookingDetails";
import HotelBookings from "@/pages/dashboard/HotelBookings/HotelBookings";
import HotelBookingDetails from "@/pages/dashboard/HotelBookingDetails/HotelBookingDetails";

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
        element: <FlightBookings />,
      },
      {
        path: "flight-bookings/:bookingId",
        element: <FlightBookingDetails />,
      },
      {
        path: "hotel-bookings",
        element: <HotelBookings />,
      },
      {
        path: "/dashboard/hotel-bookings/:id",
        element: <HotelBookingDetails />,
      },
    ],
  },
];
