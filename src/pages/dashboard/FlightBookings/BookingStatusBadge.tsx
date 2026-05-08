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
      <div className="rounded-full border border-primary/20 bg-primary/20 px-3 py-1 text-xs font-bold text-primary">
        Cancelled
      </div>
    );
  }

  if (isTicketed || isPaid) {
    return (
      <div className="rounded-full border-primary/20 bg-primary/20 px-3 py-1 text-xs font-bold texttext-primary">
        Paid / Ticketed
      </div>
    );
  }

  if (isUnpaid) {
    return (
      <div className="rounded-full border-primary/20 bg-primary/20 px-3 py-1 text-xs font-bold text-primary">
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