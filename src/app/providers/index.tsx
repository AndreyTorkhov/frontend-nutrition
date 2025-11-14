import { type PropsWithChildren } from "react";
import { ThemeProvider } from "@/shared/configs/theme";
import { RouterProvider } from "./RouterProvider";
import { ErrorBoundaryProvider } from "./ErrorBoundaryProvider";
import { Toaster } from "sonner";

export const MainPovider = ({ children }: PropsWithChildren) => (
  <ErrorBoundaryProvider>
    <ThemeProvider>
      <Toaster richColors position="top-center" />
      <RouterProvider />
      {children}
    </ThemeProvider>
  </ErrorBoundaryProvider>
);
