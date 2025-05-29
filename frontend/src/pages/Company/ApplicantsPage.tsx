import EditJobForm from "@/components/Company/EditForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Job } from "@/models/Job";
import { axiosPrivate } from "@/services/Apiclient";
import { isBefore, parseISO } from "date-fns";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import JobCard from "../../components/Company/JobCard";

const ApplicantsPage = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "hasApplications" | "expired">(
    "all",
  );
  const navigate = useNavigate();

  const handleEditSave = (updatedJob: Job) => {
    setJobs((prev) =>
      prev.map((job) =>
        job.id === updatedJob.id ? { ...job, ...updatedJob } : job,
      ),
    );
  };

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    const fetchJobs = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axiosPrivate.get("/c-jobs");
        if (res.data.status) {
          setJobs(res.data.data);
        } else {
          setError(res.data.message || "Failed to fetch jobs");
        }
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to fetch jobs");
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  // Filter and search logic
  const filteredJobs = jobs.filter((job) => {
    // Search by title or skills
    const matchesSearch =
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      (job.skills && job.skills.toLowerCase().includes(search.toLowerCase()));

    // Filter by application count or expire date
    let matchesFilter = true;
    if (filter === "hasApplications") {
      matchesFilter = (job.application_count ?? 0) > 0;
    } else if (filter === "expired") {
      // Assume job.deadline is ISO string or date string
      if (job.deadline) {
        try {
          matchesFilter = isBefore(parseISO(job.deadline), new Date());
        } catch {
          matchesFilter = false;
        }
      } else {
        matchesFilter = false;
      }
    }
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="mx-auto mb-20 w-[90vw] pt-35 font-[poppins] md:w-[80vw]">
      <div className="z-20 flex w-[inherit] items-center justify-between">
        <h2 className="mb-6 text-2xl font-bold">Your Posted Jobs</h2>
        <Button
          className="mb-6 cursor-pointer rounded-full bg-[#7D7ADA] px-6 py-2 text-sm font-semibold text-white transition hover:bg-[#5c5bb9]"
          onClick={() => navigate("/job")}
          size={"lg"}
        >
          <Plus />
          Create Job
        </Button>
      </div>
      {/* Search and Filters */}
      <div className="mb-8 flex flex-col gap-4 md:flex-row">
        <Input
          type="text"
          placeholder="Search jobs by title or skills..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="md:w-1/2"
        />
        <div className="flex gap-2">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            className="text-sm"
            onClick={() => setFilter("all")}
          >
            All
          </Button>
          <Button
            variant={filter === "hasApplications" ? "default" : "outline"}
            className="text-sm"
            onClick={() => setFilter("hasApplications")}
          >
            Has Applications
          </Button>
          <Button
            variant={filter === "expired" ? "default" : "outline"}
            className="text-sm"
            onClick={() => setFilter("expired")}
          >
            Expired
          </Button>
        </div>
      </div>
      {loading && (
        <div className="flex min-h-[50vh] w-full flex-col items-center justify-center font-[poppins] font-semibold">
          <div className="loader"></div>
          Loading...
        </div>
      )}
      {error && <div className="text-red-500">{error}</div>}
      <div className="grid w-[inherit] place-content-center gap-6 md:grid-cols-2 2xl:grid-cols-3">
        {filteredJobs.length === 0 && !loading && !error ? (
          <div className="col-span-full flex flex-col items-center justify-center py-16">
            <div className="mb-6 flex h-40 w-40 items-center justify-center rounded-full bg-[#f3f3fa] opacity-80">
              <Plus className="h-20 w-20 text-[#7D7ADA]" />
            </div>
            <div className="mb-2 text-xl font-semibold text-[#7D7ADA]">
              No jobs posted yet
            </div>
            <div className="mb-4 text-sm text-gray-500">
              You haven't posted any jobs. Click below to create your first job!
            </div>
            <Button
              className="rounded-full bg-[#7D7ADA] px-6 py-2 text-sm font-semibold text-white transition hover:bg-[#5c5bb9]"
              onClick={() => navigate("/job")}
              size="lg"
            >
              <Plus className="mr-2" />
              Create Job
            </Button>
          </div>
        ) : (
          filteredJobs.map((job, index) => (
            <JobCard
              key={index}
              job={job}
              setEditingJob={setEditingJob}
              setDeletingId={setDeletingId}
              setJobs={setJobs}
              deletingId={deletingId}
            />
          ))
        )}
      </div>
      {editingJob && (
        <EditJobForm
          job={editingJob}
          onClose={() => setEditingJob(null)}
          onSave={handleEditSave}
        />
      )}
    </div>
  );
};

export default ApplicantsPage;
