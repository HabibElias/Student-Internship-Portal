import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import useJob from "@/hooks/useJob";
import useSaveJob from "@/hooks/useSaveJob";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Flag, Paperclip, Save, Timer } from "lucide-react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const JobPage = () => {
  const { id } = useParams();
  const { job: j, isLoading } = useJob({ id: id });
  const { saveJob, isLoading: isSaving } = useSaveJob();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  if (isLoading)
    return (
      <>
        <div>Loading...</div>
      </>
    );

  if (j.company_name)
    return (
      <div className="flex items-center justify-center pt-35">
        <div className="mx-auto flex w-[80%] flex-col justify-center gap-8 py-35 font-[poppins] md:flex-row">
          {/* Main Content */}
          <div className="mx-auto max-w-4xl flex-1 p-4">
            <div className="mb-4 inline-flex items-center justify-between">
              <h1 className="text-2xl font-semibold">{j.title}</h1>
            </div>
            <div className="mb-4 flex items-center gap-4">
              <Avatar className="h-10 w-10">
                <AvatarImage
                  src={`${import.meta.env.VITE_API_URL}/image?img=${j.company_image}`}
                />
                <AvatarFallback>
                  {j.company_name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="font-semibold">{j.company_name}</div>
                <div className="text-sm text-gray-500">{j.location}</div>
              </div>
            </div>
            <div className="mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                {j.remote ? (
                  <Badge variant="secondary">Remote</Badge>
                ) : (
                  <Badge variant="secondary">On-site</Badge>
                )}
                {j.full_time ? (
                  <Badge variant="secondary">Full-time</Badge>
                ) : (
                  <Badge variant="secondary">Part-time</Badge>
                )}
                <Badge variant="secondary">{j.job_level}</Badge>
              </div>
            </div>
            <div className="mb-4">
              <h2 className="text-xl font-semibold">Job Description</h2>
              <p className="text-gray-700">{j.description}</p>
            </div>
            <div className="mb-4">
              <h2 className="text-xl font-semibold">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {j.skills.split(",").map((skill: string, index: number) => (
                  <Badge key={index} variant="outline">
                    {skill.trim()}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-xl font-semibold">Additional Information</h2>
              <div className="text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <Flag size={16} className="text-gray-500" />
                  Posted: {new Date(j.posted_time).toLocaleString()}
                </div>
                <div className="flex items-center gap-2">
                  <Timer size={16} className="text-gray-500" />
                  Deadline: {new Date(j.deadline).toLocaleString()}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={"link"}
                onClick={() => navigate(`/apply/${j.id}`)}
                className="mt-10 cursor-pointer rounded-full bg-[#7D7ADA] p-5 text-xs font-[400] text-white"
              >
                <Paperclip />
                Apply
              </Button>
              <Button
                variant={"outline"}
                onClick={() => saveJob(j.id)}
                className="mt-10 cursor-pointer rounded-full bg-[#7D7ADA] p-5 text-xs font-[400] text-white"
                disabled={isSaving}
              >
                <Save />
                {isSaving ? "Saving..." : "Save"}
              </Button>
            </div>
          </div>
          {/* Illustration */}
          <div className="hidden flex-1 flex-col items-center justify-center md:flex">
            <img
              src="/assets/undraw_data-analysis_b7cp.svg"
              alt="Application Illustration"
              className="h-auto w-full max-w-xs"
              loading="lazy"
            />
            <div className="mt-6 text-center text-lg font-semibold text-[#7D7ADA]">
              Apply now and take the next step towards your dream job!
            </div>
          </div>
        </div>
      </div>
    );
};

export default JobPage;
