import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

import NavbarLogo from "./NavbarLogo";
import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";
import NavbarActions from "./NavbarActions";
import ScrollToTopButton from "./ScrollToTopButton";

export default function Navbar() {
  const location = useLocation();

  const [showTopBtn, setShowTopBtn] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isSpecialRoute =
    location.pathname.startsWith("/hajj") ||
    location.pathname.startsWith("/umrah");

  const isEducationRoute = location.pathname.startsWith("/education");
  const isShopRoute = location.pathname.startsWith("/shop");

  useEffect(() => {
    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 300);
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const shouldShowNavbarBg = scrolled || isSpecialRoute;

  return (
    <>
      <motion.header
        initial={{ y: -90, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.45,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        className={cn(
          "fixed left-0 top-0 z-50 w-full isolate transition-all duration-500",
          shouldShowNavbarBg
            ? "bg-white/90 shadow-lg shadow-black/10 backdrop-blur-2xl dark:bg-slate-950/85"
            : "bg-transparent"
        )}
      >
        <div className="mx-auto flex h-20 max-w-350 items-center justify-between gap-4 px-4 md:px-6">
          <div className="relative z-10">
            <NavbarLogo isEducationRoute={isEducationRoute} />
          </div>

          <div className="relative z-10 hidden lg:flex">
            <DesktopNavbar />
          </div>

          <div className="relative z-10 flex items-center gap-2">
            <NavbarActions
              isShopRoute={isShopRoute}
              isSpecialRoute={isSpecialRoute}
              className="hidden sm:flex"
            />

            <MobileNavbar
              isShopRoute={isShopRoute}
              isSpecialRoute={isSpecialRoute}
            />
          </div>
        </div>
      </motion.header>

      <ScrollToTopButton show={showTopBtn} isSpecialRoute={isSpecialRoute} />
    </>
  );
}