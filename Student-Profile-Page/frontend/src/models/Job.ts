export interface Job {
  id: number;
  company_id: number;
  company_name: string;
  company_image: string;
  title: string;
  remote: boolean;
  full_time: boolean;
  job_level: "internship" | "junior" | "mid-senior" | "senior";
  description: string;
  posted_time: string;
  skills: string;
  deadline: string;
  location: string;
  application_count?: number;
  company_description?: string;
  company_socials?: {
    id: number;
    company_id: number;
    linkedin: string;
    twitter: string;
    facebook: string;
    website: string;
  };
}
