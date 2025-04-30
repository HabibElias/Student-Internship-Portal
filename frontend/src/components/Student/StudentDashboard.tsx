import JobCard from "@/components/JobCard";
import { Job } from "@/models/Job";
import { axiosPrivate } from "@/services/Apiclient";
import { useEffect, useState } from "react";

interface FetchJobsResponse {
  data: Job[];
  total: number;
  page: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

const StudentDashboard = () => {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    axiosPrivate
      .get<FetchJobsResponse>("/jobs")
      .then((res) => {
        setJobs(res.data.data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="grid grid-cols-1 place-items-center md:grid-cols-2 gap-y-3">
      {jobs.map((job, index) => {
        return <JobCard key={index} job={job} />;
      })}
    </div>
  );
};

export default StudentDashboard;
