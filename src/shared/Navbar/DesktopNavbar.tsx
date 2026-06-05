import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

import {
  DesktopDropdownTrigger,
  DesktopNavLinkItem,
  DropdownContentItem,
} from "./NavbarUI";
import { navigationLinks } from "./NavbarData";

const DesktopNavbar = () => {
  const location = useLocation();

  return (
    <NavigationMenu viewport={false} className="hidden md:flex">
      <NavigationMenuList className="relative gap-1.5 rounded-sm border border-border/60 bg-background/50 p-1.5 shadow-sm backdrop-blur transition-all duration-300 hover:shadow-md">
        {navigationLinks.map((link) => {
          const isActive = location.pathname.startsWith(link.href);

          return (
            <NavigationMenuItem key={link.label}>
              {link.subLinks ? (
                <>
                  <DesktopDropdownTrigger label={link.label} active={isActive} />

                  <NavigationMenuContent>
                    <motion.ul
                      initial={{ opacity: 0, y: 12, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.25 }}
                      className="mt-2 w-64 space-y-1 rounded-sm border border-border/70 bg-popover p-2 shadow-2xl shadow-black/10 backdrop-blur-xl"
                    >
                      {link.subLinks.map((sub, index) => (
                        <motion.li
                          key={sub.href}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05, duration: 0.2 }}
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
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default DesktopNavbar;