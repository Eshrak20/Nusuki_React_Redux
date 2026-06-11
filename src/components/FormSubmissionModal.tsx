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
import { Textarea } from "@/components/ui/textarea";

import { usePostContactInfoMutation } from "@/redux/api/formSubApi";
import { contactSchema } from "@/schemas/contact.schema";

interface Props {
  open: boolean;
  onClose: () => void;
  title: string;
  type?: "default" | "education";
}

const modalContactSchema = contactSchema.extend({
  interestedCountry: z.string().optional(),
  dateOfBirth: z.string().optional(),
  gender: z.string().optional(),
  reference: z.string().optional(),
  interestedCourse: z.string().optional(),
  previousVisaRefusal: z.string().optional(),
  country: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  street: z.string().optional(),
});

type ContactFormValues = z.infer<typeof modalContactSchema>;

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

const FormSubmissionModal = ({
  open,
  onClose,
  title,
  type = "default",
}: Props) => {
  const [postContactInfo, { isLoading }] = usePostContactInfoMutation();
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(modalContactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: title,
      description: "",

      interestedCountry: "",
      dateOfBirth: "",
      gender: "",
      reference: "",
      interestedCourse: "",
      previousVisaRefusal: "",
      country: "Bangladesh",
      city: "",
      state: "",
      street: "",
    },
  });

  const validateEducationFields = (values: ContactFormValues) => {
    if (type !== "education") return true;

    let isValid = true;

    const requiredFields: Array<{
      name: keyof ContactFormValues;
      message: string;
    }> = [
      {
        name: "interestedCountry",
        message: "Interested country is required",
      },
      {
        name: "dateOfBirth",
        message: "Date of birth is required",
      },
      {
        name: "interestedCourse",
        message: "Interested course is required",
      },
      {
        name: "previousVisaRefusal",
        message: "Previous visa refusal is required",
      },
      {
        name: "country",
        message: "Country is required",
      },
      {
        name: "city",
        message: "City is required",
      },
      {
        name: "street",
        message: "Street is required",
      },
    ];

    requiredFields.forEach((field) => {
      const value = values[field.name];

      if (typeof value !== "string" || !value.trim()) {
        form.setError(field.name, {
          type: "manual",
          message: field.message,
        });

        isValid = false;
      }
    });

    return isValid;
  };

  const onSubmit = async (values: ContactFormValues) => {
    try {
      if (!validateEducationFields(values)) return;

      let finalDescription: string = values.description || "";

      if (type === "education") {
        finalDescription = `
Student Information:

Interested Country: ${values.interestedCountry || "N/A"}
Date Of Birth: ${values.dateOfBirth || "N/A"}
Gender: ${values.gender || "N/A"}
Reference: ${values.reference || "N/A"}
Interested Course: ${values.interestedCourse || "N/A"}
Previous Visa Refusal: ${values.previousVisaRefusal || "N/A"}

Address:
Country: ${values.country || "N/A"}
City: ${values.city || "N/A"}
State: ${values.state || "N/A"}
Street: ${values.street || "N/A"}

Message:
${values.description || "N/A"}
        `.trim();
      }

      await postContactInfo({
        name: values.name,
        email: values.email,
        phone: values.phone,
        subject: values.subject || title,
        description: finalDescription,
      }).unwrap();

      setIsSuccess(true);
      form.reset({
        name: "",
        email: "",
        phone: "",
        subject: title,
        description: "",

        interestedCountry: "",
        dateOfBirth: "",
        gender: "",
        reference: "",
        interestedCourse: "",
        previousVisaRefusal: "",
        country: "Bangladesh",
        city: "",
        state: "",
        street: "",
      });
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
          onClose();
        }
      }}
    >
      <DialogContent className="max-h-[90vh] w-[calc(100vw-1.5rem)] overflow-hidden rounded-sm border-none bg-background p-0 sm:max-w-[760px] dark:bg-zinc-950">
        <DialogHeader className="bg-primary px-6 py-7 text-primary-foreground md:px-8">
          <DialogTitle className="text-center text-2xl font-semibold underline">
            {title}
          </DialogTitle>
        </DialogHeader>

        <div className="max-h-[calc(90vh-100px)] overflow-y-auto p-6 md:p-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                          placeholder="email@example.com"
                          type="email"
                          {...field}
                          className="rounded-sm"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="+880..."
                        {...field}
                        className="rounded-sm"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {type === "education" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="interestedCountry"
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
                      name="dateOfBirth"
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
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <FormControl>
                              <SelectTrigger className="rounded-sm">
                                <SelectValue placeholder="Choose" />
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
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <FormControl>
                              <SelectTrigger className="rounded-sm">
                                <SelectValue placeholder="Choose" />
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
                      name="interestedCourse"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Interested Course *</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Interested Course"
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
                      name="previousVisaRefusal"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Previous Visa Refusal *</FormLabel>
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <FormControl>
                              <SelectTrigger className="rounded-sm">
                                <SelectValue placeholder="Choose" />
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
                      name="country"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Country *</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Bangladesh"
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
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City *</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="City"
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
                              placeholder="State"
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
                        <FormItem>
                          <FormLabel>Street *</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Street address"
                              {...field}
                              className="rounded-sm"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              )}

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us more..."
                        className="min-h-28 resize-none rounded-sm"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex flex-col items-center pt-2">
                {isSuccess ? (
                  <div className="flex animate-in items-center gap-2 font-medium text-primary duration-300 zoom-in-95">
                    <CheckCircle2 className="h-5 w-5" />
                    Message Sent Successfully!
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

export default FormSubmissionModal;