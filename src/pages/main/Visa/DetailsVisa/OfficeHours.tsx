import type { AssistanceInfo } from "@/types/visa/types.visa";
import { FaClock } from "react-icons/fa";

interface AssistanceInfoProps {
    assistanceInfo?: AssistanceInfo;
}

const OfficeHours = ({ assistanceInfo }: AssistanceInfoProps) => {
    
    return (
        <div className="mb-5 rounded-2xl border border-border bg-card p-6 text-card-foreground shadow-sm">
            {/* Header */}
            <div className="mb-6 flex items-center gap-3">
                <FaClock className="h-6 w-6 text-primary" />
                <h3 className="text-xl font-bold">Office Hours</h3>
            </div>

            {/* Hours List */}
            <div className="space-y-4">
                {/* Regular Days */}
                <div className="flex items-center justify-between text-base">
                    <span className="font-medium text-muted-foreground">{assistanceInfo?.office_hours}</span>
                    <span className="font-bold text-primary">{assistanceInfo?.office_hours_time}</span>
                </div>

                {/* Weekend/Closed Day */}
                <div className="flex items-center justify-between text-base">
                    <span className="font-medium text-muted-foreground">{assistanceInfo?.off_day}</span>
                    <span className="font-bold text-destructive">Closed</span>
                </div>
            </div>
        </div>
    );
};

export default OfficeHours;