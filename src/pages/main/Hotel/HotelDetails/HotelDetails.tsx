import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useGetHotelDetailMutation } from "@/redux/api/hotelApi/hotelApi";
import HotelDetailsHero from "./HotelDetailsHero";
import HotelStaySummary from "./HotelStaySummary";
import HotelDescriptionSection from "./HotelDescriptionSection";
import HotelAmenitiesSection from "./HotelAmenitiesSection";
import HotelRoomsSection from "./HotelRoomsSection";
import HotelContactCard from "./HotelContactCard";

const HotelDetails = () => {
  const { search_id: searchId, hotel_id: hotelId } = useParams<{
    search_id: string;
    hotel_id: string;
  }>();

  const [getHotelDetail, { data, isLoading, isError }] =
    useGetHotelDetailMutation();

  useEffect(() => {
    if (!searchId || !hotelId) return;

    getHotelDetail({
      search_id: searchId,
      hotel_id: hotelId,
    });
  }, [searchId, hotelId, getHotelDetail]);

  const detail = data?.data;
  const hotel = detail?.hotel;
  const stay = detail?.stay;
  const rooms = detail?.rooms ?? [];

  if (!searchId || !hotelId) {
    return (
      <div className="min-h-screen bg-slate-50 px-4 py-10">
        <div className="mx-auto max-w-6xl rounded-2xl border bg-white p-8 text-center">
          <h2 className="text-xl font-bold text-slate-900">
            Missing hotel information
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Search ID or Hotel ID was not found.
          </p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="flex items-center gap-3 rounded-2xl bg-white px-6 py-4 shadow-sm">
          <Loader2 className="h-5 w-5 animate-spin text-[#14275f]" />
          <span className="text-sm font-medium text-slate-700">
            Loading hotel details...
          </span>
        </div>
      </div>
    );
  }

  if (isError || !hotel) {
    return (
      <div className="min-h-screen bg-slate-50 px-4 py-10">
        <div className="mx-auto max-w-6xl rounded-2xl border bg-white p-8 text-center">
          <h2 className="text-xl font-bold text-slate-900">
            Hotel details not found
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Please go back and try again.
          </p>
        </div>
      </div>
    );
  }
  return (
    <main className="min-h-screen bg-slate-50 px-3 py-5 sm:px-5 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-5">
        <HotelDetailsHero hotel={hotel} />

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_330px]">
          <div className="space-y-5">
            <HotelStaySummary stay={stay} />
            <HotelDescriptionSection descriptions={hotel.descriptions} />
            <HotelAmenitiesSection amenities={hotel.amenities} />
            <HotelRoomsSection
              rooms={rooms || []}
              searchId={detail?.search_id}
            />
          </div>

          <div className="space-y-5">
            <HotelContactCard hotel={hotel} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default HotelDetails;
