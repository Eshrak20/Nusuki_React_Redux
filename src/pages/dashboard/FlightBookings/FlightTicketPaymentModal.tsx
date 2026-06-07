import { useEffect, useState } from "react";
import {
  AlertCircle,
  Check,
  Copy,
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
  const [copied, setCopied] = useState(false);

  const [initiatePayment, { isLoading }] =
    useInitiateFlightBookingPaymentMutation();

  const bookingCode = booking.booking_code;

  const isTicketed = booking.booking_status === "ticketed";
  const isCancelled = booking.booking_status === "cancelled";

  const canPay = Boolean(bookingCode) && !isTicketed && !isCancelled;

  const displayBookingCode = paymentInfo?.booking_code || bookingCode;

  const handleCopyBookingCode = async () => {
    if (!displayBookingCode) return;

    try {
      await navigator.clipboard.writeText(displayBookingCode);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1500);
    } catch (error) {
      console.error("Copy failed:", error);
    }
  };

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
      setCopied(false);
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
        <div className="overflow-hidden rounded-sm bg-background shadow-2xl">
          <DialogHeader className="relative overflow-hidden bg-primary px-5 py-6 text-primary-foreground">
            <div className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-primary-foreground/10 blur-2xl" />
            <div className="pointer-events-none absolute -bottom-12 left-10 h-32 w-32 rounded-full bg-primary-foreground/10 blur-2xl" />

            <div className="relative flex items-start gap-3">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary-foreground/15 ring-1 ring-primary-foreground/20">
                <ShieldCheck className="h-6 w-6" />
              </span>

              <div>
                <DialogTitle className="text-xl font-extrabold">
                  Secure Payment
                </DialogTitle>

                <p className="mt-1 text-sm text-primary-foreground/80">
                  Complete your payment safely through SSLCommerz.
                </p>
              </div>
            </div>
          </DialogHeader>

          <div className="space-y-5 p-5">
            <PaymentBookingSummary booking={booking} />

            <div className="rounded-sm border bg-card p-4 shadow-sm">
              <div className="mb-2 flex items-center justify-between gap-3">
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Booking Code
                </p>

                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleCopyBookingCode}
                  disabled={!displayBookingCode}
                  className="h-8 rounded-sm px-2 text-xs font-bold"
                >
                  {copied ? (
                    <>
                      <Check className="mr-1 h-3.5 w-3.5 text-primary" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="mr-1 h-3.5 w-3.5" />
                      Copy
                    </>
                  )}
                </Button>
              </div>

              <p className="break-all rounded-sm bg-muted/40 px-3 py-2 text-sm font-extrabold text-foreground">
                {displayBookingCode || "N/A"}
              </p>
            </div>

            {isLoading ? (
              <div className="rounded-sm border bg-muted/20 p-6 text-center shadow-sm">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                  <Loader2 className="h-7 w-7 animate-spin text-primary" />
                </div>

                <h3 className="mt-4 text-lg font-extrabold">
                  Creating secure payment link...
                </h3>

                <p className="mt-2 text-sm text-muted-foreground">
                  Please wait while we connect your booking with SSLCommerz.
                </p>
              </div>
            ) : null}

            {!isLoading && errorMessage ? (
              <div className="rounded-sm border border-destructive/30 bg-destructive/5 p-4 shadow-sm">
                <div className="flex gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-destructive/10">
                    <AlertCircle className="h-5 w-5 text-destructive" />
                  </span>

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
                  className="mt-4 h-11 w-full rounded-sm font-bold"
                >
                  <RefreshCcw className="mr-2 h-4 w-4" />
                  Try Again
                </Button>
              </div>
            ) : null}

            {!isLoading && paymentInfo ? (
              <div className="space-y-4">
                <div className="rounded-sm border border-primary/20 bg-primary/5 p-4">
                  <div className="flex items-center gap-2 text-sm font-bold text-primary">
                    <Check className="h-4 w-4" />
                    Payment link is ready
                  </div>

                  <p className="mt-2 text-xs leading-5 text-muted-foreground">
                    Sensitive payment information is hidden for your security.
                    Click the button below to continue to SSLCommerz.
                  </p>
                </div>

                <Button
                  type="button"
                  onClick={handleGoToPayment}
                  className="h-12 w-full rounded-sm font-extrabold shadow-sm"
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
                className="h-11 w-full rounded-sm font-bold"
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