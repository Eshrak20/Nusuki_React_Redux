/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2, Loader2 } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { usePostContactInfoMutation, usePostCouncellingInfoMutation } from "@/redux/api/formSubApi";

import AcademicsSection from "./AcademicsSection";
import ScoresSection from "./ScoresSection";

interface Props {
  open: boolean;
  onClose: () => void;
}

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

const applicationSchema = z.object({
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

type ContactFormValues = z.infer<typeof applicationSchema>;

const countryOptions = [
  "Germany",
  "United Kingdom",
  "Canada",
  "Australia",
  "United States",
  "Malaysia",
  "Denmark",
  "Sweden",
  "Other",
];

const genderOptions = ["Male", "Female", "Other"];

const referenceOptions = [
  "Facebook",
  "Google",
  "YouTube",
  "Friend / Family",
  "Office Visit",
  "Other",
];

const visaRefusalOptions = ["No", "Yes"];
const jobExperienceOptions = ["No", "Yes"];

const emptyAcademic = {
  institution: "",
  degree_level: "",
  passed_year: "",
  subject: "",
  gpa: "",
};

const removeEmptyOptionalFields = (data: any): any => {
  if (Array.isArray(data)) {
    return data
      .map((item) => removeEmptyOptionalFields(item))
      .filter((item) => {
        if (typeof item === "object" && item !== null) {
          return Object.keys(item).length > 0;
        }

        return item !== "" && item !== null && item !== undefined;
      });
  }

  if (typeof data === "object" && data !== null) {
    return Object.entries(data).reduce((acc, [key, value]) => {
      const cleanedValue = removeEmptyOptionalFields(value);

      const isEmptyString = cleanedValue === "";
      const isEmptyArray =
        Array.isArray(cleanedValue) && cleanedValue.length === 0;
      const isEmptyObject =
        typeof cleanedValue === "object" &&
        cleanedValue !== null &&
        !Array.isArray(cleanedValue) &&
        Object.keys(cleanedValue).length === 0;

      if (
        cleanedValue === undefined ||
        cleanedValue === null ||
        isEmptyString ||
        isEmptyArray ||
        isEmptyObject
      ) {
        return acc;
      }

      acc[key] = cleanedValue;
      return acc;
    }, {} as any);
  }

  return data;
};

const EduContactModal = ({
  open,
  onClose,
}: Props) => {
  const [postContactInfo, { isLoading }] = usePostCouncellingInfoMutation();
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      name: "",
      email: "",
      phone_number: "",

      interested_country: "",
      date_of_birth: "",
      gender: "",
      reference: "",
      interested_course: "",
      previous_visa_refusal: "",

      city: "",
      state: "",
      street: "",

      job_experience: "",
      company_name: "",
      designation: "",
      duration: "",

      academics: [{ ...emptyAcademic }],
      scores: [],
    },
  });

  const resetForm = () => {
    form.reset({
      name: "",
      email: "",
      phone_number: "",

      interested_country: "",
      date_of_birth: "",
      gender: "",
      reference: "",
      interested_course: "",
      previous_visa_refusal: "",

      city: "",
      state: "",
      street: "",

      job_experience: "",
      company_name: "",
      designation: "",
      duration: "",

      academics: [{ ...emptyAcademic }],
      scores: [],
    });
  };

  const onSubmit = async (values: ContactFormValues) => {
    try {
      const payload = removeEmptyOptionalFields(values);

      await postContactInfo(payload).unwrap();

      setIsSuccess(true);
      resetForm();
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        if (!value) {
          setIsSuccess(false);
          resetForm();
          onClose();
        }
      }}
    >
      <DialogContent className="max-h-[90vh] w-[calc(100vw-1.5rem)] overflow-hidden rounded-sm border-none bg-background p-0 sm:max-w-220 dark:bg-zinc-950">
        <DialogHeader className="bg-primary px-6 py-7 text-primary-foreground md:px-8">
          <DialogTitle className="text-center text-2xl font-semibold underline">
            Book Free Study Abroad Counselling
          </DialogTitle>
        </DialogHeader>

        <div className="max-h-[calc(90vh-100px)] overflow-y-auto p-6 md:p-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="border-y border-border py-4">
                <span className="inline-flex rounded-sm bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                  Student Information
                </span>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="John Doe"
                          {...field}
                          className="rounded-sm"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="john@example.com"
                          type="email"
                          {...field}
                          className="rounded-sm"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone_number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="01700000000"
                          {...field}
                          className="rounded-sm"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="interested_country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Interested Country *</FormLabel>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger className="rounded-sm">
                            <SelectValue placeholder="Choose country" />
                          </SelectTrigger>
                        </FormControl>

                        <SelectContent>
                          {countryOptions.map((country) => (
                            <SelectItem key={country} value={country}>
                              {country}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="date_of_birth"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date Of Birth *</FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          {...field}
                          className="rounded-sm"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gender</FormLabel>
                      <Select
                        value={field.value || ""}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger className="rounded-sm">
                            <SelectValue placeholder="Choose gender" />
                          </SelectTrigger>
                        </FormControl>

                        <SelectContent>
                          {genderOptions.map((gender) => (
                            <SelectItem key={gender} value={gender}>
                              {gender}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="reference"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Reference</FormLabel>
                      <Select
                        value={field.value || ""}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger className="rounded-sm">
                            <SelectValue placeholder="Choose reference" />
                          </SelectTrigger>
                        </FormControl>

                        <SelectContent>
                          {referenceOptions.map((reference) => (
                            <SelectItem key={reference} value={reference}>
                              {reference}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="interested_course"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Interested Course *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Computer Science"
                          {...field}
                          className="rounded-sm"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="previous_visa_refusal"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Previous Visa Refusal *</FormLabel>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger className="rounded-sm">
                            <SelectValue placeholder="Choose option" />
                          </SelectTrigger>
                        </FormControl>

                        <SelectContent>
                          {visaRefusalOptions.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="border-y border-border py-4">
                <span className="inline-flex rounded-sm bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                  Address
                </span>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Dhaka"
                          {...field}
                          className="rounded-sm"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Dhaka"
                          {...field}
                          className="rounded-sm"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="street"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Street *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Mirpur"
                          {...field}
                          className="rounded-sm"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="border-y border-border py-4">
                <span className="inline-flex rounded-sm bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                  Job Experience
                </span>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="job_experience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Job Experience</FormLabel>
                      <Select
                        value={field.value || ""}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger className="rounded-sm">
                            <SelectValue placeholder="Choose option" />
                          </SelectTrigger>
                        </FormControl>

                        <SelectContent>
                          {jobExperienceOptions.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="company_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="ABC Ltd"
                          {...field}
                          className="rounded-sm"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="designation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Designation</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Executive"
                          {...field}
                          className="rounded-sm"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Duration</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="2 years"
                          {...field}
                          className="rounded-sm"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <AcademicsSection control={form.control} />

              <ScoresSection control={form.control} />

              <div className="flex flex-col items-center pt-2">
                {isSuccess ? (
                  <div className="flex animate-in items-center gap-2 font-medium text-primary duration-300 zoom-in-95">
                    <CheckCircle2 className="h-5 w-5" />
                    Application Submitted Successfully!
                  </div>
                ) : (
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full rounded-sm px-12 py-6 text-lg font-bold transition-all hover:scale-[1.02] active:scale-95 md:w-auto"
                  >
                    {isLoading && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    {isLoading ? "Submitting..." : "Submit Application"}
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EduContactModal;