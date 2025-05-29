import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { axiosPrivate } from "@/services/Apiclient";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

interface Applicant {
  id: number;
  applicant_first_name: string;
  applicant_last_name: string;
  applicant_email: string;
  cv: string;
  recommendation_letter?: string;
  status: string;
}

const statusOptions = ["pending", "accepted", "declined"];

const ApplicantDetails = () => {
  const { id } = useParams();
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    const fetchApplicants = async () => {
      setLoading(true);
      try {
        const res = await axiosPrivate.get(`/company/applicants?id=${id}`);
        if (res.data.status) {
          setApplicants(res.data.data);
        } else {
          toast.error(res.data.message || "Failed to fetch applicants");
        }
      } catch (err: any) {
        toast.error(
          err.response?.data?.message || "Failed to fetch applicants",
        );
      } finally {
        setLoading(false);
      }
    };
    fetchApplicants();
  }, [id]);

  const handleStatusChange = async (
    applicationId: number,
    newStatus: string,
  ) => {
    try {
      const res = await axiosPrivate.patch(`/company/applicants`, {
        application_id: applicationId,
        status: newStatus,
      });
      if (res.data.status) {
        setApplicants((prev) =>
          prev.map((app) =>
            app.id === applicationId ? { ...app, status: newStatus } : app,
          ),
        );
        toast.success("Status updated");
      } else {
        toast.error(res.data.message || "Failed to update status");
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to update status");
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center pt-45 font-[poppins]">
        <div className="flex flex-col items-center justify-center font-semibold">
          <div className="loader"></div>
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto h-fit w-[90%] pt-45 font-[poppins]">
      <h2 className="mb-6 text-2xl font-bold">Applicants</h2>
      <Table className="bg-white">
        <TableCaption>A list of applicants for this job.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>First Name</TableHead>
            <TableHead>Last Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>CV</TableHead>
            <TableHead>Recommendation Letter</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applicants.map((app) => (
            <TableRow key={app.id}>
              <TableCell className="font-medium">
                {app.applicant_first_name}
              </TableCell>
              <TableCell className="font-medium">
                {app.applicant_last_name}
              </TableCell>
              <TableCell>{app.applicant_email}</TableCell>
              <TableCell>
                <a
                  target="_blank"
                  className="text-[#7D7ADA] hover:underline"
                  href={`${import.meta.env.VITE_API_URL}/file?file=${app.cv}`}
                >
                  View CV
                </a>
              </TableCell>
              <TableCell>
                {app.recommendation_letter ? (
                  <a
                    target="_blank"
                    className="text-[#7D7ADA] hover:underline"
                    href={`${import.meta.env.VITE_API_URL}/file?file=${app.recommendation_letter}`}
                  >
                    View Letter
                  </a>
                ) : (
                  "No letter"
                )}
              </TableCell>
              <TableCell>
                <select
                  className="rounded border p-1"
                  value={app.status}
                  onChange={(e) => handleStatusChange(app.id, e.target.value)}
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </option>
                  ))}
                </select>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={6}>
              Total Applicants: {applicants.length}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default ApplicantDetails;
