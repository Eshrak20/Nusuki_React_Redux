import { UsersRound } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SearchField } from "./SearchField";
import type { ExtendedHotelRoom } from "./HotelSearch";
import RoomSelector from "./RoomSelector";

type Props = {
  open: boolean;
  rooms: ExtendedHotelRoom[];
  onOpenChange: (open: boolean) => void;
  setRooms: React.Dispatch<React.SetStateAction<ExtendedHotelRoom[]>>;
};

export function GuestsField({ open, rooms, onOpenChange, setRooms }: Props) {
  const totalGuests = rooms.reduce(
    (total, room) => total + room.adults + room.children,
    0
  );

  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <button id="guests-trigger" type="button" className="text-left">
          <SearchField
            icon={<UsersRound className="h-5 w-5 text-slate-400" />}
          >
            <p className="text-sm font-semibold text-slate-800">
              {totalGuests} Guests
            </p>
            <p className="text-xs text-slate-500">
              {rooms.length} {rooms.length > 1 ? "Rooms" : "Room"}
            </p>
          </SearchField>
        </button>
      </PopoverTrigger>

      <PopoverContent
        side="bottom"
        align="end"
        sideOffset={12}
        className="w-screen max-w-95 rounded-xl border-none bg-white p-0 shadow-2xl"
      >
        <RoomSelector
          rooms={rooms}
          setRooms={setRooms}
          onClose={() => onOpenChange(false)}
        />
      </PopoverContent>
    </Popover>
  );
}