import { useState } from "react";
import { motion } from "framer-motion";
import { BedDouble } from "lucide-react";

import HotelRoomCard from "./HotelRoomCard";
import HotelPriceCheckModal from "./HotelPriceCheckModal";

import { useGetPriceCheckMutation } from "@/redux/api/hotelApi/hotelApi";

import type { HotelPriceCheckResponse } from "@/types/hotel/type.room.types";
import type {
  HotelAvailableRoom,
  HotelRatePlan,
  HotelStay,
} from "@/types/hotel/hotelDetail.types";
import { getApiErrorMessage } from "@/lib/apiError";

type HotelRoomsSectionProps = {
  rooms?: HotelAvailableRoom[];
  searchId?: string;
  stay?: HotelStay;
};

const HotelRoomsSection = ({ rooms = [], searchId }: HotelRoomsSectionProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [priceCheckData, setPriceCheckData] =
    useState<HotelPriceCheckResponse | null>(null);
  const [priceCheckError, setPriceCheckError] = useState<string | null>(null);

  const [getPriceCheck, { isLoading: priceCheckLoading }] =
    useGetPriceCheckMutation();

  if (!rooms.length) return null;

  const handlePriceCheck = async (
    _room: HotelAvailableRoom,
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
      setPriceCheckError(
        getApiErrorMessage(error, "Unable to check room price."),
      );
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setPriceCheckData(null);
    setPriceCheckError(null);
  };

  return (
    <>
      <motion.section
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="rounded-3xl border border-border bg-card p-5 text-card-foreground shadow-sm md:p-6"
      >
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <BedDouble className="size-5" />
            </div>

            <div>
              <h2 className="text-lg font-bold tracking-tight text-foreground">
                Available Rooms
              </h2>

              <p className="mt-1 text-sm leading-6 text-muted-foreground">
                Choose your preferred room and rate plan.
              </p>
            </div>
          </div>

          <span className="inline-flex items-center rounded-full border border-primary/15 bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
            {rooms.length} {rooms.length > 1 ? "rooms" : "room"}
          </span>
        </div>

        <div className="mt-6 space-y-4">
          {rooms.map((room, index) => (
            <motion.div
              key={`${room.room_id || room.room_index || "room"}-${index}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.25,
                delay: index * 0.04,
                ease: "easeOut",
              }}
            >
              <HotelRoomCard
                room={room}
                index={index}
                onPriceCheck={handlePriceCheck}
              />
            </motion.div>
          ))}
        </div>
      </motion.section>

      <HotelPriceCheckModal
        open={modalOpen}
        onClose={handleModalClose}
        loading={priceCheckLoading}
        data={priceCheckData}
        error={priceCheckError}
        searchId={searchId || ""}
      />
    </>
  );
};

export default HotelRoomsSection;