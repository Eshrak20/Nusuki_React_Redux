import HotelRoomCard from "./HotelRoomCard";

const HotelRoomsSection = ({ rooms }: { rooms: any[] }) => {
  if (!rooms?.length) return null;

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-slate-950">Available Rooms</h2>
          <p className="mt-1 text-sm text-slate-500">
            Choose your preferred room and rate plan.
          </p>
        </div>

        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-[#14275f]">
          {rooms.length} rooms
        </span>
      </div>

      <div className="mt-5 space-y-4">
        {rooms.map((room, index) => (
          <HotelRoomCard
            key={`${room.room_id}-${index}`}
            room={room}
            index={index}
          />
        ))}
      </div>
    </section>
  );
};

export default HotelRoomsSection;