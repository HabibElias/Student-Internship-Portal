import { useEffect } from "react";

const CompanyDashboard = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  return <div className="pt-45">CompanyDashboard</div>;
};
export default CompanyDashboard;
