// HolidayCustomTourDialog.tsx

import { useState } from "react";
import { Loader2, Send } from "lucide-react";
import { usePostContactInfoMutation } from "@/redux/api/formSubApi";

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

const HolidayCustomTourDialog = () => {
  const [open, setOpen] = useState(false);
  const [postContactInfo, { isLoading }] = usePostContactInfoMutation();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    destination: "",
    travelDate: "",
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
Travel Date: ${form.travelDate}
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
    setForm({
      name: "",
      email: "",
      phone: "",
      destination: "",
      travelDate: "",
      travelers: "",
      budget: "",
      note: "",
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button size="lg" className="rounded-md px-8">
          Request Now
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl rounded-md">
        <DialogHeader>
          <DialogTitle>Request a Customised Tour</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <Label>Name</Label>
            <Input
              className="mt-2 rounded-md"
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </div>

          <div>
            <Label>Email</Label>
            <Input
              className="mt-2 rounded-md"
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
          </div>

          <div>
            <Label>Phone</Label>
            <Input
              className="mt-2 rounded-md"
              value={form.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
            />
          </div>

          <div>
            <Label>Destination</Label>
            <Input
              className="mt-2 rounded-md"
              value={form.destination}
              onChange={(e) => handleChange("destination", e.target.value)}
            />
          </div>

          <div>
            <Label>Travel Date</Label>
            <Input
              type="date"
              className="mt-2 rounded-md"
              value={form.travelDate}
              onChange={(e) => handleChange("travelDate", e.target.value)}
            />
          </div>

          <div>
            <Label>Travelers</Label>
            <Input
              type="number"
              className="mt-2 rounded-md"
              value={form.travelers}
              onChange={(e) => handleChange("travelers", e.target.value)}
            />
          </div>

          <div className="md:col-span-2">
            <Label>Budget</Label>
            <Input
              className="mt-2 rounded-md"
              placeholder="Example: BDT 50,000"
              value={form.budget}
              onChange={(e) => handleChange("budget", e.target.value)}
            />
          </div>

          <div className="md:col-span-2">
            <Label>Extra Note</Label>
            <Textarea
              className="mt-2 min-h-28 rounded-md"
              value={form.note}
              onChange={(e) => handleChange("note", e.target.value)}
            />
          </div>
        </div>

        <Button
          onClick={handleSubmit}
          disabled={isLoading}
          className="mt-2 w-full rounded-md"
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