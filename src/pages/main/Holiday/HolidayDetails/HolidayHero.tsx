import { CalendarDays, MapPin } from "lucide-react";

interface Props {
  name: string;
  cityName?: string | null;
  countryName?: string | null;
  durationDays?: string | number | null;
}

const HolidayHero = ({
  name,
  cityName,
  countryName,
  durationDays,
}: Props) => {
  return (
    <div>
      <h1 className="max-w-4xl text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:mt-12 lg:text-5xl">
        {name}
      </h1>

      <div className="mt-5 flex flex-wrap gap-5 text-sm font-medium text-muted-foreground">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-primary" />
          <span>
            {cityName}, {countryName}
          </span>
        </div>

        {durationDays && (
          <div className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-primary" />
            <span>{durationDays} Days</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default HolidayHero;