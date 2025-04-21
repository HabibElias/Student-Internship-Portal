import User from "@/models/User";
import { axiosPrivate } from "@/services/Apiclient";
import { AxiosError, InternalAxiosRequestConfig } from "axios";
import { CheckCircle2 } from "lucide-react";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { toast } from "sonner";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthContextType {
  logout: () => void;
  login: (email: string, password: string) => void;
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
  const [token, setToken] = useState<string | null>();
  const [user, setUser] = useState<User>();

  const login = async (email: string, password: string) => {
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
        toast(response.data.message);
      }
    } catch (e) {
      setToken(null);
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

  useEffect(() => {
    const fetchMe = async () => {
      console.log("fetching");

      try {
        const response = await axiosPrivate.get<Response>("/refresh");

        console.log(response);

        if (response.data.status) {
          setToken(response.data.token ?? "");
          setUser(response.data.user ?? "");
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchMe();
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
    <AuthContext.Provider value={{ logout, login, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
