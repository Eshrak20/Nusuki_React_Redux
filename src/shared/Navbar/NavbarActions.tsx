import { Link } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";
import { useSelector } from "react-redux";

import type { RootState } from "@/redux/store";
import { AnimatedAuthButton } from "./AnimatedAuthButton";
import NavbarUserMenu from "./NavbarUserMenu";
import { ModeToggle } from "../ModeToggler";

type NavbarActionsProps = {
  isShopRoute: boolean;
  isSpecialRoute: boolean;
  onMobileAction?: () => void;
  className?: string;
};

const NavbarActions = ({
  isShopRoute,
  isSpecialRoute,
  onMobileAction,
  className = "",
}: NavbarActionsProps) => {
  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

  const imageUrl = user?.profile?.profile_photo_url || null;

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {isShopRoute ? (
        <Link
          to="/shop/cart"
          onClick={onMobileAction}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors hover:bg-primary/10"
          aria-label="Shopping Cart"
        >
          <FaCartShopping className="text-foreground/80 transition hover:text-primary" />
        </Link>
      ) : null}

      {isAuthenticated ? (
        <NavbarUserMenu
          name={user?.name}
          email={user?.email}
          imageUrl={imageUrl}
          onAction={onMobileAction}
        />
      ) : (
        <>
          <AnimatedAuthButton
            href="/login"
            variant="login"
            onClick={onMobileAction}
            className="flex-1 sm:flex-none"
          >
            Login
          </AnimatedAuthButton>

          <AnimatedAuthButton
            href="/signup"
            variant="signup"
            specialRoute={isSpecialRoute}
            onClick={onMobileAction}
            className="flex-1 sm:flex-none"
          >
            Sign Up
          </AnimatedAuthButton>
        </>
      )}

      <ModeToggle />
    </div>
  );
};

export default NavbarActions;