import { Job } from "@/models/Job";
import { Badge } from "@/components/ui/badge";
import { Pencil, Briefcase, Timer, Users, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { axiosPrivate } from "@/services/Apiclient";
import { toast } from "sonner";
import { Button } from "../ui/button";

interface Props {
  job: Job;
  setEditingJob: React.Dispatch<React.SetStateAction<Job | null>>;
  deletingId: number | null;
  setDeletingId: React.Dispatch<React.SetStateAction<number | null>>;
  setJobs: React.Dispatch<React.SetStateAction<Job[]>>;
}

const JobCard = ({
  job,
  setDeletingId,
  setJobs,
  setEditingJob,
  deletingId,
}: Props) => {
  const handleDelete = async (jobId: number) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;
    setDeletingId(jobId);
    try {
      const res = await axiosPrivate.delete(`/job`, {
        data: { job_id: jobId },
      });
      if (res.data.status) {
        setJobs((prev) => prev.filter((job) => job.id !== jobId));
      } else {
        toast.error(res.data.message || "Failed to delete job");
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to delete job");
    } finally {
      setDeletingId(null);
    }
  };

  const navigate = useNavigate();
  return (
    <div className="relative flex min-h-[400px] flex-col justify-between rounded-xl border border-[#DBDFE4] bg-white px-7 py-6 shadow-[0px_4px_25.6px_-10px_#949393] duration-200 hover:scale-[1.01]">
      {/* Edit Button - top right corner */}
      <button
        className="absolute top-4 right-4 z-10 flex items-center gap-1 rounded-full bg-[#F8F7FF] px-3 py-1 text-xs font-semibold text-[#7D7ADA] transition hover:bg-[#ecebfa]"
        onClick={() => setEditingJob(job)}
        title="Edit Job"
        type="button"
      >
        <Pencil size={16} />
        Edit
      </button>
      <div>
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-[#0e181d]">{job.title}</h3>
        </div>
        {/* Move job_level badge below title for better spacing */}
        <div className="mb-2 flex items-center justify-between">
          <span className="rounded-full bg-[#F8F7FF] px-3 py-1 text-xs font-medium text-[#7D7ADA]">
            {job.job_level}
          </span>
        </div>
        <div className="mb-2 flex flex-wrap gap-2 text-xs font-medium text-[#949393]">
          <span>{job.remote ? "Remote" : "On-site"}</span>
          <span>{job.full_time ? "Full-time" : "Part-time"}</span>
        </div>
        <div className="mb-2 flex items-center gap-2 text-xs">
          <Briefcase size={14} className="text-[#7D7ADA]" />
          <span className="font-semibold text-[#7D7ADA]">
            {job.company_name || "Your Company"}
          </span>
        </div>
        <div className="mb-2 flex items-center gap-2 text-xs">
          <span className="text-[#949393]">Location:</span>
          <span className="text-[#7D7ADA]">{job.location || "N/A"}</span>
        </div>
        <div className="mb-2">
          <span className="text-xs font-semibold text-[#949393]">Skills:</span>
          <div className="mt-1 flex flex-wrap gap-2">
            {job.skills &&
              job.skills
                .split(",")
                .slice(0, 3)
                .map((skill, idx) => (
                  <Badge key={idx} variant="outline" className="text-[10px]">
                    {skill.trim()}
                  </Badge>
                ))}
            {job.skills && job.skills.split(",").length > 3 && (
              <span className="text-xs text-[#7D7ADA]">
                +{job.skills.split(",").length - 3} more
              </span>
            )}
          </div>
        </div>
        <div className="mb-2">
          <span className="text-xs font-semibold text-[#949393]">
            Description:
          </span>
          <p className="mt-1 text-xs text-[#0e181d]">{job.description}</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-[#949393]">
          <Timer size={14} />
          <span>
            Deadline:{" "}
            <span className="text-[#7D7ADA]">
              {job.deadline
                ? new Date(job.deadline).toLocaleDateString()
                : "N/A"}
            </span>
          </span>
        </div>
      </div>
      <div className="mt-4 flex gap-2">
        <button
          className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#7D7ADA] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#5c5bb9]"
          onClick={() => navigate(`/applicants/${job.id}`)}
        >
          <Users size={16} />
          View Applicants
          <span className="ml-2 rounded-full border border-[#7D7ADA] bg-white px-2 py-0.5 text-xs font-bold text-[#7D7ADA]">
            {job.application_count ?? 0}
          </span>
        </button>
        <Button
          className="flex items-center justify-center rounded-full bg-[#F8F7FF] px-3 py-2 text-xs font-semibold text-[#7D7ADA] transition hover:bg-[#ecebfa]"
          onClick={() => handleDelete(job.id)}
          disabled={deletingId === job.id}
          title="Delete Job"
          variant="outline"
        >
          <Trash2 size={16} />
          {deletingId === job.id ? "Deleting..." : "Delete"}
        </Button>
      </div>
    </div>
  );
};

export default JobCard;
