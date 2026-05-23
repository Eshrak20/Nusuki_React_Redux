import { useState } from "react";
import HotelRoomCard from "./HotelRoomCard";
import HotelPriceCheckModal from "./HotelPriceCheckModal";
import { useGetPriceCheckMutation } from "@/redux/api/hotelApi/hotelApi";

import type { HotelPriceCheckResponse } from "@/types/hotel/type.room.types";
import type {
  HotelAvailableRoom,
  HotelRatePlan,
} from "@/types/hotel/hotelDetail.types";

type HotelRoomsSectionProps = {
  rooms: HotelAvailableRoom[];
  searchId?: string;
};

const HotelRoomsSection = ({ rooms, searchId }: HotelRoomsSectionProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [priceCheckData, setPriceCheckData] =
    useState<HotelPriceCheckResponse | null>(null);
  const [priceCheckError, setPriceCheckError] = useState<string | null>(null);

  const [getPriceCheck, { isLoading: priceCheckLoading }] =
    useGetPriceCheckMutation();

  if (!rooms?.length) return null;

  const handlePriceCheck = async (
    room: HotelAvailableRoom,
    ratePlan: HotelRatePlan,
  ) => {

    const rateKey = ratePlan.rate_key || ratePlan.rate_info?.rate_key;

    setModalOpen(true);
    setPriceCheckData(null);
    setPriceCheckError(null);

    if (!searchId) {
      setPriceCheckError("Search ID is missing.");
      return;
    }

    if (!rateKey) {
      setPriceCheckError("Rate key is missing for this room.");
      return;
    }

    try {
      const result = await getPriceCheck({
        search_id: searchId,
        rate_key: rateKey,
      }).unwrap();

      setPriceCheckData(result);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unable to check room price.";

      setPriceCheckError(message);
    }
  };

  return (
    <>
      <section className="rounded-3xl border bg-card p-5 text-card-foreground shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold">Available Rooms</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Choose your preferred room and rate plan.
            </p>
          </div>

          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
            {rooms.length} rooms
          </span>
        </div>

        <div className="mt-5 space-y-4">
          {rooms.map((room, index) => (
            <HotelRoomCard
              key={`${room.room_id || room.room_index || "room"}-${index}`}
              room={room}
              index={index}
              onPriceCheck={handlePriceCheck}
            />
          ))}
        </div>
      </section>

      <HotelPriceCheckModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        loading={priceCheckLoading}
        data={priceCheckData}
        error={priceCheckError}
        searchId={searchId || ""}
      />
    </>
  );
};

export default HotelRoomsSection;