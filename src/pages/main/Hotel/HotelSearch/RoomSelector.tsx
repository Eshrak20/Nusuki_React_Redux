import type { HotelRoom } from "@/types/hotel/types.hotel";
import { Minus, Plus } from "lucide-react";

type RoomSelectorProps = {
  rooms: HotelRoom[];
  setRooms: React.Dispatch<React.SetStateAction<HotelRoom[]>>;
};

const RoomSelector = ({ rooms, setRooms }: RoomSelectorProps) => {
  const updateRoom = (
    index: number,
    field: keyof HotelRoom,
    value: number
  ) => {
    setRooms((prev) =>
      prev.map((room, roomIndex) =>
        roomIndex === index
          ? {
              ...room,
              [field]: Math.max(0, value),
            }
          : room
      )
    );
  };

  const addRoom = () => {
    setRooms((prev) => [...prev, { adults: 1, children: 0 }]);
  };

  const removeRoom = (index: number) => {
    if (rooms.length === 1) return;

    setRooms((prev) => prev.filter((_, roomIndex) => roomIndex !== index));
  };

  const totalGuests = rooms.reduce(
    (total, room) => total + room.adults + room.children,
    0
  );

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-4">
        <p className="text-sm font-semibold text-slate-800">
          {totalGuests} Guests
        </p>
        <p className="text-xs text-slate-500">{rooms.length} Room</p>
      </div>

      <div className="space-y-4">
        {rooms.map((room, index) => (
          <div
            key={index}
            className="rounded-lg border border-slate-100 bg-slate-50 p-3"
          >
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-700">
                Room {index + 1}
              </p>

              {rooms.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeRoom(index)}
                  className="text-xs font-medium text-red-500"
                >
                  Remove
                </button>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-700">Adults</p>
                <p className="text-xs text-slate-400">Age 12+</p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() =>
                    updateRoom(index, "adults", room.adults - 1)
                  }
                  className="grid h-7 w-7 place-items-center rounded-full border border-slate-300"
                >
                  <Minus className="h-3 w-3" />
                </button>

                <span className="w-5 text-center text-sm font-semibold">
                  {room.adults}
                </span>

                <button
                  type="button"
                  onClick={() =>
                    updateRoom(index, "adults", room.adults + 1)
                  }
                  className="grid h-7 w-7 place-items-center rounded-full border border-slate-300"
                >
                  <Plus className="h-3 w-3" />
                </button>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-700">Children</p>
                <p className="text-xs text-slate-400">Below 12</p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() =>
                    updateRoom(index, "children", room.children - 1)
                  }
                  className="grid h-7 w-7 place-items-center rounded-full border border-slate-300"
                >
                  <Minus className="h-3 w-3" />
                </button>

                <span className="w-5 text-center text-sm font-semibold">
                  {room.children}
                </span>

                <button
                  type="button"
                  onClick={() =>
                    updateRoom(index, "children", room.children + 1)
                  }
                  className="grid h-7 w-7 place-items-center rounded-full border border-slate-300"
                >
                  <Plus className="h-3 w-3" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={addRoom}
        className="mt-4 w-full rounded-lg border border-orange-400 py-2 text-sm font-semibold text-orange-500 transition hover:bg-orange-50"
      >
        Add Room
      </button>
    </div>
  );
};

export default RoomSelector;