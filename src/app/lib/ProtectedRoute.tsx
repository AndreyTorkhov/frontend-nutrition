import { type ReactNode, Fragment } from "react";

type ChildrenProps = {
  children: ReactNode;
};

export type PropsWithChildren<T = unknown> = T & ChildrenProps;

export type PropsWithOptionalChildren<T = unknown> = T & Partial<ChildrenProps>;

interface ProtectedRouteProps {}

export const ProtectedRoute = ({
  children,
}: PropsWithChildren<ProtectedRouteProps>) => {
  return (
    <Fragment key={location.pathname + location.hash}>{children}</Fragment>
  );
};
