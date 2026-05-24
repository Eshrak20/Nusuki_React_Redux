"use client";

import { createSearchParams, formatCurrency, safeText } from "@/lib/util.hotel";
import type { HotelPriceCheckResponse } from "@/types/hotel/type.room.types";

import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  BedDouble,
  CalendarDays,
  CheckCircle,
  CreditCard,
  MapPin,
  Users,
  X,
} from "lucide-react";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

type HotelPriceCheckModalProps = {
  open: boolean;
  onClose: () => void;
  loading: boolean;
  data: HotelPriceCheckResponse | null;
  error?: string | null;
  searchId: string;
};

const HotelPriceCheckModal = ({
  open,
  onClose,
  loading,
  data,
  error,
  searchId,
}: HotelPriceCheckModalProps) => {
  const navigate = useNavigate();

  const priceData = data?.data;
  const hotel = priceData?.hotel;
  const room = priceData?.rooms?.[0];
  const ratePlan = room?.rate_plans?.[0];
  const rateInfo = ratePlan?.rate_info;
  const stay = priceData?.stay;
  const cancellation = rateInfo?.cancellation_policy;

  const adults = room?.adults || stay?.rooms?.[0]?.adults || 0;
  const currency = rateInfo?.currency || "BDT";

  const handleBookNow = () => {
    if (!priceData?.booking_key || !searchId) return;

    const query = createSearchParams({
      booking_key: priceData.booking_key,
      search_id: searchId,
      guests: adults,
    });

    navigate(`/hotel/pnr?${query}`);
  };

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 px-4 py-6 backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, y: 22, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.98 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-border bg-card p-5 text-card-foreground shadow-2xl md:p-6"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close price check modal"
              className="absolute right-4 top-4 inline-flex size-9 items-center justify-center rounded-full border border-border bg-background text-muted-foreground transition hover:bg-muted hover:text-foreground"
            >
              <X className="size-4" />
            </button>

            {loading ? (
              <LoadingState />
            ) : error ? (
              <ErrorState error={error} onClose={onClose} />
            ) : priceData ? (
              <div>
                <div className="pr-10">
                  <div className="flex flex-wrap items-center gap-2">
                    {priceData.can_book ? (
                      <StatusBadge variant="success" icon={<CheckCircle />}>
                        Available
                      </StatusBadge>
                    ) : (
                      <StatusBadge variant="destructive" icon={<AlertCircle />}>
                        Not Available
                      </StatusBadge>
                    )}

                    {priceData.price_changed ? (
                      <StatusBadge variant="warning">Price changed</StatusBadge>
                    ) : (
                      <StatusBadge variant="primary">
                        Price confirmed
                      </StatusBadge>
                    )}
                  </div>

                  <h2 className="mt-4 text-xl font-extrabold tracking-tight text-foreground md:text-2xl">
                    {safeText(hotel?.name, "Hotel Price Check")}
                  </h2>

                  <div className="mt-2 flex gap-2 text-sm leading-6 text-muted-foreground">
                    <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
                    <span>
                      {safeText(
                        hotel?.address?.full_address,
                        "Address not available",
                      )}
                    </span>
                  </div>
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <InfoBox
                    icon={<BedDouble />}
                    label="Room"
                    title={safeText(
                      room?.name || ratePlan?.name,
                      "Selected Room",
                    )}
                    description={
                      room?.bed_types?.length
                        ? room.bed_types.map((bed) => bed.name).join(", ")
                        : "Bed info not available"
                    }
                  />

                  <InfoBox
                    icon={<Users />}
                    label="Guest"
                    title={`${adults} Adults`}
                    description={`Max occupancy: ${safeText(
                      room?.occupancy?.max,
                    )}`}
                  />

                  <InfoBox
                    icon={<CalendarDays />}
                    label="Stay"
                    title={`${safeText(stay?.check_in)} to ${safeText(
                      stay?.check_out,
                    )}`}
                    description="Check-in / Check-out"
                  />

                  <InfoBox
                    icon={<CreditCard />}
                    label="Total Price"
                    title={formatCurrency(rateInfo?.total_price, currency)}
                    description={`Tax & fees: ${formatCurrency(
                      rateInfo?.tax_and_fees,
                      currency,
                    )}`}
                  />
                </div>

                <div className="mt-5 rounded-2xl border border-border bg-muted/40 p-4">
                  <h4 className="text-sm font-bold text-foreground">
                    Rate Plan Details
                  </h4>

                  <div className="mt-3 space-y-2 text-sm leading-6 text-muted-foreground">
                    <DetailRow label="Plan" value={safeText(ratePlan?.name)} />

                    <DetailRow
                      label="Meal"
                      value={
                        ratePlan?.meal?.has_meal
                          ? safeText(ratePlan.meal.type, "Meal included")
                          : "No meal included"
                      }
                    />

                    <DetailRow
                      label="Refundable"
                      value={cancellation?.is_refundable ? "Yes" : "No"}
                    />

                    {cancellation?.free_cancellation_before
                      ?.AbsoluteDeadline ? (
                      <DetailRow
                        label="Free cancellation before"
                        value={safeText(
                          cancellation.free_cancellation_before
                            .AbsoluteDeadline,
                        )}
                      />
                    ) : null}
                  </div>
                </div>

                <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    onClick={onClose}
                    className="rounded-full border border-border bg-background px-5 py-3 text-sm font-bold text-foreground transition hover:bg-muted"
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    onClick={handleBookNow}
                    disabled={!priceData.can_book || !priceData.booking_key}
                    className="rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Book This Room
                  </button>
                </div>
              </div>
            ) : null}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default HotelPriceCheckModal;

const LoadingState = () => {
  return (
    <div className="flex min-h-65 flex-col items-center justify-center text-center">
      <div className="size-11 animate-spin rounded-full border-4 border-muted border-t-primary" />

      <h3 className="mt-4 text-lg font-bold text-foreground">
        Checking latest room price...
      </h3>

      <p className="mt-1 max-w-sm text-sm leading-6 text-muted-foreground">
        Please wait while we verify room availability and the latest price.
      </p>
    </div>
  );
};

const ErrorState = ({
  error,
  onClose,
}: {
  error: string;
  onClose: () => void;
}) => {
  return (
    <div className="flex min-h-60 flex-col items-center justify-center text-center">
      <div className="flex size-12 items-center justify-center rounded-2xl bg-destructive/10 text-destructive">
        <AlertCircle className="size-6" />
      </div>

      <h3 className="mt-4 text-lg font-bold text-foreground">
        Price check failed
      </h3>

      <p className="mt-1 max-w-sm text-sm leading-6 text-muted-foreground">
        {error}
      </p>

      <button
        type="button"
        onClick={onClose}
        className="mt-5 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground transition hover:bg-primary/90"
      >
        Close
      </button>
    </div>
  );
};

const InfoBox = ({
  icon,
  label,
  title,
  description,
}: {
  icon: ReactNode;
  label: string;
  title: ReactNode;
  description: ReactNode;
}) => {
  return (
    <div className="rounded-2xl border border-border bg-background p-4 transition-colors hover:bg-muted/40">
      <div className="flex items-start gap-3">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary [&_svg]:size-4">
          {icon}
        </div>

        <div className="min-w-0">
          <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
            {label}
          </p>

          <h3 className="mt-1 break-words text-sm font-bold leading-6 text-foreground">
            {title}
          </h3>

          <p className="mt-1 text-xs leading-5 text-muted-foreground">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

const StatusBadge = ({
  children,
  icon,
  variant = "primary",
}: {
  children: ReactNode;
  icon?: ReactNode;
  variant?: "primary" | "success" | "warning" | "destructive";
}) => {
  const variantClass = {
    primary: "border-primary/15 bg-primary/10 text-primary",
    success:
      "border-emerald-500/15 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    warning:
      "border-orange-500/15 bg-orange-500/10 text-orange-600 dark:text-orange-400",
    destructive: "border-destructive/15 bg-destructive/10 text-destructive",
  }[variant];

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-bold [&_svg]:size-3.5 ${variantClass}`}
    >
      {icon}
      {children}
    </span>
  );
};

const DetailRow = ({
  label,
  value,
}: {
  label: string;
  value: ReactNode;
}) => {
  return (
    <div className="flex flex-col gap-0.5 rounded-xl border border-border bg-background/60 px-3 py-2 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
      <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </span>

      <span className="text-sm font-semibold text-foreground sm:text-right">
        {value}
      </span>
    </div>
  );
};