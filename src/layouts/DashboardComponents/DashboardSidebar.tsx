import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Bell,
  ChevronRight,
  Home,
  LockKeyhole,
  LogOut,
  Plane,
  UserRound,
} from "lucide-react";

import type { RootState } from "@/redux/store";
import { cn } from "@/lib/utils";
import { useAuthLogout } from "@/hooks/useAuthLogout";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { getFirstLetter } from "@/lib/utiils.authUser";
import { ModeToggle } from "@/shared/ModeToggler";
import NavbarLogo from "@/shared/Navbar/NavbarLogo";

const dashboardLinks = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    label: "Update Profile",
    href: "/dashboard/profile",
    icon: UserRound,
  },
  {
    label: "Change Password",
    href: "/dashboard/change-password",
    icon: LockKeyhole,
  },
  {
    label: "Flight Bookings",
    href: "/dashboard/flight-bookings",
    icon: Plane,
  },
  {
    label: "Hotel Bookings",
    href: "/dashboard/hotel-bookings",
    icon: Plane,
  },
];

const DashboardSidebar = () => {
  const location = useLocation();

  const { user } = useSelector((state: RootState) => state.auth);
  const { handleLogout, isLogoutLoading } = useAuthLogout({
    onSuccess: () => {
      window.location.replace("/");
    },
  });
  const isEducationRoute = location.pathname.startsWith("/education");

  const imageUrl = user?.profile?.profile_photo_url || undefined;

  return (
    <aside className="hidden h-screen w-72 shrink-0 border-r border-border/70 bg-card/80 backdrop-blur-xl lg:sticky lg:top-0 lg:flex lg:flex-col">
      {/* Logo */}
      <NavbarLogo isEducationRoute={isEducationRoute} />

      {/* User Info */}
      <div className="border-b border-border/70 px-5 py-5">
        <div className="flex items-center gap-3">
          <Link to="/dashboard/profile" className="shrink-0">
            <Avatar className="h-12 w-12 border border-border shadow-sm">
              <AvatarImage src={imageUrl} alt={user?.name || "User"} />

              <AvatarFallback className="bg-primary text-base font-bold text-primary-foreground">
                {getFirstLetter(user?.name, user?.email)}
              </AvatarFallback>
            </Avatar>
          </Link>

          <Link to="/dashboard/profile" className="min-w-0 flex-1">
            <p className="truncate text-sm font-bold text-foreground">
              {user?.name || "User"}
            </p>
            <p className="truncate text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {user?.email || "No email found"}
            </p>
          </Link>

          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 shrink-0 rounded-full text-muted-foreground hover:bg-primary/10 hover:text-primary"
          >
            <Bell className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-4 py-5">
        {dashboardLinks.map((item) => {
          const Icon = item.icon;

          const isActive =
            location.pathname === item.href ||
            (item.href !== "/dashboard" &&
              location.pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "group flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold uppercase tracking-wide transition-all",
                isActive
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                  : "text-muted-foreground hover:bg-primary/10 hover:text-primary",
              )}
            >
              <span className="flex items-center gap-3">
                <Icon className="h-4 w-4" />
                {item.label}
              </span>

              <ChevronRight
                className={cn(
                  "h-4 w-4 transition-all",
                  isActive
                    ? "translate-x-0 opacity-100"
                    : "-translate-x-1 opacity-60 group-hover:translate-x-0 group-hover:opacity-100",
                )}
              />
            </Link>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="border-t border-border/70 px-5 py-4">
        <div className="flex items-center justify-between gap-3">
          <Button
            variant="ghost"
            onClick={handleLogout}
            disabled={isLogoutLoading}
            className="h-11 justify-start gap-2 rounded-xl px-3 text-destructive hover:bg-destructive/10 hover:text-destructive"
          >
            <LogOut className="h-4 w-4" />
            <span className="text-sm font-semibold">
              {isLogoutLoading ? "Logging out..." : "Logout"}
            </span>
          </Button>

          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-border/70 bg-background/70 shadow-sm">
            <ModeToggle />
          </div>
        </div>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
