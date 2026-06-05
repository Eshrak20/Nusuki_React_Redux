import { format, isValid, parse } from "date-fns";
import {
  CalendarIcon,
  ContactRound,
  Globe2,
  IdCard,
  Loader2,
  Phone,
  ShieldCheck,
  UserRound,
} from "lucide-react";

import { mapSavedTravellerToPnrTraveller } from "@/lib/pnrTravelerUtils";
import type {
  Gender,
  PnrTravellerForm,
  SavedTraveller,
  Title,
} from "@/types/flight/myTravellers.types";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type PnrTravelerFormProps = {
  travellerIndex: number;
  traveller: PnrTravellerForm;
  savedTravellers: SavedTraveller[];
  isLoadingSavedTravellers: boolean;

  fileUploaded: boolean;
  fileName: string;
  isScanning: boolean;

  setFileUploaded: React.Dispatch<React.SetStateAction<boolean>>;
  setFileName: React.Dispatch<React.SetStateAction<string>>;
  setIsScanning: React.Dispatch<React.SetStateAction<boolean>>;

  updateTraveller: <K extends keyof PnrTravellerForm>(
    travellerIndex: number,
    field: K,
    value: PnrTravellerForm[K],
  ) => void;

  replaceTraveller: (
    travellerIndex: number,
    traveller: PnrTravellerForm,
  ) => void;
};

const parseDateValue = (value?: string) => {
  if (!value) return undefined;

  const parsedDate = parse(value, "yyyy-MM-dd", new Date());

  return isValid(parsedDate) ? parsedDate : undefined;
};

const formatDateValue = (date?: Date) => {
  if (!date) return "";
  return format(date, "yyyy-MM-dd");
};

type DatePickerFieldProps = {
  label: string;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
  disabled?: (date: Date) => boolean;
};

