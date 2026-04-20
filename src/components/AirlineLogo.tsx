import { useState } from "react";
import { Plane } from "lucide-react";
import { getInitials } from "@/lib/utils";

interface AirlineLogoProps {
  logo?: string;
  name: string;
  code?: string;
  className?: string;
  iconClassName?: string;
  textClassName?: string;
  fallbackClassName?: string;
}

const AirlineLogo = ({
  logo,
  name,
  code,
  className = "h-12 w-12",
  iconClassName = "h-4 w-4",
  textClassName = "text-[10px]",
  fallbackClassName = "bg-primary/10 text-primary",
}: AirlineLogoProps) => {
  const [imgError, setImgError] = useState(false);

  if (!logo || imgError) {
    return (
      <div
        className={`flex shrink-0 flex-col items-center justify-center rounded-full border ${fallbackClassName} ${className}`}
      >
        <Plane className={iconClassName} />
        <span className={`mt-0.5 font-bold leading-none ${textClassName}`}>
          {code || getInitials(name)}
        </span>
      </div>
    );
  }

  return (
    <img
      src={logo}
      alt={name}
      onError={() => setImgError(true)}
      className={`shrink-0 rounded-full border object-cover ${className}`}
    />
  );
};

export default AirlineLogo;