import { FormData as FC } from "@/components/Forms/CompanyForm";
import { FormData as FS } from "@/components/Forms/StudentForm";
import StudSchema from "@/models/registerSchema";
import User from "@/models/User";
import { axiosInstance, axiosPrivate } from "@/services/Apiclient";
import { AxiosError, InternalAxiosRequestConfig } from "axios";
import { Check, CheckCircle2 } from "lucide-react";
import {
  createContext,
  ReactNode,
  useContext,
  useLayoutEffect,
  useRef,
  useState
} from "react";
import { toast } from "sonner";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthContextType {
  logout: () => void;
  applyToJob: (id:string) => Promise<void>;
  fetchState: "notReady" | "ready" | "registering" | "logging" | "applying";
  login: (email: string, password: string) => void;
  registerStudent: (data: FS) => void;
  registerCompany: (data: FC) => void;
  user?: User;
}

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) throw new Error("AuthContext must be used in the AuthProvider");

  return context;
};

interface Response {
  token?: string;
  status: boolean;
  message?: string;
  user: User;
}

// Extend InternalAxiosRequestConfig to include _retry
interface ExtendedAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [mounted, setMounted] = useState(false);
  const ref = useRef<boolean | null>(null);
  const [fetchState, setFetchState] = useState<
    "notReady" | "logging" | "ready" | "registering" | "applying"
  >("notReady");

  const [token, setToken] = useState<string | null>();
  const [user, setUser] = useState<User>();

  const registerCompany = async (data: FC) => {
    setFetchState("registering");
    try {
      const formData = new FormData();

      // Append form fields
      formData.append("user_type", "company"); // Assuming user_type is always "company"
      formData.append("compName", data.compName);
      formData.append("password", data.password);
      formData.append("location", data.location);
      formData.append("description", data.description);
      formData.append("email", data.email);

      // Append the file (profile picture)
      const fileInput = document.querySelector<HTMLInputElement>("#cp");

      if (fileInput?.files?.[0]) {
        formData.append("compImg", fileInput.files[0]);
      }

      console.log(fileInput?.files);

      // Send the POST request using axios
      const response = await axiosInstance.post(`/register`, formData);

      // Handle the response
      console.log("Response from backend:", response.data);

      if (response.data.status) {
        toast("Registration successful!", {
          description: (
            <div className="text-xs font-bold text-green-500">
              Email verification sent please verify and login to your account
            </div>
          ),
          icon: <Check />,
          style: { background: "#f1f2fa" },
        });
      } else {
        toast(`Error: ${response.data.message ?? ""}`, {
          description: `${JSON.stringify(data)}`,
        });
      }
    } catch (err: any) {
      console.error("Error:");
      if (err.response.data.errors) {
        const errorMessages = Object.entries(err.response.data.errors).map(
          ([field, messages]: [string, unknown]) => {
            // Try to get the label from the Zod schema if available
            const schemaField = (StudSchema.shape as any)[field];
            const label = schemaField?._def?.description || field;
            if (Array.isArray(messages)) {
              return `${label}: ${messages.join(", ")}`;
            }
            return `${String(messages)}`;
          },
        );
        toast(errorMessages.join("\n"), {
          style: {
            background: "#e83232",
            borderColor: "ff5136",
            color: "white",
          },
        });
      } else {
        toast(`${err.response.data.message}`, {
          style: {
            background: "#e83232",
            borderColor: "ff5136",
            color: "white",
          },
        });
      }
    } finally {
      setFetchState("ready");
    }
  };

  const login = async (email: string, password: string) => {
    setFetchState("logging");
    try {
      const response = await axiosPrivate.post<Response>(
        "/login",
        JSON.stringify({ email, password }),
      );

      console.log(response);

      if (response.data.status) {
        setToken(response.data.token ?? "");
        setTimeout(() => setUser(response.data.user ?? ""), 1500);
        toast("Log In Successfully", {
          icon: <CheckCircle2 />,
          style: { display: "flex", alignItems: "center", gap: "1rem" },
        });
      } else {
        console.log(response.data);

        toast(response.data.message);
      }
    } catch (e) {
      setToken(null);
    } finally {
      setFetchState("ready");
    }
  };

  const logout = async () => {
    axiosPrivate
      .post<Response>("/logout")
      .then((response) => {
        if (response.data.status) {
          setUser(undefined);
          setToken(null);
          console.log(response.data);
        }

        window.location.href = "/";
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const applyToJob = async (id: string) => {
    setFetchState("applying");
    try {
      const formData = new FormData();

      formData.append("user_id", user?.id.toString() ?? "");
      formData.append("job_id", id);
      // Append the file (profile picture)
      const cv = document.querySelector<HTMLInputElement>("#cv");

      const recommendation_letter = document.querySelector<HTMLInputElement>(
        "#recommendation_letter",
      );

      if (cv?.files?.[0]) {
        formData.append("cv", cv.files[0]);
      }

      if (recommendation_letter?.files?.[0]) {
        formData.append(
          "recommendation_letter",
          recommendation_letter.files[0],
        );
      }

      // Send the POST request using axios
      const response = await axiosPrivate.post(`/app-jobs`, formData);

      // Handle the response
      console.log("Response from backend:", response.data);

      if (response.data.status) {
        toast("Application successful!", {
          icon: <Check />,
          description: (
            <div className="text-xs font-bold text-green-500">
              Check your status in applications page
            </div>
          ),
          style: { background: "#f1f2fa" },
        });
      } else {
        toast(`${response.data.message ?? ""}`);
      }
    } catch (err: any) {
      console.error("Error:", err);
      if (err.response.data.errors) {
        const errorMessages = Object.entries(err.response.data.errors).map(
          ([field, messages]: [string, unknown]) => {
            // Try to get the label from the Zod schema if available
            const schemaField = (StudSchema.shape as any)[field];
            const label = schemaField?._def?.description || field;
            if (Array.isArray(messages)) {
              return `${label}: ${messages.join(", ")}`;
            }
            return `${label}: ${String(messages)}`;
          },
        );
        toast(errorMessages.join("\n"), {
          style: {
            background: "#e83232",
            borderColor: "ff5136",
            color: "white",
          },
        });
      } else {
        toast(`${err.response.data.message}`, {
          style: {
            background: "#e83232",
            borderColor: "ff5136",
            color: "white",
          },
        });
      }
    } finally {
      setFetchState("ready");
    }
  };

  const registerStudent = async (data: FS) => {
    setFetchState("registering");
    try {
      const formData = new FormData();

      // Append form fields
      formData.append("user_type", "student");
      formData.append("fName", data.fName);
      formData.append("dept", data.dept.toString());
      formData.append("lName", data.lName);
      formData.append("gender", data.gender);
      formData.append("grDate", data.grDate);
      formData.append("email", data.email);
      formData.append("password", data.password);

      // Append the file (profile picture)
      const fileInput = document.querySelector<HTMLInputElement>("#pp");

      if (fileInput?.files?.[0]) {
        formData.append("profilePic", fileInput.files[0]);
      }

      // Send the POST request using axios
      const response = await axiosInstance.post(`/register`, formData);

      // Handle the response
      console.log("Response from backend:", response.data);

      if (response.data.status) {
        toast("Registration successful!", {
          icon: <Check />,
          description: (
            <div className="text-xs font-bold text-green-500">
              Email verification sent please verify and login to your account
            </div>
          ),
          style: { background: "#f1f2fa" },
        });
      } else {
        toast(`${response.data.message ?? ""}`);
      }
    } catch (err: any) {
      console.error("Error:", err);
      if (err.response.data.errors) {
        const errorMessages = Object.entries(err.response.data.errors).map(
          ([field, messages]: [string, unknown]) => {
            // Try to get the label from the Zod schema if available
            const schemaField = (StudSchema.shape as any)[field];
            const label = schemaField?._def?.description || field;
            if (Array.isArray(messages)) {
              return `${label}: ${messages.join(", ")}`;
            }
            return `${String(messages)}`;
          },
        );
        toast(errorMessages.join("\n"), {
          style: {
            background: "#e83232",
            borderColor: "ff5136",
            color: "white",
          },
        });
      } else {
        toast(`${err.response.data.message}`, {
          style: {
            background: "#e83232",
            borderColor: "ff5136",
            color: "white",
          },
        });
      }
    } finally {
      setFetchState("ready");
    }
  };

  useLayoutEffect(() => {
    if (!mounted && !ref.current) {
      const fetchMe = async () => {
        console.log("fetching");

        setFetchState("notReady");
        try {
          const response = await axiosPrivate.get<Response>("/refresh");

          console.log("first response", response);

          if (response.data.status) {
            setToken(response.data.token ?? "");
            setUser(response.data.user ?? "");
          }
        } catch (err) {
          console.error(err);
        } finally {
          setFetchState("ready");
        }
      };

      fetchMe();
      setMounted(true);
      ref.current = true;
    }
  }, []);

  useLayoutEffect(() => {
    const authInterceptors = axiosPrivate.interceptors.request.use(
      (config: ExtendedAxiosRequestConfig) => {
        config.headers.Authorization =
          !config._retry && token
            ? `Bearer ${token}`
            : config.headers.Authorization;

        config.withCredentials = true;

        return config;
      },
    );

    return () => {
      axiosPrivate.interceptors.request.eject(authInterceptors);
    };
  }, [token]);

  useLayoutEffect(() => {
    const refreshInterceptors = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const originalRequest = error.config as ExtendedAxiosRequestConfig;

        if (error.response?.status === 403) {
          try {
            const response = await axiosPrivate.get<Response>("/refresh");

            setToken(response.data.token);

            originalRequest!.headers.Authorization = `Bearer ${response.data.token}`;
            originalRequest._retry = false;

            return axiosPrivate(originalRequest);
          } catch (error) {
            setToken(null);
          }
        }

        return Promise.reject(error);
      },
    );

    return () => {
      axiosPrivate.interceptors.response.eject(refreshInterceptors);
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        logout,
        login,
        user,
        fetchState,
        applyToJob,
        registerStudent,
        registerCompany,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
