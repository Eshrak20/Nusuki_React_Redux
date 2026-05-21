type Amenity = {
  id?: string;
  code?: number;
  name?: string;
  complimentary?: boolean | null;
  value?: string | null;
};

type HotelAmenitiesSectionProps = {
  amenities?: Amenity[];
};

const HotelAmenitiesSection = ({ amenities = [] }: HotelAmenitiesSectionProps) => {
  if (!amenities.length) return null;

  return (
    <section className="rounded-3xl border bg-card p-5 text-card-foreground shadow-sm">
      <h2 className="text-lg font-bold">Amenities</h2>

      <div className="mt-4 flex flex-wrap gap-2">
        {amenities.map((amenity, index) => (
          <span
            key={`${amenity.id || amenity.code || amenity.name}-${index}`}
            className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary"
          >
            {amenity.name || "Amenity"}
          </span>
        ))}
      </div>
    </section>
  );
};

export default HotelAmenitiesSection;