import { useMemo, useState } from "react";
import { CalendarIcon, X } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

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

import type {
  MyTraveller,
  MyTravellerFormPayload,
} from "@/types/flight/myTravellers.types";

type MyTravellerModalProps = {
  open: boolean;
  selectedTraveller: MyTraveller | null;
  isSubmitting: boolean;
  onSubmit: (payload: MyTravellerFormPayload) => Promise<void>;
  onClose: () => void;
};

const emptyForm: MyTravellerFormPayload = {
  given_name: "",
  surname: "",
  passenger_type: "ADT",
  title: "MR",
  gender: "M",
  date_of_birth: "",
  phone: "",
  nationality: "BD",
  passport_no: "",
  passport_nationality: "BD",
  passport_issuing_country: "BD",
  passport_expire_date: "",
};

const maleTitles: MyTravellerFormPayload["title"][] = ["MR", "MSTR"];
const femaleTitles: MyTravellerFormPayload["title"][] = ["MS", "MRS", "MISS"];

const getInitialForm = (
  selectedTraveller: MyTraveller | null,
): MyTravellerFormPayload => {
  if (!selectedTraveller) return emptyForm;

  return {
    given_name: selectedTraveller.given_name || "",
    surname: selectedTraveller.surname || "",
    passenger_type:
      selectedTraveller.passenger_type || emptyForm.passenger_type,
    title: selectedTraveller.title || emptyForm.title,
    gender: selectedTraveller.gender || emptyForm.gender,
    date_of_birth: selectedTraveller.date_of_birth || "",
    phone: selectedTraveller.phone || "",
    nationality: selectedTraveller.nationality || "BD",
    passport_no: selectedTraveller.passport_no || "",
    passport_nationality:
      selectedTraveller.passport_nationality ||
      selectedTraveller.passport_issuing_country ||
      "BD",
    passport_issuing_country: selectedTraveller.passport_issuing_country || "BD",
    passport_expire_date: selectedTraveller.passport_expire_date || "",
  };
};

const parseDateValue = (value: string) => {
  if (!value) return undefined;

  const [year, month, day] = value.split("-").map(Number);

  if (!year || !month || !day) return undefined;

  return new Date(year, month - 1, day);
};

