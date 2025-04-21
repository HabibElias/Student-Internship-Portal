import { Job } from "@/models/Job";
import { axiosInstance, axiosPrivate } from "@/services/Apiclient";
import { useEffect, useState } from "react";

interface FetchJobsResponse {
  data: Job[];
  total: number;
  page: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

const Dashboard = () => {
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
    <div>
      {jobs.map((job, index) => {
        return (
          <div key={index} className="text-black">
            <div>{job.title}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Dashboard;
