import useRecommendations from "@/hooks/useRecommendations";
import { isStudent } from "@/models/Student";
import { useAuth } from "@/providers/AuthProvider";
import JobCard from "./JobCard";
import JobCardMobile from "./JobCardMobile";
import ApplicationStat from "./ApplicationStat";
import { useEffect } from "react";

const StudentDashboard = () => {
  const { user } = useAuth();
  const { recommendations } = useRecommendations();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="flex flex-col items-center gap-y-10 px-10 py-8 pt-35 font-[poppins]">
      {/* Hi */}
      <div className="self-start text-2xl font-bold">
        👋Hi, {user ? isStudent(user.data) && user.data.first_name : "There"}
      </div>

      {/* NUMBER OF APPLICATIONS */}
      <ApplicationStat />

      {/* RECOMMENDED JOBS */}
      <div className="w-full rounded-lg">
        <span className="mb-2 block text-lg font-medium text-gray-600">
          Recommended Jobs
        </span>
        <div className="hidden grid-cols-2 gap-6 md:grid">
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
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:hidden">
          {recommendations.length > 0 ? (
            recommendations.map((job, index) => (
              <JobCardMobile key={index} job={job} />
            ))
          ) : (
            <div className="col-span-full py-8 text-center text-gray-500">
              No recommendations available.
            </div>
          )}
        </div>
        <div className="mt-6 flex justify-start">
          <button className="cursor-pointer font-medium text-[#7d7ada] transition-colors hover:underline">
            See more
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
