import { useFieldArray, type Control } from "react-hook-form";
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

type ScoresSectionProps = {
  control: Control<any>;
};

const emptyScore = {
  test_name: "",
  overall: "",
  listening: "",
  reading: "",
  writing: "",
  speaking: "",
  attended_date: "",
};

const ScoresSection = ({ control }: ScoresSectionProps) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "scores",
  });

  return (
    <div className="space-y-5">
      <div className="border-y border-border py-4">
        <span className="inline-flex rounded-sm bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
          Test Scores
        </span>
      </div>

      {fields.length === 0 && (
        <p className="text-sm text-muted-foreground">
          No score added. This section is optional.
        </p>
      )}

      {fields.map((item, index) => (
        <div
          key={item.id}
          className="rounded-sm border border-border bg-muted/20 p-4"
        >
          <div className="mb-4 flex items-center justify-between gap-3">
            <h4 className="font-semibold">Score #{index + 1}</h4>

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
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField
              control={control}
              name={`scores.${index}.test_name`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Test Name *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="IELTS"
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
              name={`scores.${index}.overall`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Overall</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="7.0"
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
              name={`scores.${index}.listening`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Listening</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="7.5"
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
              name={`scores.${index}.reading`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reading</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="7.0"
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
              name={`scores.${index}.writing`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Writing</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="6.5"
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
              name={`scores.${index}.speaking`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Speaking</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="7.0"
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
              name={`scores.${index}.attended_date`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Attended Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} className="rounded-sm" />
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
        onClick={() => append({ ...emptyScore })}
        className="w-full rounded-sm"
      >
        <Plus className="mr-2 h-4 w-4" />
        Add Score
      </Button>
    </div>
  );
};

export default ScoresSection;