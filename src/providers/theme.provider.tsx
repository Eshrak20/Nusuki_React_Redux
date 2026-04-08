import { ThemeProviderContext } from "@/contexts/theme.context";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";

import type { Theme } from "@/contexts/theme.context";

type ThemeProviderProps = {
  children: ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

export function ThemeProvider({
  children,
  defaultTheme = "light",
  storageKey = "vite-ui-theme",
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    const storedTheme = localStorage.getItem(storageKey);
    
    // VALIDATE: Only return stored theme if it's strictly 'light' or 'dark'
    if (storedTheme === "light" || storedTheme === "dark") {
      return storedTheme as Theme;
    }
    
    // DEFAULT: Return 'light' (or your defaultTheme prop)
    return defaultTheme;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
  }, [theme]);

  const value = {
    theme,
    setTheme: (newTheme: Theme) => {
      localStorage.setItem(storageKey, newTheme);
      setTheme(newTheme);
    },
  };

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}