const DatePickerField = ({
  label,
  value,
  placeholder,
  onChange,
  disabled,
}: DatePickerFieldProps) => {
  const selectedDate = parseDateValue(value);

  return (
    <div className="space-y-1.5">
      <Label className="text-sm font-medium text-slate-700 dark:text-slate-200">
        {label}
      </Label>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="outline"
            className="h-11 w-full justify-start rounded-xl border-slate-200 bg-white/80 px-3 text-left font-normal shadow-sm transition hover:bg-slate-50 dark:border-white/10 dark:bg-slate-950/50 dark:hover:bg-slate-900"
          >
            <CalendarIcon className="mr-2 h-4 w-4 text-slate-500" />

            {selectedDate ? (
              <span>{format(selectedDate, "dd MMM yyyy")}</span>
            ) : (
              <span className="text-slate-400">{placeholder}</span>
            )}
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(date) => onChange(formatDateValue(date))}
            disabled={disabled}
            captionLayout="dropdown"
            fromYear={1900}
            toYear={new Date().getFullYear() + 30}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

const PnrTravelerForm = ({
  travellerIndex,
  traveller,
  savedTravellers,
  isLoadingSavedTravellers,
  updateTraveller,
  replaceTraveller,
}: PnrTravelerFormProps) => {
  const handleSavedTravellerSelect = (value: string) => {
    if (!value || value === "manual") {
      updateTraveller(travellerIndex, "selectedSavedTravellerId", null);
      return;
    }

    const selectedTraveller = savedTravellers.find(
      (item) => item.id === Number(value),
    );

    if (!selectedTraveller) return;

    replaceTraveller(
      travellerIndex,
      mapSavedTravellerToPnrTraveller(selectedTraveller),
    );
  };

  return (
    <div className="space-y-5">
      <Card className="overflow-hidden rounded-sm border-slate-200/80 bg-white/80 shadow-sm backdrop-blur dark:border-white/10 dark:bg-slate-950/60">
        <CardHeader className="border-b bg-slate-50/80 px-5 py-4 dark:border-white/10 dark:bg-slate-900/50">
          <CardTitle className="flex items-center gap-2 text-base font-semibold text-slate-900 dark:text-white">
            <ContactRound className="h-5 w-5 text-primary" />
            Traveller Information
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-5 p-5">
          <div className="space-y-1.5">
            <Label className="text-sm font-medium text-slate-700 dark:text-slate-200">
              Select Saved Traveller
            </Label>

            <Select
              value={traveller.selectedSavedTravellerId?.toString() || "manual"}
              onValueChange={handleSavedTravellerSelect}
              disabled={isLoadingSavedTravellers}
            >
              <SelectTrigger className="h-11 w-full rounded-xl border-slate-200 bg-white/80 shadow-sm dark:border-white/10 dark:bg-slate-950/50">
                <SelectValue
                  placeholder={
                    isLoadingSavedTravellers
                      ? "Loading saved travellers..."
                      : "Select saved traveller or enter manually"
                  }
                />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="manual">
                  {isLoadingSavedTravellers
                    ? "Loading saved travellers..."
                    : "Select saved traveller or enter manually"}
                </SelectItem>

                {savedTravellers.map((savedTraveller) => (
                  <SelectItem
                    key={savedTraveller.id}
                    value={savedTraveller.id.toString()}
                  >
                    {savedTraveller.given_name} {savedTraveller.surname} -{" "}
                    {savedTraveller.passenger_type} -{" "}
                    {savedTraveller.passport_no || "No Passport"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {isLoadingSavedTravellers && (
              <p className="flex items-center gap-1.5 text-xs text-slate-500">
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                Fetching your saved travellers...
              </p>
            )}
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-slate-700 dark:text-slate-200">
                Title
              </Label>

              <Select
                value={traveller.title}
                onValueChange={(value) =>
                  updateTraveller(travellerIndex, "title", value as Title)
                }
              >
                <SelectTrigger className="h-11 rounded-xl border-slate-200 bg-white/80 shadow-sm dark:border-white/10 dark:bg-slate-950/50">
                  <SelectValue placeholder="Select title" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="MR">MR</SelectItem>
                  <SelectItem value="MRS">MRS</SelectItem>
                  <SelectItem value="MS">MS</SelectItem>
                  <SelectItem value="MSTR">MSTR</SelectItem>
                  <SelectItem value="MISS">MISS</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-slate-700 dark:text-slate-200">
                Given Name
              </Label>

              <div className="relative">
                <UserRound className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <Input
                  type="text"
                  value={traveller.givenName}
                  onChange={(event) =>
                    updateTraveller(
                      travellerIndex,
                      "givenName",
                      event.target.value.toUpperCase(),
                    )
                  }
                  className="h-11 rounded-xl border-slate-200 bg-white/80 pl-9 uppercase shadow-sm dark:border-white/10 dark:bg-slate-950/50"
                  placeholder="ESHRAK"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-slate-700 dark:text-slate-200">
                Surname
              </Label>

              <div className="relative">
                <UserRound className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <Input
                  type="text"
                  value={traveller.surname}
                  onChange={(event) =>
                    updateTraveller(
                      travellerIndex,
                      "surname",
                      event.target.value.toUpperCase(),
                    )
                  }
                  className="h-11 rounded-xl border-slate-200 bg-white/80 pl-9 uppercase shadow-sm dark:border-white/10 dark:bg-slate-950/50"
                  placeholder="HASAN"
                />
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-slate-700 dark:text-slate-200">
                Gender
              </Label>

              <Select
                value={traveller.gender}
                onValueChange={(value) =>
                  updateTraveller(travellerIndex, "gender", value as Gender)
                }
              >
                <SelectTrigger className="h-11 rounded-xl border-slate-200 bg-white/80 shadow-sm dark:border-white/10 dark:bg-slate-950/50">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="M">Male</SelectItem>
                  <SelectItem value="F">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <DatePickerField
              label="Date of Birth"
              value={traveller.dateOfBirth}
              placeholder="Select date of birth"
              onChange={(value) =>
                updateTraveller(travellerIndex, "dateOfBirth", value)
              }
              disabled={(date) => date > new Date()}
            />

            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-slate-700 dark:text-slate-200">
                Phone
              </Label>

              <div className="relative">
                <Phone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <Input
                  type="tel"
                  value={traveller.travelerPhone}
                  onChange={(event) =>
                    updateTraveller(
                      travellerIndex,
                      "travelerPhone",
                      event.target.value,
                    )
                  }
                  className="h-11 rounded-xl border-slate-200 bg-white/80 pl-9 shadow-sm dark:border-white/10 dark:bg-slate-950/50"
                  placeholder="+8801712345678"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="overflow-hidden rounded-sm border-slate-200/80 bg-white/80 shadow-sm backdrop-blur dark:border-white/10 dark:bg-slate-950/60">
        <CardHeader className="border-b bg-slate-50/80 px-5 py-4 dark:border-white/10 dark:bg-slate-900/50">
          <CardTitle className="flex items-center gap-2 text-base font-semibold text-slate-900 dark:text-white">
            <ShieldCheck className="h-5 w-5 text-primary" />
            Passport Details
          </CardTitle>
        </CardHeader>

        <CardContent className="p-5">
          <div className="grid gap-4 md:grid-cols-4">
            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-slate-700 dark:text-slate-200">
                Passport Number
              </Label>

              <div className="relative">
                <IdCard className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <Input
                  type="text"
                  value={traveller.passportNumber}
                  onChange={(event) =>
                    updateTraveller(
                      travellerIndex,
                      "passportNumber",
                      event.target.value.toUpperCase(),
                    )
                  }
                  className="h-11 rounded-xl border-slate-200 bg-white/80 pl-9 uppercase shadow-sm dark:border-white/10 dark:bg-slate-950/50"
                  placeholder="AB123456"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-slate-700 dark:text-slate-200">
                Nationality
              </Label>

              <div className="relative">
                <Globe2 className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <Input
                  type="text"
                  value={traveller.passportNationality}
                  onChange={(event) =>
                    updateTraveller(
                      travellerIndex,
                      "passportNationality",
                      event.target.value.toUpperCase(),
                    )
                  }
                  className="h-11 rounded-xl border-slate-200 bg-white/80 pl-9 uppercase shadow-sm dark:border-white/10 dark:bg-slate-950/50"
                  placeholder="BD"
                  maxLength={2}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-slate-700 dark:text-slate-200">
                Issuing Country
              </Label>

              <div className="relative">
                <Globe2 className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <Input
                  type="text"
                  value={traveller.passportIssuingCountry}
                  onChange={(event) =>
                    updateTraveller(
                      travellerIndex,
                      "passportIssuingCountry",
                      event.target.value.toUpperCase(),
                    )
                  }
                  className="h-11 rounded-xl border-slate-200 bg-white/80 pl-9 uppercase shadow-sm dark:border-white/10 dark:bg-slate-950/50"
                  placeholder="BD"
                  maxLength={2}
                />
              </div>
            </div>

            <DatePickerField
              label="Passport Expiry Date"
              value={traveller.passportExpiryDate}
              placeholder="Select expiry date"
              onChange={(value) =>
                updateTraveller(travellerIndex, "passportExpiryDate", value)
              }
              disabled={(date) => {
                const today = new Date();
                today.setHours(0, 0, 0, 0);

                return date < today;
              }}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PnrTravelerForm;