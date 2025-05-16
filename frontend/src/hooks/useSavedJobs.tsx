import SavedJob from "@/models/SavedJob";
import { axiosPrivate } from "@/services/Apiclient";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface FetchSavedJobsResponse {
  status: boolean;
  message: string;
  data: SavedJob[];
}

const useSavedJobs = () => {
  const [savedJobs, setSavedJobs] = useState<SavedJob[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchSavedJobs = async () => {
      setIsLoading(true);
      try {
        const response =
          (await axiosPrivate.get<FetchSavedJobsResponse>("/saved-jobs")).data;

          console.log(response);
          

        if (response.status) {
          setSavedJobs(response.data);
        } else {
          toast.error(response.message);
        }
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSavedJobs();
  }, []);

  const deleteSavedJob = async (id: number) => {
    try {
      const response = await axiosPrivate.delete("/saved-jobs", {
        data: { saved_id: id },
      });
      if (response.data.status) {
        setSavedJobs((prevSavedJobs) =>
          prevSavedJobs.filter((job) => job.id !== id),
        );
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return { savedJobs, isLoading, deleteSavedJob, setSavedJobs };
};

export default useSavedJobs;
