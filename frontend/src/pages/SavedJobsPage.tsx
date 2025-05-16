import JobCard from "@/components/Student/JobCard";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import useSavedJobs from "@/hooks/useSavedJobs";

const SavedJobsPage = () => {
  const { savedJobs, isLoading, deleteSavedJob } = useSavedJobs();

  if (isLoading) {
    return (
      <div className="mx-auto w-[90%] pt-45 font-[poppins]">
        <h2 className="mb-4 text-2xl font-semibold">Your Saved Jobs</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(3)].map((_, idx) => (
            <div key={idx} className="relative w-fit">
              <div className="flex h-[180px] w-[320px] flex-col gap-3 rounded-lg border-2 border-gray-200 bg-gray-100 p-4">
                <Skeleton className="mb-2 h-6 w-2/3 rounded bg-gray-300" />
                <Skeleton className="mb-1 h-4 w-1/2 rounded bg-gray-200" />
                <Skeleton className="mb-3 h-4 w-1/3 rounded bg-gray-200" />
                <div className="mt-auto flex gap-2">
                  <Skeleton className="h-8 w-20 rounded bg-gray-300" />
                  <Skeleton className="ml-auto h-8 w-8 rounded-full bg-gray-400" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-[90%] pt-45 font-[poppins]">
      <h2 className="mb-4 text-2xl font-semibold">Your Saved Jobs</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
