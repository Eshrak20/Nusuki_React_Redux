import type { PackageAccommodation } from "@/types/hajj/types.pack";
import ImageSlider from "@/components/ImageSlider"; // Adjust path as needed
import { Moon, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface Props {
  accommodations: PackageAccommodation[];
}

const UmrahDetPackAcc = ({ accommodations }: Props) => {
  if (!accommodations?.length) return null;

  return (
    <section className=" max-w-425 mx-auto my-20">
      <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold tracking-tight text-hajj">
          Accommodation
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {accommodations.map((item) => {
          const acc = item.accommodation;
          const rating = parseInt(acc.rating) || 0;

          return (
            <Card
              key={item.id}
              className="overflow-hidden border-border bg-card"
            >
              {/* Image Section */}
              <div className="relative h-56 w-full overflow-hidden rounded-t-xl">
                <ImageSlider images={acc.images} />
              </div>

              <CardContent className="p-5 space-y-3">
                {/* Rating Stars */}
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < rating
                          ? "fill-orange-400 text-orange-400"
                          : "text-gray-400 border-black fill-transparent"
                      }`}
                    />
                  ))}
                </div>

                {/* Hotel Name & Location */}
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-foreground leading-tight">
                    {acc.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Hotel in {acc.location}
                  </p>
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                  {acc.short_description}
                </p>

                {/* Nights Indicator */}
                <div className="flex items-center gap-2 pt-2 text-hajj dark:text-hajj">
                  <Moon className="w-4 h-4 rotate-15" />
                  <span className="text-sm font-medium">
                    {item.nights} Nights
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
    </section>
  );
};

export default UmrahDetPackAcc;
