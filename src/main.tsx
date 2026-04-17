import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/Routes";
import { store } from "./redux/store";
import { Provider as ReduxProvider } from "react-redux";
import { ThemeProvider } from "./providers/theme.provider";
// 1. Import the Toaster
import { Toaster } from "@/components/ui/sonner";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <ReduxProvider store={store}>
        {/* 2. Place Toaster here */}
        <Toaster richColors position="top-center" closeButton />
        <RouterProvider router={router} />
      </ReduxProvider>
    </ThemeProvider>
  </StrictMode>,
);