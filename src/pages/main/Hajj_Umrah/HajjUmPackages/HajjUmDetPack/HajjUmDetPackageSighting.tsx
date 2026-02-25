import { CheckCircle2, Circle, CircleDollarSign, Clock } from "lucide-react";
import type { PackageSight } from "@/types/hajj/types.pack";

interface HajjUmDetPackageSightingProps {
  sight: PackageSight[];
}

const HajjUmDetPackageSighting = ({
  sight,
}: HajjUmDetPackageSightingProps) => {
  return (
    <div className="w-full max-w-425 mx-auto space-y-8 mb-20 bg-background text-foreground p-6 rounded-lg border border-border/50">
      {/* Title */}
      <h2 className="text-2xl font-bold mb-6 text-foreground">
        Sightseeings
      </h2>

      {/* Legend */}
      <div className="flex gap-6 mb-10 text-sm text-muted-foreground flex-wrap">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
          <span>Included</span>
        </div>

        <div className="flex items-center gap-2">
          <Circle className="w-4 h-4 text-muted-foreground/50" />
          <span>Not Included</span>
        </div>

        <div className="flex items-center gap-2">
          <CircleDollarSign className="w-4 h-4 text-orange-500 dark:text-orange-400" />
          <span>Available at additional fees</span>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {sight.map((group) => (
          <div key={group.category} className="space-y-6">
            {/* Category */}
            <h3 className="font-bold text-lg text-foreground border-b border-border pb-2">
              {group.category}
            </h3>

            {/* Activities */}
            <ul className="space-y-5">
              {group.activities.map((activity) => (
                <li key={activity.id} className="space-y-2">
                  <div className="flex items-start gap-3">
                    {activity.additional_fees ? (
                      <CircleDollarSign className="w-5 h-5 mt-1 text-orange-500 dark:text-orange-400 shrink-0" />
                    ) : (
                      <CheckCircle2 className="w-5 h-5 mt-1 text-emerald-500 dark:text-emerald-400 shrink-0" />
                    )}

                    <span className="text-foreground/90 font-medium">
                      {activity.name}
                    </span>
                  </div>

                  {/* Duration */}
                  <div className="flex items-center gap-3 pl-8 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4 text-muted-foreground/60" />
                    <span>
                      Average activity duration: ~{activity.activity_duration}h
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HajjUmDetPackageSighting;