import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface AnimatedAuthButtonProps {
  href: string;
  children: React.ReactNode;
  variant: "login" | "signup";
  className?: string;
  onClick?: () => void;
  specialRoute?: boolean;
}

export const AnimatedAuthButton = ({
  href,
  children,
  variant,
  className,
  onClick,
  specialRoute = false,
}: AnimatedAuthButtonProps) => {
  return (
    <Link to={href} onClick={onClick}>
      <div
        className={cn(
          "group relative inline-flex items-center justify-center overflow-hidden rounded-xl",
          "transition-all duration-300 hover:-translate-y-0.5",
          className
        )}
      >
        {/* Running border gradient */}
        <div
          className={cn(
            "absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100",
            variant === "login"
              ? "bg-gradient-to-r from-primary via-purple-500 to-primary bg-[length:200%_100%] animate-gradient-flow"
              : specialRoute
              ? "bg-gradient-to-r from-hajj via-yellow-400 to-hajj bg-[length:200%_100%] animate-gradient-flow"
              : "bg-gradient-to-r from-primary via-blue-400 to-primary bg-[length:200%_100%] animate-gradient-flow"
          )}
        />

        {/* Inner content with gap for border effect */}
        <div className="relative m-[2px] rounded-[10px]">
          <div
            className={cn(
              "relative z-10 flex items-center justify-center rounded-[10px] px-5 py-2.5 font-semibold",
              "transition-all duration-300",
              variant === "login"
                ? "bg-transparent text-primary group-hover:text-primary group-hover:bg-background"
                : cn(
                    "text-primary-foreground shadow-lg",
                    specialRoute
                      ? "bg-hajj shadow-hajj/20 group-hover:shadow-hajj/40"
                      : "bg-primary shadow-primary/20 group-hover:shadow-primary/40"
                  ),
              variant === "login" && "hover:shadow-lg"
            )}
          >
            {children}
          </div>
        </div>

        {/* Glow effect on hover */}
        <div
          className={cn(
            "absolute inset-0 rounded-xl opacity-0 blur-xl transition-all duration-500 group-hover:opacity-100",
            specialRoute
              ? "bg-hajj/20"
              : "bg-primary/20"
          )}
        />
      </div>
    </Link>
  );
};