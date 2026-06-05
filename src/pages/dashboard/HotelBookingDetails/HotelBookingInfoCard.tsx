type HotelBookingInfoCardProps = {
  icon: React.ReactNode;
  label: string;
  value: string;
};

const HotelBookingInfoCard = ({
  icon,
  label,
  value,
}: HotelBookingInfoCardProps) => {
  return (
    <div className="rounded-sm border bg-card p-4 text-card-foreground shadow-sm">
      <div className="flex items-start gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
          {icon}
        </div>

        <div className="min-w-0">
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="mt-1 break-words text-base font-semibold text-foreground">
            {value || "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default HotelBookingInfoCard;