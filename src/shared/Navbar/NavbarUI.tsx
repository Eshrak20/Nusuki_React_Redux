import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

import {
  NavigationMenuLink,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

import { cn } from "@/lib/utils";

interface NavLinkItemProps {
  href: string;
  label: string;
  active: boolean;
}

export const DesktopNavLinkItem = ({ href, label, active }: NavLinkItemProps) => {
  return (
    <NavigationMenuLink asChild>
      <Link
        to={href}
        className={cn(
          "relative inline-flex h-11 items-center justify-center overflow-hidden rounded-xl px-4 text-base font-semibold transition-all duration-300",
          "hover:-translate-y-0.5 hover:bg-primary/10 hover:text-primary hover:shadow-md",
          active
            ? "bg-primary text-white shadow-xl shadow-primary/25"
            : "text-primary",
        )}
      >
        {active && (
          <motion.span
            layoutId="active-navbar-item"
            className="absolute inset-0 rounded-xl bg-primary"
            transition={{ type: "spring", stiffness: 400, damping: 32 }}
          />
        )}

        <span className="relative z-10">{label}</span>
      </Link>
    </NavigationMenuLink>
  );
};

interface DesktopDropdownTriggerProps {
  label: string;
  active: boolean;
}

export const DesktopDropdownTrigger = ({
  label,
  active,
}: DesktopDropdownTriggerProps) => {
  return (
    <NavigationMenuTrigger
      onPointerEnter={(e) => e.preventDefault()}
      onPointerMove={(e) => e.preventDefault()}
      className={cn(
        "h-11 rounded-xl px-4 text-base font-semibold transition-all duration-300",
        "bg-transparent text-primary hover:-translate-y-0.5 hover:bg-primary/10 hover:text-primary hover:shadow-md",
        "data-[state=open]:bg-primary data-[state=open]:text-primary-foreground data-[state=open]:shadow-xl data-[state=open]:shadow-primary/25",
        active &&
          "bg-primary text-primary-foreground shadow-xl shadow-primary/25 hover:bg-primary hover:text-primary-foreground",
      )}
    >
      {label}
    </NavigationMenuTrigger>
  );
};

interface DropdownContentItemProps {
  href: string;
  label: string;
  active: boolean;
}

export const DropdownContentItem = ({
  href,
  label,
  active,
}: DropdownContentItemProps) => {
  return (
    <NavigationMenuLink asChild>
      <Link
        to={href}
        className={cn(
          "group flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-semibold transition-all duration-300",
          active
            ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
            : "text-muted-foreground hover:bg-primary/10 hover:text-primary",
        )}
      >
        <span>{label}</span>
        <span
          className={cn(
            "h-1.5 w-1.5 rounded-full transition-all duration-300",
            active
              ? "bg-primary-foreground"
              : "bg-primary/0 group-hover:bg-primary",
          )}
        />
      </Link>
    </NavigationMenuLink>
  );
};

interface MobileNavItemProps {
  href: string;
  label: string;
  active: boolean;
  onClick: () => void;
}

export const MobileNavItem = ({
  href,
  label,
  active,
  onClick,
}: MobileNavItemProps) => {
  return (
    <Link
      to={href}
      onClick={onClick}
      className={cn(
        "flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-300",
        active
          ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
          : "text-foreground hover:bg-primary/10 hover:text-primary",
      )}
    >
      <span>{label}</span>
      <span
        className={cn(
          "h-2 w-2 rounded-full",
          active ? "bg-primary-foreground" : "bg-transparent",
        )}
      />
    </Link>
  );
};

interface MobileDropdownButtonProps {
  label: string;
  active: boolean;
  expanded: boolean;
  onClick: () => void;
}

export const MobileDropdownButton = ({
  label,
  active,
  expanded,
  onClick,
}: MobileDropdownButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-300",
        active
          ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
          : "text-foreground hover:bg-primary/10 hover:text-primary",
      )}
    >
      <span>{label}</span>
      <ChevronDown
        size={17}
        className={cn("transition-transform duration-300", expanded && "rotate-180")}
      />
    </button>
  );
};

interface MobileSubNavItemProps {
  href: string;
  label: string;
  active: boolean;
  onClick: () => void;
}

export const MobileSubNavItem = ({
  href,
  label,
  active,
  onClick,
}: MobileSubNavItemProps) => {
  return (
    <Link
      to={href}
      onClick={onClick}
      className={cn(
        "rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-300",
        active
          ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
          : "text-muted-foreground hover:bg-primary/10 hover:text-primary",
      )}
    >
      {label}
    </Link>
  );
};