import { fares } from "./FlightConfigData";

type FareTypeProps = {
  fareType: string;
  onChange: (value: string) => void;
};

const FareType = ({ fareType, onChange }: FareTypeProps) => {

  return (
    <div className="flex flex-wrap items-center gap-6 mt-4 mb-4 lg:mb-0">
      {fares.map((fare) => {
        const isActive = fareType === fare.value;

        return (
          <label
            key={fare.value}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div
              className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                isActive ? "border-primary" : "border-slate-400"
              }`}
            >
              {isActive && (
                <div className="w-2.5 h-2.5 rounded-full bg-primary" />
              )}
            </div>

            <span className={`text-sm lg:text-base ${isActive ? "text-primary" : ""}`}>{fare.label}</span>

            <input
              type="radio"
              className="hidden"
              checked={isActive}
              onChange={() => onChange(fare.value)}
            />
          </label>
        );
      })}
    </div>
  );
};

export default FareType;
