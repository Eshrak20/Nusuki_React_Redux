import { useFlightTourListsQuery } from "@/redux/api/flightApi/flightTour";

const FlightTourPackages = () => {
  const { data, isLoading, error } = useFlightTourListsQuery();

  if (isLoading) return <p>Loading tours...</p>;
  if (error) return <p>Failed to load tours</p>;

  const tours = data?.data.data;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {tours?.map((tour) => (
        <div key={tour.id} className="border rounded p-3">
          <img
            src={tour.image_url}
            alt={tour.package_title}
            className="w-full h-40 object-cover rounded"
          />

          <h2 className="font-bold mt-2">{tour.package_title}</h2>

          <p className="text-sm text-gray-500">
            📍 {tour.destination.name}
          </p>

          <p className="text-sm">
            ⭐ {tour.rating} ({tour.review_count} reviews)
          </p>

          <p className="font-semibold mt-1">
            ৳ {tour.price}
          </p>
        </div>
      ))}
    </div>
  );
};

export default FlightTourPackages;