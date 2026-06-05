import type { HotelPNRSuccessModalProps } from "@/types/hotel/hoteBookingSucess.types";
import { CheckCircle2, Hotel, MapPin, ReceiptText, X } from "lucide-react";
import { useNavigate } from "react-router-dom";


const HotelPNRSuccessModal = ({
  open,
  data,
  onClose,
}: HotelPNRSuccessModalProps) => {
  const navigate = useNavigate();

  if (!open) return null;

  const booking = data?.data?.booking;
  const hotel = booking?.hotel;

  const handleGoToDashboard = () => {
    navigate("/dashboard/hotel-bookings");
  };

  const overviewItems = [
    {
      label: "Booking Code",
      value: booking?.booking_code || "N/A",
    },
    {
      label: "PNR",
      value: booking?.pnr || "N/A",
    },
    {
      label: "Confirmation Number",
      value: booking?.supplier_confirmation_number || "N/A",
    },
    {
      label: "Booking Status",
      value: booking?.status || "N/A",
    },
    {
      label: "Payment Status",
      value: booking?.payment_status || "N/A",
    },
    {
      label: "Payment Type",
      value: booking?.payment_type || "N/A",
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm">
      <div className="relative w-full max-w-xl rounded-sm border bg-background p-5 text-foreground shadow-xl sm:p-6">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 text-muted-foreground transition hover:bg-muted hover:text-foreground"
        >
          <X size={18} />
        </button>

        <div className="flex items-start gap-3 pr-10">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
            <CheckCircle2 size={24} />
          </div>

          <div>
            <h2 className="text-xl font-semibold text-primary">
              Hotel Booking Created Successfully
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Your hotel PNR booking has been created successfully. You can see
              the full details from the dashboard.
            </p>
          </div>
        </div>

        <div className="mt-5 rounded-sm border bg-muted/30 p-4">
          <div className="flex items-start gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-sm bg-background text-primary">
              <Hotel size={20} />
            </div>

            <div className="min-w-0">
              <h3 className="truncate text-base font-semibold">
                {hotel?.name || "Hotel Name Not Available"}
              </h3>

              <div className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin size={14} />
                <span className="truncate">
                  {[hotel?.city, hotel?.country].filter(Boolean).join(", ") ||
                    hotel?.address ||
                    "Location not available"}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 rounded-sm border bg-card p-4">
          <div className="mb-3 flex items-center gap-2">
            <ReceiptText size={18} className="text-primary" />
            <h3 className="text-sm font-semibold">Booking Overview</h3>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {overviewItems.map((item) => (
              <div
                key={item.label}
                className="rounded-sm border bg-background px-3 py-2"
              >
                <p className="text-xs text-muted-foreground">{item.label}</p>
                <p className="mt-1 wrap-break-word text-sm font-semibold">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={handleGoToDashboard}
            className="h-11 rounded-sm bg-primary px-5 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
          >
            Go to dashboard for booking lists
          </button>

          <button
            type="button"
            onClick={onClose}
            className="h-11 rounded-sm border bg-background px-5 text-sm font-semibold text-foreground transition hover:bg-muted"
          >
            Close the modal
          </button>
        </div>
      </div>
    </div>
  );
};

export default HotelPNRSuccessModal;