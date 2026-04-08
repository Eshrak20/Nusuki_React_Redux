import { createContext } from "react";

export type Theme =  "light" | "dark" ;

export type ThemeContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

export const ThemeProviderContext = createContext<ThemeContextType>({
  theme: "light",
  setTheme: () => { },
});
