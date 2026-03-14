import { FaClock } from "react-icons/fa";

const OfficeHours = () => {
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
                    <span className="font-medium text-muted-foreground">Saturday – Thursday</span>
                    <span className="font-bold text-primary">10:00 AM – 7:00 PM</span>
                </div>

                {/* Weekend/Closed Day */}
                <div className="flex items-center justify-between text-base">
                    <span className="font-medium text-muted-foreground">Friday</span>
                    <span className="font-bold text-destructive">Closed</span>
                </div>
            </div>
        </div>
    );
};

export default OfficeHours;