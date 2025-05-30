import ImageInput from "@/components/ImageInput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useJob from "@/hooks/useJob";
import { cn } from "@/lib/utils";
import { Job } from "@/models/Job";
import { useAuth } from "@/providers/AuthProvider";
import { Label } from "@radix-ui/react-label";
import { Briefcase, Loader } from "lucide-react";
import { FormEvent, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const ApplyPage = ({ j }: { j?: Job }) => {
  const { id } = useParams();
  const { job } = useJob({ id: id });
  const { fetchState, applyToJob } = useAuth();

  useEffect(() => {
    window.scroll({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    applyToJob(id ?? "");
  };

  return (
    <div className="flex max-h-max min-h-[70vh] flex-col items-center justify-center px-[30px] py-45 font-[poppins]">
      <form
        onSubmit={handleSubmit}
        className="relative container flex flex-col items-center justify-start gap-5 rounded-2xl bg-white py-[50px] shadow-2xl md:w-[80%] xl:w-[50%]"
      >
        {/* ICON */}
        <Briefcase size={30} className="absolute top-6 left-6 text-[#7d7ada]" />

        <input type="hidden" name="job_id" value={id} />

        {/* HEADER */}
        <h1 className="mb-6 font-[DM_Serif_Text] text-3xl md:text-5xl">
          Apply
        </h1>

        {/* INPUTS */}
        <div className="space-y-3">
          <div>
            <Label htmlFor="job">Title</Label>
            <Input
              id="job"
              className={cn("w-full p-5")}
              type="text"
              value={job.title}
              disabled
            />
          </div>
          <ImageInput id="cv" labelName="Cv" required />
          <ImageInput
            id="recommendation_letter"
            labelName="Recommendation letter"
          />
        </div>

        {/* BTN */}
        <Button
          className={cn(
            "w-[60%] cursor-pointer bg-[#7D7ADA] py-6 text-lg font-[600] hover:bg-[#5c5bb9] md:w-[30%]",
          )}
          disabled={fetchState === "applying"}
        >
          {fetchState == "ready" ? (
            "Apply"
          ) : (
            <>
              <div className="animate-spin">
                <Loader />
              </div>
              Applying
            </>
          )}
        </Button>

        {/* JOB INFORMATION */}
        <div className="mt-8 w-[80%] rounded-2xl bg-[#f5f5fa] p-6 text-left shadow-sm">
          <h2 className="mb-4 font-[DM_Serif_Text] text-2xl text-[#7d7ada]">
            Job Information
          </h2>
          <div className="space-y-2 text-base text-gray-700">
            <p>
              <span className="font-semibold">Company:</span>{" "}
              {job.company_name || "N/A"}
            </p>
            <p>
              <span className="font-semibold">Location:</span>{" "}
              {job.location || "N/A"}
            </p>
            <p>
              <span className="font-semibold">Title:</span> {job.title || "N/A"}
            </p>
            <p>
              <span className="font-semibold">Description:</span>{" "}
              {job.description || "No description provided."}
            </p>
          </div>
        </div>
      </form>

      <div className="mt-20">
        <Link
          to={"/findJobs"}
          className="text-xl text-[#7d7ada] hover:underline"
        >
          Search for other Jobs like this?
        </Link>
      </div>
    </div>
  );
};

export default ApplyPage;
