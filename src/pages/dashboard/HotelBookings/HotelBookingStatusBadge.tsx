import { formatStatus } from "@/lib/util.hotel";
import type {
  HotelBookingStatus,
  HotelPaymentStatus,
} from "@/types/hotel/hotelBookingList.types";

type HotelBookingStatusBadgeProps = {
  status?: HotelBookingStatus | HotelPaymentStatus | null;
  type?: "booking" | "payment";
};

const HotelBookingStatusBadge = ({
  status,
  type = "booking",
}: HotelBookingStatusBadgeProps) => {
  const normalizedStatus = status?.toLowerCase();

  const getClassName = () => {
    if (
      normalizedStatus === "confirmed" ||
      normalizedStatus === "paid" ||
      normalizedStatus === "guaranteed" ||
      normalizedStatus === "pnr_created"
    ) {
      return "border-primary/20 bg-primary/10 text-primary";
    }

    if (
      normalizedStatus === "pending" ||
      normalizedStatus === "unpaid"
    ) {
      return "border-yellow-500/20 bg-yellow-500/10 text-yellow-600 dark:text-yellow-400";
    }

    if (
      normalizedStatus === "cancelled" ||
      normalizedStatus === "failed"
    ) {
      return "border-destructive/20 bg-destructive/10 text-destructive";
    }

    return "border-muted-foreground/20 bg-muted text-muted-foreground";
  };

  return (
    <span
      className={`inline-flex w-fit items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${getClassName()}`}
    >
      {type === "payment" ? "Payment: " : ""}
      {formatStatus(status)}
    </span>
  );
};

export default HotelBookingStatusBadge;