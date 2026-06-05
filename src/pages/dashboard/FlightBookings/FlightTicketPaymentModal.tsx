import { useEffect, useState } from "react";
import {
  AlertCircle,
  BadgeCheck,
  CreditCard,
  ExternalLink,
  Loader2,
  RefreshCcw,
  ShieldCheck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import type {
  FlightBooking,
  InitiateFlightPaymentData,
} from "@/types/flight/flightTicketPayment.types";
import { useInitiateFlightBookingPaymentMutation } from "@/redux/api/fligtBookingApi/flightBookingApi";
import PaymentBookingSummary from "./modals/PaymentBookingSummary";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  booking: FlightBooking;
};

const FlightTicketPaymentModal = ({
  open,
  onOpenChange,
  booking,
}: Props) => {
  const [paymentInfo, setPaymentInfo] =
    useState<InitiateFlightPaymentData | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const [initiatePayment, { isLoading }] =
    useInitiateFlightBookingPaymentMutation();

  const bookingCode = booking.booking_code;

  const isTicketed = booking.booking_status === "ticketed";
  const isCancelled = booking.booking_status === "cancelled";

  const canPay = Boolean(bookingCode) && !isTicketed && !isCancelled;

  const handleInitiatePayment = async () => {
    if (!bookingCode) {
      setErrorMessage("Booking code not found.");
      return;
    }

    try {
      setErrorMessage("");

      const response = await initiatePayment({
        bookingCode,
      }).unwrap();

      if (!response.success) {
        setErrorMessage(response.message || "Payment initiate failed.");
        return;
      }

      setPaymentInfo(response.data);
    } catch (error: unknown) {
      console.error("Initiate Payment Error:", error);

      const apiError = error as {
        data?: {
          message?: string;
          data?: {
            friendly_reason?: string;
          };
        };
      };

      const message =
        apiError?.data?.data?.friendly_reason ||
        apiError?.data?.message ||
        "Payment initiate failed. Please try again.";

      setErrorMessage(message);
    }
  };

  const handleGoToPayment = () => {
    if (!paymentInfo?.payment_url) return;

    window.location.href = paymentInfo.payment_url;
  };

  const handleModalChange = (nextOpen: boolean) => {
    onOpenChange(nextOpen);

    if (!nextOpen) {
      setPaymentInfo(null);
      setErrorMessage("");
    }
  };

  useEffect(() => {
    if (!open || !canPay || paymentInfo || isLoading) return;

    handleInitiatePayment();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, canPay, bookingCode]);

  return (
    <Dialog open={open} onOpenChange={handleModalChange}>
      <DialogContent className="max-h-[92vh] overflow-y-auto border-none p-0 sm:max-w-2xl">
        <div className="overflow-hidden rounded-sm bg-background">
          <DialogHeader className="border-b bg-muted/40 px-5 py-4">
            <DialogTitle className="flex items-center gap-2 text-xl font-bold">
              <ShieldCheck className="h-5 w-5 text-primary" />
              SSLCommerz Payment
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-5 p-5">
            <PaymentBookingSummary booking={booking} />

            {isLoading ? (
              <div className="rounded-sm border bg-muted/20 p-6 text-center">
                <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />

                <h3 className="mt-4 text-lg font-extrabold">
                  Creating secure payment link...
                </h3>

                <p className="mt-2 text-sm text-muted-foreground">
                  Please wait while we connect your booking with SSLCommerz.
                </p>
              </div>
            ) : null}

            {!isLoading && errorMessage ? (
              <div className="rounded-sm border border-destructive/30 bg-destructive/5 p-4">
                <div className="flex gap-3">
                  <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />

                  <div>
                    <h3 className="font-bold text-destructive">
                      Payment initiate failed
                    </h3>

                    <p className="mt-1 text-sm text-muted-foreground">
                      {errorMessage}
                    </p>
                  </div>
                </div>

                <Button
                  type="button"
                  onClick={handleInitiatePayment}
                  disabled={!canPay || isLoading}
                  variant="outline"
                  className="mt-4 h-11 w-full rounded-xl font-bold"
                >
                  <RefreshCcw className="mr-2 h-4 w-4" />
                  Try Again
                </Button>
              </div>
            ) : null}

            {!isLoading && paymentInfo ? (
              <div className="space-y-4">
                <div className="rounded-sm border bg-card p-4 shadow-sm">
                  <div className="mb-4 flex items-center gap-2 text-sm font-bold text-primary">
                    <BadgeCheck className="h-4 w-4" />
                    Payment Link Ready
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-xl border bg-muted/20 p-3">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                        Booking Code
                      </p>
                      <p className="mt-1 break-all text-sm font-extrabold">
                        {paymentInfo.booking_code}
                      </p>
                    </div>

                    <div className="rounded-xl border bg-muted/20 p-3">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                        Amount
                      </p>
                      <p className="mt-1 text-sm font-extrabold">
                        {paymentInfo.currency}{" "}
                        {Number(paymentInfo.amount).toLocaleString()}
                      </p>
                    </div>

                    <div className="rounded-xl border bg-muted/20 p-3 sm:col-span-2">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                        Transaction ID
                      </p>
                      <p className="mt-1 break-all text-sm font-extrabold">
                        {paymentInfo.tran_id}
                      </p>
                    </div>
                  </div>
                </div>

                <Button
                  type="button"
                  onClick={handleGoToPayment}
                  className="h-12 w-full rounded-xl font-extrabold shadow-sm"
                >
                  <CreditCard className="mr-2 h-4 w-4" />
                  Pay with SSLCommerz
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>

                <p className="text-center text-xs text-muted-foreground">
                  After successful payment, SSLCommerz will redirect you back to
                  the website.
                </p>
              </div>
            ) : null}

            {!isLoading && !paymentInfo && !errorMessage ? (
              <Button
                type="button"
                onClick={handleInitiatePayment}
                disabled={!canPay}
                className="h-11 w-full rounded-xl font-bold"
              >
                <CreditCard className="mr-2 h-4 w-4" />
                Generate SSLCommerz Payment Link
              </Button>
            ) : null}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FlightTicketPaymentModal;