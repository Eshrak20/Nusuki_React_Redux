import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Home,
  UserRound,
  LockKeyhole,
  Plane,
  LogOut,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

import { logout as clearAuth } from "@/redux/features/auth/authSlice";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useLogoutMutation } from "@/redux/api/authApi/authApi";

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
];

type DashboardMobileNavProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const DashboardMobileNav = ({
  open,
  onOpenChange,
}: DashboardMobileNavProps) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApi, { isLoading }] = useLogoutMutation();

  const closeSheet = () => onOpenChange(false);

  const handleLogout = async () => {
    try {
      await logoutApi().unwrap();
      toast.success("Logout successful");
    } catch {
      toast.error("Logout API failed. Local session cleared.");
    } finally {
      dispatch(clearAuth());
      closeSheet();
      navigate("/login", { replace: true });
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-80 p-0">
        <SheetHeader className="border-b border-border/70 px-5 py-5 text-left">
          <SheetTitle className="text-primary">Nusuki Dashboard</SheetTitle>
        </SheetHeader>

        <div className="flex h-[calc(100vh-76px)] flex-col justify-between p-4">
          <nav className="space-y-2">
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
                  onClick={closeSheet}
                  className={cn(
                    "flex items-center gap-3 rounded-sm px-4 py-3 text-sm font-medium transition-all",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-primary/10 hover:text-primary"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <Button
            variant="destructive"
            onClick={handleLogout}
            disabled={isLoading}
            className="w-full"
          >
            <LogOut className="mr-2 h-4 w-4" />
            {isLoading ? "Logging out..." : "Logout"}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default DashboardMobileNav;