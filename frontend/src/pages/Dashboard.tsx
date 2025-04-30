import Loading from "@/components/Loading";
import StudentDashboard from "@/components/Student/StudentDashboard";
import { useAuth } from "@/providers/AuthProvider";

const Dashboard = () => {
  const { user } = useAuth();

  if (!user) return <Loading />;

  if (user.user_type == "student") {
    return <StudentDashboard />;
  }

  return <div></div>; 
};

export default Dashboard;
