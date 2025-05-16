import { Application } from "@/models/Applications";
import { axiosPrivate } from "@/services/Apiclient";
import { useEffect, useState } from "react";

interface FetchApplicationsResponse {
  status: boolean;
  message: string;
  data: Application[];
}
const useApplications = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [applications, setApplications] = useState<Application[]>([]);

  useEffect(() => {
    const fetchApplications = async () => {
      setIsLoading(true);
      try {
        const result = (
          await axiosPrivate.get<FetchApplicationsResponse>("/app-jobs")
        ).data;

        setApplications(result.data);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchApplications();
  }, []);
  return { applications, isLoading,setApplications };
};

export default useApplications;
