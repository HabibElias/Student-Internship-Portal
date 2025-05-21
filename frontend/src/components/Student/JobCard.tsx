import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Job } from "@/models/Job";
import { Briefcase, Paperclip, Timer, ZoomIn } from "lucide-react";
import { useNavigate } from "react-router";

const JobCard = ({ job: j }: { job: Job }) => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-[400px] max-w-xl flex-col justify-between rounded-xl border border-[#DBDFE4] bg-white px-7 py-6 shadow-[0px_4px_25.6px_-10px_#949393] duration-200 hover:scale-[1.01]">
      <div>
        <div className="mb-2 flex flex-wrap items-center justify-between">
          <h3 className="text-lg font-semibold text-[#0e181d]">{j.title}</h3>
          <span className="rounded-full bg-[#F8F7FF] px-3 py-1 text-xs font-medium text-[#7D7ADA]">
            {j.job_level}
          </span>
        </div>
        <div className="mb-2 flex flex-wrap gap-2 text-xs font-medium text-[#949393]">
          <span>{j.remote ? "Remote" : "On-site"}</span>
          <span>{j.full_time ? "Full-time" : "Part-time"}</span>
        </div>
        <div className="mb-2 flex items-center gap-2 text-xs">
          <Briefcase size={14} className="text-[#7D7ADA]" />
          <span className="font-semibold text-[#7D7ADA]">
            {j.company_name || "Your Company"}
          </span>
        </div>
        <div className="mb-2 flex items-center gap-2 text-xs">
          <span className="text-[#949393]">Location:</span>
          <span className="text-[#7D7ADA]">{j.location || "N/A"}</span>
        </div>
        <div className="mb-2">
          <span className="text-xs font-semibold text-[#949393]">Skills:</span>
          <div className="mt-1 flex flex-wrap gap-2">
            {j.skills &&
              j.skills
                .split(",")
                .slice(0, 3)
                .map((skill, idx) => (
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
        <div className="mb-2">
          <span className="text-xs font-semibold text-[#949393]">
            Description:
          </span>
          <p className="mt-1 text-xs max-w-xs text-[#0e181d]">{j.description}</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-[#949393]">
          <Timer size={14} />
          <span>
            Deadline:{" "}
            <span className="text-[#7D7ADA]">
              {j.deadline ? new Date(j.deadline).toLocaleDateString() : "N/A"}
            </span>
          </span>
        </div>
      </div>

      {/* BTNS */}
      <div className="space-x-2 self-end font-[poppins]">
        <Button
          variant={"link"}
          onClick={() => navigate(`/apply/${j.id}`)}
          className="cursor-pointer rounded-full bg-[#7D7ADA] text-xs font-[400] text-white"
        >
          <Paperclip />
          Apply
        </Button>
        <Button
          onClick={() => navigate(`/job/${j.id}`)}
          variant={"link"}
          className="cursor-pointer rounded-full bg-[#7D7ADA] text-xs font-[400] text-white"
        >
          <ZoomIn />
          See More
        </Button>
      </div>
    </div>
  );
};

export default JobCard;
