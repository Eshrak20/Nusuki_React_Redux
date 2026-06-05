import { cleanText, formatTitle } from "@/lib/util.hotel";
import type { HotelDescription } from "@/types/hotel/hotelDetail.types";
import { motion } from "framer-motion";
import { ChevronDown, FileText } from "lucide-react";
interface HotelDescriptionSectionProps {
  descriptions: HotelDescription[];
}

const HotelDescriptionSection = ({ descriptions }: HotelDescriptionSectionProps) => {
  if (!descriptions?.length) return null;

  const shortDescription =
    descriptions.find((item) => item.type === "ShortDescription") ||
    descriptions[0];

  const otherDescriptions = descriptions.filter(
    (item) => item.type !== shortDescription.type,
  );

return (
    <motion.section
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="rounded-sm border border-border bg-card p-5 text-card-foreground shadow-sm md:p-6"
    >
      <div className="flex items-center gap-2">
        <div className="flex size-9 items-center justify-center rounded-sm bg-primary/10 text-primary">
          <FileText className="size-4" />
        </div>

        <div>
          <h2 className="text-lg font-bold tracking-tight">
            About This Hotel
          </h2>
          <p className="text-sm text-muted-foreground">
            Overview and important details
          </p>
        </div>
      </div>

      <p className="mt-5 whitespace-normal text-sm leading-7 text-muted-foreground">
        {cleanText(shortDescription?.value)}
      </p>

      {otherDescriptions.length > 0 && (
        <div className="mt-5 space-y-3">
          {otherDescriptions.slice(0, 3).map((item, index) => (
            <motion.details
              key={`${item.type}-${index}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.25,
                delay: index * 0.05,
                ease: "easeOut",
              }}
              className="group rounded-sm border border-border bg-muted/35 p-4 transition-colors open:bg-muted/50 hover:bg-muted/50"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-bold text-foreground">
                <span>{formatTitle(item.type)}</span>

                <ChevronDown className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180" />
              </summary>

              <p className="mt-3 whitespace-pre-line text-sm leading-7 text-muted-foreground">
                {cleanText(item.value)}
              </p>
            </motion.details>
          ))}
        </div>
      )}
    </motion.section>
  );
};

export default HotelDescriptionSection;

