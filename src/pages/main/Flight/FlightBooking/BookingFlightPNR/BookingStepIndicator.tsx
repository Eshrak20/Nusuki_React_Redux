import { ChevronRight } from "lucide-react";

const steps = [
  {
    key: "A",
    title: "Add Passenger",
    subtitle: "Enter passenger info",
    active: true,
  },
  {
    key: "R",
    title: "Review Booking",
    subtitle: "Confirm details",
    active: false,
  },
  {
    key: "C",
    title: "Confirmation",
    subtitle: "Booking confirmed",
    active: false,
  },
];

const BookingStepIndicator = () => {
  return (
    <div className="hidden sm:flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground md:flex-row">
      {steps.map((step, index) => (
        <div key={step.key} className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div
              className={`flex h-6 w-6 items-center justify-center rounded-full border ${step.active
                  ? "border-primary text-primary"
                  : "border-muted-foreground"
                }`}
            >
              {step.key}
            </div>

            <span className={step.active ? "font-medium text-primary" : ""}>
              {step.title}
              <br />
              <span className="text-xs font-normal text-muted-foreground">
                {step.subtitle}
              </span>
            </span>
          </div>

          {index < steps.length - 1 ? <ChevronRight className="h-4 w-4" /> : null}
        </div>
      ))}
    </div>
  );
};

export default BookingStepIndicator;