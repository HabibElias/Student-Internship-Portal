export interface Job {
  id: number;
  company_id: number;
  companyname: string;
  compimg: string;
  title: string;
  remote: boolean;
  full_time: boolean;
  job_level: "internship" | "junior" | "mid-senior" | "senior";
  description: string;
  posted_time: string;
  skills: string;
  deadline: string;
}
