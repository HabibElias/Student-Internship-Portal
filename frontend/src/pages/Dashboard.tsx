import { useAuth } from "@/providers/AuthProvider";

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div>
      {user?.user_type}

    </div>
  );
};

export default Dashboard;
