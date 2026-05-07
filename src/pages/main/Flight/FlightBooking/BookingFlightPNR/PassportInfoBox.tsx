import { Calendar } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type PassportInfoField =
  | "passportNumber"
  | "passportExpiryDate"
  | "nationality"
  | "issuingCountry";

type PassportInfoBoxProps = {
  passportNumber: string;
  passportExpiryDate: string;
  nationality: string;
  issuingCountry: string;
  isScanning: boolean;
  onChange: (field: PassportInfoField, value: string) => void;
};

const PassportInfoBox = ({
  passportNumber,
  passportExpiryDate,
  nationality,
  issuingCountry,
  isScanning,
  onChange,
}: PassportInfoBoxProps) => {
  return (
    <div className="space-y-4 rounded-r-md border-l-4 border-l-blue-600 bg-blue-50/30 p-4 dark:bg-blue-950/10">
      <h3 className="text-xs font-bold uppercase text-blue-700 dark:text-blue-500">
        Passport Information
      </h3>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <div className="space-y-2">
          <Label className="text-xs font-semibold uppercase text-muted-foreground">
            Nationality *
          </Label>

          <Select
            value={nationality}
            onValueChange={(value) => onChange("nationality", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select nationality" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="BD">BD - BANGLADESH</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-xs font-semibold uppercase text-muted-foreground">
            Issuing Country *
          </Label>

          <Select
            value={issuingCountry}
            onValueChange={(value) => onChange("issuingCountry", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select country" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="BD">BANGLADESH (BD)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-xs font-semibold uppercase text-muted-foreground">
            Passport Number *
          </Label>

          <Input
            value={passportNumber}
            onChange={(e) => onChange("passportNumber", e.target.value)}
            placeholder="Enter Passport Number"
            className={isScanning ? "animate-pulse border-blue-400" : ""}
          />
        </div>

        <div className="space-y-2">
          <Label className="text-xs font-semibold uppercase text-muted-foreground">
            Expiry Date *
          </Label>

          <div className="relative">
            <Input
              type="date"
              value={passportExpiryDate}
              onChange={(e) =>
                onChange("passportExpiryDate", e.target.value)
              }
            />

            <Calendar className="pointer-events-none absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PassportInfoBox;