const formatDateValue = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const formatDateLabel = (value: string) => {
  const date = parseDateValue(value);

  if (!date) return "Select date";

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const MyTravellerModal = ({
  open,
  selectedTraveller,
  isSubmitting,
  onSubmit,
  onClose,
}: MyTravellerModalProps) => {
  const [form, setForm] = useState<MyTravellerFormPayload>(() =>
    getInitialForm(selectedTraveller),
  );

  const modalTitle = selectedTraveller ? "Edit Traveller" : "Add Traveller";

  const fieldClass =
    "h-11 w-full rounded-md !border-2 !border-primary/30 !bg-primary/5 px-3 text-sm text-foreground shadow-sm outline-none transition placeholder:text-muted-foreground hover:!border-primary/50 hover:!bg-primary/10 focus:!border-primary focus:!bg-background focus:ring-2 focus:ring-primary/25 dark:!bg-muted/50 dark:hover:!bg-muted/70";

  const selectTriggerClass =
    "h-11 w-full rounded-md !border-2 !border-primary/30 !bg-primary/5 px-3 text-sm text-foreground shadow-sm transition hover:!border-primary/50 hover:!bg-primary/10 focus:!border-primary focus:ring-2 focus:ring-primary/25 dark:!bg-muted/50 dark:hover:!bg-muted/70";

  const dateButtonClass =
    "h-11 w-full justify-between rounded-md !border-2 !border-primary/30 !bg-primary/5 px-3 text-left text-sm font-normal text-foreground shadow-sm transition hover:!border-primary/50 hover:!bg-primary/10 focus:!border-primary focus:!bg-background focus:ring-2 focus:ring-primary/25 dark:!bg-muted/50 dark:hover:!bg-muted/70";

  const selectItemClass =
    "cursor-pointer focus:bg-primary focus:text-primary-foreground data-[highlighted]:bg-primary data-[highlighted]:text-primary-foreground";

  const titleOptions = useMemo(() => {
    return form.gender === "F" ? femaleTitles : maleTitles;
  }, [form.gender]);

  const updateField = <K extends keyof MyTravellerFormPayload>(
    key: K,
    value: MyTravellerFormPayload[K],
  ) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleGenderChange = (gender: MyTravellerFormPayload["gender"]) => {
    setForm((prev) => ({
      ...prev,
      gender,
      title: gender === "F" ? "MS" : "MR",
    }));
  };

  const handleDateChange = (
    key: "date_of_birth" | "passport_expire_date",
    date?: Date,
  ) => {
    if (!date) return;

    updateField(key, formatDateValue(date));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await onSubmit(form);
  };

  return (
    <Dialog open={open} onOpenChange={(value) => !value && onClose()}>
      <DialogContent className="max-h-[92vh] overflow-y-auto border bg-card p-0 text-card-foreground max-w-5xl">
        <DialogHeader className="sticky top-0 z-10 border-b bg-card px-7 py-4 sm:px-8 md:px-10">
          <div className="flex items-center justify-between gap-4">
            <DialogTitle className="text-base font-bold text-primary">
              {modalTitle}
            </DialogTitle>

            <button
              type="button"
              onClick={onClose}
              className="rounded-md p-1 text-muted-foreground transition hover:bg-muted hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="space-y-9 px-7 sm:px-8 md:px-10">
            <section>
              <h2 className="mb-5 text-lg font-bold text-foreground">
                Basic Info
              </h2>

              <div className="grid gap-x-7 gap-y-5 md:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={form.given_name}
                    onChange={(event) =>
                      updateField("given_name", event.target.value)
                    }
                    required
                    className={fieldClass}
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={form.surname}
                    onChange={(event) =>
                      updateField("surname", event.target.value)
                    }
                    required
                    className={fieldClass}
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(event) => updateField("phone", event.target.value)}
                    placeholder="+8801712345678"
                    required
                    className={fieldClass}
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                    Date of Birth
                  </label>

                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        type="button"
                        variant="outline"
                        className={dateButtonClass}
                      >
                        <span
                          className={
                            form.date_of_birth
                              ? "text-foreground"
                              : "text-muted-foreground"
                          }
                        >
                          {formatDateLabel(form.date_of_birth)}
                        </span>

                        <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    </PopoverTrigger>

                    <PopoverContent align="start" className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={parseDateValue(form.date_of_birth)}
                        onSelect={(date) =>
                          handleDateChange("date_of_birth", date)
                        }
                        captionLayout="dropdown"
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                    Passenger Type
                  </label>

                  <Select
                    value={form.passenger_type}
                    onValueChange={(value) =>
                      updateField(
                        "passenger_type",
                        value as MyTravellerFormPayload["passenger_type"],
                      )
                    }
                  >
                    <SelectTrigger className={selectTriggerClass}>
                      <SelectValue placeholder="Select passenger type" />
                    </SelectTrigger>

                    <SelectContent className="border bg-popover text-popover-foreground shadow-lg">
                      <SelectItem value="ADT" className={selectItemClass}>
                        Adult
                      </SelectItem>

                      <SelectItem value="CNN" className={selectItemClass}>
                        Child
                      </SelectItem>

                      <SelectItem value="INF" className={selectItemClass}>
                        Infant
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                    Nationality
                  </label>
                  <input
                    type="text"
                    value={form.nationality}
                    onChange={(event) =>
                      updateField("nationality", event.target.value)
                    }
                    placeholder="BD"
                    required
                    className={fieldClass}
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-medium text-muted-foreground">
                    Gender
                  </label>

                  <div className="flex h-11 flex-wrap items-center gap-5 rounded-md border-2! border-primary/30! bg-primary/5! px-3 shadow-sm transition hover:border-primary/50! hover:bg-primary/10! dark:bg-muted/50! dark:hover:bg-muted/70!">
                    <label className="flex cursor-pointer items-center gap-2 text-sm text-foreground">
                      <input
                        type="radio"
                        name="gender"
                        checked={form.gender === "M"}
                        onChange={() => handleGenderChange("M")}
                        className="h-4 w-4 accent-primary"
                      />
                      Male
                    </label>

                    <label className="flex cursor-pointer items-center gap-2 text-sm text-foreground">
                      <input
                        type="radio"
                        name="gender"
                        checked={form.gender === "F"}
                        onChange={() => handleGenderChange("F")}
                        className="h-4 w-4 accent-primary"
                      />
                      Female
                    </label>
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                    Title
                  </label>

                  <Select
                    value={form.title}
                    onValueChange={(value) =>
                      updateField(
                        "title",
                        value as MyTravellerFormPayload["title"],
                      )
                    }
                  >
                    <SelectTrigger className={selectTriggerClass}>
                      <SelectValue placeholder="Select title" />
                    </SelectTrigger>

                    <SelectContent className="border bg-popover text-popover-foreground shadow-lg">
                      {titleOptions.map((title) => (
                        <SelectItem
                          key={title}
                          value={title}
                          className={selectItemClass}
                        >
                          {title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </section>

            <section>
              <h2 className="mb-5 text-lg font-bold text-foreground">
                Passport Info
              </h2>

              <div className="grid gap-x-7 gap-y-5 md:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                    Passport Number
                  </label>
                  <input
                    type="text"
                    value={form.passport_no}
                    onChange={(event) =>
                      updateField("passport_no", event.target.value)
                    }
                    required
                    className={fieldClass}
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                    Passport Nationality
                  </label>
                  <input
                    type="text"
                    value={form.passport_nationality}
                    onChange={(event) =>
                      updateField("passport_nationality", event.target.value)
                    }
                    placeholder="BD"
                    required
                    className={fieldClass}
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                    Passport Issuing Country
                  </label>
                  <input
                    type="text"
                    value={form.passport_issuing_country}
                    onChange={(event) =>
                      updateField(
                        "passport_issuing_country",
                        event.target.value,
                      )
                    }
                    placeholder="BD"
                    required
                    className={fieldClass}
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                    Passport Expiry Date
                  </label>

                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        type="button"
                        variant="outline"
                        className={dateButtonClass}
                      >
                        <span
                          className={
                            form.passport_expire_date
                              ? "text-foreground"
                              : "text-muted-foreground"
                          }
                        >
                          {formatDateLabel(form.passport_expire_date)}
                        </span>

                        <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    </PopoverTrigger>

                    <PopoverContent align="start" className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={parseDateValue(form.passport_expire_date)}
                        onSelect={(date) =>
                          handleDateChange("passport_expire_date", date)
                        }
                        captionLayout="dropdown"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </section>
          </div>

          <div className="sticky bottom-0 flex justify-end border-t bg-card px-7 py-4 sm:px-8 md:px-10">
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-md bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default MyTravellerModal;