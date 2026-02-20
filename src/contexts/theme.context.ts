import { createContext } from "react";

export type Theme = "dark" | "light" | "system";

export type ThemeContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

export const ThemeProviderContext = createContext<ThemeContextType>({
  theme: "system",
  setTheme: () => {},
});
