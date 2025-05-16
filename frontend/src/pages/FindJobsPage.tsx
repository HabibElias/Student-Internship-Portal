import JobCard from "@/components/Student/JobCard";
import JobCardMobile from "@/components/Student/JobCardMobile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import useJobs from "@/hooks/useJobs";
import { Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const FindJobsPage = () => {
  const [title, setTitle] = useState<string>("");
  const refTitle = useRef<HTMLInputElement>(null);
  const [jobLevel, setJobLevel] = useState<string>("");
  const [fullTime, setFullTime] = useState<string>("");
  const [postedTime, setPostedTime] = useState<string>("");

  const {
    isLoading,
    hasNext,
    total,
    limit,
    hasPrevious,
    page,
    setQueryPage,
    jobs,
  } = useJobs({
    title,
    job_level: jobLevel,
    full_time: fullTime,
    posted_time: postedTime,
  });

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [page]);

  return (
    <div className="font-[poppins]">
      <section className="flex flex-col items-center justify-center gap-y-10 bg-(--purpleLight) px-10 pt-35 font-[poppins]">
        <h1 className="font-[Montserrat] text-xl font-[500]">
          Your Job Search, Simplified
        </h1>

        <div className="">
          {/* SEARCH */}
          <div className="mb-10 flex w-full flex-wrap items-center justify-center gap-2 sm:flex-nowrap">
            <Input
              className="bg-(--inputFill) focus-visible:ring-(--btnLight) md:p-5 md:text-xl"
              type="text"
              placeholder="Search"
              name="search"
              ref={refTitle}
              id="search"
            />
            <Button
              onClick={() => {
                if (refTitle.current) {
                  setTitle(refTitle.current.value);
                  setQueryPage(1);
                }
              }}
              className="search-btn w-full cursor-pointer bg-(--vDarkPurple) hover:bg-(--vDarkPurple)/70 sm:w-fit md:p-5 md:text-xl"
            >
              <Search />
              Search
            </Button>
          </div>

          <h3 className="mb-3">Filters</h3>
          <div className="mb-10 flex flex-wrap items-center gap-3">
            <div className="input">
              <Label htmlFor="level" className="mb-3">
                Job Level
              </Label>
              <Select
                onValueChange={(value) => {
                  setJobLevel(value);
                  setQueryPage(1);
                }}
              >
                <SelectTrigger
                  name="name"
                  id="level"
                  className="w-[180px] bg-(--inputFill)"
                >
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="#">All</SelectItem>
                  <SelectItem value="internship">Internship</SelectItem>
                  <SelectItem value="junior">Junior</SelectItem>
                  <SelectItem value="mid-senior">Mid-Senior</SelectItem>
                  <SelectItem value="Senior">Senior</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="input">
              <Label htmlFor="type" className="mb-3">
                Time
              </Label>
              <Select
                onValueChange={(value) => {
                  setFullTime(value);
                  setQueryPage(1);
                }}
              >
                <SelectTrigger id="type" className="w-[180px] bg-(--inputFill)">
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="#">All</SelectItem>
                  <SelectItem value="1">Full time</SelectItem>
                  <SelectItem value="0">Part time</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="input">
              <Label htmlFor="posted_time" className="mb-3">
                Posted Time
              </Label>
              <Select
                onValueChange={(value) => {
                  setPostedTime(value);
                  setQueryPage(1);
                }}
              >
                <SelectTrigger
                  id="posted_time"
                  className="w-[180px] bg-(--inputFill)"
                >
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="#">All</SelectItem>
                  <SelectItem value="1">Last 24 hours</SelectItem>
                  <SelectItem value="3">Last 3 days</SelectItem>
                  <SelectItem value="7">Last 1 week</SelectItem>
                  <SelectItem value="30">Last 1 month</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-white px-4 py-12">
        <h4 className="mb-6 text-center text-2xl font-semibold text-(--vDarkPurple)">
          Search Results
        </h4>

        <div className="mx-auto hidden max-w-6xl place-items-center gap-8 sm:grid sm:grid-cols-2 lg:grid-cols-3">
          {isLoading &&
            Array.from({ length: 6 }).map((_, index) => (
              <Skeleton
                key={index}
                className="h-[400px] w-[320px] rounded-lg"
              />
            ))}
        </div>
        <div className="mx-auto hidden max-w-6xl place-items-center gap-8 md:grid sm:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job, index) => (
            <JobCard job={job} key={index} />
          ))}
        </div>
        <div className="mx-auto grid max-w-6xl gap-8 md:hidden sm:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job, index) => (
            <JobCardMobile job={job} key={index} />
          ))}
        </div>
        {!isLoading && jobs.length === 0 && (
          <div className="mt-12 text-center text-lg text-gray-500">
            No jobs found.
          </div>
        )}
      </div>

      {page && (
        <div className="my-6 flex items-center justify-center gap-2">
          <Button
            variant="outline"
            onClick={() => {
              setQueryPage(() => Number(page) - 1);
            }}
            disabled={!hasPrevious}
          >
            Previous
          </Button>
          <div className="rounded bg-(--inputFill) px-4 py-2 text-(--vDarkPurple)">
            Page {page} of {total && limit ? Math.ceil(total / limit) : "none"}
          </div>
          <Button
            onClick={() => {
              setQueryPage(() => Number(page) + 1);
            }}
            variant="outline"
            disabled={!hasNext}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

export default FindJobsPage;
