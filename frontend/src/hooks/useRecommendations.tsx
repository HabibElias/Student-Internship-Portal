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

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const result =
          await axiosPrivate.get<FetchRecommendationsJobsResponse>(
            "/recommend",
          );
        console.log(result.data.data);

        //set the result into state
        setRecommendations(result.data.data);
      } catch (e) {
        console.error(e);
      }
    };

    fetchRecommendations();
  }, []);

  return { recommendations };
};

export default useRecommendations;
