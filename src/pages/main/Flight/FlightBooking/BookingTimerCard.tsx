import { Clock3 } from "lucide-react";

interface Props {
  timeText: string;
}

const BookingTimerCard = ({ timeText }: Props) => {
  return (
    <div className="rounded-sm border border-[#d8dde7] bg-white px-4 py-3 shadow-sm dark:border-white/10 dark:bg-[#101827]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-[16px] text-[#222] dark:text-white/90">
          <Clock3 className="h-4 w-4 fill-[#b88d22] text-[#b88d22]" />
          <span>Time Remaining</span>
        </div>

        <span className="text-[18px] font-bold text-[#1c346e] dark:text-[#8fb4ff]">
          {timeText}
        </span>
      </div>
    </div>
  );
};

export default BookingTimerCard;