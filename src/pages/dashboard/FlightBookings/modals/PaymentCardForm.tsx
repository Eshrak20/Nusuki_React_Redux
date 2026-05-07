import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Props = {
  cardTypeCode: string;
  cardNumber: string;
  cardSecurityCode: string;
  expiryDate: string;
  onCardTypeCodeChange: (value: string) => void;
  onCardNumberChange: (value: string) => void;
  onCardSecurityCodeChange: (value: string) => void;
  onExpiryDateChange: (value: string) => void;
};

const PaymentCardForm = ({
  cardTypeCode,
  cardNumber,
  cardSecurityCode,
  expiryDate,
  onCardTypeCodeChange,
  onCardNumberChange,
  onCardSecurityCodeChange,
  onExpiryDateChange,
}: Props) => {
  return (
    <div className="space-y-4 rounded-2xl border bg-card p-4">
      <div>
        <h4 className="font-bold">Pay with bank card</h4>
        <p className="mt-1 text-sm text-muted-foreground">
          Enter card details to issue the air ticket.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Card Type Code</Label>
          <Input
            value={cardTypeCode}
            onChange={(e) => onCardTypeCodeChange(e.target.value.toUpperCase())}
            placeholder="VI"
          />
        </div>

        <div className="space-y-2">
          <Label>Expiry Date</Label>
          <Input
            type="month"
            value={expiryDate}
            onChange={(e) => onExpiryDateChange(e.target.value)}
          />
        </div>

        <div className="space-y-2 sm:col-span-2">
          <Label>Card Number</Label>
          <Input
            value={cardNumber}
            onChange={(e) => onCardNumberChange(e.target.value)}
            placeholder="4111111111111111"
          />
        </div>

        <div className="space-y-2">
          <Label>Security Code</Label>
          <Input
            value={cardSecurityCode}
            onChange={(e) => onCardSecurityCodeChange(e.target.value)}
            placeholder="123"
          />
        </div>
      </div>
    </div>
  );
};

export default PaymentCardForm;