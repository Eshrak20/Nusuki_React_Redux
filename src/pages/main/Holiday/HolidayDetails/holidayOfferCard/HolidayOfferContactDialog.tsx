import { useState } from "react";
import {
  Check,
  Copy,
  Headphones,
  MessageCircle,
  Phone,
  Send,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { type Offer, phoneNumber, whatsappNumber } from "./holidayOffer.utils";

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
      <DialogContent
        className="
          w-[95vw] !max-w-3xl overflow-hidden rounded-sm p-0
          [&>button]:text-white
          [&>button]:opacity-100
          [&>button:hover]:bg-white/15
          [&>button:hover]:text-white
        "
      >
        <DialogHeader className="bg-primary px-6 py-5 text-white">
          <div className="flex items-start gap-3">
            <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-white/15">
              <Headphones className="h-5 w-5 text-white" />
            </div>

            <div>
              <DialogTitle className="text-xl font-bold text-white">
                Contact Us
              </DialogTitle>

              <p className="mt-1 text-sm leading-6 text-white/80">
                Need quick help for this offer? Call us directly, message on
                WhatsApp, or submit a request form.
              </p>
            </div>
          </div>
        </DialogHeader>

        <div className="grid md:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-4 border-r p-6 dark:border-border">
            <div className="space-y-3">
              <Button asChild className="h-12 w-full justify-start rounded-sm">
                <a
                  href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                    `Hello, I am interested in ${offer.name} Package of Holiday`,
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
                className="h-12 w-full justify-start rounded-sm"
              >
                <a href={`tel:${phoneNumber}`}>
                  <Phone size={18} className="mr-3 text-primary" />
                  Direct Call
                  <span className="ml-auto text-muted-foreground">
                    {phoneNumber}
                  </span>
                </a>
              </Button>

              <Button
                variant="outline"
                onClick={handleCopyPhone}
                className="h-12 w-full justify-start rounded-sm"
              >
                {copied ? (
                  <Check size={18} className="mr-3 text-green-600" />
                ) : (
                  <Copy size={18} className="mr-3 text-primary" />
                )}

                {copied ? "Phone Number Copied" : "Copy Phone Number"}

                <span className="ml-auto text-muted-foreground">
                  {phoneNumber}
                </span>
              </Button>
            </div>

            {copied && (
              <div className="rounded-sm border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700 dark:border-green-900/50 dark:bg-green-950/30 dark:text-green-400">
                Phone number copied successfully.
              </div>
            )}
          </div>

          <div className="flex flex-col justify-between bg-muted/40 p-6 dark:bg-muted/20">
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

              <div className="mt-5 rounded-sm border bg-background p-4 shadow-sm">
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
              className="mt-6 h-12 w-full rounded-sm font-semibold text-white! dark:text-black!"
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