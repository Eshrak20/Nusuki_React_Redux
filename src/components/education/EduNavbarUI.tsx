import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ChevronDown,
  Search,
  Video,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";

export interface EduDestination {
  name: string;
  code: string;
}

export interface EduNavItem {
  name: string;
  path: string;
  icon: LucideIcon;
  hasSubmenu?: boolean;
}

interface EduNavbarUIProps {
  isSticky?: boolean;
  navItems: EduNavItem[];
  destinations: EduDestination[];
  activeTab: string;
  pathname: string;
  isMenuOpen: boolean;
  openMobileSubmenu: string | null;
  onMenuToggle: () => void;
  onMobileClose: () => void;
  onMobileSubmenuToggle: (name: string) => void;
  onOpenCounselling: () => void;
  onSearchUniversities: () => void;
}

const getDestinationPath = (code: string) =>
  `/education/destinations/${code.toLowerCase()}`;

const EduNavbarUI = ({
  isSticky,
  navItems,
  destinations,
  activeTab,
  pathname,
  isMenuOpen,
  openMobileSubmenu,
  onMenuToggle,
  onMobileClose,
  onMobileSubmenuToggle,
  onOpenCounselling,
  onSearchUniversities,
}: EduNavbarUIProps) => {
  return (
    <nav
      className={cn(
        "relative z-50 border border-border/60 bg-background/80 px-4 pb-1 rounded-sm shadow-xl shadow-black/5 backdrop-blur-xl transition-all duration-500",
        isSticky ? "border-x-0 border-t-0" : " lg:px-6",
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4">
        <button
          type="button"
          onClick={onMenuToggle}
          className="flex size-11 items-center justify-center rounded-xl border bg-card text-foreground shadow-sm transition hover:bg-primary hover:text-primary-foreground lg:hidden"
        >
          {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        <div className="hidden items-center gap-2 lg:flex">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = activeTab === item.name;

            return (
              <div key={item.name} className="group relative py-4">
                <Link
                  to={item.path}
                  className={cn(
                    "relative inline-flex h-12 items-center gap-2 overflow-hidden rounded-xl px-4 text-sm font-bold transition-all duration-300",
                    "hover:-translate-y-0.5 hover:bg-primary/10 hover:text-primary hover:shadow-md",
                    active
                      ? "bg-primary text-primary-foreground shadow-xl hover:text-muted shadow-primary/25"
                      : "text-foreground/75",
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="edu-active-navbar-item"
                      className="absolute inset-0 rounded-xl bg-primary"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 32,
                      }}
                    />
                  )}

                  <Icon className="relative z-10 size-4.5" />
                  <span className="relative z-10">{item.name}</span>

                  {item.hasSubmenu && (
                    <ChevronDown className="relative z-10 size-4 transition-transform duration-300 group-hover:rotate-180" />
                  )}
                </Link>

                {item.hasSubmenu && (
                  <div className="invisible absolute left-0 top-full w-170 translate-y-3 opacity-0 transition-all duration-300 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                    <div className="rounded-sm border bg-background/95 p-5 shadow-2xl shadow-black/10 backdrop-blur-xl">
                      <div className="mb-4 flex items-center justify-between border-b pb-4">
                        <div>
                          <h3 className="text-base font-extrabold">
                            Study Destinations
                          </h3>
                          <p className="text-xs text-muted-foreground">
                            Choose your dream country
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={onSearchUniversities}
                          className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-xs font-bold text-primary-foreground shadow-lg shadow-primary/25 transition hover:-translate-y-0.5 hover:brightness-110"
                        >
                          <Search size={15} />
                          Search Universities
                        </button>
                      </div>

                      <div className="grid grid-cols-3 gap-3">
                        {destinations.map((dest) => {
                          const href = getDestinationPath(dest.code);
                          const activeDest = pathname === href;

                          return (
                            <Link
                              key={dest.code}
                              to={href}
                              className={cn(
                                "group/item flex items-center gap-3 rounded-xl border p-3 text-sm font-bold transition-all duration-300",
                                activeDest
                                  ? "border-primary bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                                  : "border-border/70 bg-card hover:-translate-y-0.5 hover:border-primary/40 hover:bg-primary/10 hover:text-primary hover:shadow-md",
                              )}
                            >
                              <img
                                src={`https://flagcdn.com/w40/${dest.code.toLowerCase()}.png`}
                                srcSet={`https://flagcdn.com/w80/${dest.code.toLowerCase()}.png 2x`}
                                alt={dest.name}
                                className="h-5 w-7 rounded-sm border object-cover shadow-sm"
                              />
                              <span>{dest.name}</span>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <button
          type="button"
          onClick={onOpenCounselling}
          className="hidden items-center gap-2 rounded-full bg-primary py-1.5 pl-1.5 pr-5 text-sm font-extrabold text-primary-foreground shadow-xl shadow-primary/25 transition hover:-translate-y-0.5 hover:brightness-110 lg:flex"
        >
          <span className="flex size-9 items-center justify-center rounded-full bg-red-600 shadow-md">
            <Video className="size-4 fill-white text-white" />
          </span>
          Avail Free Counselling
        </button>

        <button
          type="button"
          onClick={onOpenCounselling}
          className="flex size-11 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/25 lg:hidden"
        >
          <Video className="size-4 fill-white text-white" />
        </button>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0, y: -10 }}
            animate={{ height: "auto", opacity: 1, y: 0 }}
            exit={{ height: 0, opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden lg:hidden"
          >
            <div className="mt-3 space-y-2 rounded-sm border bg-card/95 p-3 shadow-2xl backdrop-blur-xl">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = activeTab === item.name;
                const expanded = openMobileSubmenu === item.name;

                if (item.hasSubmenu) {
                  return (
                    <div key={item.name}>
                      <button
                        type="button"
                        onClick={() => onMobileSubmenuToggle(item.name)}
                        className={cn(
                          "flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-bold transition-all",
                          active
                            ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                            : "text-foreground hover:bg-primary/10 hover:text-primary",
                        )}
                      >
                        <span className="flex items-center gap-2">
                          <Icon size={17} />
                          {item.name}
                        </span>

                        <ChevronDown
                          size={17}
                          className={cn(
                            "transition-transform",
                            expanded && "rotate-180",
                          )}
                        />
                      </button>

                      <AnimatePresence>
                        {expanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="ml-4 mt-2 space-y-2 border-l pl-3">
                              {destinations.map((dest) => {
                                const href = getDestinationPath(dest.code);
                                const activeDest = pathname === href;

                                return (
                                  <Link
                                    key={dest.code}
                                    to={href}
                                    onClick={onMobileClose}
                                    className={cn(
                                      "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition-all",
                                      activeDest
                                        ? "bg-primary text-primary-foreground"
                                        : "text-muted-foreground hover:bg-primary/10 hover:text-primary",
                                    )}
                                  >
                                    <img
                                      src={`https://flagcdn.com/w40/${dest.code.toLowerCase()}.png`}
                                      alt={dest.name}
                                      className="h-4.5 w-6 rounded-sm border object-cover"
                                    />
                                    {dest.name}
                                  </Link>
                                );
                              })}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={onMobileClose}
                    className={cn(
                      "flex items-center justify-between rounded-xl px-4 py-3 text-sm font-bold transition-all",
                      active
                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                        : "text-foreground hover:bg-primary/10 hover:text-primary",
                    )}
                  >
                    <span className="flex items-center gap-2">
                      <Icon size={17} />
                      {item.name}
                    </span>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default EduNavbarUI;
