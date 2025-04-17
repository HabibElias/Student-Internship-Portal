import { z } from "zod";

const RegisterSchema = z.object({
  fName: z
    .string()
    .min(3, { message: "First Name must be at least 3 characters" }),
  lName: z
    .string()
    .min(3, { message: "Last Name must be at least 3 characters" }),
  gender: z.enum(["male", "female"], { message: "Please select a gender" }),
  enDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Please Select a valid date",
  }),
  grDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Please Select a valid date",
  }),
  stEmail: z.string().email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});
export default RegisterSchema;
