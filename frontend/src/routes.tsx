import { Layout as LandLayOut } from "./components/LandingPage/Layout.tsx";
import { createBrowserRouter } from "react-router-dom";
import HomePage from "@/pages/HomePage.tsx";
import LoginPage from "@/pages/LoginPage.tsx";
import { Layout as FormLayout } from "./components/Forms/Layout.tsx";
import RegisterPage from "./pages/RegisterPage.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import PrivateStudent from "./components/Student/PrivateStudent.tsx";

const routes = createBrowserRouter([
  {
    path: "",
    element: <LandLayOut />,
    children: [{ path: "", element: <HomePage /> }],
  },
  {
    element: <FormLayout />,
    children: [
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
    ],
  },
  {
    element: <PrivateStudent />,
    children: [{ path: "/dashboard", element: <Dashboard /> }],
  },
]);

export default routes;
