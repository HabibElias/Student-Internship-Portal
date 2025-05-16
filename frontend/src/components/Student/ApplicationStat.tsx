import useApplications from "@/hooks/useApplications";
import { Link } from "react-router-dom";

const ApplicationStat = () => {
  const { applications } = useApplications();

  return (
    <div className="w-full items-center gap-10 sm:inline-flex">
      <div className="w-full md:max-w-100">
        <span className="mb-2 block text-lg font-medium text-gray-600">
          Your Applications
        </span>
        <div className="flex h-36 w-full items-center justify-between rounded-2xl bg-[#f3f2ff] px-8 shadow-sm backdrop-blur-md transition hover:shadow-md md:flex-col-reverse md:p-6">
          <div className="flex flex-col items-center gap-3 md:flex-row">
            <span className="text-4xl font-extrabold text-[#6c63ff]">
              {applications.length}
            </span>
            <span className="mt-1 text-sm text-gray-500">Applied Jobs</span>
          </div>
          <svg
            className="h-16 w-16 text-[#bdbaf7]"
            fill="none"
            viewBox="0 0 48 48"
            stroke="currentColor"
          >
            <rect
              x="8"
              y="12"
              width="32"
              height="24"
              rx="4"
              strokeWidth="2"
              stroke="currentColor"
              fill="#dcdbff"
            />
            <path
              d="M16 20h16M16 26h10"
              strokeWidth="2"
              stroke="currentColor"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <div className="mt-2 flex justify-end">
          <Link
            to={'/applications'}
            className="font-medium text-[#6c63ff] transition hover:underline"
          >
            View here
          </Link>
        </div>
      </div>
      <div className="w-full md:max-w-100">
        <span className="mb-2 block text-lg font-medium text-gray-600">
          Accepted Applications
        </span>
        <div className="flex h-36 w-full items-center justify-between rounded-2xl bg-[#e6f9f0] px-8 shadow-sm backdrop-blur-md transition hover:shadow-md md:flex-col-reverse md:p-6">
          <div className="flex flex-col items-center gap-3 md:flex-row">
            <span className="text-4xl font-extrabold text-[#22c55e]">
              {applications.filter((app) => app.status === "accepted").length}
            </span>
            <span className="mt-1 text-sm text-gray-500">Accepted Jobs</span>
          </div>
          {/* Checkmark icon for accepted applications */}
          <svg
            className="h-16 w-16 text-[#22c55e]"
            fill="none"
            viewBox="0 0 48 48"
            stroke="currentColor"
          >
            <circle
              cx="24"
              cy="24"
              r="20"
              strokeWidth="2"
              stroke="currentColor"
              fill="#bbf7d0"
            />
            <path
              d="M16 24l6 6 10-10"
              strokeWidth="3"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        </div>
        <div className="mt-2 flex justify-end">
          <Link
            to={"/applications"}
            className="font-medium text-[#22c55e] transition hover:underline"
          >
            View here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ApplicationStat;
