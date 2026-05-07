import {
  LockKeyhole,
  Plane,
  UserRound,
  LayoutDashboard,
} from "lucide-react";

export const dashboardRouteCards = [
  {
    title: "Dashboard",
    description: "Your account summary and quick actions.",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Profile",
    description: "Manage your personal information.",
    href: "/dashboard/profile",
    icon: UserRound,
  },
  {
    title: "Security",
    description: "Change password and secure your account.",
    href: "/dashboard/change-password",
    icon: LockKeyhole,
  },
  {
    title: "Flight Bookings",
    description: "See your flight booking history.",
    href: "/dashboard/flight-bookings",
    icon: Plane,
  },
];