import useRecommendations from "@/hooks/useRecommendations";
import { isStudent } from "@/models/Student";
import { useAuth } from "@/providers/AuthProvider";
import { ArrowRight } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import ApplicationPieChart from "./ApplicationPieChart";
import ApplicationStat from "./ApplicationStat";
import JobCard from "./JobCard";

const quickLinks = [
  { label: "Dashboard", to: "/dashboard" },
  { label: "Find Jobs", to: "/findJobs" },
  { label: "My Applications", to: "/applications" },
  { label: "Profile", to: "/student/profile" },
];

const StudentDashboard = () => {
  const { user } = useAuth();
  const { recommendations, isLoading } = useRecommendations();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="relative flex min-h-screen flex-col gap-y-10 overflow-x-hidden px-8 py-8 pt-35 font-[poppins]">
      {/* Blurred background */}
      <div className="pointer-events-none absolute inset-0 -z-10 h-full w-full bg-[url('/assets/bg.svg')] bg-cover bg-center bg-no-repeat opacity-60 blur-[2px]" />
      {/* Greeting */}
      <div className="mb-2 flex items-center gap-2 self-start text-2xl font-bold text-[#0e181d] mx-auto">
        <span className="text-3xl">👋</span>
        <span>
          {user && isStudent(user.data)
            ? `Welcome, ${user.data.first_name}!`
            : "Welcome!"}
        </span>
      </div>
      <div className="relative flex flex-col-reverse items-start justify-between mx-auto">
        {/* Quick Links Sidebar */}
        <nav className="lg:fixed top-30 right-6 z-20 flex-col gap-3 lg:text-end flex">
          <span className="mb-2 text-xl font-semibold text-[#7D7ADA]">
            Quick Links
          </span>
          {quickLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-sm text-gray-700 transition hover:text-[#7D7ADA] hover:underline"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="space-y-10">
          {/* Application Stats */}
          <div className="w-full max-w-4xl">
            <ApplicationStat />
            <div className="">
              <span className="mb-2 block text-lg font-medium text-gray-600">
                Statistics
              </span>
              <ApplicationPieChart />
            </div>
          </div>
          {/* Recommended Jobs */}
          <div className="bg-opacity-90 mb-20 w-full max-w-4xl rounded-xl border border-[#DBDFE4] bg-white p-6 shadow-md backdrop-blur-md">
            <div className="mb-4 flex flex-wrap gap-x-2 items-center justify-between gap-y-3">
              <span className="text-lg font-semibold text-[#7D7ADA]">
                Recommended Jobs
              </span>
              <Link
                to={"/findJobs"}
                className="flex items-center gap-1 w-fit rounded-full bg-[#7D7ADA] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#5c5bb9]"
              >
                See more <ArrowRight size={16} />
              </Link>
            </div>
            {isLoading ? (
              <div className="py-8 text-center text-gray-500">
                Loading recommendations...
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2">
                {recommendations.length > 0 ? (
                  recommendations.map((job, index) => (
                    <JobCard key={index} job={job} />
                  ))
                ) : (
                  <div className="col-span-full md:min-w-xl py-8 text-center text-gray-500">
                    No recommendations available.
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
