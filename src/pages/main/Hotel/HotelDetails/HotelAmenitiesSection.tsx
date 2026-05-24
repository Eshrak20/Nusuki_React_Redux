

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

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

const HotelAmenitiesSection = ({
  amenities = [],
}: HotelAmenitiesSectionProps) => {
  if (!amenities.length) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="rounded-3xl border border-border bg-card p-5 text-card-foreground shadow-sm md:p-6"
    >
      <div className="flex items-center gap-2">
        <div className="flex size-9 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <Sparkles className="size-4" />
        </div>

        <div>
          <h2 className="text-lg font-bold tracking-tight">Amenities</h2>
          <p className="text-sm text-muted-foreground">
            Facilities available at this hotel
          </p>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {amenities.map((amenity, index) => (
          <motion.span
            key={`${amenity.id || amenity.code || amenity.name}-${index}`}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.25,
              delay: index * 0.025,
              ease: "easeOut",
            }}
            className="inline-flex items-center rounded-full border border-primary/15 bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary transition-colors hover:bg-primary/15"
          >
            {amenity.name || "Amenity"}
          </motion.span>
        ))}
      </div>
    </motion.section>
  );
};

export default HotelAmenitiesSection;