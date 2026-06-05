import { AlertTriangle } from "lucide-react";

type HotelBookingDetailsErrorProps = {
  onRetry: () => void;
};

const HotelBookingDetailsError = ({ onRetry }: HotelBookingDetailsErrorProps) => {
  return (
    <div className="flex min-h-[420px] flex-col items-center justify-center rounded-sm border border-destructive/20 bg-destructive/10 p-6 text-center text-destructive">
      <div className="flex size-14 items-center justify-center rounded-full bg-destructive/10">
        <AlertTriangle size={28} />
      </div>

      <h3 className="mt-4 text-lg font-semibold">
        Failed to load booking details
      </h3>

      <p className="mt-2 max-w-md text-sm">
        Something went wrong while fetching this hotel booking details. Please
        try again.
      </p>

      <button
        type="button"
        onClick={onRetry}
        className="mt-5 h-10 rounded-xl bg-destructive px-5 text-sm font-semibold text-destructive-foreground transition hover:opacity-90"
      >
        Try again
      </button>
    </div>
  );
};

export default HotelBookingDetailsError;