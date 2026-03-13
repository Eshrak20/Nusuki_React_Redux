import { TriangleAlert } from 'lucide-react';
import type { VisaDetails } from "@/types/visa/types.visa";

interface ImportantInfoProps {
    details: VisaDetails;
}

const ImportantInfo = ({ details }: ImportantInfoProps) => {

    if (!details?.imp_info) return null;

    return (
        <div className="mx-auto max-w-7xl p-4">
            <div className="flex items-center gap-5 rounded-2xl border border-primary p-5 bg-primary/10 shadow-sm md:p-6">

                {/* Orange Warning Icon Circle */}
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-white">
                    <TriangleAlert className="h-6 w-6" strokeWidth={2.5} />
                </div>

                {/* Text Content */}
                <div>
                    <h3 className="mb-1 text-lg font-bold text-slate-900">
                        Important Information
                    </h3>
                    <p className="text-base font-medium text-slate-600">
                        {details.imp_info}
                    </p>
                </div>

            </div>
        </div>
    );
};

export default ImportantInfo;