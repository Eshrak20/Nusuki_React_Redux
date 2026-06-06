import { useState } from "react";
import { Loader2, Send, FileText } from "lucide-react";

import { usePostContactInfoMutation } from "@/redux/api/formSubApi";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { buildOfferDescription, type Offer } from "./holidayOffer.utils";

interface Props {
  offer: Offer;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const HolidayOfferRequestDialog = ({ offer, open, onOpenChange }: Props) => {
  const [postContactInfo, { isLoading }] = usePostContactInfoMutation();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    note: "",
  });

  const handleChange = (key: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    await postContactInfo({
      name: form.name,
      email: form.email,
      phone: form.phone,
      subject: `${offer.name} Inquiry`,
      description: buildOfferDescription(offer, form.note),
    }).unwrap();

    onOpenChange(false);
    setForm({
      name: "",
      email: "",
      phone: "",
      note: "",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="
          w-[95vw] !max-w-2xl overflow-hidden rounded-sm p-0
          [&>button]:text-white
          [&>button]:opacity-100
          [&>button:hover]:bg-white/15
          [&>button:hover]:text-white
        "
      >
        <DialogHeader className="bg-primary px-6 py-5 text-white">
          <div className="flex items-start gap-3">
            <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-white/15">
              <FileText className="h-5 w-5 text-white" />
            </div>

            <div>
              <DialogTitle className="text-xl font-bold text-white">
                Submit Offer Request
              </DialogTitle>

              <p className="mt-1 text-sm leading-6 text-white/80">
                Fill in your contact details and our team will contact you with
                full information about this offer.
              </p>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-5 p-6">
          <div className="rounded-sm border bg-muted/40 p-4 dark:bg-muted/20">
            <p className="text-xs font-semibold uppercase text-primary">
              Selected Offer
            </p>

            <p className="mt-1 font-semibold text-foreground">{offer.name}</p>
          </div>

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

            <div className="md:col-span-2">
              <Label>Phone</Label>
              <Input
                className="mt-2 rounded-sm"
                value={form.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
              />
            </div>

            <div className="md:col-span-2">
              <Label>Extra Note</Label>
              <Textarea
                className="mt-2 min-h-28 rounded-sm"
                placeholder="Write anything extra..."
                value={form.note}
                onChange={(e) => handleChange("note", e.target.value)}
              />
            </div>
          </div>

          <Button
            onClick={handleSubmit}
            disabled={isLoading}
            className="h-11 w-full rounded-sm font-semibold text-white! dark:text-black!"
          >
            {isLoading ? (
              <Loader2 size={18} className="mr-2 animate-spin" />
            ) : (
              <Send size={18} className="mr-2" />
            )}
            Submit Request
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default HolidayOfferRequestDialog;