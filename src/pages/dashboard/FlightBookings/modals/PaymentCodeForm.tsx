import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Props = {
  couponCode: string;
  onCouponCodeChange: (value: string) => void;
};

const PaymentCodeForm = ({ couponCode, onCouponCodeChange }: Props) => {
  return (
    <div className="space-y-4 rounded-sm border bg-card p-4">
      <div>
        <h4 className="font-bold">Buy with coupon / cash code</h4>
        <p className="mt-1 text-sm text-muted-foreground">
          Use this option for cash or internal code based ticketing.
        </p>
      </div>

      <div className="space-y-2">
        <Label>Coupon / Payment Code</Label>
        <Input
          value={couponCode}
          onChange={(e) => onCouponCodeChange(e.target.value)}
          placeholder="Enter payment code if needed"
        />
        <p className="text-xs text-muted-foreground">
          Backend currently accepts CA method. This code field is UI-only unless
          backend supports coupon code later.
        </p>
      </div>
    </div>
  );
};

export default PaymentCodeForm;