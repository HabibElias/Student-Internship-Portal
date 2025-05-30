import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Job } from "@/models/Job";
import { axiosPrivate } from "@/services/Apiclient";
import { Briefcase, Plus, Timer, Trash2, Users, Pencil, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

type EditJobFormProps = {
  job: Job;
  onClose: () => void;
  onSave: (updated: Job) => void;
};

function EditJobForm({ job, onClose, onSave }: EditJobFormProps) {
  const [form, setForm] = useState({
    title: job.title,
    remote: job.remote,
    full_time: job.full_time,
    job_level: job.job_level,
    description: job.description,
    skills: job.skills,
    deadline: job.deadline,
  });
  const [saving, setSaving] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await axiosPrivate.patch(`/job?id=${job.id}`, form);
      console.log(res);

      if (res.data.status) {
        toast.success("Job updated successfully");
        onSave({ ...job, ...form });
        onClose();
      } else {
        toast.error(res.data);
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to update job");
      console.log(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute h-full w-full bg-black/40"
        onClick={onClose}
      ></div>
      <div className="relative w-full max-w-lg rounded-xl bg-white p-8 shadow-xl">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
          onClick={onClose}
        >
          <X size={20} />
        </button>
        <h2 className="mb-4 text-xl font-bold text-[#7D7ADA]">Edit Job</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block font-medium">Title</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              className="w-full rounded border px-3 py-2"
            />
          </div>
          <div className="flex items-center gap-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="remote"
                checked={form.remote}
                onChange={handleChange}
                className="mr-2"
              />
              Remote
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="full_time"
                checked={form.full_time}
                onChange={handleChange}
                className="mr-2"
              />
              Full Time
            </label>
          </div>
          <div>
            <label className="mb-1 block font-medium">Job Level</label>
            <select
              name="job_level"
              value={form.job_level}
              onChange={handleChange}
              required
              className="w-full rounded border px-3 py-2"
            >
              <option value="internship">Internship</option>
              <option value="junior">Junior</option>
              <option value="mid-senior">Mid-Senior</option>
              <option value="senior">Senior</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block font-medium">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              className="w-full rounded border px-3 py-2"
              rows={3}
            />
          </div>
          <div>
            <label className="mb-1 block font-medium">
              Skills (comma separated)
            </label>
            <input
              type="text"
              name="skills"
              value={form.skills}
              onChange={handleChange}
              required
              className="w-full rounded border px-3 py-2"
            />
          </div>
          <div>
            <label className="mb-1 block font-medium">Deadline</label>
            <input
              type="date"
              name="deadline"
              value={
                form.deadline
                  ? new Date(form.deadline).toISOString().slice(0, 10)
                  : ""
              }
              onChange={handleChange}
              required
              className="w-full rounded border px-3 py-2"
            />
          </div>
          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={saving}
              className="rounded bg-[#7D7ADA] px-4 py-2 text-white hover:bg-[#5c5bb9]"
            >
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

const ApplicantsPage = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const navigate = useNavigate();

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

  const handleEditSave = (updatedJob: Job) => {
    setJobs((prev) =>
      prev.map((job) =>
        job.id === updatedJob.id ? { ...job, ...updatedJob } : job,
      ),
    );
  };

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
      {loading && (
        <div className="flex min-h-[50vh] w-full flex-col items-center justify-center font-[poppins] font-semibold">
          <div className="loader"></div>
          Loading...
        </div>
      )}
      {error && <div className="text-red-500">{error}</div>}
      <div className="grid w-[inherit] place-content-center gap-6 md:grid-cols-2 2xl:grid-cols-3">
        {jobs.length === 0 && !loading && !error ? (
          <div className="col-span-full flex flex-col items-center justify-center py-16">
            <img
              src="/assets/empty-jobs.svg"
              alt="No jobs"
              className="mb-6 h-40 w-40 opacity-80"
              loading="lazy"
            />
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
          jobs.map((job) => (
            <div
              key={job.id}
              className="relative flex min-h-[400px] flex-col justify-between rounded-xl border border-[#DBDFE4] bg-white px-7 py-6 shadow-[0px_4px_25.6px_-10px_#949393] duration-200 hover:scale-[1.01]"
            >
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
                  <h3 className="text-lg font-semibold text-[#0e181d]">
                    {job.title}
                  </h3>
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
                  <span className="text-[#7D7ADA]">
                    {job.location || "N/A"}
                  </span>
                </div>
                <div className="mb-2">
                  <span className="text-xs font-semibold text-[#949393]">
                    Skills:
                  </span>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {job.skills &&
                      job.skills
                        .split(",")
                        .slice(0, 3)
                        .map((skill, idx) => (
                          <Badge
                            key={idx}
                            variant="outline"
                            className="text-[10px]"
                          >
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
                  <p className="mt-1 text-xs text-[#0e181d]">
                    {job.description}
                  </p>
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
                <button
                  className="flex items-center justify-center rounded-full bg-red-500 px-3 py-2 text-xs font-semibold text-white transition hover:bg-red-600"
                  onClick={() => handleDelete(job.id)}
                  disabled={deletingId === job.id}
                  title="Delete Job"
                  type="button"
                >
                  <Trash2 size={16} />
                  {deletingId === job.id ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
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
