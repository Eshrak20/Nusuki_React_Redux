import { useState } from "react";
import { Check, Copy, MessageCircle, Phone, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {  type Offer, phoneNumber, whatsappNumber } from "./holidayOffer.utils";

interface Props {
  offer: Offer;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRequestClick: () => void;
}

const HolidayOfferContactDialog = ({
  offer,
  open,
  onOpenChange,
  onRequestClick,
}: Props) => {
  const [copied, setCopied] = useState(false);

  const handleCopyPhone = async () => {
    await navigator.clipboard.writeText(phoneNumber);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1800);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="w-[95vw] !max-w-3xl rounded-md p-0 overflow-hidden">
        <div className="grid md:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-4 border-r p-6">
            <DialogHeader>
              <DialogTitle>Contact Us</DialogTitle>
            </DialogHeader>

            <p className="text-sm text-muted-foreground">
              Need quick help for this offer? Call us directly or message on
              WhatsApp.
            </p>

            <div className="space-y-3">
              <Button asChild className="h-12 w-full justify-start rounded-md">
                <a
                  href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                    `Hello, I am interested in ${offer.name}`,
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <MessageCircle size={18} className="mr-3" />
                  WhatsApp
                </a>
              </Button>

              <Button
                asChild
                variant="outline"
                className="h-12 w-full justify-start rounded-md"
              >
                <a href={`tel:${phoneNumber}`}>
                  <Phone size={18} className="mr-3" />
                  Direct Call
                  <span className="ml-auto text-muted-foreground">
                    {phoneNumber}
                  </span>
                </a>
              </Button>

              <Button
                variant="outline"
                onClick={handleCopyPhone}
                className="h-12 w-full justify-start rounded-md"
              >
                {copied ? (
                  <Check size={18} className="mr-3 text-green-600" />
                ) : (
                  <Copy size={18} className="mr-3" />
                )}
                {copied ? "Phone Number Copied" : "Copy Phone Number"}
                <span className="ml-auto text-muted-foreground">
                  {phoneNumber}
                </span>
              </Button>
            </div>

            {copied && (
              <div className="rounded-md border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
                Phone number copied successfully.
              </div>
            )}
          </div>

          <div className="flex flex-col justify-between bg-muted/40 p-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                Submit Request
              </p>

              <h3 className="mt-2 text-xl font-bold text-foreground">
                Want us to contact you?
              </h3>

              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Send your name, email and phone number. Our team will contact
                you with full details about this offer.
              </p>

              <div className="mt-5 rounded-md border bg-background p-4">
                <p className="text-sm font-semibold text-foreground">
                  Selected Offer
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {offer.name}
                </p>
              </div>
            </div>

            <Button
              onClick={onRequestClick}
              className="mt-6 h-12 w-full rounded-md font-semibold"
            >
              <Send size={18} className="mr-2" />
              Submit Request Form
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default HolidayOfferContactDialog;