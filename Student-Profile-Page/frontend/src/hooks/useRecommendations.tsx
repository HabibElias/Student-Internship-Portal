import { Job } from "@/models/Job";
import { axiosPrivate } from "@/services/Apiclient";
import { useState, useEffect } from "react";

interface FetchRecommendationsJobsResponse {
  status: boolean;
  message: string;
  data: Job[];
}

const useRecommendations = () => {
  const [recommendations, setRecommendations] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchRecommendations = async () => {
      setIsLoading(true);
      try {
        const result =
          await axiosPrivate.get<FetchRecommendationsJobsResponse>(
            "/recommend",
          );
        setRecommendations(result.data.data);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  return { recommendations, isLoading };
};

export default useRecommendations;
