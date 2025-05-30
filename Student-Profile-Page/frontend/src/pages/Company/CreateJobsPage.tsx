import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { axiosPrivate } from "@/services/Apiclient";

const jobSchema = z.object({
  title: z.string().min(2, "Title is required"),
  remote: z.boolean(),
  full_time: z.boolean(),
  job_level: z.enum(["internship", "junior", "mid-senior", "senior"], {
    required_error: "Job level is required",
  }),
  description: z.string().min(10, "Description is required"),
  skills: z.string().min(2, "Skills are required"),
  deadline: z.string().min(1, "Deadline is required"),
});

type JobFormData = z.infer<typeof jobSchema>;

const defaultValues: JobFormData = {
  title: "",
  remote: false,
  full_time: false,
  job_level: "internship",
  description: "",
  skills: "",
  deadline: "",
};

const CreateJobsPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<JobFormData>({
    resolver: zodResolver(jobSchema),
    defaultValues,
  });

  const [message, setMessage] = React.useState<string | null>(null);

  const onSubmit = async (data: JobFormData) => {
    setMessage(null);
    try {
      const res = await axiosPrivate.post("/job", data);
      setMessage(res.data.message || "Job created successfully");
      reset(defaultValues);
    } catch (err: any) {
      setMessage(err.response?.data?.message || "Error creating job");
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="mx-auto max-w-xl px-6 pb-20 pt-35 font-[poppins]">
      <h2 className="mb-6 text-2xl font-bold">Create Job</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 rounded bg-white p-6 shadow"
      >
        <div>
          <label className="mb-1 block font-medium">Title</label>
          <input
            type="text"
            {...register("title")}
            className="w-full rounded border px-3 py-2"
          />
          {errors.title && (
            <p className="py-2 text-xs text-red-400">{errors.title.message}</p>
          )}
        </div>
        <div className="flex items-center gap-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              {...register("remote")}
              className="mr-2"
              checked={watch("remote")}
              onChange={(e) => setValue("remote", e.target.checked)}
            />
            Remote
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              {...register("full_time")}
              className="mr-2"
              checked={watch("full_time")}
              onChange={(e) => setValue("full_time", e.target.checked)}
            />
            Full Time
          </label>
        </div>
        <div>
          <label className="mb-1 block font-medium">Job Level</label>
          <select
            {...register("job_level")}
            className="w-full rounded border px-3 py-2"
          >
            <option value="internship">Internship</option>
            <option value="junior">Junior</option>
            <option value="mid-senior">Mid-Senior</option>
            <option value="senior">Senior</option>
          </select>
          {errors.job_level && (
            <p className="py-2 text-xs text-red-400">
              {errors.job_level.message}
            </p>
          )}
        </div>
        <div>
          <label className="mb-1 block font-medium">Description</label>
          <textarea
            {...register("description")}
            className="w-full rounded border px-3 py-2"
            rows={4}
          />
          {errors.description && (
            <p className="py-2 text-xs text-red-400">
              {errors.description.message}
            </p>
          )}
        </div>
        <div>
          <label className="mb-1 block font-medium">
            Skills (comma separated)
          </label>
          <input
            type="text"
            {...register("skills")}
            className="w-full rounded border px-3 py-2"
          />
          {errors.skills && (
            <p className="py-2 text-xs text-red-400">{errors.skills.message}</p>
          )}
        </div>
        <div>
          <label className="mb-1 block font-medium">Deadline</label>
          <input
            type="date"
            {...register("deadline")}
            className="w-full rounded border px-3 py-2"
          />
          {errors.deadline && (
            <p className="py-2 text-xs text-red-400">
              {errors.deadline.message}
            </p>
          )}
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="cursor-pointer rounded bg-[#625fbe] px-4 py-2 text-white hover:bg-[#4F4C98]"
        >
          {isSubmitting ? "Creating..." : "Create Job"}
        </button>
        {message && (
          <div className="mt-3 text-center text-sm text-red-600">{message}</div>
        )}
      </form>
    </div>
  );
};

export default CreateJobsPage;
