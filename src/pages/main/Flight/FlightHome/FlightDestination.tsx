import { useFlightDestinationListsQuery } from "@/redux/api/flightApi/flightDest";

const FlightDestination = () => {
  const { data, isLoading, error } = useFlightDestinationListsQuery();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading destinations</p>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {data?.data.data.map((destination) => (
        <div key={destination.id} className="border p-3 rounded">
          <img
            src={destination.image_url}
            alt={destination.name}
            className="w-full h-32 object-cover rounded"
          />
          <h2 className="font-bold mt-2">{destination.name}</h2>
          <p>
            Starting from {destination.starting_price}{" "}
            {destination.currency}
          </p>
        </div>
      ))}
    </div>
  );
};

export default FlightDestination;