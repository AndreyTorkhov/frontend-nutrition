import { HomePage } from "@/pages/HomePage";
import { ProfilePage } from "@/pages/ProfilePage";
import { UsersPage } from "@/pages/UsersPage";
import { MainLayout } from "../layouts/MainLayout";
import { LoginPage } from "@/pages/LoginPage";
import { RegisterPage } from "@/pages/RegisterPage";
import { NotFoundPage } from "@/pages/NotFoundPage/ui";
import { ROUTES } from "@/shared/configs/routes";
import {
  createBrowserRouter,
  RouterProvider as ReactRouterDomProvider,
} from "react-router-dom";
import { ProtectedRoute } from "../lib";

export const router = createBrowserRouter([
  { path: ROUTES.LOGIN, element: <LoginPage /> },
  { path: ROUTES.REGISTER, element: <RegisterPage /> },

  {
    element: <MainLayout />,
    children: [
      {
        path: ROUTES.HOME,
        element: (
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        ),
        children: [{ index: true, element: null }],
      },
      {
        path: ROUTES.PROFILE,
        element: (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        ),
        children: [{ index: true, element: null }],
      },
      {
        path: ROUTES.USERS,
        element: (
          <ProtectedRoute>
            <UsersPage />
          </ProtectedRoute>
        ),
        children: [{ index: true, element: null }],
      },
    ],
  },

  { path: "*", element: <NotFoundPage /> },
]);

export const RouterProvider = () => <ReactRouterDomProvider router={router} />;
