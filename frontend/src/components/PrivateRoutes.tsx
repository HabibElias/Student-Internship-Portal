import { useAuth } from "@/providers/AuthProvider";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Loading from "./Loading";

const PrivateRoutes = () => {
  const { user, fetchState } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (fetchState === "ready") {
      if (!user) navigate("/login");
    }
  }, [user, fetchState === "notReady"]);

  if (fetchState === "notReady") return <Loading />;

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default PrivateRoutes;
