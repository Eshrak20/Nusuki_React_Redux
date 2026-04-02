import { useFlightTourCollectionListsQuery } from "@/redux/api/flightApi/flightTourCollection";

const FlightTourCollections = () => {
  const { data, isLoading, error } = useFlightTourCollectionListsQuery();

  if (isLoading) return <p>Loading collections...</p>;
  if (error) return <p>Failed to load collections</p>;

  const collections = data?.data.data;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {collections?.map((item) => (
        <div key={item.id} className="relative rounded overflow-hidden">
          <img
            src={item.image_url}
            alt={item.title}
            className="w-full h-40 object-cover"
          />

          <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-3 text-white">
            <h2 className="font-bold">{item.title}</h2>
            <p className="text-sm">{item.subtitle}</p>
            <p className="text-xs mt-1">
              {item.tour_count} tours available
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FlightTourCollections;