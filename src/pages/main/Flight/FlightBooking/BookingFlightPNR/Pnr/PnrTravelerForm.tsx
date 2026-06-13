import { useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import { format, isValid, parse } from "date-fns";
import {
  CalendarIcon,
  ChevronDown,
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type PnrTravelerFormProps = {
  travellerIndex: number;
  traveller: PnrTravellerForm;
  savedTravellers: SavedTraveller[];
  isLoadingSavedTravellers: boolean;

  fileUploaded: boolean;
  fileName: string;
  isScanning: boolean;

  setFileUploaded: Dispatch<SetStateAction<boolean>>;
  setFileName: Dispatch<SetStateAction<string>>;
  setIsScanning: Dispatch<SetStateAction<boolean>>;

  showPassportFields: boolean;
  documentRequirementMessage?: string;
  showValidationErrors?: boolean;

  autoOpenFieldKey?: string | null;
  onAutoOpenHandled?: () => void;

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

type DropdownOption = {
  value: string;
  label: string;
};

type DropdownSelectFieldProps = {
  label: string;
  value: string;
  placeholder: string;
  options: DropdownOption[];
  onChange: (value: string) => void;
  disabled?: boolean;
  error?: string;
  triggerId?: string;
  autoOpen?: boolean;
  onAutoOpenHandled?: () => void;
};

type DatePickerFieldProps = {
  label: string;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
  disabled?: (date: Date) => boolean;
  error?: string;
  triggerId?: string;
  autoOpen?: boolean;
  onAutoOpenHandled?: () => void;
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

const isEmpty = (value?: string | null) => !String(value ?? "").trim();

const FieldError = ({ message }: { message?: string }) => {
  if (!message) return null;

  return (
    <p className="text-xs font-semibold text-red-500 dark:text-red-400">
      {message}
    </p>
  );
};

const errorBorderClass =
  "border-red-500 ring-1 ring-red-500/20 focus-visible:ring-red-500/30 dark:border-red-400 dark:ring-red-400/20";

const DropdownSelectField = ({
  label,
  value,
  placeholder,
  options,
  onChange,
  disabled,
  error,
  triggerId,
  autoOpen = false,
  onAutoOpenHandled,
}: DropdownSelectFieldProps) => {
  const [manualOpen, setManualOpen] = useState(false);

  const selectedOption = options.find((option) => option.value === value);
  const isOpen = !disabled && (autoOpen || manualOpen);

  const handleOpenChange = (nextOpen: boolean) => {
    setManualOpen(nextOpen);

    if (!nextOpen && autoOpen) {
      onAutoOpenHandled?.();
    }
  };

  const handleSelect = (selectedValue: string) => {
    onChange(selectedValue);
    setManualOpen(false);
    onAutoOpenHandled?.();
  };

  return (
    <div className="space-y-1.5">
      <Label className="text-sm font-medium text-slate-700 dark:text-slate-200">
        {label}
      </Label>

      <DropdownMenu modal={false} open={isOpen} onOpenChange={handleOpenChange}>
        <DropdownMenuTrigger asChild>
          <button
            id={triggerId}
            type="button"
            disabled={disabled}
            className={`flex h-11 w-full items-center justify-between rounded-sm border border-slate-200 bg-white/80 px-3 text-left text-sm shadow-sm outline-none transition hover:bg-slate-50 focus:ring-2 focus:ring-primary/30 disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/10 dark:bg-slate-950/50 dark:hover:bg-slate-900 ${
              error ? errorBorderClass : ""
            }`}
          >
            <span
              className={
                selectedOption
                  ? "text-slate-900 dark:text-white"
                  : "text-slate-400"
              }
            >
              {selectedOption?.label || placeholder}
            </span>

            <ChevronDown className="h-4 w-4 shrink-0 text-slate-400" />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="start"
          className="z-9999 max-h-72 w-(--radix-dropdown-menu-trigger-width) overflow-y-auto rounded-sm border-slate-200 bg-white shadow-lg dark:border-white/10 dark:bg-slate-950"
        >
          {options.map((option) => (
            <DropdownMenuItem
              key={option.value}
              onSelect={() => handleSelect(option.value)}
              className="cursor-pointer text-sm"
            >
              {option.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <FieldError message={error} />
    </div>
  );
};

const DatePickerField = ({
  label,
  value,
  placeholder,
  onChange,
  disabled,
  error,
  triggerId,
  autoOpen = false,
  onAutoOpenHandled,
}: DatePickerFieldProps) => {
  const [manualOpen, setManualOpen] = useState(false);
  const selectedDate = parseDateValue(value);
  const isOpen = autoOpen || manualOpen;

  const handleOpenChange = (nextOpen: boolean) => {
    setManualOpen(nextOpen);

    if (!nextOpen && autoOpen) {
      onAutoOpenHandled?.();
    }
  };

  const handleDateSelect = (date?: Date) => {
    onChange(formatDateValue(date));
    setManualOpen(false);
    onAutoOpenHandled?.();
  };

  return (
    <div className="space-y-1.5">
      <Label className="text-sm font-medium text-slate-700 dark:text-slate-200">
        {label}
      </Label>

      <Popover open={isOpen} onOpenChange={handleOpenChange}>
        <PopoverTrigger asChild>
          <Button
            id={triggerId}
            type="button"
            variant="outline"
            className={`h-11 w-full justify-start rounded-sm border-slate-200 bg-white/80 px-3 text-left font-normal shadow-sm transition hover:bg-slate-50 dark:border-white/10 dark:bg-slate-950/50 dark:hover:bg-slate-900 ${
              error ? errorBorderClass : ""
            }`}
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
            onSelect={handleDateSelect}
            disabled={disabled}
            captionLayout="dropdown"
            fromYear={1900}
            toYear={new Date().getFullYear() + 30}
            initialFocus
          />
        </PopoverContent>
      </Popover>

      <FieldError message={error} />
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
  showPassportFields,
  documentRequirementMessage,
  showValidationErrors = false,
  autoOpenFieldKey = null,
  onAutoOpenHandled,
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

  const getRequiredError = (fieldLabel: string, value?: string | null) => {
    if (!showValidationErrors || !isEmpty(value)) return "";
    return `${fieldLabel} is required.`;
  };

  const getTravellerFieldKey = (field: keyof PnrTravellerForm) =>
    `traveller-${travellerIndex}-${field}`;

  const savedTravellerValue =
    traveller.selectedSavedTravellerId?.toString() || "manual";

  const savedTravellerOptions: DropdownOption[] = [
    {
      value: "manual",
      label: isLoadingSavedTravellers
        ? "Loading saved travellers..."
        : "Select saved traveller or enter manually",
    },
    ...savedTravellers.map((savedTraveller) => ({
      value: savedTraveller.id.toString(),
      label: `${savedTraveller.given_name} ${savedTraveller.surname} - ${
        savedTraveller.passenger_type
      } - ${savedTraveller.passport_no || "No Passport"}`,
    })),
  ];

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
          <DropdownSelectField
            label="Select Saved Traveller"
            value={savedTravellerValue}
            placeholder={
              isLoadingSavedTravellers
                ? "Loading saved travellers..."
                : "Select saved traveller or enter manually"
            }
            options={savedTravellerOptions}
            onChange={handleSavedTravellerSelect}
            disabled={isLoadingSavedTravellers}
          />

          {isLoadingSavedTravellers && (
            <p className="flex items-center gap-1.5 text-xs text-slate-500">
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              Fetching your saved travellers...
            </p>
          )}

          <div className="grid gap-4 md:grid-cols-3">
            <DropdownSelectField
              label="Title"
              value={traveller.title}
              placeholder="Select title"
              options={[
                { value: "MR", label: "MR" },
                { value: "MRS", label: "MRS" },
                { value: "MS", label: "MS" },
                { value: "MSTR", label: "MSTR" },
                { value: "MISS", label: "MISS" },
              ]}
              onChange={(value) =>
                updateTraveller(travellerIndex, "title", value as Title)
              }
              error={getRequiredError("Title", traveller.title)}
              triggerId={getTravellerFieldKey("title")}
              autoOpen={autoOpenFieldKey === getTravellerFieldKey("title")}
              onAutoOpenHandled={onAutoOpenHandled}
            />

            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-slate-700 dark:text-slate-200">
                Given Name
              </Label>

              <div className="relative">
                <UserRound className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <Input
                  id={getTravellerFieldKey("givenName")}
                  type="text"
                  value={traveller.givenName}
                  onChange={(event) =>
                    updateTraveller(
                      travellerIndex,
                      "givenName",
                      event.target.value.toUpperCase(),
                    )
                  }
                  className={`h-11 rounded-sm border-slate-200 bg-white/80 pl-9 uppercase shadow-sm dark:border-white/10 dark:bg-slate-950/50 ${
                    getRequiredError("Given name", traveller.givenName)
                      ? errorBorderClass
                      : ""
                  }`}
                  placeholder="ESHRAK"
                />
              </div>

              <FieldError
                message={getRequiredError("Given name", traveller.givenName)}
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-slate-700 dark:text-slate-200">
                Surname
              </Label>

              <div className="relative">
                <UserRound className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <Input
                  id={getTravellerFieldKey("surname")}
                  type="text"
                  value={traveller.surname}
                  onChange={(event) =>
                    updateTraveller(
                      travellerIndex,
                      "surname",
                      event.target.value.toUpperCase(),
                    )
                  }
                  className={`h-11 rounded-sm border-slate-200 bg-white/80 pl-9 uppercase shadow-sm dark:border-white/10 dark:bg-slate-950/50 ${
                    getRequiredError("Surname", traveller.surname)
                      ? errorBorderClass
                      : ""
                  }`}
                  placeholder="HASAN"
                />
              </div>

              <FieldError message={getRequiredError("Surname", traveller.surname)} />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <DropdownSelectField
              label="Gender"
              value={traveller.gender}
              placeholder="Select gender"
              options={[
                { value: "M", label: "Male" },
                { value: "F", label: "Female" },
              ]}
              onChange={(value) =>
                updateTraveller(travellerIndex, "gender", value as Gender)
              }
              error={getRequiredError("Gender", traveller.gender)}
              triggerId={getTravellerFieldKey("gender")}
              autoOpen={autoOpenFieldKey === getTravellerFieldKey("gender")}
              onAutoOpenHandled={onAutoOpenHandled}
            />

            <DatePickerField
              label="Date of Birth"
              value={traveller.dateOfBirth}
              placeholder="Select date of birth"
              onChange={(value) =>
                updateTraveller(travellerIndex, "dateOfBirth", value)
              }
              disabled={(date) => date > new Date()}
              error={getRequiredError("Date of birth", traveller.dateOfBirth)}
              triggerId={getTravellerFieldKey("dateOfBirth")}
              autoOpen={autoOpenFieldKey === getTravellerFieldKey("dateOfBirth")}
              onAutoOpenHandled={onAutoOpenHandled}
            />

            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-slate-700 dark:text-slate-200">
                Phone
              </Label>

              <div className="relative">
                <Phone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <Input
                  id={getTravellerFieldKey("travelerPhone")}
                  type="tel"
                  value={traveller.travelerPhone}
                  onChange={(event) =>
                    updateTraveller(
                      travellerIndex,
                      "travelerPhone",
                      event.target.value,
                    )
                  }
                  className={`h-11 rounded-sm border-slate-200 bg-white/80 pl-9 shadow-sm dark:border-white/10 dark:bg-slate-950/50 ${
                    getRequiredError("Phone", traveller.travelerPhone)
                      ? errorBorderClass
                      : ""
                  }`}
                  placeholder="+8801712345678"
                />
              </div>

              <FieldError
                message={getRequiredError("Phone", traveller.travelerPhone)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {!showPassportFields && documentRequirementMessage ? (
        <div className="rounded-sm border border-emerald-500/20 bg-emerald-500/10 p-4 text-sm font-medium text-emerald-700 dark:text-emerald-300">
          {documentRequirementMessage}
        </div>
      ) : null}

      {showPassportFields ? (
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
                    id={getTravellerFieldKey("passportNumber")}
                    type="text"
                    value={traveller.passportNumber}
                    onChange={(event) =>
                      updateTraveller(
                        travellerIndex,
                        "passportNumber",
                        event.target.value.toUpperCase(),
                      )
                    }
                    className={`h-11 rounded-sm border-slate-200 bg-white/80 pl-9 uppercase shadow-sm dark:border-white/10 dark:bg-slate-950/50 ${
                      getRequiredError(
                        "Passport number",
                        traveller.passportNumber,
                      )
                        ? errorBorderClass
                        : ""
                    }`}
                    placeholder="AB123456"
                  />
                </div>

                <FieldError
                  message={getRequiredError(
                    "Passport number",
                    traveller.passportNumber,
                  )}
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-sm font-medium text-slate-700 dark:text-slate-200">
                  Nationality
                </Label>

                <div className="relative">
                  <Globe2 className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                  <Input
                    id={getTravellerFieldKey("passportNationality")}
                    type="text"
                    value={traveller.passportNationality}
                    onChange={(event) =>
                      updateTraveller(
                        travellerIndex,
                        "passportNationality",
                        event.target.value.toUpperCase(),
                      )
                    }
                    className={`h-11 rounded-sm border-slate-200 bg-white/80 pl-9 uppercase shadow-sm dark:border-white/10 dark:bg-slate-950/50 ${
                      getRequiredError(
                        "Nationality",
                        traveller.passportNationality,
                      )
                        ? errorBorderClass
                        : ""
                    }`}
                    placeholder="BD"
                    maxLength={2}
                  />
                </div>

                <FieldError
                  message={getRequiredError(
                    "Nationality",
                    traveller.passportNationality,
                  )}
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-sm font-medium text-slate-700 dark:text-slate-200">
                  Issuing Country
                </Label>

                <div className="relative">
                  <Globe2 className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                  <Input
                    id={getTravellerFieldKey("passportIssuingCountry")}
                    type="text"
                    value={traveller.passportIssuingCountry}
                    onChange={(event) =>
                      updateTraveller(
                        travellerIndex,
                        "passportIssuingCountry",
                        event.target.value.toUpperCase(),
                      )
                    }
                    className={`h-11 rounded-sm border-slate-200 bg-white/80 pl-9 uppercase shadow-sm dark:border-white/10 dark:bg-slate-950/50 ${
                      getRequiredError(
                        "Issuing country",
                        traveller.passportIssuingCountry,
                      )
                        ? errorBorderClass
                        : ""
                    }`}
                    placeholder="BD"
                    maxLength={2}
                  />
                </div>

                <FieldError
                  message={getRequiredError(
                    "Issuing country",
                    traveller.passportIssuingCountry,
                  )}
                />
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
                error={getRequiredError(
                  "Passport expiry date",
                  traveller.passportExpiryDate,
                )}
                triggerId={getTravellerFieldKey("passportExpiryDate")}
                autoOpen={
                  autoOpenFieldKey === getTravellerFieldKey("passportExpiryDate")
                }
                onAutoOpenHandled={onAutoOpenHandled}
              />
            </div>
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
};

export default PnrTravelerForm;