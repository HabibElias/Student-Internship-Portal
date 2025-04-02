import Layout from "./components/Layout";
import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";

const routes = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
    ],
  },
]);

export default routes;
