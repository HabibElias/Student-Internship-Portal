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
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

type ApplicationRowProps = {
  app: any;
  onDelete: (id: number) => void;
  onViewJob: (id: number) => void;
};

function ApplicationRow({ app, onDelete, onViewJob }: ApplicationRowProps) {
  return (
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
        <Button onClick={() => onViewJob(app.job.id)}>View Job</Button>
        <Button onClick={() => onDelete(app.id)}>Delete</Button>
      </TableCell>
    </TableRow>
  );
}

export default function ApplicationPage() {
  const { applications, isLoading, setApplications } = useApplications();
  const [filterStatus, setFilterStatus] = useState<string>("");
  const [sortColumn, setSortColumn] = useState<string>("Job Title");
  const [sortOrder, setSortOrder] = useState<string>("asc");
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

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
      <div className="flex min-h-[80vh] items-center justify-center pt-45 font-[poppins]">
        <div className="flex flex-col items-center justify-center font-[poppins] font-semibold">
          <div className="loader"></div>
          Loading...
        </div>
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
            <ApplicationRow
              key={app.id}
              app={app}
              onDelete={handleDelete}
              onViewJob={(id) => navigate(`/job/${id}`)}
            />
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
