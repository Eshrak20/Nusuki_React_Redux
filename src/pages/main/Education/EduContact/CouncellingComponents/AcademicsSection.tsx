import { useFieldArray } from "react-hook-form";
import { Plus, Trash2 } from "lucide-react";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import type {
  AcademicsSectionProps,
  AcademicFormValue,
  ContactFormValues,
} from "@/types/education/type.contact";

const emptyAcademic: AcademicFormValue = {
  institution: "",
  degree_level: "",
  passed_year: "",
  subject: "",
  gpa: "",
};

const AcademicsSection = ({ control }: AcademicsSectionProps) => {
  const { fields, append, remove } = useFieldArray<
    ContactFormValues,
    "academics"
  >({
    control,
    name: "academics",
  });

  return (
    <div className="space-y-5">
      <div className="border-y border-border py-4">
        <span className="inline-flex rounded-sm bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
          Academic Information *
        </span>
      </div>

      {fields.map((item, index) => (
        <div
          key={item.id}
          className="rounded-sm border border-border bg-muted/20 p-4"
        >
          <div className="mb-4 flex items-center justify-between gap-3">
            <h4 className="font-semibold">Academic #{index + 1}</h4>

            {fields.length > 1 && (
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={() => remove(index)}
                className="rounded-sm"
              >
                <Trash2 className="mr-1 h-4 w-4" />
                Remove
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField
              control={control}
              name={`academics.${index}.institution`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Institution *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="ABC College"
                      {...field}
                      className="rounded-sm"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name={`academics.${index}.degree_level`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Degree Level *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="HSC"
                      {...field}
                      className="rounded-sm"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name={`academics.${index}.passed_year`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Passed Year *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="2020"
                      {...field}
                      className="rounded-sm"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name={`academics.${index}.subject`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subject *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Science"
                      {...field}
                      className="rounded-sm"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name={`academics.${index}.gpa`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>GPA *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="5.00"
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
      ))}

      <Button
        type="button"
        variant="outline"
        onClick={() => append({ ...emptyAcademic })}
        className="w-full rounded-sm"
      >
        <Plus className="mr-2 h-4 w-4" />
        Add Academic
      </Button>
    </div>
  );
};

export default AcademicsSection;