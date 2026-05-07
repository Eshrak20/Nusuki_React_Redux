import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type ContactInfoBoxProps = {
  email: string;
  phone: string;
  onChange: (field: "email" | "phone", value: string) => void;
};

const ContactInfoBox = ({ email, phone, onChange }: ContactInfoBoxProps) => {
  return (
    <div className="grid grid-cols-1 gap-4 rounded-r-md border-l-4 border-l-green-600 bg-green-50/30 p-4 dark:bg-green-950/10 md:grid-cols-2">
      <div className="space-y-2 md:col-span-2">
        <h3 className="text-xs font-bold uppercase text-green-700 dark:text-green-500">
          Contact Information
        </h3>
      </div>

      <div className="space-y-2">
        <Label className="text-xs font-semibold uppercase text-muted-foreground">
          Email *
        </Label>
        <Input
          value={email}
          onChange={(e) => onChange("email", e.target.value)}
          placeholder="Enter contact email"
        />
      </div>

      <div className="space-y-2">
        <Label className="text-xs font-semibold uppercase text-muted-foreground">
          Phone Number *
        </Label>
        <Input
          value={phone}
          onChange={(e) => onChange("phone", e.target.value)}
          placeholder="Enter contact phone"
        />
      </div>
    </div>
  );
};

export default ContactInfoBox;