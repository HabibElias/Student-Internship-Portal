import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Job } from "@/models/Job";
import { Briefcase, Flag, Paperclip, Timer, ZoomIn } from "lucide-react";
import { useNavigate } from "react-router";
import { Badge } from "@/components/ui/badge";

const JobCard = ({ job: j }: { job: Job }) => {
  const navigate = useNavigate();

  
  return (
    <div className="flex min-h-[412px] min-w-[350px] max-w-[400px] flex-col justify-around rounded-[10px] border-[3px_solid_#DBDFE4] bg-[#fff] px-[35px] py-[16px] font-[poppins] shadow-[0px_4px_25.6px_-10px_#949393] duration-200 hover:scale-105">
      <div>
        {/* THE TITLE AND THE IMG */}
        <div className="flex items-center justify-between">
          <div className="font-[Montserrat] text-base font-[500] text-[#0e181d]">
            {j.title}
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <Avatar className="cursor-pointer">
                {j && (
                  <AvatarImage
                    className="h-10 w-10 overflow-clip rounded-full"
                    src={`${import.meta.env.VITE_API_URL}/image?img=${j.company_image}`}
                  />
                )}
                <AvatarFallback className="rounded-full bg-gray-500 p-2 text-white">
                  {j && j.company_name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </PopoverTrigger>
            <PopoverContent className="mt-3 h-max w-max">
              <div className="mt-3 inline-flex gap-2 rounded-xl bg-white p-3 font-[poppins] text-base">
                Company Name:
                <p className="text-[#7D7ADA]">{j.company_name}</p>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        {/* REMOTE FULL-TIME AND ON SITE */}
        <div className="flex items-center gap-4 font-[Montserrat] text-xs font-[500] text-[#949393]">
          <div>{j.remote ? "Remote" : "On-site"}</div>
          <div>{j.full_time ? "Full-time" : "Part-time"}</div>
          <div>{j.job_level}</div>
        </div>
      </div>

      <div className="mt-2 inline-flex flex-col items-start font-[Montserrat] text-xs font-[500]">
        <div>
          <span className="mr-2 text-[#949393]">Location:</span>
          <span className="text-[#7D7ADA]">{j.location}</span>
        </div>
        <div>
          <span className="mr-2 text-[#949393]">Company:</span>
          <span className="text-[#7D7ADA]">{j.company_name}</span>
        </div>
      </div>

      {/* DESCRIPTION */}
      <div>
        <h3 className="font-[Montserrat] text-xs font-[500]">Description</h3>
        <p className="font-[Montserrat] text-xs font-[400]">{j.description}</p>
      </div>

      {/* DETAILS */}
      <div className="space-y-2 font-[poppins]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-[#949393]">
            <Flag size={16} color="#949393" fill="#949393" /> Posted
          </div>
          <div className="text-xs">
            {new Date(j.posted_time).toLocaleString()}
          </div>
        </div>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2 text-xs text-[#949393]">
            <Briefcase size={16} color="#949393" fill="#949393" /> Skills
          </div>
          <div className="flex flex-1 flex-wrap justify-end gap-2 text-xs">
            {j.skills
              .split(",")
              .slice(0, 3)
              .map((skill, index) => (
                <Badge variant={"outline"} className="text-[10px]" key={index}>
                  {skill}
                </Badge>
              ))}
            {j.skills.split(",").length > 3 && (
              <div>{j.skills.split(",").slice(3).length + "More"}</div>
            )}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-[#949393]">
            <Timer size={16} color="#949393" /> Deadline
          </div>
          <div className="text-xs">{new Date(j.deadline).toLocaleString()}</div>
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
