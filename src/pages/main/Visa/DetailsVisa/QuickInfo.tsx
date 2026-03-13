import { Clock, Calendar, DoorOpen, CreditCard } from 'lucide-react';
import type { VisaDetails } from '@/types/visa/types.visa';

interface QuickInfoProps {
    details: VisaDetails;
}

const QuickInfo = ({ details }: QuickInfoProps) => {
    const infoCards = [
        {
            title: 'Processing Time',
            value: details.processing_time,
            icon: Clock,
        },
        {
            title: 'Visa Validity',
            value: details.visa_validity,
            icon: Calendar,
        },
        {
            title: 'Entry Type',
            value: details.entry_type,
            icon: DoorOpen,
        },
        {
            title: 'Visa Type',
            value: details.visa_type,
            icon: CreditCard,
        },
    ];

    return (
        <section className="">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {infoCards.map((card, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center justify-center rounded-2xl bg-white p-4 shadow-sm transition-transform hover:scale-[1.02]"
                        >
                            {/* Icon Circle */}
                            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary">
                                <card.icon className="h-7 w-7 text-white" />
                            </div>

                            {/* Text Content */}
                            <h3 className="mb-2 text-lg font-bold text-slate-800">
                                {card.title}
                            </h3>
                            <p className="text-sm font-medium text-slate-500">
                                {card.value}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default QuickInfo;