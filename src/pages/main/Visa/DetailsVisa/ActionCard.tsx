import { Check, Send } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { VisaDetails } from "@/types/visa/types.visa";
import EduFormSubmission from "@/components/education/EduFormSubmission";
import { useState } from "react";
import WhatsAppContactModal from "@/components/WhatsAppContactModal";

interface VisaActionCardProps {
  details: VisaDetails;
}

const ActionCard = ({ details }: VisaActionCardProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const formattedFee = Number(details.service_fee).toLocaleString("en-IN");

  const includedFeatures = [
    "Complete documentation support",
    "Application form filling",
    "Embassy appointment booking",
    "Status tracking updates",
  ];

  // change this number as needed
  const whatsappNumber = "+8801715248942";

  return (
    <div className="mb-5 mt-5 rounded-sm border border-border bg-card p-6 text-card-foreground shadow-sm md:p-8">
      {/* Pricing Header */}
      <div className="mb-6 text-center">
        <p className="mb-1 text-sm font-medium text-muted-foreground">
          Service Fee Starting From
        </p>
        <div className="flex items-center justify-center text-primary">
          <span className="text-4xl font-extrabold tracking-tight md:text-5xl">
            ৳{formattedFee}
          </span>
        </div>
        <p className="mt-1 text-sm font-medium text-muted-foreground">
          per person
        </p>
      </div>

      {/* Features List */}
      <div className="mb-8 space-y-3">
        {includedFeatures.map((feature, index) => (
          <div key={index} className="flex items-start gap-3">
            <Check
              className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500"
              strokeWidth={2.5}
            />
            <span className="text-sm font-medium">{feature}</span>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-3">
        {/* Apply Now Button */}
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3.5 text-base font-bold text-primary-foreground shadow-sm transition-colors hover:opacity-90">
              <Send className="h-5 w-5" />
              Apply Now
            </button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-120 overflow-hidden rounded-[2rem] border-none bg-background/95 p-0 shadow-2xl backdrop-blur-2xl">
            <DialogHeader className="hidden">
              <DialogTitle>Application Form</DialogTitle>
            </DialogHeader>
            <div className="max-h-[85vh] overflow-y-auto">
              <EduFormSubmission title="Apply for Visa" />
            </div>
          </DialogContent>
        </Dialog>

        {/* WhatsApp Button with Modal */}
        <WhatsAppContactModal phoneNumber={whatsappNumber} />
      </div>
    </div>
  );
};

export default ActionCard;