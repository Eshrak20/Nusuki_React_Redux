import { Check, Send } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import type { VisaDetails } from "@/types/visa/types.visa";
import EduFormSubmission from '@/components/education/EduFormSubmission';
import { useState } from 'react';

interface VisaActionCardProps {
    details: VisaDetails;
}

const ActionCard = ({ details }: VisaActionCardProps) => {
    const [isOpen, setIsOpen] = useState(false);
    // Format the service fee with commas (e.g., 6500 -> 6,500)
    const formattedFee = Number(details.service_fee).toLocaleString('en-IN');

    // Standard inclusions list based on your design
    const includedFeatures = [
        "Complete documentation support",
        "Application form filling",
        "Embassy appointment booking",
        "Status tracking updates"
    ];

    return (
        <div className="mb-5 mt-5 rounded-2xl border border-border bg-card p-6 text-card-foreground shadow-sm md:p-8">

            {/* Pricing Header */}
            <div className="mb-6 text-center">
                <p className="mb-1 text-sm font-medium text-muted-foreground">
                    Service Fee Starting From
                </p>
                <div className="flex items-center justify-center text-primary">
                    {/* Taka Symbol (৳) + Price */}
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
                        <Check className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" strokeWidth={2.5} />
                        <span className="text-sm font-medium">
                            {feature}
                        </span>
                    </div>
                ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3">
                {/* Apply Now Button */}
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                        {/* Your clean button inserted here */}
                        <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3.5 text-base font-bold text-primary-foreground shadow-sm transition-colors hover:opacity-90">
                            <Send className="h-5 w-5" />
                            Apply Now
                        </button>
                    </DialogTrigger>

                    {/* The exact modal content from your example */}
                    <DialogContent className="sm:max-w-120 overflow-hidden rounded-[2rem] border-none bg-background/95 p-0 shadow-2xl backdrop-blur-2xl">
                        <DialogHeader className="hidden">
                            <DialogTitle>Application Form</DialogTitle>
                        </DialogHeader>
                        <div className="max-h-[85vh] overflow-y-auto">
                            {/* Note: Update the title prop to match your visa context instead of "course.name" if needed */}
                            <EduFormSubmission title="Apply for Visa" />
                        </div>
                    </DialogContent>
                </Dialog>

                {/* WhatsApp Button */}
                <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#22C55E] px-4 py-3.5 text-base font-bold text-white shadow-sm transition-colors hover:bg-[#22C55E]/90">
                    {/* Custom WhatsApp SVG Icon to match your design perfectly */}
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
            </div>

        </div>
    );
};

export default ActionCard;