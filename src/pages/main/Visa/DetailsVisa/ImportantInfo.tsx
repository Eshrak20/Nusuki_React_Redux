import { TriangleAlert } from 'lucide-react';
import type { VisaDetails } from "@/types/visa/types.visa";
import { formatToBulletPoints } from '@/lib/utils';

interface ImportantInfoProps {
    details: VisaDetails;
}

const ImportantInfo = ({ details }: ImportantInfoProps) => {

    if (!details?.imp_info) return null;

    const bulletPoints = formatToBulletPoints(details.imp_info);

    return (
        <div className="mx-auto max-w-7xl pt-1 lg:pt-0 lg:p-4">
            <div className="flex items-start gap-5 rounded-sm border border-primary/20 bg-primary/10 p-5 shadow-sm">

                {/* Icon */}
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <TriangleAlert className="h-6 w-6" strokeWidth={2.5} />
                </div>

                {/* Content */}
                <div className="w-full">
                    <h3 className="mb-2 text-lg font-bold text-foreground">
                        Important Information
                    </h3>

                    <ul className="list-disc pl-5 space-y-1 text-base font-medium text-muted-foreground">
                        {bulletPoints.map((point, index) => (
                            <li key={index}>{point}</li>
                        ))}
                    </ul>
                </div>

            </div>
        </div>
    );
};

export default ImportantInfo;