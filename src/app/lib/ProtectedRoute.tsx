import { useLocation } from "react-router-dom";
import { type ReactNode, Fragment, useLayoutEffect } from "react";
import { useUserStore } from "@/entities/user";
import { Loader2 } from "lucide-react";

type ChildrenProps = {
  children: ReactNode;
};

export type PropsWithChildren<T = unknown> = T & ChildrenProps;

export type PropsWithOptionalChildren<T = unknown> = T & Partial<ChildrenProps>;

interface ProtectedRouteProps {}

export const ProtectedRoute = ({
  children,
}: PropsWithChildren<ProtectedRouteProps>) => {
  const { fetchMe, isMeLoading } = useUserStore();
  const location = useLocation();

  useLayoutEffect(() => {
    fetchMe();
  }, [location]);

  if (isMeLoading) {
    return (
      <div className="absolute top-1/2 left-1/2">
        <Loader2 />
      </div>
    );
  }

  return (
    <Fragment key={location.pathname + location.hash}>{children}</Fragment>
  );
};
