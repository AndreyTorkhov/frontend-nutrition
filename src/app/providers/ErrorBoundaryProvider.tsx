import { ErrorPage } from "@/pages/ErrorPage/ui";
import { type PropsWithChildren } from "react";
import { ErrorBoundary } from "react-error-boundary";

export const ErrorBoundaryProvider = ({ children }: PropsWithChildren) => (
  <ErrorBoundary FallbackComponent={ErrorPage}>{children}</ErrorBoundary>
);
