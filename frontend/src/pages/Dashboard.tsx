import Loading from "@/components/Loading";
import { useAuth } from "@/providers/AuthProvider";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.user_type === "student") {
      navigate("/dashboard/student");
    } else if (user?.user_type === "company") {
      navigate("/dashboard/company");
    }
  }, [user, navigate]);

  if (!user) return <Loading />;

  return null;
};

export default Dashboard;
