import { Job } from "./Job";

export interface Application {
  id: number;
  student_id: number;
  job: Job;
  company_name: string;
  cv: string;
  recommendation_letter: string;
  status: "declined" | "pending" | "accepted";
}
