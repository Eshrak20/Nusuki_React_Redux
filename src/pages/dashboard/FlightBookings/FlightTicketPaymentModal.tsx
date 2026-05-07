import { useState } from "react";
import { BadgeCheck, Banknote, CreditCard, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

import type { FlightBooking } from "@/types/flight/flightTicketPayment.types";
import { useIssueAirTicketMutation } from "@/redux/api/fligtBookingApi/flightBookingApi";
import PaymentBookingSummary from "./modals/PaymentBookingSummary";
import PaymentCodeForm from "./modals/PaymentCodeForm";
import PaymentCardForm from "./modals/PaymentCardForm";


type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  booking: FlightBooking;
};

type PaymentTab = "code" | "card";

const FlightTicketPaymentModal = ({
  open,
  onOpenChange,
  booking,
}: Props) => {
  const [paymentType, setPaymentType] = useState<PaymentTab>("code");

  const [couponCode, setCouponCode] = useState("");
  const [cardTypeCode, setCardTypeCode] = useState("VI");
  const [cardNumber, setCardNumber] = useState("4111111111111111");
  const [cardSecurityCode, setCardSecurityCode] = useState("123");
  const [expiryDate, setExpiryDate] = useState("2030-12");

  const passenger = booking.passengers?.[0];

  const [issueAirTicket, { isLoading: isIssuing }] =
    useIssueAirTicketMutation();

  const contactEmail = passenger?.email || "eshrakg62@gmail.com";
  const contactPhone = passenger?.phone || "01712131223";

  const isTicketed = booking.booking_status === "ticketed";
  const isCancelled = booking.booking_status === "cancelled";
  const canPay = Boolean(booking.pnr) && !isTicketed && !isCancelled;

  const handleIssueTicket = async () => {
    if (!booking.pnr) {
      alert("PNR not found.");
      return;
    }

    try {
      const payload =
        paymentType === "code"
          ? {
              pnr: booking.pnr,
              payment: {
                method: "CA" as const,
              },
              ticket_country_code: "BD",
              hardcopy_lniata: "EE4B55",
              send_email: true,
              contact: {
                email: contactEmail,
                phone: contactPhone,
              },
            }
          : {
              pnr: booking.pnr,
              payment: {
                method: "CC" as const,
                card: {
                  card_type_code: cardTypeCode,
                  card_number: cardNumber.replace(/\s/g, ""),
                  card_security_code: cardSecurityCode,
                  expiry_date: expiryDate,
                },
              },
              ticket_country_code: "BD",
              hardcopy_lniata: "EE4B55",
              send_email: true,
              contact: {
                email: contactEmail,
                phone: contactPhone,
              },
            };

      console.log("Issue Ticket Payload:", JSON.stringify(payload, null, 2));

      const response = await issueAirTicket(payload).unwrap();

      if (!response.success) {
        alert(response.message || "Ticket issue failed.");
        return;
      }

      alert(response.message || "Air ticket issued successfully.");
      onOpenChange(false);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Issue Ticket Error:", error);

      const message =
        error?.data?.data?.friendly_reason ||
        error?.data?.message ||
        "Ticket issue failed. Please try again.";

      alert(message);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] overflow-y-auto border-none p-0 sm:max-w-2xl">
        <div className="rounded-2xl bg-background">
          <DialogHeader className="border-b bg-muted/40 px-5 py-4">
            <DialogTitle className="flex items-center gap-2 text-xl font-bold">
              Complete Payment & Issue Ticket
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-5 p-5">
            <PaymentBookingSummary booking={booking} />

            <Tabs
              value={paymentType}
              onValueChange={(value) => setPaymentType(value as PaymentTab)}
            >
              <TabsList className="grid h-12 w-full grid-cols-2 rounded-xl">
                <TabsTrigger value="code" className="gap-2 rounded-lg">
                  <Banknote className="h-4 w-4" />
                  Buy with Code
                </TabsTrigger>

                <TabsTrigger value="card" className="gap-2 rounded-lg">
                  <CreditCard className="h-4 w-4" />
                  Bank Card
                </TabsTrigger>
              </TabsList>

              <TabsContent value="code" className="mt-5">
                <PaymentCodeForm
                  couponCode={couponCode}
                  onCouponCodeChange={setCouponCode}
                />
              </TabsContent>

              <TabsContent value="card" className="mt-5">
                <PaymentCardForm
                  cardTypeCode={cardTypeCode}
                  cardNumber={cardNumber}
                  cardSecurityCode={cardSecurityCode}
                  expiryDate={expiryDate}
                  onCardTypeCodeChange={setCardTypeCode}
                  onCardNumberChange={setCardNumber}
                  onCardSecurityCodeChange={setCardSecurityCode}
                  onExpiryDateChange={setExpiryDate}
                />
              </TabsContent>
            </Tabs>

            <Button
              onClick={handleIssueTicket}
              disabled={!canPay || isIssuing}
              className="h-11 w-full rounded-xl font-bold"
            >
              {isIssuing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Issuing Ticket...
                </>
              ) : (
                <>
                  <BadgeCheck className="mr-2 h-4 w-4" />
                  Pay Now & Issue Ticket
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FlightTicketPaymentModal;