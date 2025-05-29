import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import useJob from "@/hooks/useJob";
import useSaveJob from "@/hooks/useSaveJob";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import {
  Briefcase,
  Facebook,
  Flag,
  Globe,
  Linkedin,
  Paperclip,
  Save,
  Timer,
  Twitter,
} from "lucide-react";
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
    <div className="flex items-center justify-center pt-35">
      <div className="mx-auto flex w-[90vw] flex-col gap-12 py-20 font-[poppins] md:w-[80vw] md:flex-row">
        {/* Job Details */}
        <div className="mx-auto max-w-3xl flex-1 p-4">
          <div className="mb-4 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-[#0e181d]">{j.title}</h1>
              <span className="rounded-full bg-[#F8F7FF] px-3 py-1 text-xs font-medium text-[#7D7ADA]">
                {j.job_level}
              </span>
            </div>
            <div className="flex flex-wrap gap-2 text-xs font-medium text-[#949393]">
              <span>{j.remote ? "Remote" : "On-site"}</span>
              <span>{j.full_time ? "Full-time" : "Part-time"}</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <Briefcase size={14} className="text-[#7D7ADA]" />
              <span className="font-semibold text-[#7D7ADA]">
                {j.company_name || "Your Company"}
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-[#949393]">Location:</span>
              <span className="text-[#7D7ADA]">{j.location || "N/A"}</span>
            </div>
          </div>
          <div className="mb-4">
            <span className="text-xs font-semibold text-[#949393]">
              Skills:
            </span>
            <div className="mt-1 flex flex-wrap gap-2">
              {j.skills &&
                j.skills
                  .split(",")
                  .slice(0, 3)
                  .map((skill: string, idx: number) => (
                    <Badge key={idx} variant="outline" className="text-[10px]">
                      {skill.trim()}
                    </Badge>
                  ))}
              {j.skills && j.skills.split(",").length > 3 && (
                <span className="text-xs text-[#7D7ADA]">
                  +{j.skills.split(",").length - 3} more
                </span>
              )}
            </div>
          </div>
          <div className="mb-4">
            <span className="text-xs font-semibold text-[#949393]">
              Description:
            </span>
            <p className="mt-1 text-sm text-[#0e181d]">{j.description}</p>
          </div>
          <div className="mb-4 flex items-center gap-4 text-xs text-[#949393]">
            <Flag size={14} />
            <span>
              Posted:{" "}
              <span className="text-[#7D7ADA]">
                {j.posted_time
                  ? new Date(j.posted_time).toLocaleDateString()
                  : "N/A"}
              </span>
            </span>
            <Timer size={14} />
            <span>
              Deadline:{" "}
              <span className="text-[#7D7ADA]">
                {j.deadline ? new Date(j.deadline).toLocaleDateString() : "N/A"}
              </span>
            </span>
          </div>
          <div className="mt-6 flex items-center gap-2">
            <Button
              variant={"link"}
              onClick={() => navigate(`/apply/${j.id}`)}
              className="cursor-pointer rounded-full bg-[#7D7ADA] px-4 py-2 text-xs font-[400] text-white"
            >
              <Paperclip />
              Apply
            </Button>
            <Button
              variant={"outline"}
              onClick={() => saveJob(j.id)}
              className="cursor-pointer rounded-full border-[#7D7ADA] bg-white px-4 py-2 text-xs font-[400] text-[#7D7ADA] hover:bg-[#F8F7FF]"
              disabled={isSaving}
            >
              <Save />
              {isSaving ? "Saving..." : "Save"}
            </Button>
          </div>
        </div>
        {/* Company Overview */}
        <div className="mx-auto flex max-w-sm flex-1 flex-col border-t border-[#DBDFE4] p-4 md:border-t-0 md:border-l md:pl-8">
          <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-[#7D7ADA]">
            <Briefcase size={20} /> About {j.company_name}
          </h2>
          <div className="mb-4 flex items-center gap-4">
            <Avatar className="h-16 w-16 rounded-full border">
              <AvatarImage
                src={`${import.meta.env.VITE_API_URL}/image?img=${j.company_image}`}
                className="h-16 w-16 rounded-full"
              />
              <AvatarFallback className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-200 text-lg font-bold text-[#7D7ADA]">
                {j.company_name?.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="text-lg font-semibold text-[#0e181d]">
                {j.company_name}
              </div>
              <div className="text-sm text-[#7D7ADA]">
                {j.location || "N/A"}
              </div>
            </div>
          </div>
          <div className="mb-4 text-sm text-[#0e181d]">
            {j.company_description || "No company description provided."}
          </div>
          {/* Company Socials */}
          <div className="mt-2 flex items-center gap-4">
            {j.company_socials?.website && (
              <a
                href={j.company_socials.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl text-[#7D7ADA] hover:text-[#5c5bb9]"
                title="Website"
              >
                <Globe />
              </a>
            )}
            {j.company_socials?.linkedin && (
              <a
                href={j.company_socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl text-[#7D7ADA] hover:text-[#5c5bb9]"
                title="LinkedIn"
              >
                <Linkedin />
              </a>
            )}
            {j.company_socials?.twitter && (
              <a
                href={j.company_socials.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl text-[#7D7ADA] hover:text-[#5c5bb9]"
                title="Twitter"
              >
                <Twitter />
              </a>
            )}
            {j.company_socials?.facebook && (
              <a
                href={j.company_socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl text-[#7D7ADA] hover:text-[#5c5bb9]"
                title="Facebook"
              >
                <Facebook />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobPage;
