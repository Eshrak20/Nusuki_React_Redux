import { useFlightPromoListsQuery } from "@/redux/api/flightApi/flightPromo";

const FlightPromotions = () => {
  const { data, isLoading, error } = useFlightPromoListsQuery();

  if (isLoading) return <p>Loading promotions...</p>;
  if (error) return <p>Failed to load promotions</p>;

  const promotions = data?.data.data;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {promotions?.map((promo) => (
        <div key={promo.id} className="border rounded p-3">
          <img
            src={promo.image_url}
            alt={promo.title}
            className="w-full h-40 object-cover rounded"
          />
          <h2 className="font-bold mt-2">{promo.title}</h2>
          <p className="text-sm text-gray-500">{promo.subtitle}</p>
          <p className="text-sm mt-1">{promo.description}</p>

          <a
            href={promo.link_url}
            target="_blank"
            className="text-blue-500 text-sm mt-2 inline-block"
          >
            View Offer →
          </a>
        </div>
      ))}
    </div>
  );
};

export default FlightPromotions;