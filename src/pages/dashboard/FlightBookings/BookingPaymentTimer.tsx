import { useEffect, useRef, useState } from "react";
import { AlertTriangle, Clock3 } from "lucide-react";

type Props = {
  ttlAt?: string | null;
  paymentStatus: string;
  bookingStatus: string;
  onExpired?: () => void;
};

const PAYMENT_TTL_MS = 20 * 60 * 1000;

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

  if (!shouldShowTimer) return null;

  const isExpired = remainingTime <= 0;

  const progressPercentage = Math.max(
    0,
    Math.min(100, (remainingTime / PAYMENT_TTL_MS) * 100),
  );

  return (
    <div
      className={`rounded-2xl border p-4 ${
        isExpired
          ? "border-primary/10 bg-primary/10"
          : "border-primary bg-primary/10"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex gap-3">
          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
              isExpired
                ? "bg-primary/10 text-primary dark:text-primary/80"
                : "bg-primary/10 text-primary dark:text-primary/80"
            }`}
          >
            {isExpired ? (
              <AlertTriangle className="h-5 w-5" />
            ) : (
              <Clock3 className="h-5 w-5" />
            )}
          </div>

          <div>
            <p
              className={`text-xs font-black uppercase tracking-wider ${
                isExpired
                  ? "text-primary dark:text-primary/80"
                  : "text-primary dark:text-primary/80"
              }`}
            >
              {isExpired ? "Payment Time Expired" : "Payment Time Left"}
            </p>

            <p className="mt-1 text-sm font-medium text-muted-foreground">
              {isExpired
                ? "This booking may be auto-cancelled soon."
                : "Complete payment before the timer ends."}
            </p>
          </div>
        </div>

        <div
          className={`rounded-xl px-3 py-2 text-lg font-black tabular-nums ${
            isExpired
              ? "bg-primary/10 text-primary dark:text-primary/80"
              : "bg-background text-foreground shadow-sm"
          }`}
        >
          {formatRemainingTime(remainingTime)}
        </div>
      </div>

      <div className="mt-4 h-2 overflow-hidden rounded-full bg-background/80">
        <div
          className={`h-full rounded-full transition-all duration-500 ${
            isExpired ? "bg-primary" : "bg-primary"
          }`}
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
    </div>
  );
};

export default BookingPaymentTimer;