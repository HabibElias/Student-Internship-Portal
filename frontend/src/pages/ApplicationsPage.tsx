import { Button } from "@/components/ui/button";
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
import useApplications from "@/hooks/useApplications";
import { axiosPrivate } from "@/services/Apiclient";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";


export default function ApplicationPage() {
  const { applications, isLoading, setApplications } = useApplications();
  const [filterStatus, setFilterStatus] = useState<string>("");
  const [sortColumn, setSortColumn] = useState<string>("Job Title");
  const [sortOrder, setSortOrder] = useState<string>("asc");
  const navigate = useNavigate();

  // Filtered Applications
  const filteredApplications = applications.filter((app) => {
    if (!filterStatus) return true;
    return app.status === filterStatus;
  });

  const handleDelete = async (id: number) => {
    try {
      const res = await axiosPrivate.delete(`/app-jobs`, {
        data: {
          application_id: id,
        },
      });
      if (res.data.status) {
        setApplications((prev) => prev.filter((app) => app.id !== id));
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  // Sorted Applications
  const sortedApplications = [...filteredApplications].sort((a, b) => {
    const isAsc = sortOrder === "asc" ? 1 : -1;
    if (sortColumn === "Job Title") {
      return a.job.title.localeCompare(b.job.title) * isAsc;
    }
    if (sortColumn === "Company") {
      return a.company_name.localeCompare(b.company_name) * isAsc;
    }
    if (sortColumn === "Status") {
      return a.status.localeCompare(b.status) * isAsc;
    }
    return 0;
  });

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <span className="text-lg font-semibold">Loading...</span>
      </div>
    );
  }
  
  return (
    <div className="mx-auto h-fit w-[90%] pt-45 font-[poppins]">
      <div className="mb-4 flex items-center space-x-4">
        <div>
          <label className="mr-2 text-sm font-medium">Filter by Status:</label>
          <select
            className="rounded border p-2"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="">All</option>
            <option value="pending">Pending</option>
            <option value="accepted">Accepted</option>
            <option value="declined">Declined</option>
          </select>
        </div>
        <div>
          <label className="mr-2 text-sm font-medium">Sort by:</label>
          <select
            className="rounded border p-2"
            value={sortColumn}
            onChange={(e) => setSortColumn(e.target.value)}
          >
            <option value="Job Title">Job Title</option>
            <option value="Company">Company</option>
            <option value="Status">Status</option>
          </select>
          <select
            className="rounded border p-2"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>
      <Table className="bg-white">
        <TableCaption>A list of your recent Applications.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Job Title</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>CV</TableHead>
            <TableHead>Recommendation Letter</TableHead>
            <TableHead>Status</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedApplications.map((app) => (
            <TableRow key={app.id}>
              <TableCell className="font-medium">{app.job.title}</TableCell>
              <TableCell>{app.company_name}</TableCell>
              <TableCell>
                <a
                  target="_blank"
                  className="text-(--vDarkPurple) hover:underline"
                  href={`${import.meta.env.VITE_API_URL}/file?file=${app.cv}`}
                >
                  View Cv
                </a>
              </TableCell>
              <TableCell>
                {app.recommendation_letter ? (
                  <a
                    target="_blank"
                    className="text-(--vDarkPurple) hover:underline"
                    href={`${import.meta.env.VITE_API_URL}/file?file=${app.recommendation_letter}`}
                  >
                    View letter
                  </a>
                ) : (
                  "No letter"
                )}
              </TableCell>
              <TableCell>{app.status}</TableCell>
              <TableCell className="flex items-center gap-2 *:cursor-pointer">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate(`/job/${app.job.id}`)}
                >
                  View Job
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  className="ring-2 hover:bg-white/30 hover:text-red-600"
                  onClick={() => handleDelete(app.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={6}>
              Total Applications: {applications.length}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
