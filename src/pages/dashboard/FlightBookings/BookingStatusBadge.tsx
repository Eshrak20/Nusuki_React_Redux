type Props = {
  bookingStatus: string;
  paymentStatus: string;
};

const BookingStatusBadge = ({ bookingStatus, paymentStatus }: Props) => {
  const normalizedBookingStatus = bookingStatus?.toLowerCase();
  const normalizedPaymentStatus = paymentStatus?.toLowerCase();

  const isTicketed = normalizedBookingStatus === "ticketed";
  const isCancelled = normalizedBookingStatus === "cancelled";
  const isPaid = normalizedPaymentStatus === "paid";
  const isUnpaid =
    normalizedPaymentStatus === "unpaid" ||
    normalizedPaymentStatus === "pending";

  if (isCancelled) {
    return (
      <div className="rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1 text-xs font-bold text-red-600 dark:text-red-400">
        Cancelled
      </div>
    );
  }

  if (isTicketed || isPaid) {
    return (
      <div className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
        Paid / Ticketed
      </div>
    );
  }

  if (isUnpaid) {
    return (
      <div className="rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-600 dark:text-amber-400">
        Payment Pending
      </div>
    );
  }

  return (
    <div className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
      {bookingStatus} / {paymentStatus}
    </div>
  );
};

export default BookingStatusBadge;