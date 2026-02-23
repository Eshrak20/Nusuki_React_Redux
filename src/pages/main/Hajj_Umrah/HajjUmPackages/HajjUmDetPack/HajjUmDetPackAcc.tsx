import type { PackageAccommodation } from "@/types/hajj/types.pack";

interface Props {
  accommodations: PackageAccommodation[];
}

const HajjUmDetPackAcc = ({ accommodations }: Props) => {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">
        Accommodation
      </h3>

      <div className="space-y-6">
        {accommodations.map((item) => (
          <div key={item.id} className="border p-4 rounded-lg">
            <h4 className="text-lg font-semibold">
              {item.accommodation.name}
            </h4>

            <p className="text-sm text-gray-500">
              {item.accommodation.location}
            </p>

            <p className="mt-2 text-gray-700">
              {item.accommodation.short_description}
            </p>

            <p className="mt-2">
              ⭐ Rating: {item.accommodation.rating}
            </p>

            <p>
              🛏 Nights: {item.nights}
            </p>

            <div className="flex gap-3 mt-3 flex-wrap">
              {item.accommodation.images.map((img) => (
                <img
                  key={img.id}
                  src={img.image_url}
                  alt="Accommodation"
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

export default HajjUmDetPackAcc;