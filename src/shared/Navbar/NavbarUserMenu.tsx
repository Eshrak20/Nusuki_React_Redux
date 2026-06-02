import { Link } from "react-router-dom";
import { LogOut, LayoutDashboard, UserRound, Plane } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useAuthLogout } from "@/hooks/useAuthLogout";
import { getFirstLetter } from "@/lib/utils.authUser";

type NavbarUserMenuProps = {
  name?: string | null;
  email?: string | null;
  imageUrl?: string | null;
  onAction?: () => void;
};

const NavbarUserMenu = ({
  name,
  email,
  imageUrl,
  onAction,
}: NavbarUserMenuProps) => {
  const { handleLogout, isLogoutLoading } = useAuthLogout({
    onSuccess: onAction,
  });

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-10 gap-2 rounded-full border border-border/70 bg-background/60 px-2 pr-3 shadow-sm backdrop-blur hover:bg-primary/10"
        >
          <Avatar className="h-8 w-8 border border-border">
            <AvatarImage src={imageUrl || undefined} alt={name || "User"} />
            <AvatarFallback className="bg-primary text-sm font-bold text-primary-foreground">
              {getFirstLetter(name, email)}
            </AvatarFallback>
          </Avatar>

          <span className="hidden max-w-24 truncate text-sm font-semibold text-foreground lg:inline">
            {name || "User"}
          </span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56 rounded-2xl">
        <DropdownMenuLabel>
          <div className="flex flex-col">
            <span className="truncate text-sm font-semibold">
              {name || "User"}
            </span>
            <span className="truncate text-xs font-normal text-muted-foreground">
              {email}
            </span>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link to="/dashboard" onClick={onAction} className="cursor-pointer">
            <LayoutDashboard className="mr-2 h-4 w-4" />
            Dashboard
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link
            to="/dashboard/profile"
            onClick={onAction}
            className="cursor-pointer"
          >
            <UserRound className="mr-2 h-4 w-4" />
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            to="/dashboard/flight-bookings"
            onClick={onAction}
            className="cursor-pointer"
          >
            <Plane className="mr-2 h-4 w-4" />
            Flights
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={handleLogout}
          disabled={isLogoutLoading}
          className="cursor-pointer text-destructive focus:text-destructive"
        >
          <LogOut className="mr-2 h-4 w-4" />
          {isLogoutLoading ? "Logging out..." : "Logout"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NavbarUserMenu;
