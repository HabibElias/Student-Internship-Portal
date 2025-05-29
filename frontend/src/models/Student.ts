export default interface Student {
  user_id: number;
  first_name: string;
  last_name: string;
  gender: string;
  graduation_date: string;
  department: number;
  profile_picture: string;
  about?: string;
}


export function isStudent(obj: any): obj is Student {
  return (
    obj &&
    typeof obj === "object" &&
    "user_id" in obj &&
    "first_name" in obj &&
    "last_name" in obj &&
    "graduation_date" in obj &&
    "department" in obj &&
    "profile_picture" in obj
  );
}