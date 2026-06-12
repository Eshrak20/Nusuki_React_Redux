import type { PnrFormState } from "@/types/flight/myTravellers.types";
import { errorBorderClass, FieldError, isEmpty } from "./pnrFormHelpers";

type PnrContactInformationProps = {
  form: PnrFormState;
  showValidationErrors: boolean;
  updateForm: <K extends keyof PnrFormState>(
    field: K,
    value: PnrFormState[K],
  ) => void;
};

const PnrContactInformation = ({
  form,
  updateForm,
  showValidationErrors,
}: PnrContactInformationProps) => {
  const getRequiredError = (fieldLabel: string, value?: string | null) => {
    if (!showValidationErrors || !isEmpty(value)) return "";
    return `${fieldLabel} is required.`;
  };

  const contactPhoneError = getRequiredError(
    "Contact phone",
    form.contactPhone,
  );

  const contactEmailError = getRequiredError(
    "Contact email",
    form.contactEmail,
  );

  return (
    <div className="rounded-sm border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-slate-950/70">
      <div className="mb-5">
        <h3 className="text-base font-bold text-slate-900 dark:text-white">
          Contact Information
        </h3>

        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          This contact information will be used for booking communication.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-slate-600 dark:text-slate-300">
            Contact Phone
          </label>

          <input
            id="contactPhone"
            type="tel"
            value={form.contactPhone}
            onChange={(event) =>
              updateForm("contactPhone", event.target.value)
            }
            className={`h-12 w-full rounded-sm border border-slate-200 bg-white px-4 text-sm text-slate-900 shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-white/10 dark:bg-slate-950 dark:text-white ${
              contactPhoneError ? errorBorderClass : ""
            }`}
            placeholder="+8801712345678"
          />

          <FieldError message={contactPhoneError} />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-slate-600 dark:text-slate-300">
            Contact Email
          </label>

          <input
            id="contactEmail"
            type="email"
            value={form.contactEmail}
            onChange={(event) =>
              updateForm("contactEmail", event.target.value)
            }
            className={`h-12 w-full rounded-sm border border-slate-200 bg-white px-4 text-sm text-slate-900 shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-white/10 dark:bg-slate-950 dark:text-white ${
              contactEmailError ? errorBorderClass : ""
            }`}
            placeholder="example@gmail.com"
          />

          <FieldError message={contactEmailError} />
        </div>
      </div>

      <div className="mt-5 flex items-center gap-2 rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 dark:border-white/10 dark:bg-slate-900/50">
        <input
          id="saveTravellers"
          type="checkbox"
          checked={form.saveTravellers}
          onChange={(event) =>
            updateForm("saveTravellers", event.target.checked)
          }
          className="h-4 w-4 accent-primary"
        />

        <label
          htmlFor="saveTravellers"
          className="cursor-pointer text-sm font-medium text-slate-700 dark:text-slate-300"
        >
          Save traveller information for future booking
        </label>
      </div>
    </div>
  );
};

export default PnrContactInformation;