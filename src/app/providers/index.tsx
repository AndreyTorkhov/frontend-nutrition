import { type PropsWithChildren } from "react";
import { ThemeProvider } from "@/shared/configs/theme";
import { RouterProvider } from "./RouterProvider";
import { ErrorBoundaryProvider } from "./ErrorBoundaryProvider";

export const MainPovider = ({ children }: PropsWithChildren) => (
  <ErrorBoundaryProvider>
    <ThemeProvider>
      <RouterProvider />
      {children}
    </ThemeProvider>
  </ErrorBoundaryProvider>
);
