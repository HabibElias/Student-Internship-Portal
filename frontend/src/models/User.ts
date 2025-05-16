import Company from "./Company";
import Student from "./Student";

export default interface User {
  id: number;
  user_type: "student" | "company";
  email: string;
  data: Student | Company;
}




