import { HomePage } from "@/pages/HomePage/ui";
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
      // ВАЖНО: профиль как оболочка + дочерний роут-модалка
      {
        path: ROUTES.HOME,
        element: (
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        ),
        children: [{ index: true, element: null }],
      },
    ],
  },

  { path: "*", element: <NotFoundPage /> },
]);

export const RouterProvider = () => <ReactRouterDomProvider router={router} />;
