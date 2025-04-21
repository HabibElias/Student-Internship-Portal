import { z } from "zod";

const RegisterSchema = z.object({
  fName: z
    .string()
    .min(3, { message: "First Name must be at least 3 characters" })
    .max(50, { message: "First Name must not exceed 50 characters" }),
  lName: z
    .string()
    .min(3, { message: "Last Name must be at least 3 characters" })
    .max(50, { message: "Last Name must not exceed 50 characters" }),
  gender: z.enum(["male", "female"], { message: "Please select a gender" }),
  enDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Please Select a valid date",
  }),
  grDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Please Select a valid date",
  }),
  dept: z.number({ message: "Please select a department" }),
  email: z
    .string()
    .email({ message: "Please enter a valid email address" })
    .max(100, { message: "Email must not exceed 100 characters" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .max(128, { message: "Password must not exceed 128 characters" })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/[@$!%*?&#]/, {
      message: "Password must contain at least one special character",
    }),

  consent: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  }),
});

export const CompSchema = z.object({
  compName: z
    .string()
    .min(3, { message: "Company is must be at lease 3 characters" })
    .max(258, { message: "Company is no more than 258 characters" }),
  location: z
    .string()
    .min(2, { message: "Location must be at least 2 characters" })
    .max(100, { message: "Location must not exceed 100 characters" })
    .refine((val) => /^[a-zA-Z\s]+(?:,\s*[a-zA-Z\s]+)*$/.test(val), {
      message: "Location must only contain letters, spaces, and commas",
    }),
  description: z
    .string()
    .min(1, { message: "Description is no more than 400 characters" })
    .max(400, { message: "Description is no more than 400 characters" }),
  webLink: z.string().url({ message: "Please enter a valid URL" }).optional(),
  email: z
    .string()
    .email({ message: "Please enter a valid email address" })
    .max(100, { message: "Email must not exceed 100 characters" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .max(128, { message: "Password must not exceed 128 characters" })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/[@$!%*?&#]/, {
      message: "Password must contain at least one special character",
    }),
  facebookLink: z
    .string()
    .url({ message: "Please enter a valid URL" })
    .optional(),
  instagramLink: z
    .string()
    .url({ message: "Please enter a valid URL" })
    .optional(),
  consent: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  }),
});

export default RegisterSchema;
