import JobCard from "@/components/Student/JobCard";
import { Button } from "@/components/ui/button";
import useSavedJobs from "@/hooks/useSavedJobs";
import { useEffect } from "react";

const SavedJobsPage = () => {
  const { savedJobs, isLoading, deleteSavedJob } = useSavedJobs();

  useEffect(() => {
    window.scroll({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  if (isLoading) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center pt-45 font-[poppins]">
        <div className="flex flex-col items-center justify-center font-[poppins] font-semibold">
          <div className="loader"></div>
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-[90%] pt-45 font-[poppins]">
      <h2 className="mb-4 text-2xl font-semibold">Your Saved Jobs</h2>
      <div className="grid w-[inherit] place-content-center gap-6 *:w-full md:grid-cols-2 md:place-items-center *:md:min-w-[80%] 2xl:grid-cols-3">
        {savedJobs.map((sJob) => (
          <div key={sJob.id} className="relative w-fit">
            {sJob.job.company_name && <JobCard job={sJob.job} />}
            <Button
              variant="destructive"
              size="sm"
              className="absolute top-2 right-2 cursor-pointer ring-2 hover:bg-white/30 hover:text-red-600"
              onClick={() => deleteSavedJob(sJob.id)}
            >
              Delete
            </Button>
          </div>
        ))}
      </div>
      <div className="w-fit py-30">
        {savedJobs.length === 0 && (
          <div className="text-center text-gray-500">No saved jobs yet.</div>
        )}
      </div>
    </div>
  );
};

export default SavedJobsPage;
