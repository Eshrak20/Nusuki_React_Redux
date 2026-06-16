/* eslint-disable @typescript-eslint/no-explicit-any */
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { usePostCouncellingInfoMutation } from "@/redux/api/formSubApi";

import AcademicsSection from "./AcademicsSection";
import ScoresSection from "./ScoresSection";

import { applicationSchema } from "./Councelling.zod";
import type { ContactFormValues } from "@/types/education/type.contact";

type CouncellingFormProps = {
  onSuccess?: () => void;
};

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

const defaultFormValues: ContactFormValues = {
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

const CouncellingForm = ({ onSuccess }: CouncellingFormProps) => {
  const [postContactInfo, { isLoading }] = usePostCouncellingInfoMutation();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(applicationSchema),
    defaultValues: defaultFormValues,
  });

  const resetForm = () => {
    form.reset(defaultFormValues);
  };

  const onSubmit = async (values: ContactFormValues) => {
    try {
      const payload = removeEmptyOptionalFields(values);

      await postContactInfo(payload).unwrap();

      toast.success("Application submitted successfully!", {
        description: "Our counselling team will contact you soon.",
        duration: 4000,
      });

      resetForm();

      onSuccess?.();
    } catch (error) {
      console.error("Submission error:", error);

      toast.error("Submission failed", {
        description: "Please check your information and try again.",
        duration: 4000,
      });
    }
  };

  return (
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
                <Select value={field.value} onValueChange={field.onChange}>
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
                  <Input type="date" {...field} className="rounded-sm" />
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
                <Select value={field.value} onValueChange={field.onChange}>
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
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-sm px-12 py-6 text-lg font-bold transition-all hover:scale-[1.02] active:scale-95 md:w-auto"
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading ? "Submitting..." : "Submit Application"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CouncellingForm;