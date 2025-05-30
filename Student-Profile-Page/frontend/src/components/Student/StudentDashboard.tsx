import useRecommendations from "@/hooks/useRecommendations";
import { isStudent } from "@/models/Student";
import { useAuth } from "@/providers/AuthProvider";
import { ArrowRight } from "lucide-react";
import { useEffect } from "react";
import ApplicationStat from "./ApplicationStat";
import JobCard from "./JobCard";

const StudentDashboard = () => {
  const { user } = useAuth();
  const { recommendations, isLoading } = useRecommendations();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="flex min-h-screen flex-col gap-y-10 overflow-x-hidden px-8 py-8 pt-35 font-[poppins]">
      {/* Blurred background */}
      <div className="pointer-events-none absolute inset-0 -z-10 h-full w-full bg-[url('/assets/bg.svg')] bg-cover bg-center bg-no-repeat opacity-60 blur-[2px]" />
      {/* Greeting */}
      <div className="mb-2 flex items-center gap-2 self-start text-2xl font-bold text-[#0e181d]">
        <span className="text-3xl">👋</span>
        <span>
          {user && isStudent(user.data)
            ? `Welcome, ${user.data.first_name}!`
            : "Welcome!"}
        </span>
      </div>
      {/* Application Stats */}
      <div className="w-full max-w-4xl">
        <ApplicationStat />
      </div>
      {/* Recommended Jobs */}
      <div className="bg-opacity-90 w-full max-w-4xl rounded-xl border border-[#DBDFE4] bg-white p-6 shadow-md backdrop-blur-md">
        <div className="mb-4 flex flex-wrap gap-y-3 items-center justify-between">
          <span className="text-lg font-semibold text-[#7D7ADA]">
            Recommended Jobs
          </span>
          <button className="flex items-center gap-1 rounded-full bg-[#7D7ADA] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#5c5bb9]">
            See more <ArrowRight size={16} />
          </button>
        </div>
        {isLoading ? (
          <div className="py-8 text-center text-gray-500">
            Loading recommendations...
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {recommendations.length > 0 ? (
              recommendations.map((job, index) => (
                <JobCard key={index} job={job} />
              ))
            ) : (
              <div className="col-span-full py-8 text-center text-gray-500">
                No recommendations available.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;
