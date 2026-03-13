import { FaClock } from "react-icons/fa";

const OfficeHours = () => {
    return (
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            {/* Header */}
            <div className="mb-6 flex items-center gap-3">
            
                    <FaClock className="h-6 w-6 fill-current text-primary" />
         
                <h3 className="text-xl font-bold text-primary">Office Hours</h3>
            </div>

            {/* Hours List */}
            <div className="space-y-4">
                {/* Regular Days */}
                <div className="flex items-center justify-between text-base">
                    <span className="text-slate-500 font-medium">Saturday – Thursday</span>
                    <span className="font-bold text-primary">10:00 AM – 7:00 PM</span>
                </div>

                {/* Weekend/Closed Day */}
                <div className="flex items-center justify-between text-base">
                    <span className="text-slate-500 font-medium">Friday</span>
                    <span className="font-bold text-destructive">Closed</span>
                </div>
            </div>
        </div>
    );
};

export default OfficeHours;