import { Job } from "@/models/Job";
import { axiosPrivate } from "@/services/Apiclient";
import { X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type EditJobFormProps = {
  job: Job;
  onClose: () => void;
  onSave: (updated: Job) => void;
};

export default function EditJobForm({
  job,
  onClose,
  onSave,
}: EditJobFormProps) {
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
