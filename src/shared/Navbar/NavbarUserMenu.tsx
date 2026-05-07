import { Link, useNavigate } from "react-router-dom";
import { LogOut, LayoutDashboard, UserRound } from "lucide-react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

import { logout as clearAuth } from "@/redux/features/auth/authSlice";

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
import { useLogoutMutation } from "@/redux/api/authApi/authApi";

type NavbarUserMenuProps = {
  name?: string | null;
  email?: string | null;
  imageUrl?: string | null;
  onAction?: () => void;
};

const getFirstLetter = (name?: string | null, email?: string | null) => {
  const value = name || email || "U";
  return value.charAt(0).toUpperCase();
};

const NavbarUserMenu = ({
  name,
  email,
  imageUrl,
  onAction,
}: NavbarUserMenuProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApi, { isLoading }] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logoutApi().unwrap();
      toast.success("Logout successful");
    } catch {
      toast.error("Logout API failed. Local session cleared.");
    } finally {
      dispatch(clearAuth());
      onAction?.();
      navigate("/login", { replace: true });
    }
  };

  return (
    <DropdownMenu>
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
          <Link to="/profile" onClick={onAction} className="cursor-pointer">
            <UserRound className="mr-2 h-4 w-4" />
            Profile
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={handleLogout}
          disabled={isLoading}
          className="cursor-pointer text-destructive focus:text-destructive"
        >
          <LogOut className="mr-2 h-4 w-4" />
          {isLoading ? "Logging out..." : "Logout"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NavbarUserMenu;