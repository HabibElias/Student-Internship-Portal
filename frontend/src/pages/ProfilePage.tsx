import Loading from "@/components/Loading";
import { useAuth } from "@/providers/AuthProvider";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.user_type === "student") {
      navigate("/profile/student");
    } else if (user?.user_type === "company") {
      navigate("/profile/company");
    }
  }, [user, navigate]);

  if (!user) return <Loading />;

  return null;
};

export default ProfilePage;
