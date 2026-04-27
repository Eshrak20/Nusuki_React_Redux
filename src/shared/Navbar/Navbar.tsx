import { Link, useLocation } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp, MenuIcon, Sparkles } from "lucide-react";

import logoWhite from "../../assets/reactAssets/Logo/whiteLogo.png";
import logoDark from "../../assets/reactAssets/Logo/darkLogo.png";
import logoEduLight from "../../assets/reactAssets/Logo/eduLight (Edited).jpeg";
import logoEduDark from "../../assets/reactAssets/Logo/eduDark1.png";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuContent,
} from "@/components/ui/navigation-menu";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { AnimatedAuthButton } from "./AnimatedAuthButton";
import { cn } from "@/lib/utils";

import {
  DesktopDropdownTrigger,
  DesktopNavLinkItem,
  DropdownContentItem,
  MobileDropdownButton,
  MobileNavItem,
  MobileSubNavItem,
} from "./NavbarUI";
import { ModeToggle } from "../ModeToggler";

const navigationLinks = [
  { href: "/flight", label: "Flight" },
  { href: "/visa", label: "Visa" },
  { href: "/holiday", label: "Holiday" },
  { href: "/education", label: "Education" },
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
  { href: "/hotel", label: "Hotel" },
  { href: "/shop", label: "Shop" },
];

