import Department from "@/models/Department";
import { axiosInstance } from "@/services/Apiclient";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";

interface Response {
  success: boolean;
  departments?: Department[];
  message?: string;
}

const useDepartments = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [departments, setDepartments] = useState<Department[]>([]);

  useEffect(() => {
    const controller = new AbortController();

    setIsLoading(true);
    axiosInstance
      .get<Response>("/departments", {
        signal: controller.signal,
      })
      .then((res) => {
        setDepartments(res.data.departments ?? []);
        setIsLoading(false);
        console.log(res.data);
      })
      .catch((error: AxiosError) => {
        if (error.name !== "CanceledError") {
          console.error(error);
          setIsLoading(false);
        }
      });

    () => controller.abort();
  }, []);

  return { isLoading, departments };
};

export default useDepartments;
