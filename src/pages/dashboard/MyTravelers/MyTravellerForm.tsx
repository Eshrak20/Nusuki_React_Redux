import { useState } from "react";
import type {
  MyTraveller,
  MyTravellerFormPayload,
  PassengerType,
  TravellerGender,
  TravellerTitle,
} from "@/types/flight/myTravellers.types";

type MyTravellerFormProps = {
  selectedTraveller: MyTraveller | null;
  isSubmitting: boolean;
  onSubmit: (payload: MyTravellerFormPayload) => void;
  onCancel: () => void;
};

const emptyForm: MyTravellerFormPayload = {
  passenger_type: "ADT",
  title: "MR",
  given_name: "",
  surname: "",
  gender: "M",
  date_of_birth: "",
  phone: "",
  nationality: "BD",
  passport_no: "",
  passport_nationality: "BD",
  passport_issuing_country: "BD",
  passport_expire_date: "",
};

const getInitialForm = (
  selectedTraveller: MyTraveller | null,
): MyTravellerFormPayload => {
  if (!selectedTraveller) return emptyForm;

  return {
    passenger_type: selectedTraveller.passenger_type,
    title: selectedTraveller.title,
    given_name: selectedTraveller.given_name || "",
    surname: selectedTraveller.surname || "",
    gender: selectedTraveller.gender,
    date_of_birth: selectedTraveller.date_of_birth || "",
    phone: selectedTraveller.phone || "",
    nationality: selectedTraveller.nationality || "BD",
    passport_no: selectedTraveller.passport_no || "",
    passport_nationality: selectedTraveller.passport_nationality || "BD",
    passport_issuing_country:
      selectedTraveller.passport_issuing_country || "BD",
    passport_expire_date: selectedTraveller.passport_expire_date || "",
  };
};

