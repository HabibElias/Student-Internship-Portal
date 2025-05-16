import { Job } from "@/models/Job";
import { axiosInstance } from "@/services/Apiclient";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface FetchJobResponse {
  status: boolean;
  message: string;
  data: Job;
}
const useJob = ({ id }: { id: string | undefined }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [job, setJob] = useState<Job>({} as Job);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      navigate("/not-found");
      return;
    }
    const fetchJob = async (id: number) => {
      setIsLoading(true);
      try {
        const result = (
          await axiosInstance.get<FetchJobResponse>(`/job?id=${id}`)
        ).data;
        console.log(result);

        setJob(result.data);
      } catch (e) {
        console.error(e);
        navigate("/not-found");
      } finally {
        setIsLoading(false);
      }
    };

    fetchJob(Number(id));
  }, []);

  return { job, isLoading };
};

export default useJob;
