import { useEffect, useRef, useState } from "react";

type Props = {
  ttlAt?: string | null;
  paymentStatus: string;
  bookingStatus: string;
  onExpired?: () => void;
};

const getRemainingTime = (ttlAt?: string | null) => {
  if (!ttlAt) return 0;

  const ttlTime = new Date(ttlAt).getTime();

  if (Number.isNaN(ttlTime)) return 0;

  return Math.max(ttlTime - Date.now(), 0);
};

const formatRemainingTime = (milliseconds: number) => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
    2,
    "0",
  )}`;
};

const BookingPaymentTimer = ({
  ttlAt,
  paymentStatus,
  bookingStatus,
  onExpired,
}: Props) => {
  const [remainingTime, setRemainingTime] = useState(() =>
    getRemainingTime(ttlAt),
  );

  const expiredCallbackCalled = useRef(false);
  const previousRemainingTime = useRef(getRemainingTime(ttlAt));

  const isPendingPayment =
    paymentStatus === "unpaid" || paymentStatus === "pending";

  const shouldShowTimer =
    Boolean(ttlAt) &&
    isPendingPayment &&
    bookingStatus !== "ticketed" &&
    bookingStatus !== "cancelled";

  useEffect(() => {
    if (!shouldShowTimer) return;

    expiredCallbackCalled.current = false;
    previousRemainingTime.current = getRemainingTime(ttlAt);

    const intervalId = window.setInterval(() => {
      const nextRemainingTime = getRemainingTime(ttlAt);

      setRemainingTime(nextRemainingTime);

      const wasRunningBefore = previousRemainingTime.current > 0;
      const isNowExpired = nextRemainingTime <= 0;

      if (
        wasRunningBefore &&
        isNowExpired &&
        !expiredCallbackCalled.current
      ) {
        expiredCallbackCalled.current = true;
        onExpired?.();
      }

      previousRemainingTime.current = nextRemainingTime;
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, [ttlAt, shouldShowTimer, onExpired]);

  if (!shouldShowTimer || remainingTime <= 0) return null;

  return (
    <span className="inline-flex rounded-md bg-background px-2.5 py-1 font-black tabular-nums text-foreground shadow-sm">
      {formatRemainingTime(remainingTime)}
    </span>
  );
};

export default BookingPaymentTimer;