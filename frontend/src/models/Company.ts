export default interface Company {
  user_id: number;
  company_name: string;
  company_image: string;
  location: string;
  description: string;
}

export function isCompany(obj: any): obj is Company {
  return (
    obj &&
    typeof obj === "object" &&
    "user_id" in obj &&
    "company_name" in obj &&
    "company_image" in obj &&
    "location" in obj &&
    "description" in obj
  );
}
