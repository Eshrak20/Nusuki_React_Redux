import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(11, "Phone is required"),
  // These are required for your form fields to capture data
  city: z.string().optional(),
  office: z.string().optional(),
  // 👇 These three are needed for your custom description logic
  destination: z.string().optional(),
  coaching: z.string().optional(),
  loan: z.string().optional(),
  
  subject: z.string().min(3, "Subject is required"),
  description: z.string().optional(), 
});

export type ContactFormValues = z.infer<typeof contactSchema>;