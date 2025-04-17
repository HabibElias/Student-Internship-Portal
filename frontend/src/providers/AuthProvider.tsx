import { axiosInstance, axiosPrivate } from "@/services/Apiclient";
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { error } from "console";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthContextType {
    login: (email: string, password: string) => void;
    user: any;
    error: string;
}


export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) throw new Error("AuthContext must be used in the AuthProvider");

  return context;
};

interface Response {
  token?: string;
  status: string;
  message?: string;
}

interface error {
  response: {
    message: string;
    status: string;
    user: any;
  };
}

// Extend InternalAxiosRequestConfig to include _retry
interface ExtendedAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>();
  const [error,setError] = useState<string>("");
  const [user, setUser] = useState();

  const login = async (email: string, password: string) => {
    try {
      const response = await axiosInstance.post<Response>("/login", JSON.stringify({email,password}));

      console.log(response);
      

      if (response.data.status == "success") {
        setToken(response.data.token!);
        console.log(response.data);
      }
    } catch (e) {
      setToken(null);
    }
  };

  useEffect(() => {
    const fetchMe = () => {};

    fetchMe();
  }, []);

  useLayoutEffect(() => {
    const authInterceptors = axiosPrivate.interceptors.request.use(
      (config: ExtendedAxiosRequestConfig) => {
        config.headers.Authorization =
          !config._retry && token
            ? `Bearer ${token}`
            : config.headers.Authorization;

        return config;
      },
    );

    axiosPrivate.defaults.withCredentials = true;

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
            const response =
              await axiosPrivate.get<Response>("/api/refreshToken");

            setToken(response.data.token);

            originalRequest!.headers.Authorization = `Bearer ${response.data.token}`;
            originalRequest._retry = true;

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

  return <AuthContext.Provider value={{login, user, error}}>
    {children}
  </AuthContext.Provider>;
};

export default AuthProvider;
