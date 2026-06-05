import { useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { MenuIcon, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  MobileDropdownButton,
  MobileNavItem,
  MobileSubNavItem,
} from "./NavbarUI";
import { navigationLinks } from "./NavbarData";
import NavbarActions from "./NavbarActions";
import { cn } from "@/lib/utils";

type MobileNavbarProps = {
  isShopRoute: boolean;
  isSpecialRoute: boolean;
};

const MobileNavbar = ({ isShopRoute, isSpecialRoute }: MobileNavbarProps) => {
  const location = useLocation();

  const [openMobileMenu, setOpenMobileMenu] = useState<string | null>(null);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const closeMobileMenu = useCallback(() => {
    setIsPopoverOpen(false);
    setOpenMobileMenu(null);
  }, []);

  const toggleSubmenu = useCallback((label: string) => {
    setOpenMobileMenu((prev) => (prev === label ? null : label));
  }, []);

  return (
    <motion.div className="md:hidden" whileTap={{ scale: 0.9 }}>
      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "relative overflow-hidden rounded-xl text-foreground transition-all duration-300",
              "hover:bg-primary/10 hover:text-primary"
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
          className="w-80 rounded-sm border-border/70 bg-card/95 p-4 shadow-2xl backdrop-blur-xl"
        >
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="mb-4 flex items-center justify-between border-b border-border/70 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles size={18} className="text-primary" />
                <p className="text-sm font-bold text-foreground">
                  Navigation Menu
                </p>
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
                      {hasSubLinks && isExpanded ? (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="ml-3 mt-2 flex flex-col gap-1 border-l-2 border-primary/30 pl-3">
                            {link.subLinks.map((sub) => (
                              <MobileSubNavItem
                                key={sub.href}
                                href={sub.href}
                                label={sub.label}
                                active={location.pathname === sub.href}
                                onClick={closeMobileMenu}
                              />
                            ))}
                          </div>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>

            <div className="mt-4 border-t border-border/70 pt-3">
              <NavbarActions
                isShopRoute={isShopRoute}
                isSpecialRoute={isSpecialRoute}
                onMobileAction={closeMobileMenu}
                className="w-full justify-between"
              />
            </div>
          </motion.div>
        </PopoverContent>
      </Popover>
    </motion.div>
  );
};

export default MobileNavbar;