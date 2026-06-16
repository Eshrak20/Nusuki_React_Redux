import type { Control } from "react-hook-form";

export type AcademicFormValue = {
  institution: string;
  degree_level: string;
  passed_year: string;
  subject: string;
  gpa: string;
};

export type ScoreFormValue = {
  test_name: string;
  overall?: string;
  listening?: string;
  reading?: string;
  writing?: string;
  speaking?: string;
  attended_date?: string;
};

export type ContactFormValues = {
  name: string;
  email: string;
  phone_number: string;

  interested_country: string;
  date_of_birth: string;
  gender?: string;
  reference?: string;
  interested_course: string;
  previous_visa_refusal: string;

  city: string;
  state?: string;
  street: string;

  job_experience?: string;
  company_name?: string;
  designation?: string;
  duration?: string;

  academics: AcademicFormValue[];
  scores?: ScoreFormValue[];
};

export type AcademicsSectionProps = {
  control: Control<ContactFormValues>;
};

export type ScoresSectionProps = {
  control: Control<ContactFormValues>;
};