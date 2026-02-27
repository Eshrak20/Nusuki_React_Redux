import type { PackageItinerary } from "@/types/hajj/types.pack";
import ImageSlider from "@/components/ImageSlider";
import { MapPin, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card"; // Using Shadcn Card for consistency

interface Props {
  itineraries: PackageItinerary[];
}

const UmrahDetPackItinerary = ({ itineraries }: Props) => {
  if (!itineraries || itineraries.length === 0) {
    return (
      <div className="text-muted-foreground py-10 text-center">
        No itinerary data available.
      </div>
    );
  }

  return (
    <section className="py-8 max-w-425 mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl mb-2 font-semibold tracking-tight text-hajj">
          Your itinerary
        </h2>
        <p className="text-sm text-muted-foreground">Included To Package</p>
      </div>

      {/* Grid Layout matches Accommodation grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {itineraries.map((item) => (
          <Card 
            key={item.id} 
            className="overflow-hidden border-border bg-card flex flex-col shadow-sm"
          >
            {/* Top: Image Slider Section */}
            <div className="relative h-56 w-full overflow-hidden">
              <ImageSlider images={item.itinerary.images} />
            </div>

            {/* Bottom: Content Area */}
            <CardContent className="p-5 flex flex-col grow">
              <h3 className="font-bold text-foreground text-lg leading-tight mb-2">
                {item.itinerary.name}
              </h3>
              
              <p className="text-xs text-muted-foreground uppercase font-medium tracking-wide mb-4">
                Your itinerary in {item.itinerary.location}
              </p>

              {/* Scrollable Description Section */}
              <div className="grow">
                <div className="h-32 overflow-y-auto pr-2 custom-scrollbar text-sm text-muted-foreground leading-relaxed mb-4">
                  {item.itinerary.short_description}
                </div>
              </div>

              {/* Activity Duration */}
              <div className="flex items-center text-xs text-muted-foreground mb-5">
                <Clock className="w-3.5 h-3.5 mr-1.5 text-hajj dark:text-hajj" />
                <span>Average activity duration: ~{item.duration} h</span>
              </div>

              {/* Location Button */}
              <button className="flex items-center justify-center gap-2 w-fit bg-hajj text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:opacity-90 transition-all shadow-sm active:scale-95">
                <MapPin className="w-4 h-4" />
                Location
              </button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default UmrahDetPackItinerary;