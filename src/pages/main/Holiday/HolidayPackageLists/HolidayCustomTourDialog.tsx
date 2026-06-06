import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon, Loader2, Send, Sparkles } from "lucide-react";
import { usePostContactInfoMutation } from "@/redux/api/formSubApi";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const HolidayCustomTourDialog = () => {
  const [open, setOpen] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [travelDate, setTravelDate] = useState<Date | undefined>();

  const [postContactInfo, { isLoading }] = usePostContactInfoMutation();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    destination: "",
    travelers: "",
    budget: "",
    note: "",
  });

  const handleChange = (key: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    const description = `
Custom Tour Request

Destination: ${form.destination}
Travel Date: ${travelDate ? format(travelDate, "PPP") : "-"}
Travelers: ${form.travelers}
Budget: ${form.budget}

User Note:
${form.note}
    `.trim();

    await postContactInfo({
      name: form.name,
      email: form.email,
      phone: form.phone,
      subject: "Custom Tour Request",
      description,
    }).unwrap();

    setOpen(false);
    setTravelDate(undefined);
    setForm({
      name: "",
      email: "",
      phone: "",
      destination: "",
      travelers: "",
      budget: "",
      note: "",
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="rounded-sm px-8">
          Request Now
        </Button>
      </DialogTrigger>

      <DialogContent
        className="
          w-[95vw] !max-w-2xl overflow-hidden rounded-sm p-6
          [&>button]:text-white
          [&>button]:opacity-100
          [&>button:hover]:bg-white/15
          [&>button:hover]:text-white
        "
      >
        <DialogHeader className="-mx-6 -mt-6 mb-6 bg-primary px-6 py-5 text-white">
          <div className="flex items-start gap-3">
            <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-white/15">
              <Sparkles className="h-5 w-5 text-white" />
            </div>

            <div>
              <DialogTitle className="text-xl font-bold text-white">
                Request a Customised Tour
              </DialogTitle>

              <p className="mt-1 text-sm leading-6 text-white/80">
                Tell us your preferred destination, date, budget and travel
                plan. Our team will contact you with a custom package.
              </p>
            </div>
          </div>
        </DialogHeader>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <Label>Name</Label>
            <Input
              className="mt-2 rounded-sm"
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </div>

          <div>
            <Label>Email</Label>
            <Input
              type="email"
              className="mt-2 rounded-sm"
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
          </div>

          <div>
            <Label>Phone</Label>
            <Input
              className="mt-2 rounded-sm"
              value={form.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
            />
          </div>

          <div>
            <Label>Destination</Label>
            <Input
              className="mt-2 rounded-sm"
              value={form.destination}
              onChange={(e) => handleChange("destination", e.target.value)}
            />
          </div>

          <div>
            <Label>Travel Date</Label>

            <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
              <PopoverTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  className={cn(
                    "mt-2 h-10 w-full justify-start rounded-sm text-left font-normal",
                    !travelDate && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4 text-primary" />
                  {travelDate ? format(travelDate, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>

              <PopoverContent className="w-auto rounded-sm p-0" align="start">
                <Calendar
                  mode="single"
                  selected={travelDate}
                  onSelect={(date) => {
                    setTravelDate(date);
                    setCalendarOpen(false);
                  }}
                  disabled={(date) => date < new Date()}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <Label>Travelers</Label>
            <Input
              type="number"
              min={1}
              className="mt-2 rounded-sm"
              value={form.travelers}
              onChange={(e) => handleChange("travelers", e.target.value)}
            />
          </div>

          <div className="md:col-span-2">
            <Label>Budget</Label>
            <Input
              className="mt-2 rounded-sm"
              placeholder="Example: BDT 50,000"
              value={form.budget}
              onChange={(e) => handleChange("budget", e.target.value)}
            />
          </div>

          <div className="md:col-span-2">
            <Label>Extra Note</Label>
            <Textarea
              className="mt-2 min-h-28 rounded-sm"
              value={form.note}
              onChange={(e) => handleChange("note", e.target.value)}
            />
          </div>
        </div>

        <Button
          onClick={handleSubmit}
          disabled={isLoading}
          className="mt-2 h-11 w-full rounded-sm text-white! hover:text-primary! dark:text-black! dark:hover:text-red-400!"
        >
          {isLoading ? (
            <Loader2 size={18} className="mr-2 animate-spin" />
          ) : (
            <Send size={18} className="mr-2" />
          )}
          Submit Request
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default HolidayCustomTourDialog;