import { Layout as LandLayOut } from "./components/LandingPage/Layout.tsx";
import { createBrowserRouter } from "react-router-dom";
import HomePage from "@/pages/HomePage.tsx";
import LoginPage from "@/pages/LoginPage.tsx";
import { Layout as FormLayout } from "./components/Forms/Layout.tsx";
import RegisterPage from "./pages/RegisterPage.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import StudentLayout from "./components/Student/StudentLayout.tsx";
import PrivateRoutes from "./components/PrivateRoutes.tsx";
import Unauthorized from "./components/Unauthorized.tsx";

const routes = createBrowserRouter([
  {
    path: "",
    element: <LandLayOut />,
    children: [
      { path: "", element: <HomePage /> },
      {
        path: "/unauthorized",
        element: <Unauthorized />,
      },
    ],
  },

  {
    element: <FormLayout />,
    children: [
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
    ],
  },
  {
    element: <PrivateRoutes />,
    children: [
      {
        element: <StudentLayout />,
        children: [
          {
            path: "/dashboard",
            element: <Dashboard />,
          },
        ],
      },
    ],
  },
]);

export default routes;