const MyTravellerForm = ({
  selectedTraveller,
  isSubmitting,
  onSubmit,
  onCancel,
}: MyTravellerFormProps) => {
  const [form, setForm] = useState<MyTravellerFormPayload>(() =>
    getInitialForm(selectedTraveller),
  );

  const updateField = <K extends keyof MyTravellerFormPayload>(
    field: K,
    value: MyTravellerFormPayload[K],
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      !form.given_name ||
      !form.surname ||
      !form.date_of_birth ||
      !form.phone ||
      !form.passport_no ||
      !form.passport_expire_date
    ) {
      alert("Please fill all required fields.");
      return;
    }

    onSubmit({
      ...form,
      given_name: form.given_name.trim().toUpperCase(),
      surname: form.surname.trim().toUpperCase(),
      passport_no: form.passport_no.trim().toUpperCase(),
      nationality: form.nationality.trim().toUpperCase(),
      passport_nationality: form.passport_nationality.trim().toUpperCase(),
      passport_issuing_country: form.passport_issuing_country
        .trim()
        .toUpperCase(),
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border bg-card p-5 shadow-sm"
    >
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-card-foreground">
            {selectedTraveller ? "Update Traveller" : "Add New Traveller"}
          </h2>
          <p className="text-sm text-muted-foreground">
            Save traveller information for faster PNR creation.
          </p>
        </div>

        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-muted"
        >
          Cancel
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div>
          <label className="mb-1 block text-sm font-medium">
            Passenger Type
          </label>
          <select
            value={form.passenger_type}
            onChange={(event) =>
              updateField("passenger_type", event.target.value as PassengerType)
            }
            className="w-full rounded-lg border bg-background px-3 py-2 outline-none focus:ring-2 focus:ring-primary/40"
          >
            <option value="ADT">Adult</option>
            <option value="CHD">Child</option>
            <option value="INF">Infant</option>
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Title</label>
          <select
            value={form.title}
            onChange={(event) =>
              updateField("title", event.target.value as TravellerTitle)
            }
            className="w-full rounded-lg border bg-background px-3 py-2 outline-none focus:ring-2 focus:ring-primary/40"
          >
            <option value="MR">MR</option>
            <option value="MRS">MRS</option>
            <option value="MS">MS</option>
            <option value="MSTR">MSTR</option>
            <option value="MISS">MISS</option>
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Gender</label>
          <select
            value={form.gender}
            onChange={(event) =>
              updateField("gender", event.target.value as TravellerGender)
            }
            className="w-full rounded-lg border bg-background px-3 py-2 outline-none focus:ring-2 focus:ring-primary/40"
          >
            <option value="M">Male</option>
            <option value="F">Female</option>
          </select>
        </div>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium">
            Given Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={form.given_name}
            onChange={(event) => updateField("given_name", event.target.value)}
            className="w-full rounded-lg border bg-background px-3 py-2 uppercase outline-none focus:ring-2 focus:ring-primary/40"
            placeholder="JOHN"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            Surname <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={form.surname}
            onChange={(event) => updateField("surname", event.target.value)}
            className="w-full rounded-lg border bg-background px-3 py-2 uppercase outline-none focus:ring-2 focus:ring-primary/40"
            placeholder="DOE"
          />
        </div>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <div>
          <label className="mb-1 block text-sm font-medium">
            Date of Birth <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            value={form.date_of_birth}
            onChange={(event) =>
              updateField("date_of_birth", event.target.value)
            }
            className="w-full rounded-lg border bg-background px-3 py-2 outline-none focus:ring-2 focus:ring-primary/40"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            Phone <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            value={form.phone}
            onChange={(event) => updateField("phone", event.target.value)}
            className="w-full rounded-lg border bg-background px-3 py-2 outline-none focus:ring-2 focus:ring-primary/40"
            placeholder="+8801712345678"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Nationality</label>
          <input
            type="text"
            value={form.nationality}
            onChange={(event) =>
              updateField("nationality", event.target.value.toUpperCase())
            }
            className="w-full rounded-lg border bg-background px-3 py-2 uppercase outline-none focus:ring-2 focus:ring-primary/40"
            placeholder="BD"
            maxLength={2}
          />
        </div>
      </div>

      <div className="mt-6 border-t pt-5">
        <h3 className="mb-4 text-base font-semibold">Passport Information</h3>

        <div className="grid gap-4 md:grid-cols-4">
          <div>
            <label className="mb-1 block text-sm font-medium">
              Passport No <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={form.passport_no}
              onChange={(event) =>
                updateField("passport_no", event.target.value)
              }
              className="w-full rounded-lg border bg-background px-3 py-2 uppercase outline-none focus:ring-2 focus:ring-primary/40"
              placeholder="AB123456"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              Passport Nationality
            </label>
            <input
              type="text"
              value={form.passport_nationality}
              onChange={(event) =>
                updateField(
                  "passport_nationality",
                  event.target.value.toUpperCase(),
                )
              }
              className="w-full rounded-lg border bg-background px-3 py-2 uppercase outline-none focus:ring-2 focus:ring-primary/40"
              placeholder="BD"
              maxLength={2}
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              Issuing Country
            </label>
            <input
              type="text"
              value={form.passport_issuing_country}
              onChange={(event) =>
                updateField(
                  "passport_issuing_country",
                  event.target.value.toUpperCase(),
                )
              }
              className="w-full rounded-lg border bg-background px-3 py-2 uppercase outline-none focus:ring-2 focus:ring-primary/40"
              placeholder="BD"
              maxLength={2}
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              Expire Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={form.passport_expire_date}
              onChange={(event) =>
                updateField("passport_expire_date", event.target.value)
              }
              className="w-full rounded-lg border bg-background px-3 py-2 outline-none focus:ring-2 focus:ring-primary/40"
            />
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border px-5 py-2 text-sm font-medium hover:bg-muted"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting
            ? "Saving..."
            : selectedTraveller
              ? "Update Traveller"
              : "Create Traveller"}
        </button>
      </div>
    </form>
  );
};

export default MyTravellerForm;