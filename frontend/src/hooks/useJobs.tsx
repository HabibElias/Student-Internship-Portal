import { Job } from "@/models/Job";
import { axiosPrivate } from "@/services/Apiclient";
import { useEffect, useState } from "react";

interface FetchJobsResponse {
  data: Job[];
  total: number;
  limit: number;
  page: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

interface Props {
  title?: string;
  job_level?: string;
  full_time?: string;
  posted_time?: string;
}

const useJobs = ({ title, job_level, full_time, posted_time }: Props) => {
  const [page, setPage] = useState<number>();
  const [total, setTotal] = useState<number>();
  const [limit, setLimit] = useState<number>();
  const [queryPage, setQueryPage] = useState<number>(1);
  const [hasNext, setHasNext] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasPrevious, setHasPrevious] = useState<boolean>(false);
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    let query = `/jobs?page=${queryPage}`;

    if (posted_time && posted_time !== '#') {
      query += `&posted_time=${posted_time}`;
    }
    if (title && title !== '#') {
      query += `&title=${title}`;
    }
    if (job_level && job_level !== '#') {
      query += `&job_level=${job_level}`;
    }
    if (full_time && full_time !== '#') {
      query += `&full_time=${full_time}`;
    }

    setIsLoading(true);
    axiosPrivate
      .get<FetchJobsResponse>(query)
      .then((res) => {
        setJobs(res.data.data);
        setTotal(res.data.total);
        setLimit(res.data.limit);
        setPage(res.data.page);
        setHasNext(res.data.hasNext);
        setHasPrevious(res.data.hasPrevious);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  }, [queryPage, posted_time, title, job_level, full_time]);

  return {
    isLoading,
    setQueryPage,
    limit,
    jobs,
    total,
    page,
    hasNext,
    hasPrevious,
  };
};

export default useJobs;
