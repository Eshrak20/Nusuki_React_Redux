import { CheckCircle2, CircleDollarSign } from "lucide-react";
import type { PackageServices } from "@/types/hajj/types.pack";

interface HajjUmDetPackageServicesProps {
  services: PackageServices[];
}

const HajjUmDetPackageServices = ({
  services,
}: HajjUmDetPackageServicesProps) => {
  return (
    <div className="w-full max-w-425 mx-auto space-y-8 mb-20 bg-background text-foreground p-6 rounded-lg border border-border/50">
      {/* Title */}
      <h2 className="text-2xl font-bold mb-6 text-foreground">
        Package Services
      </h2>

      {/* Legend */}
      <div className="flex gap-6 mb-8 text-sm text-muted-foreground flex-wrap">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
          <span>Included</span>
        </div>
        <div className="flex items-center gap-2">
          <CircleDollarSign className="w-4 h-4 text-orange-500 dark:text-orange-400" />
          <span>Available at additional fees</span>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {services.map((group, idx) => (
          <div key={idx} className="space-y-4">
            {/* Category Header */}
            <h3 className="font-bold text-lg text-foreground border-b border-border pb-2">
              {group.category}
            </h3>
            
            <ul className="space-y-3">
              {group.services.map((service) => (
                <li
                  key={service.id}
                  className="flex items-start gap-3 group"
                >
                  {service.additional_fees ? (
                    <CircleDollarSign className="w-5 h-5 mt-0.5 text-orange-500 dark:text-orange-400 shrink-0" />
                  ) : (
                    <CheckCircle2 className="w-5 h-5 mt-0.5 text-emerald-500 dark:text-emerald-400 shrink-0" />
                  )}
                  <span className="text-muted-foreground text-sm leading-tight group-hover:text-foreground transition-colors">
                    {service.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HajjUmDetPackageServices;