import { useState } from "react";
import {
  CheckCircle2,
  Copy,
  Home,
  ListChecks,
  Sparkles,
  XCircle,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const PaymentStatus = () => {
  const location = useLocation();
  const [copied, setCopied] = useState(false);

  const searchParams = new URLSearchParams(location.search);
  const bookingId = searchParams.get("booking");

  const isSuccess = location.pathname === "/payment/success";

  const statusData = isSuccess
    ? {
        title: "Payment Successful",
        description:
          "Your payment has been completed successfully. Please keep your booking ID for future reference.",
        icon: CheckCircle2,
        iconClass: "text-primary",
        iconBg: "bg-primary/10",
        glowClass: "bg-primary/20",
      }
    : {
        title: "Payment Failed",
        description:
          "Your payment could not be completed. You can check your booking list or try again later.",
        icon: XCircle,
        iconClass: "text-destructive",
        iconBg: "bg-destructive/10",
        glowClass: "bg-destructive/20",
      };

  const StatusIcon = statusData.icon;

  const handleCopyBookingId = async () => {
    if (!bookingId) return;

    try {
      await navigator.clipboard.writeText(bookingId);
      setCopied(true);
      toast.success("Booking ID copied");

      setTimeout(() => {
        setCopied(false);
      }, 1500);
    } catch {
      toast.error("Failed to copy booking ID");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Dialog open>
        <DialogContent
          className="
            w-[calc(100%-2rem)] max-w-md overflow-hidden rounded-3xl border
            bg-card p-0 text-card-foreground shadow-2xl
            [&>button]:hidden
          "
        >
          <div className="relative">
            <div
              className={`absolute left-1/2 top-0 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl ${statusData.glowClass}`}
            />

            <div className="relative px-6 pb-6 pt-8">
              <DialogHeader className="items-center text-center">
                <div
                  className={`mb-5 flex h-24 w-24 items-center justify-center rounded-full ${statusData.iconBg} shadow-inner`}
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-background shadow-sm">
                    <StatusIcon className={`h-10 w-10 ${statusData.iconClass}`} />
                  </div>
                </div>

                <div className="mb-2 inline-flex items-center gap-2 rounded-full border bg-muted/50 px-3 py-1 text-xs font-medium text-muted-foreground">
                  <Sparkles className="h-3.5 w-3.5 text-primary" />
                  Payment Status
                </div>

                <DialogTitle className="text-2xl font-bold tracking-tight">
                  {statusData.title}
                </DialogTitle>

                <DialogDescription className="max-w-sm text-sm leading-6 text-muted-foreground">
                  {statusData.description}
                </DialogDescription>
              </DialogHeader>

              {bookingId && (
                <div className="mt-6 rounded-2xl border bg-muted/40 p-4 dark:bg-muted/20">
                  <p className="mb-2 text-center text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Booking ID
                  </p>

                  <div className="flex items-center gap-2 rounded-xl border bg-background p-2 shadow-sm">
                    <div className="flex-1 rounded-lg bg-muted/50 px-3 py-2 text-center">
                      <p className="break-all text-sm font-semibold tracking-wide text-foreground">
                        {bookingId}
                      </p>
                    </div>

                    <Button
                      type="button"
                      size="icon"
                      variant="outline"
                      onClick={handleCopyBookingId}
                      className="h-10 w-10 shrink-0 rounded-lg"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>

                  {copied && (
                    <p className="mt-3 text-center text-xs font-medium text-primary">
                      Copied successfully
                    </p>
                  )}
                </div>
              )}

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <Button asChild className="h-11 w-full rounded-xl">
                  <Link to="/dashboard/flight-bookings">
                    <ListChecks className="mr-2 h-4 w-4" />
                    Booking Lists
                  </Link>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  className="h-11 w-full rounded-xl"
                >
                  <Link to="/">
                    <Home className="mr-2 h-4 w-4" />
                    Go Home
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PaymentStatus;