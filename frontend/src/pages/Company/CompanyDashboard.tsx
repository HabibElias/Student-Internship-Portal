import EditJobForm from "@/components/Company/EditForm";
import JobCard from "@/components/Company/JobCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { isCompany } from "@/models/Company";
import { Job } from "@/models/Job";
import { useAuth } from "@/providers/AuthProvider";
import { axiosPrivate } from "@/services/Apiclient";
import {
  ArrowRight,
  Clock,
  Facebook,
  FileText,
  Globe,
  Linkedin,
  Plus,
  Twitter,
} from "lucide-react";
import { JSX, useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

interface FetchJobsResponse {
  status: boolean;
  message: string;
  data: Job[];
  socials: any;
}

interface socials {
  id: number;
  company_id: number;
  linkedin: string;
  twitter: string;
  facebook: string;
  website: string;
}

const CompanyDashboard = (): JSX.Element => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [socials, setSocials] = useState<socials>();

  useEffect(() => {
    setIsLoading(true);
    axiosPrivate
      .get<FetchJobsResponse>("/c-jobs")
      .then((res) => {
        setJobs(res.data.data);
        setSocials(res.data.socials);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setIsLoading(false);
      });
  }, []);

  const handleEditSave = (updatedJob: Job) => {
    setJobs((prev) =>
      prev.map((job) =>
        job.id === updatedJob.id ? { ...job, ...updatedJob } : job,
      ),
    );
  };

  const statistics = useMemo(
    () => [
      {
        id: 1,
        icon: <FileText className="h-12 w-12 text-indigo-400" />,
        value: jobs.length,
        label: "Total Jobs Posted",
      },
      {
        id: 2,
        icon: <Clock className="h-12 w-12 text-indigo-400" />,
        value: jobs.reduce((sum, job) => sum + (job.application_count || 0), 0),
        label: "Applicants Received",
      },
      {
        id: 3,
        icon: <FileText className="h-12 w-12 text-indigo-400" />,
        value: jobs.filter((job) => !job.application_count).length,
        label: "Jobs Still Open",
      },
      {
        id: 4,
        icon: <Clock className="h-12 w-12 text-indigo-400" />,
        value: jobs.filter((job) => new Date(job.deadline) <= new Date())
          .length,
        label: "Expired Jobs",
      },
    ],
    [jobs],
  );

  return (
    <>
      {/* Sidebar Quick Links */}
      <div className="relative mx-auto min-h-screen w-full max-w-[1440px] pt-35 font-[poppins]">
        <main className="px-6 py-8">
          {/* Company Logo */}
          <section className="mb-12 flex flex-col items-center justify-center">
            <div className="mb-4 h-[120px] w-[120px] overflow-hidden rounded-full border-4 border-[#ecebff] shadow">
              <img
                src={`${import.meta.env.VITE_API_URL}/image?img=${isCompany(user?.data) ? user.data.company_image : ""}`}
                alt="company Logo"
                className="h-full w-full object-cover"
                onError={(e) =>
                  (e.currentTarget.src = "/default-company-logo.png")
                }
              />
            </div>
            <h1 className="text-3xl font-bold tracking-wide text-[#5344c2]">
              {isCompany(user?.data) ? user.data.company_name : "Hi, There"}
            </h1>
          </section>

          {/* Add Job Button */}
          <div className="mb-8 flex justify-end">
            <Button
              className="mb-6 cursor-pointer rounded-full bg-[#7D7ADA] px-6 py-2 text-sm font-semibold text-white transition hover:bg-[#5c5bb9]"
              onClick={() => navigate("/job")}
              size={"lg"}
            >
              <Plus />
              Create Job
            </Button>
          </div>

          {/* Stats & Details */}
          <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-12">
            {/* Stats */}
            <Card className="bg-[#ecebff80] backdrop-blur-[5px] md:col-span-7">
              <CardContent className="p-8">
                <h2 className="mb-8 text-center text-lg font-semibold text-[#5344c2]">
                  Some statistics
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  {statistics.map((stat) => (
                    <div
                      key={stat.id}
                      className="flex items-center rounded-lg bg-[#ecebff80] p-4 backdrop-blur-[5px]"
                    >
                      {stat.icon}
                      <div className="ml-6">
                        <div className="text-2xl font-bold tracking-wide text-[#5344c2]">
                          {stat.value}
                        </div>
                        <div className="text-xs font-medium tracking-wide text-gray-700">
                          {stat.label}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Company Contact Info */}
            <Card className="md:col-span-5">
              <CardHeader>
                <CardTitle className="text-base font-bold tracking-tight text-[#5344c2]">
                  Company Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="mt-2 flex flex-col items-start gap-6">
                  {socials ? (
                    <>
                      {socials.website && (
                        <a
                          href={socials.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-xs text-[#7D7ADA] hover:text-[#5c5bb9]"
                          title="Website"
                        >
                          <Globe />
                          {socials.website}
                        </a>
                      )}
                      {socials.linkedin && (
                        <a
                          href={socials.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-xs text-[#7D7ADA] hover:text-[#5c5bb9]"
                          title="LinkedIn"
                        >
                          <Linkedin />
                          {socials.linkedin}
                        </a>
                      )}
                      {socials.twitter && (
                        <a
                          href={socials.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-xs text-[#7D7ADA] hover:text-[#5c5bb9]"
                          title="Twitter"
                        >
                          <Twitter />
                          {socials.twitter}
                        </a>
                      )}
                      {socials.facebook && (
                        <a
                          href={socials.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-xs text-[#7D7ADA] hover:text-[#5c5bb9]"
                          title="Facebook"
                        >
                          <Facebook />
                          {socials.facebook}
                        </a>
                      )}
                      {!socials.website &&
                        !socials.linkedin &&
                        !socials.twitter &&
                        !socials.facebook && (
                          <div className="text-xs w-30 text-center self-center justify-self-center h-full text-gray-500 italic">
                            Update your profile to add your company links and
                            let the world connect with you!
                          </div>
                        )}
                    </>
                  ) : (
                    <div className="text-xs text-gray-500 italic">
                      Update your profile to add your company links and let the
                      world connect with you!
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Job Cards */}
          <h2 className="mb-6 text-2xl font-bold">Recent Job Posted</h2>

          <div className="grid w-[inherit] place-content-center gap-6 md:grid-cols-2 2xl:grid-cols-3">
            {jobs.length === 0 && !isLoading && !error ? (
              <div className="col-span-full flex flex-col items-center justify-center py-16">
                <img
                  src="/assets/empty-jobs.svg"
                  alt="No jobs"
                  className="mb-6 h-40 w-40 opacity-80"
                  loading="lazy"
                />
                <div className="mb-2 text-xl font-semibold text-[#7D7ADA]">
                  No jobs posted yet
                </div>
                <div className="mb-4 text-sm text-gray-500">
                  You haven't posted any jobs. Click below to create your first
                  job!
                </div>
              </div>
            ) : (
              jobs
                .slice()
                .sort(
                  (a, b) =>
                    new Date(b.posted_time).getTime() -
                    new Date(a.posted_time).getTime(),
                )
                .slice(0, 6)
                .map((job, index) => (
                  <JobCard
                    deletingId={deletingId}
                    setDeletingId={setDeletingId}
                    setEditingJob={setEditingJob}
                    setJobs={setJobs}
                    key={index}
                    job={job}
                  />
                ))
            )}
          </div>
          {editingJob && (
            <EditJobForm
              job={editingJob}
              onClose={() => setEditingJob(null)}
              onSave={handleEditSave}
            />
          )}
        </main>
        <Link
          to={"/applicants"}
          className="mb-20 ml-6 flex w-fit items-center gap-1 rounded-full bg-[#7D7ADA] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#5c5bb9]"
        >
          See more <ArrowRight size={16} />
        </Link>
      </div>
    </>
  );
};

export default CompanyDashboard;
