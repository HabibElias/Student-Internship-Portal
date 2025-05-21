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
import FindJobsPage from "./pages/Student/FindJobsPage.tsx";
import ApplyPage from "./pages/Student/ApplyPage.tsx";
import NotFound from "./components/NotFound.tsx";
import ErrorPage from "./components/ErrorPage.tsx";
import JobPage from "./pages/Student/JobPage.tsx";
import ApplicationsPage from "./pages/Student/ApplicationsPage.tsx";
import SavedJobsPage from "./pages/Student/SavedJobsPage.tsx";
import CompanyLayout from "./components/Company/CompanyLayout.tsx";
import CreateJobsPage from "./pages/Company/CreateJobsPage.tsx";
import StudentDashboard from "./components/Student/StudentDashboard.tsx";
import CompanyDashboard from "./pages/Company/CompanyDashboard.tsx";
import ApplicantsPage from "./pages/Company/ApplicantsPage.tsx";
import ApplicantDetails from "./pages/Company/ApplicantDetails.tsx";

const routes = createBrowserRouter([
  {
    errorElement: <ErrorPage />,
    children: [
      {
        element: <LandLayOut />,
        children: [
          { path: "", element: <HomePage /> },
          {
            path: "/unauthorized",
            element: <Unauthorized />,
          },
          {
            path: "/not-found",
            element: <NotFound />,
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
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        element: <PrivateRoutes />,
        children: [
          {
            element: <StudentLayout />,
            children: [
              {
                path: "/dashboard/student",
                element: <StudentDashboard />,
              },
              {
                path: "/findJobs",
                element: <FindJobsPage />,
              },
              {
                path: "/apply/:id",
                element: <ApplyPage />,
              },
              {
                path: "/job/:id",
                element: <JobPage />,
              },
              {
                path: "/applications",
                element: <ApplicationsPage />,
              },
              {
                path: "/savedJobs",
                element: <SavedJobsPage />,
              },
            ],
          },
          {
            element: <CompanyLayout />,
            children: [
              {
                path: "job",
                element: <CreateJobsPage />,
              },
              {
                path: "/dashboard/company",
                element: <CompanyDashboard />,
              },
              {
                path: "applicants",
                element: <ApplicantsPage />,
              },
              {
                path: "applicants/:id",
                element: <ApplicantDetails />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default routes;
