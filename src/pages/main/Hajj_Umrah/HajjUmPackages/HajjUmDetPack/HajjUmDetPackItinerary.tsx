import type { PackageItinerary } from "@/types/hajj/types.pack";

interface Props {
  itineraries: PackageItinerary[];
}

const HajjUmDetPackItinerary = ({ itineraries }: Props) => {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">
        Itinerary
      </h3>

      <div className="space-y-6">
        {itineraries.map((item) => (
          <div key={item.id} className="border p-4 rounded-lg">
            <h4 className="font-semibold text-lg">
              {item.itinerary.name}
            </h4>
            <p className="text-sm text-gray-500">
              {item.itinerary.location}
            </p>
            <p className="mt-2 text-gray-700">
              {item.itinerary.short_description}
            </p>

            <div className="flex gap-3 mt-3 flex-wrap">
              {item.itinerary.images.map((img) => (
                <img
                  key={img.id}
                  src={img.image_url}
                  alt="Itinerary"
                  className="w-24 h-24 object-cover rounded"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HajjUmDetPackItinerary;