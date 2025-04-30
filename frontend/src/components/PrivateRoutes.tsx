import { useAuth } from "@/providers/AuthProvider";
import { useEffect, useRef, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const PrivateRoutes = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [mounted, setMounted] = useState(false);
  const ref = useRef<boolean | null>(null);

  useEffect(() => {
    if (!mounted && !ref.current) {
      if (!user) {
        navigate("/unauthorized");
      }
      setMounted(true);
      ref.current = true;
    }
  }, []);

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default PrivateRoutes;
