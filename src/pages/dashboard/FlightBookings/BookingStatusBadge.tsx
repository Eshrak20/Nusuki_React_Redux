type Props = {
  bookingStatus?: string;
  paymentStatus?: string;
};

const BookingStatusBadge = ({ bookingStatus, paymentStatus }: Props) => {
  const normalizedBookingStatus = bookingStatus?.toLowerCase();
  const normalizedPaymentStatus = paymentStatus?.toLowerCase();

  const isTicketed = normalizedBookingStatus === "ticketed";
  const isCancelled = normalizedBookingStatus === "cancelled";
  const isPnrCancelled = normalizedBookingStatus === "pnr_cancelled";
  const isPaid = normalizedPaymentStatus === "paid";
  const isExpired = normalizedPaymentStatus === "expired";

  const isUnpaid =
    normalizedPaymentStatus === "unpaid" ||
    normalizedPaymentStatus === "pending";

  const baseClass =
    "inline-flex items-center rounded-full border px-3 py-1 text-xs font-bold shadow-sm backdrop-blur-md";

  if (isCancelled || isPnrCancelled) {
    return (
      <div
        className={`${baseClass} border-red-500/25 bg-linear-to-r from-red-500/15 via-red-500/10 to-primary/10 text-red-700 shadow-red-500/10 dark:text-red-300`}
      >
        Cancelled
      </div>
    );
  }

  if (isTicketed) {
    return (
      <div
        className={`${baseClass} border-emerald-500/25 bg-linear-to-r from-emerald-500/15 via-primary/10 to-emerald-500/10 text-emerald-700 shadow-emerald-500/10 dark:text-emerald-300`}
      >
        Ticketed
      </div>
    );
  }

  if (isPaid) {
    return (
      <div
        className={`${baseClass} border-primary/25 bg-linear-to-r from-primary/15 via-primary/10 to-emerald-500/10 text-primary shadow-primary/10 dark:text-blue-200`}
      >
        Paid
      </div>
    );
  }

  if (isUnpaid) {
    return (
      <div
        className={`${baseClass} border-amber-500/30 bg-linear-to-r from-amber-400/30 to-amber-400/30 text-amber-700 shadow-amber-500/10 dark:text-amber-300`}
      >
        Payment Pending
      </div>
    );
  }

  if (isExpired) {
    return (
      <div
        className={`${baseClass} border-primary/25 bg-linear-to-r from-primary/15 via-slate-500/10 to-primary/5 text-primary shadow-primary/10 dark:text-blue-200`}
      >
        Expired
      </div>
    );
  }

  return (
    <div
      className={`${baseClass} border-primary/20 bg-linear-to-r from-primary/10 via-primary/5 to-primary/10 text-primary shadow-primary/10 dark:text-blue-200`}
    >
      {bookingStatus || paymentStatus || "Unknown"}
    </div>
  );
};

export default BookingStatusBadge;
