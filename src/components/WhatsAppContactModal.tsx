import { useState } from "react";
import { Check, Copy, MessageCircle, Phone } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface WhatsAppContactModalProps {
  phoneNumber: string;
}

const WhatsAppContactModal = ({ phoneNumber }: WhatsAppContactModalProps) => {
  const [copied, setCopied] = useState(false);

  const cleanNumber = phoneNumber.replace(/\s+/g, "");
  const whatsappLink = `https://wa.me/${cleanNumber.replace(/^\+/, "")}`;
  const telLink = `tel:${cleanNumber}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(phoneNumber);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to copy number:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex w-full items-center justify-center gap-2 rounded-sm bg-[#22C55E] px-4 py-3.5 text-base font-bold text-white shadow-sm transition-colors hover:bg-[#22C55E]/90">
          <svg
            viewBox="0 0 24 24"
            width="20"
            height="20"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
          >
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
          WhatsApp Us
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md rounded-sm border border-border bg-background p-0 shadow-2xl">
        <DialogHeader className="border-b border-border px-6 py-5">
          <DialogTitle className="flex items-center gap-2 text-xl font-bold">
            <MessageCircle className="h-5 w-5 text-[#22C55E]" />
            Contact on WhatsApp
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5 px-6 py-6">
          <div className="rounded-sm border border-border bg-muted/40 p-4 text-center">
            <p className="mb-2 text-sm font-medium text-muted-foreground">
              WhatsApp Number
            </p>
            <p className="text-xl font-bold tracking-wide text-foreground">
              {phoneNumber}
            </p>
          </div>

          <div className="grid gap-3">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-sm bg-[#22C55E] px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-[#22C55E]/90"
            >
              <MessageCircle className="h-4 w-4" />
              Open WhatsApp
            </a>

            <a
              href={telLink}
              className="flex w-full items-center justify-center gap-2 rounded-sm bg-primary px-4 py-3 text-sm font-bold text-primary-foreground transition-colors hover:opacity-90"
            >
              <Phone className="h-4 w-4" />
              Call Now
            </a>

            <button
              type="button"
              onClick={handleCopy}
              className="flex w-full items-center justify-center gap-2 rounded-sm border border-border bg-card px-4 py-3 text-sm font-bold text-card-foreground transition-colors hover:bg-accent"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 text-emerald-500" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  Copy Number
                </>
              )}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WhatsAppContactModal;