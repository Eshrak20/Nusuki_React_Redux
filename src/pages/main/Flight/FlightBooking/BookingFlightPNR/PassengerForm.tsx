import { Calendar } from "lucide-react";

import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import ContactInfoBox from "./ContactInfoBox";
import PassportInfoBox from "./PassportInfoBox";
import PassportUploadBox from "./PassportUploadBox";

export type PnrFormState = {
  givenName: string;
  surname: string;
  dateOfBirth: string;
  gender: "M" | "F";
  passengerType: "ADT" | "CNN" | "INF";
  travelerPhone: string;

  contactEmail: string;
  contactPhone: string;

  passportNumber: string;
  nationality: string;
  issuingCountry: string;
  passportExpiryDate: string;

  sendBookingEmail: boolean;
};
type PassengerFormProps = {
  form: PnrFormState;
  fileUploaded: boolean;
  fileName: string;
  isScanning: boolean;
  setFileUploaded: (value: boolean) => void;
  setFileName: (value: string) => void;
  setIsScanning: (value: boolean) => void;
  updateForm: <K extends keyof PnrFormState>(
    field: K,
    value: PnrFormState[K]
  ) => void;
};

const PassengerForm = ({
  form,
  fileUploaded,
  fileName,
  isScanning,
  setFileUploaded,
  setFileName,
  setIsScanning,
  updateForm,
}: PassengerFormProps) => {
  return (
    <div className="space-y-6">
      <PassportUploadBox
        fileUploaded={fileUploaded}
        fileName={fileName}
        isScanning={isScanning}
        setFileUploaded={setFileUploaded}
        setFileName={setFileName}
        setIsScanning={setIsScanning}
        setPassportNumber={(value) => updateForm("passportNumber", value)}
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <div className="space-y-2">
          <Label className="text-xs font-semibold uppercase text-muted-foreground">
            First Name *
          </Label>
          <Input
            value={form.givenName}
            onChange={(e) => updateForm("givenName", e.target.value)}
            placeholder="Enter First Name"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-xs font-semibold uppercase text-muted-foreground">
            Last Name *
          </Label>
          <Input
            value={form.surname}
            onChange={(e) => updateForm("surname", e.target.value)}
            placeholder="Enter Last Name"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-xs font-semibold uppercase text-muted-foreground">
            Date of Birth *
          </Label>
          <div className="relative">
            <Input
              type="date"
              value={form.dateOfBirth}
              onChange={(e) => updateForm("dateOfBirth", e.target.value)}
            />
            <Calendar className="pointer-events-none absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="space-y-2">
          <Label className="text-xs font-semibold uppercase text-muted-foreground">
            Gender *
          </Label>
          <Select
            value={form.gender}
            onValueChange={(value: "M" | "F") => updateForm("gender", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="M">Male</SelectItem>
              <SelectItem value="F">Female</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-xs font-semibold uppercase text-muted-foreground">
            Passenger Type *
          </Label>
          <Select
            value={form.passengerType}
            onValueChange={(value: "ADT" | "CNN" | "INF") =>
              updateForm("passengerType", value)
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select passenger type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ADT">Adult</SelectItem>
              <SelectItem value="CNN">Child</SelectItem>
              <SelectItem value="INF">Infant</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-xs font-semibold uppercase text-muted-foreground">
            Traveler Phone *
          </Label>
          <Input
            value={form.travelerPhone}
            onChange={(e) => updateForm("travelerPhone", e.target.value)}
            placeholder="Enter traveler phone"
          />
        </div>
      </div>

      <ContactInfoBox
        email={form.contactEmail}
        phone={form.contactPhone}
        onChange={(field, value) => {
          if (field === "email") updateForm("contactEmail", value);
          if (field === "phone") updateForm("contactPhone", value);
        }}
      />

      <PassportInfoBox
        passportNumber={form.passportNumber}
        passportExpiryDate={form.passportExpiryDate}
        nationality={form.nationality}
        issuingCountry={form.issuingCountry}
        isScanning={isScanning}
        onChange={(field, value) => {
          if (field === "passportNumber") updateForm("passportNumber", value);
          if (field === "passportExpiryDate") updateForm("passportExpiryDate", value);
          if (field === "nationality") updateForm("nationality", value);
          if (field === "issuingCountry") updateForm("issuingCountry", value);
        }}
      />

      <div className="flex items-center gap-2 pt-2">
        <Checkbox
          id="send-booking-email"
          checked={form.sendBookingEmail}
          onCheckedChange={(checked) =>
            updateForm("sendBookingEmail", Boolean(checked))
          }
          className="border-green-600 data-[state=checked]:bg-green-600"
        />
        <Label
          htmlFor="send-booking-email"
          className="cursor-pointer text-sm font-medium"
        >
          Send booking email{" "}
          <span className="font-normal text-muted-foreground">
            (Passenger will receive booking details)
          </span>
        </Label>
      </div>
    </div>
  );
};

export default PassengerForm;