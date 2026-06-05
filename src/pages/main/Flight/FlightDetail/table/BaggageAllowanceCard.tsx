import { BriefcaseBusiness } from "lucide-react";

interface Props {
  handBaggage: string;
  checkInBaggage: string;
}

const BaggageAllowanceCard = ({
  handBaggage,
  checkInBaggage,
}: Props) => {
  return (
    <div className="rounded-sm border border-sky-200 bg-sky-50 px-4 py-3 dark:border-sky-900/40 dark:bg-sky-950/30">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 text-sky-600 dark:text-sky-400">
          <BriefcaseBusiness className="h-4 w-4" />
        </div>

        <div>
          <h5 className="text-sm font-semibold text-sky-700 dark:text-sky-300">
            Baggage Allowance
          </h5>

          <p className="mt-1 text-sm text-sky-600 dark:text-sky-400">
            Hand: {handBaggage} | Cabin: {checkInBaggage}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BaggageAllowanceCard;