export default function Navbar() {
  const location = useLocation();
  const [openMobileMenu, setOpenMobileMenu] = useState<string | null>(null);
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isSpecialRoute =
    location.pathname.startsWith("/hajj") ||
    location.pathname.startsWith("/umrah");

  useEffect(() => {
    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 300);
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsPopoverOpen(false);
    setOpenMobileMenu(null);
  }, [location.pathname]);

  const closeMobileMenu = useCallback(() => {
    setIsPopoverOpen(false);
    setOpenMobileMenu(null);
  }, []);

  const toggleSubmenu = useCallback((label: string) => {
    setOpenMobileMenu((prev) => (prev === label ? null : label));
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -90, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ 
          duration: 0.45, 
          ease: [0.25, 0.46, 0.45, 0.94] // Custom ease for smoother animation
        }}
        className={cn(
          "fixed left-0 top-0 z-50 w-full transition-all duration-500",
          scrolled && "shadow-lg border-border bg-card/95"
        )}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 md:px-6">
          {/* Logo with enhanced animation */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Link
              to="/"
              className="flex h-14 w-44 shrink-0 items-center md:w-52"
            >
              <img
                src={
                  location.pathname.startsWith("/education")
                    ? logoEduLight
                    : logoWhite
                }
                alt="Logo"
                className="max-h-12 w-full object-contain dark:hidden"
              />
              <img
                src={
                  location.pathname.startsWith("/education")
                    ? logoEduDark
                    : logoDark
                }
                alt="Logo"
                className="hidden max-h-12 w-full object-contain dark:block"
              />
            </Link>
          </motion.div>

          {/* Desktop Navigation with enhanced transitions */}
          <NavigationMenu viewport={false} className="hidden md:flex">
            <NavigationMenuList className="relative gap-1.5 rounded-2xl border border-border/60 bg-background/50 p-1.5 shadow-sm backdrop-blur transition-all duration-300 hover:shadow-md">
              {navigationLinks.map((link) => {
                const isActive = location.pathname.startsWith(link.href);

                return (
                  <NavigationMenuItem key={link.label}>
                    {link.subLinks ? (
                      <>
                        <DesktopDropdownTrigger
                          label={link.label}
                          active={isActive}
                        />
                        <NavigationMenuContent>
                          <motion.ul
                            initial={{ opacity: 0, y: 12, scale: 0.96 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 12, scale: 0.96 }}
                            transition={{ 
                              duration: 0.25, 
                              ease: [0.25, 0.46, 0.45, 0.94] 
                            }}
                            className="mt-2 w-64 space-y-1 rounded-2xl border border-border/70 bg-popover p-2 shadow-2xl shadow-black/10 backdrop-blur-xl"
                          >
                            {link.subLinks.map((sub, index) => (
                              <motion.li
                                key={sub.href}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ 
                                  delay: index * 0.05,
                                  duration: 0.2 
                                }}
                              >
                                <DropdownContentItem
                                  href={sub.href}
                                  label={sub.label}
                                  active={location.pathname === sub.href}
                                />
                              </motion.li>
                            ))}
                          </motion.ul>
                        </NavigationMenuContent>
                      </>
                    ) : (
                      <DesktopNavLinkItem
                        href={link.href}
                        label={link.label}
                        active={isActive}
                      />
                    )}
                  </NavigationMenuItem>
                );
              })}

              {/* Active indicator bar */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-gradient-to-r from-primary via-purple-500 to-primary"
                layoutId="navbar-indicator"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                style={{ opacity: 0 }}
                animate={{ opacity: 0 }}
              />
            </NavigationMenuList>
          </NavigationMenu>

          {/* Right section with animated buttons */}
          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-2 sm:flex">
              <AnimatedAuthButton
                href="/login"
                variant="login"
              >
                <span className="flex items-center gap-1.5">
                  <Sparkles size={16} className="opacity-70" />
                  Login
                </span>
              </AnimatedAuthButton>

              <AnimatedAuthButton
                href="/signup"
                variant="signup"
                specialRoute={isSpecialRoute}
              >
                <span className="flex items-center gap-1.5">
                  Sign Up
                  <Sparkles size={16} className="opacity-70" />
                </span>
              </AnimatedAuthButton>
            </div>

            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ModeToggle />
            </motion.div>

            {/* Mobile menu button with enhanced animation */}
            <motion.div 
              className="md:hidden"
              whileTap={{ scale: 0.9 }}
            >
              <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                      "relative rounded-xl text-foreground transition-all duration-300",
                      "hover:bg-primary/10 hover:text-primary overflow-hidden"
                    )}
                  >
                    <motion.div
                      animate={{ rotate: isPopoverOpen ? 90 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <MenuIcon size={21} />
                    </motion.div>
                  </Button>
                </PopoverTrigger>

                <PopoverContent
                  align="end"
                  sideOffset={8}
                  className="w-80 rounded-2xl border-border/70 bg-card/95 p-4 shadow-2xl backdrop-blur-xl"
                >
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="mb-4 flex items-center justify-between border-b border-border/70 pb-3">
                      <div className="flex items-center gap-2">
                        <Sparkles size={18} className="text-primary" />
                        <p className="text-sm font-bold text-foreground">Navigation Menu</p>
                      </div>
                      <p className="text-xs font-medium text-muted-foreground">
                        Nusuki
                      </p>
                    </div>

                    <div className="space-y-1">
                      {navigationLinks.map((link) => {
                        const hasSubLinks = !!link.subLinks;
                        const isExpanded = openMobileMenu === link.label;
                        const isActive = location.pathname.startsWith(link.href);

                        return (
                          <motion.div
                            key={link.label}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                          >
                            {hasSubLinks ? (
                              <MobileDropdownButton
                                label={link.label}
                                active={isActive}
                                expanded={isExpanded}
                                onClick={() => toggleSubmenu(link.label)}
                              />
                            ) : (
                              <MobileNavItem
                                href={link.href}
                                label={link.label}
                                active={isActive}
                                onClick={closeMobileMenu}
                              />
                            )}

                            <AnimatePresence mode="wait">
                              {hasSubLinks && isExpanded && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ 
                                    duration: 0.3, 
                                    ease: [0.25, 0.46, 0.45, 0.94] 
                                  }}
                                  className="overflow-hidden"
                                >
                                  <motion.div 
                                    className="ml-3 mt-2 flex flex-col gap-1 border-l-2 border-primary/30 pl-3"
                                    initial="collapsed"
                                    animate="open"
                                    variants={{
                                      open: {
                                        transition: { staggerChildren: 0.05 }
                                      },
                                      collapsed: {
                                        transition: { staggerChildren: 0.05, staggerDirection: -1 }
                                      }
                                    }}
                                  >
                                    {link.subLinks.map((sub) => (
                                      <motion.div
                                        key={sub.href}
                                        variants={{
                                          open: { opacity: 1, x: 0 },
                                          collapsed: { opacity: 0, x: -10 }
                                        }}
                                      >
                                        <MobileSubNavItem
                                          href={sub.href}
                                          label={sub.label}
                                          active={location.pathname === sub.href}
                                          onClick={closeMobileMenu}
                                        />
                                      </motion.div>
                                    ))}
                                  </motion.div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </motion.div>
                        );
                      })}
                    </div>

                    <motion.div 
                      className="mt-4 grid grid-cols-2 gap-3 border-t border-border/70 pt-3 sm:hidden"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <AnimatedAuthButton
                        href="/login"
                        variant="login"
                        onClick={closeMobileMenu}
                        className="w-full"
                      >
                        Login
                      </AnimatedAuthButton>

                      <AnimatedAuthButton
                        href="/signup"
                        variant="signup"
                        specialRoute={isSpecialRoute}
                        onClick={closeMobileMenu}
                        className="w-full"
                      >
                        Sign Up
                      </AnimatedAuthButton>
                    </motion.div>
                  </motion.div>
                </PopoverContent>
              </Popover>
            </motion.div>
          </div>
        </div>
      </motion.header>

      {/* Scroll to top button with enhanced animation */}
      <AnimatePresence>
        {showTopBtn && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0,
              transition: {
                type: "spring",
                stiffness: 260,
                damping: 20
              }
            }}
            exit={{ 
              opacity: 0, 
              scale: 0.5, 
              y: 20,
              transition: {
                duration: 0.2
              }
            }}
            whileHover={{ 
              scale: 1.1,
              transition: { type: "spring", stiffness: 400, damping: 10 }
            }}
            whileTap={{ scale: 0.9 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className={cn(
              "fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-2xl",
              "text-primary-foreground shadow-2xl",
              "transition-all duration-300",
              isSpecialRoute 
                ? "bg-hajj shadow-hajj/25 hover:shadow-hajj/40" 
                : "bg-primary shadow-primary/25 hover:shadow-primary/40"
            )}
            aria-label="Scroll to top"
          >
            <motion.div
              animate={{ 
                y: [0, -3, 0],
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 2,
                ease: "easeInOut"
              }}
            >
              <ArrowUp className="h-6 w-6" />
            </motion.div>

            {/* Pulse ring effect */}
            <motion.div
              className="absolute inset-0 rounded-2xl border-2 border-current"
              animate={{
                scale: [1, 1.5],
                opacity: [0.5, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}