import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MenuIcon, ChevronDown, ArrowUp } from "lucide-react";

import logoWhite from "../assets/reactAssets/Logo/whiteLogo.png";
import logoDark from "../assets/reactAssets/Logo/darkLogo.png";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@/components/ui/navigation-menu";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { ModeToggle } from "./ModeToggler";
import { cn } from "@/lib/utils";

const navigationLinks = [
  { href: "/", label: "Flight" },
  { href: "/hotel", label: "Hotel" },
  { href: "/visa", label: "Visa" },
  {
    label: "Hajj",
    href: "/hajj",
    subLinks: [
      { href: "/hajj/pre-register", label: "Pre-Registration" },
      { href: "/hajj/visa-requirements", label: "Visa Requirement" },
      { href: "/hajj/significance", label: "Significance" },
      { href: "/hajj/packages", label: "Packages" },
    ],
  },
  {
    label: "Umrah",
    href: "/umrah",
    subLinks: [
      { href: "/umrah/visa-requirements", label: "Visa Requirement" },
      { href: "/umrah/significance", label: "Significance" },
      { href: "/umrah/packages", label: "Packages" },
    ],
  },
  { href: "/holiday", label: "Holiday" },
  { href: "/education", label: "Education" },
  { href: "/shop", label: "Shop" },
];

export default function Navbar() {
  const location = useLocation()
  const [openMobileMenu, setOpenMobileMenu] = useState<string | null>(null);
  const [showTopBtn, setShowTopBtn] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) setShowTopBtn(true);
      else setShowTopBtn(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleSubmenu = (label: string) => {
    setOpenMobileMenu(openMobileMenu === label ? null : label);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed top-0 left-0 z-50 w-full border-b border-border bg-background/95 py-3 backdrop-blur"
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
          {/* Logo */}
          <Link to="/" className="flex h-12 w-40 items-center">
            <img src={logoWhite} alt="Logo" className="dark:hidden object-contain" />
            <img src={logoDark} alt="Logo" className="hidden dark:block object-contain" />
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu viewport={false} className="hidden md:flex">
            <NavigationMenuList className="gap-1">
              {navigationLinks.map((link) => {
                const isActive =
                  location.pathname === link.href ||
                  link.subLinks?.some((sub) => location.pathname === sub.href);

                return (
                  <NavigationMenuItem key={link.label}>
                    {link.subLinks ? (
                      <>
                        <NavigationMenuTrigger
                          className={cn(
                            "bg-transparent font-medium",
                            "text-primary",
                            "hover:text-hajj",
                            "hover:font-semibold",
                            "focus:text-hajj",
                            "data-[state=open]:text-hajj",
                            "text-lg",
                            isActive && "text-hajj font-bold",
                          )}
                        >
                          {link.label}
                        </NavigationMenuTrigger>

                        <NavigationMenuContent>
                          <ul className="w-56 space-y-1 p-2 bg-popover rounded-md">
                            {link.subLinks.map((sub) => (
                              <li key={sub.href}>
                                <NavigationMenuLink asChild>
                                  <Link
                                    to={sub.href}
                                    className={cn(
                                      "block rounded-md px-3 py-2 font-medium transition-colors",
                                      location.pathname === sub.href
                                        ? "bg-hajj text-white"
                                        : "text-muted-foreground hover:bg-hajj hover:text-white",
                                    )}
                                  >
                                    {sub.label}
                                  </Link>
                                </NavigationMenuLink>
                              </li>
                            ))}
                          </ul>
                        </NavigationMenuContent>
                      </>
                    ) : (
                      <NavigationMenuLink asChild>
                        <Link
                          to={link.href}
                          className={cn(
                            "inline-flex h-9 items-center justify-center rounded-md px-3 py-2 text-lg text-primary font-medium transition-colors",
                            "hover:text-primary hover:font-semibold",
                            location.pathname === link.href &&
                            "text-primary font-semibold",
                          )}
                        >
                          {link.label}
                        </Link>
                      </NavigationMenuLink>
                    )}
                  </NavigationMenuItem>
                );
              })}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex gap-2">
              <Link to="/login">
                <Button
                  // Updated: hover:text-primary-foreground ensures text is readable on primary background in both modes
                  className="rounded-full font-medium text-primary transition-colors duration-300"
                  variant="ghost"
                >
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button
                  // Updated: text-primary-foreground matches your CSS variable for high contrast
                  className="bg-primary rounded-full font-medium text-primary-foreground hover:opacity-90 transition-opacity"
                >
                  Sign Up
                </Button>
              </Link>
            </div>

            <ModeToggle />

            {/* Mobile Menu */}
            <div className="md:hidden">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-foreground"
                  >
                    <MenuIcon size={20} />
                  </Button>
                </PopoverTrigger>

                <PopoverContent
                  align="end"
                  // bg-card and border-border handle dark mode automatically per your CSS
                  className="w-64 border-border bg-card p-3 shadow-xl"
                >
                  {navigationLinks.map((link) => {
                    const hasSubLinks = !!link.subLinks;
                    const isExpanded = openMobileMenu === link.label;

                    return (
                      <div key={link.label}>
                        {hasSubLinks ? (
                          <button
                            onClick={() => toggleSubmenu(link.label)}
                            className={cn(
                              "flex w-full items-center justify-between rounded-md px-3 py-2 transition-colors",
                              // Use foreground for default, hajj for active
                              location.pathname.startsWith(link.href)
                                ? "font-extrabold"
                                : "text-foreground",
                            )}
                          >
                            {link.label}
                            <ChevronDown
                              size={16}
                              className={cn(
                                "transition-transform",
                                isExpanded && "rotate-180",
                              )}
                            />
                          </button>
                        ) : (
                          <Link
                            to={link.href}
                            className={cn(
                              "block rounded-md px-3 py-2 transition-colors",
                              location.pathname === link.href
                                ? "text-primary font-extrabold"
                                : "text-foreground",
                            )}
                          >
                            {link.label}
                          </Link>
                        )}

                        {hasSubLinks && isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            className="ml-4 mt-1 flex flex-col gap-1 border-l border-border pl-2"
                          >
                            {link.subLinks.map((sub) => (
                              <Link
                                key={sub.href}
                                to={sub.href}
                                className={cn(
                                  "rounded-md px-3 py-2 text-lg transition-colors",
                                  // text-white is usually okay on the colored 'hajj' background
                                  location.pathname === sub.href
                                    ? "bg-hajj text-white"
                                    : "text-muted-foreground hover:bg-hajj hover:text-white",
                                )}
                              >
                                {sub.label}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </div>
                    );
                  })}
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
      </motion.header>
      {showTopBtn && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className={`
      fixed bottom-6 right-6 w-14 h-14 rounded-full z-50 group transform transition-all duration-300 ease-out 
      ${location.pathname.startsWith("/hajj") || location.pathname.startsWith("/umrah") ? "bg-hajj" : "bg-primary"} text-primary-foreground shadow-xl 
      hover:shadow-2xl hover:scale-110 hover:-translate-y-1 
      border-2 border-primary/30 hover:border-primary/60 
      animate-pulse-slow
    `}
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-6 h-6 mx-auto group-hover:-translate-y-0.5 transition-transform duration-300" />

          {/* Dynamic Glow: Uses primary color with opacity so it matches the theme */}
          <div
            className="
      absolute inset-0 rounded-full blur-md -z-10 transition-all duration-500
      bg-primary/20 group-hover:bg-primary/40
    "
          ></div>
        </button>
      )}
    </>
  );
}
