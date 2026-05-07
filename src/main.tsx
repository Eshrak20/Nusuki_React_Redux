import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { store, persistor } from "./redux/store";
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ThemeProvider } from "./providers/theme.provider";
import { Toaster } from "@/components/ui/sonner";
import { router } from "./routes/router";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <ReduxProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Toaster richColors position="top-center" closeButton />
          <RouterProvider router={router} />
        </PersistGate>
      </ReduxProvider>
    </ThemeProvider>
  </StrictMode>,
);