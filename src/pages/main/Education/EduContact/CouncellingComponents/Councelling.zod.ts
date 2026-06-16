import { z } from "zod";

const academicSchema = z.object({
  institution: z.string().min(1, "Institution is required"),
  degree_level: z.string().min(1, "Degree level is required"),
  passed_year: z.string().min(1, "Passed year is required"),
  subject: z.string().min(1, "Subject is required"),
  gpa: z.string().min(1, "GPA is required"),
});

const scoreSchema = z.object({
  test_name: z.string().min(1, "Test name is required"),
  overall: z.string().optional(),
  listening: z.string().optional(),
  reading: z.string().optional(),
  writing: z.string().optional(),
  speaking: z.string().optional(),
  attended_date: z.string().optional(),
});

export const applicationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
  phone_number: z.string().min(1, "Phone number is required"),

  interested_country: z.string().min(1, "Interested country is required"),
  date_of_birth: z.string().min(1, "Date of birth is required"),
  gender: z.string().optional(),
  reference: z.string().optional(),
  interested_course: z.string().min(1, "Interested course is required"),
  previous_visa_refusal: z.string().min(1, "Previous visa refusal is required"),

  city: z.string().min(1, "City is required"),
  state: z.string().optional(),
  street: z.string().min(1, "Street is required"),

  job_experience: z.string().optional(),
  company_name: z.string().optional(),
  designation: z.string().optional(),
  duration: z.string().optional(),

  academics: z
    .array(academicSchema)
    .min(1, "At least one academic item is required"),

  scores: z.array(scoreSchema).optional(),
});