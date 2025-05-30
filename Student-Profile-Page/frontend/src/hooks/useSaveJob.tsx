import { axiosPrivate } from "@/services/Apiclient";
import { useState } from "react";
import { toast } from "sonner";

interface SaveJobResponse {
  status: boolean;
  message: string;
}

const useSaveJob = () => {
  const [isLoading, setIsLoading] = useState(false);

  const saveJob = async (jobId: number) => {
    setIsLoading(true);
    try {
      const response = await axiosPrivate.post<SaveJobResponse>("/saved-jobs", {
        job_id: jobId,
      });
      if (response.data.status) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { saveJob, isLoading };
};

export default useSaveJob;
