import { Minus, Plus, UsersRound } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { SearchField } from "./SearchField";
import type { ExtendedHotelRoom } from "./HotelSearch";

type GuestsFieldProps = {
  open: boolean;
  rooms: ExtendedHotelRoom[];
  setRooms: React.Dispatch<React.SetStateAction<ExtendedHotelRoom[]>>;
  onOpenChange: (open: boolean) => void;
};

export function GuestsField({
  open,
  rooms,
  setRooms,
  onOpenChange,
}: GuestsFieldProps) {
  const totalGuests = rooms.reduce(
    (sum, room) => sum + room.adults + room.children,
    0,
  );

  const totalRooms = rooms.length;

  const updateRoom = (
    roomIndex: number,
    field: "adults" | "children",
    value: number,
  ) => {
    setRooms((prevRooms) =>
      prevRooms.map((room, index) => {
        if (index !== roomIndex) return room;

        const updatedRoom = {
          ...room,
          [field]: value,
        };

        if (field === "children") {
          const currentAges = room.child_ages ?? [];

          updatedRoom.child_ages =
            value > 0
              ? Array.from(
                  { length: value },
                  (_, ageIndex) => currentAges[ageIndex] ?? 5,
                )
              : [];
        }

        return updatedRoom;
      }),
    );
  };

  const updateChildAge = (
    roomIndex: number,
    childIndex: number,
    age: number,
  ) => {
    setRooms((prevRooms) =>
      prevRooms.map((room, index) => {
        if (index !== roomIndex) return room;

        const childAges = [...(room.child_ages ?? [])];
        childAges[childIndex] = age;

        return {
          ...room,
          child_ages: childAges,
        };
      }),
    );
  };

  const addRoom = () => {
    setRooms((prevRooms) => [
      ...prevRooms,
      {
        adults: 1,
        children: 0,
        child_ages: [],
      },
    ]);
  };

  const removeRoom = (roomIndex: number) => {
    setRooms((prevRooms) => prevRooms.filter((_, index) => index !== roomIndex));
  };

  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <button type="button" className="w-full text-left">
          <SearchField
            label=""
            icon={
              <UsersRound className="h-5 w-5 text-slate-600 dark:text-[#8B93FF]" />
            }
            className="cursor-pointer"
          >
            <div className="mt-1">
              <p className="text-sm font-semibold text-slate-800 dark:text-white">
                {totalGuests} Guest{totalGuests > 1 ? "s" : ""}
              </p>

              <p className="text-xs text-slate-500 dark:text-slate-400">
                {totalRooms} Room{totalRooms > 1 ? "s" : ""}
              </p>
            </div>
          </SearchField>
        </button>
      </PopoverTrigger>

      <PopoverContent
        className="w-[320px] border-slate-200 bg-white p-0 text-slate-950 shadow-xl dark:border-[#2B2544] dark:bg-[#0B0B10] dark:text-white"
        align="start"
      >
        <div className="max-h-[430px] overflow-y-auto p-4">
          <div className="space-y-4">
            {rooms.map((room, roomIndex) => (
              <div
                key={roomIndex}
                className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-[#2B2544] dark:bg-[#050018]"
              >
                <div className="mb-4 flex items-center justify-between">
                  <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
                    Room {roomIndex + 1}
                  </h4>

                  {rooms.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeRoom(roomIndex)}
                      className="text-xs font-medium text-red-500 transition hover:text-red-600"
                    >
                      Remove
                    </button>
                  )}
                </div>

                <GuestCounter
                  label="Adults"
                  description="Age 12 or above"
                  value={room.adults}
                  min={1}
                  max={4}
                  onDecrease={() =>
                    updateRoom(roomIndex, "adults", Math.max(1, room.adults - 1))
                  }
                  onIncrease={() =>
                    updateRoom(roomIndex, "adults", Math.min(8, room.adults + 1))
                  }
                />

                <div className="mt-4">
                  <GuestCounter
                    label="Children"
                    description="Age 0 - 11"
                    value={room.children}
                    min={0}
                    max={2}
                    onDecrease={() =>
                      updateRoom(
                        roomIndex,
                        "children",
                        Math.max(0, room.children - 1),
                      )
                    }
                    onIncrease={() =>
                      updateRoom(
                        roomIndex,
                        "children",
                        Math.min(6, room.children + 1),
                      )
                    }
                  />
                </div>

                {room.children > 0 && (
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    {Array.from({ length: room.children }).map((_, childIndex) => (
                      <div key={childIndex}>
                        <label className="text-xs font-medium text-slate-500 dark:text-slate-400">
                          Child {childIndex + 1} Age
                        </label>

                        <select
                          value={room.child_ages?.[childIndex] ?? 5}
                          onChange={(event) =>
                            updateChildAge(
                              roomIndex,
                              childIndex,
                              Number(event.target.value),
                            )
                          }
                          className="mt-1 h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-slate-800 outline-none transition focus:border-primary dark:border-[#2B2544] dark:bg-[#0B0B10] dark:text-white"
                        >
                          {Array.from({ length: 12 }).map((_, age) => (
                            <option key={age} value={age}>
                              {age} Year{age > 1 ? "s" : ""}
                            </option>
                          ))}
                        </select>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={addRoom}
            className="mt-4 flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-[#2B2544] dark:text-[#8B93FF] dark:hover:bg-[#151222]"
          >
            <Plus className="h-4 w-4" />
            Add Room
          </button>
        </div>

        <div className="flex items-center justify-end border-t border-slate-200 p-3 dark:border-[#2B2544]">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="h-10 rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 dark:bg-[#8B93FF] dark:text-[#050018] dark:hover:bg-[#9AA1FF]"
          >
            Done
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

type GuestCounterProps = {
  label: string;
  description: string;
  value: number;
  min: number;
  max: number;
  onDecrease: () => void;
  onIncrease: () => void;
};

const GuestCounter = ({
  label,
  description,
  value,
  min,
  max,
  onDecrease,
  onIncrease,
}: GuestCounterProps) => {
  const isDecreaseDisabled = value <= min;
  const isIncreaseDisabled = value >= max;

  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <p className="text-sm font-semibold text-slate-900 dark:text-white">
          {label}
        </p>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          {description}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onDecrease}
          disabled={isDecreaseDisabled}
          className="flex size-8 items-center justify-center rounded-full border border-slate-300 text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-[#2B2544] dark:text-[#8B93FF] dark:hover:bg-[#151222]"
        >
          <Minus className="h-4 w-4" />
        </button>

        <span className="w-6 text-center text-sm font-bold text-slate-900 dark:text-white">
          {value}
        </span>

        <button
          type="button"
          onClick={onIncrease}
          disabled={isIncreaseDisabled}
          className="flex size-8 items-center justify-center rounded-full border border-slate-300 text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-[#2B2544] dark:text-[#8B93FF] dark:hover:bg-[#151222]"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};