import type { HotelStay } from "@/types/hotel/hotelDetail.types";
import type { HotelPriceCheckResponse } from "@/types/hotel/type.room.types";
import { AlertCircle, CheckCircle, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

type HotelPriceCheckModalProps = {
  open: boolean;
  onClose: () => void;
  loading: boolean;
  data: HotelPriceCheckResponse | null;
  error?: string | null;
  searchId: string;
  hotelStay?: HotelStay
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

  if (!open) return null;

  const priceData = data?.data;
  const hotel = priceData?.hotel;
  const room = priceData?.rooms?.[0];
  const ratePlan = room?.rate_plans?.[0];
  const rateInfo = ratePlan?.rate_info;
  const stay = priceData?.stay;
  const cancellation = rateInfo?.cancellation_policy;

  const handleBookNow = () => {
    if (!priceData?.booking_key || !searchId) return;

    navigate(
      `/hotel/pnr?booking_key=${encodeURIComponent(
        priceData.booking_key
      )}&search_id=${encodeURIComponent(searchId)}&adults=${room?.adults}&children=${stay?.rooms?.[0]?.children}`
    );
  };

  return (
    <div className="fixed inset-0 z-999 flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm">
      <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border bg-card p-5 text-card-foreground shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full border bg-background p-2 text-muted-foreground transition hover:bg-muted"
        >
          <X size={18} />
        </button>

        {loading && (
          <div className="flex min-h-65 flex-col items-center justify-center text-center">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-muted border-t-primary" />

            <h3 className="mt-4 text-lg font-bold">
              Checking latest room price...
            </h3>

            <p className="mt-1 text-sm text-muted-foreground">
              Please wait while we verify availability and price.
            </p>
          </div>
        )}

        {!loading && error && (
          <div className="flex min-h-60 flex-col items-center justify-center text-center">
            <AlertCircle className="text-destructive" size={42} />

            <h3 className="mt-4 text-lg font-bold">Price check failed</h3>

            <p className="mt-1 text-sm text-muted-foreground">{error}</p>

            <button
              type="button"
              onClick={onClose}
              className="mt-5 rounded-full bg-primary px-5 py-2 text-sm font-bold text-primary-foreground transition hover:bg-primary/90"
            >
              Close
            </button>
          </div>
        )}

        {!loading && !error && priceData && (
          <div>
            <div className="pr-10">
              <div className="flex flex-wrap items-center gap-2">
                {priceData.can_book ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    <CheckCircle size={14} />
                    Available
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 rounded-full bg-destructive/10 px-3 py-1 text-xs font-bold text-destructive">
                    <AlertCircle size={14} />
                    Not Available
                  </span>
                )}

                {priceData.price_changed ? (
                  <span className="rounded-full bg-orange-500/10 px-3 py-1 text-xs font-bold text-orange-600 dark:text-orange-400">
                    Price changed
                  </span>
                ) : (
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                    Price confirmed
                  </span>
                )}
              </div>

              <h2 className="mt-4 text-xl font-extrabold">
                {hotel?.name || "Hotel Price Check"}
              </h2>

              <p className="mt-1 text-sm text-muted-foreground">
                {hotel?.address?.full_address || "Address not available"}
              </p>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <InfoBox
                label="Room"
                title={room?.name || ratePlan?.name || "Selected Room"}
                description={
                  room?.bed_types?.length
                    ? room.bed_types.map((bed) => bed.name).join(", ")
                    : "Bed info not available"
                }
              />


              <InfoBox
                label="Guest"
                title={`${room?.adults || stay?.rooms?.[0]?.adults || 0} Adults, ${stay?.rooms?.[0]?.children || 0} Children`}
                description={`Max occupancy: ${room?.occupancy?.max || "N/A"}`}
              />

              <InfoBox
                label="Stay"
                title={`${stay?.check_in || "N/A"} to ${stay?.check_out || "N/A"
                  }`}
                description="Check-in / Check-out"
              />

              <InfoBox
                label="Total Price"
                title={`${rateInfo?.currency || "BDT"} ${formatMoney(
                  rateInfo?.total_price
                )}`}
                description={`Tax & fees: ${rateInfo?.currency || "BDT"} ${formatMoney(
                  rateInfo?.tax_and_fees
                )}`}
              />
            </div>

            <div className="mt-5 rounded-sm border bg-muted/40 p-4">
              <h4 className="text-sm font-bold">Rate Plan Details</h4>

              <div className="mt-3 space-y-2 text-sm text-muted-foreground">
                <p>
                  <span className="font-semibold text-foreground">Plan:</span>{" "}
                  {ratePlan?.name || "N/A"}
                </p>

                <p>
                  <span className="font-semibold text-foreground">Meal:</span>{" "}
                  {ratePlan?.meal?.has_meal
                    ? ratePlan.meal.type
                    : "No meal included"}
                </p>

                <p>
                  <span className="font-semibold text-foreground">
                    Refundable:
                  </span>{" "}
                  {cancellation?.is_refundable ? "Yes" : "No"}
                </p>

                {cancellation?.free_cancellation_before?.AbsoluteDeadline && (
                  <p>
                    <span className="font-semibold text-foreground">
                      Free cancellation before:
                    </span>{" "}
                    {cancellation.free_cancellation_before.AbsoluteDeadline}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={onClose}
                className="rounded-full border bg-background px-5 py-3 text-sm font-bold text-foreground transition hover:bg-muted"
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
        )}
      </div>
    </div>
  );
};

export default HotelPriceCheckModal;

const InfoBox = ({
  label,
  title,
  description,
}: {
  label: string;
  title: string;
  description: string;
}) => {
  return (
    <div className="rounded-sm border bg-background p-4">
      <p className="text-xs font-bold uppercase text-muted-foreground">
        {label}
      </p>
      <h3 className="mt-1 text-sm font-bold">{title}</h3>
      <p className="mt-1 text-xs text-muted-foreground">{description}</p>
    </div>
  );
};

const formatMoney = (value?: number) => {
  if (!value) return "N/A";
  return new Intl.NumberFormat("en-BD").format(value);
};