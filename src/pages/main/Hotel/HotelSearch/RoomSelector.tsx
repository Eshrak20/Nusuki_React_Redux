import type { HotelRoom } from "@/types/hotel/types.hotel";
import { Minus, Plus, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ExtendedHotelRoom extends HotelRoom {
  child_ages?: number[];
}

type RoomSelectorProps = {
  rooms: ExtendedHotelRoom[];
  setRooms: React.Dispatch<React.SetStateAction<ExtendedHotelRoom[]>>;
  onClose?: () => void;
};

const MAX_ROOMS = 5;
const MAX_ADULTS = 4;
const MAX_CHILDREN = 2;

const RoomSelector = ({ rooms, setRooms, onClose }: RoomSelectorProps) => {
  const handleReset = () => setRooms([{ adults: 2, children: 0, child_ages: [] }]);

  const updateRoom = (index: number, field: "adults" | "children", value: number) => {
    setRooms((prev) =>
      prev.map((room, roomIndex) => {
        if (roomIndex !== index) return room;
        if (field === "adults") return { ...room, adults: Math.max(1, Math.min(MAX_ADULTS, value)) };
        if (field === "children") {
          const safeChildren = Math.max(0, Math.min(MAX_CHILDREN, value));
          const currentAges = [...(room.child_ages || [])];
          if (safeChildren > currentAges.length) currentAges.push(5);
          else if (safeChildren < currentAges.length) currentAges.pop();
          return { ...room, children: safeChildren, child_ages: currentAges };
        }
        return room;
      })
    );
  };

  const updateChildAge = (roomIndex: number, childIndex: number, age: number) => {
    setRooms((prev) =>
      prev.map((room, idx) => {
        if (idx !== roomIndex) return room;
        const updatedAges = [...(room.child_ages || [])];
        updatedAges[childIndex] = age;
        return { ...room, child_ages: updatedAges };
      })
    );
  };

  const addRoom = () => {
    if (rooms.length < MAX_ROOMS) setRooms([...rooms, { adults: 2, children: 0, child_ages: [] }]);
  };

  const removeRoom = (index: number) => {
    if (rooms.length > 1) setRooms(rooms.filter((_, i) => i !== index));
  };

  return (
    <div className="w-full bg-white dark:bg-background p-5 rounded-sm shadow-lg border border-slate-100">
      {/* Header */}
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-800 dark:text-foreground">Guest's & Rooms</h3>
          <p className="text-xs text-slate-400">Choose a person to join you on your journey</p>
        </div>
        <Button 
          onClick={handleReset} 
          className="bg-primary text-primary-foreground hover:bg-primary/90 h-8 px-4 rounded-sm font-bold"
        >
          Reset
        </Button>
      </div>

      {/* Room List Scrollable */}
      <div className="max-h-90 overflow-y-auto pr-2 space-y-6 custom-scrollbar">
        {rooms.map((room, index) => (
          <div key={index} className="space-y-4">
            {/* Room Title with Remove Button */}
            <div className="flex items-center justify-between pb-2">
              <div className="flex items-center gap-4">
                <span className="font-bold text-slate-700 dark:text-foreground">Room {index + 1}</span>
                {rooms.length > 1 && (
                  <button 
                    onClick={() => removeRoom(index)} 
                    className="text-sm font-bold text-red-500 hover:text-red-600"
                  >
                    Remove
                  </button>
                )}
              </div>
              <span className="text-xs font-medium text-slate-400">
                {room.adults} Adults, {room.children} Children
              </span>
            </div>

            {/* Adults Selector */}
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-slate-800 dark:text-foreground">Adults</p>
                <p className="text-xs text-slate-400">17+ years</p>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => updateRoom(index, "adults", room.adults - 1)}
                  disabled={room.adults <= 1}
                  className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-primary text-primary transition disabled:border-slate-100 disabled:text-slate-300"
                >
                  <Minus className="h-5 w-5" />
                </button>
                <span className="w-4 text-center font-bold text-slate-800 text-lg dark:text-foreground/60">{room.adults}</span>
                <button
                  onClick={() => updateRoom(index, "adults", room.adults + 1)}
                  disabled={room.adults >= MAX_ADULTS}
                  className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-primary text-primary transition disabled:border-slate-100 disabled:text-slate-300"
                >
                  <Plus className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Children Selector */}
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-slate-800 dark:text-foreground">Children</p>
                <p className="text-xs text-slate-400">1 - 17 years</p>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => updateRoom(index, "children", room.children - 1)}
                  disabled={room.children <= 0}
                  className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-primary text-primary transition disabled:border-slate-100 disabled:text-slate-300"
                >
                  <Minus className="h-5 w-5" />
                </button>
                <span className="w-4 text-center font-bold text-slate-800 text-lg dark:text-foreground/60">{room.children}</span>
                <button
                  onClick={() => updateRoom(index, "children", room.children + 1)}
                  disabled={room.children >= MAX_CHILDREN}
                  className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-primary text-primary transition disabled:border-slate-100 disabled:text-slate-300"
                >
                  <Plus className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Child Age Dropdowns */}
            {room.children > 0 && (
              <div className="space-y-3 pt-2">
                {Array.from({ length: room.children }).map((_, childIdx) => (
                  <div key={childIdx} className="flex items-center justify-between">
                    <label className="text-sm text-slate-500 font-medium">Age of Child {childIdx + 1}</label>
                    <div className="relative">
                      <select
                        value={room.child_ages?.[childIdx] || 5}
                        onChange={(e) => updateChildAge(index, childIdx, Number(e.target.value))}
                        className="appearance-none rounded-sm border border-slate-200 bg-white py-2 pl-4 pr-10 text-sm font-bold text-slate-700 outline-none focus:border-primary"
                      >
                        {Array.from({ length: 17 }, (_, i) => i + 1).map((age) => (
                          <option key={age} value={age}>{age < 10 ? `0${age}` : age} Years</option>
                        ))}
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Bottom Buttons */}
      <div className="mt-8 space-y-3">
        {rooms.length < MAX_ROOMS && (
          <Button
            variant="ghost"
            onClick={addRoom}
            className="w-full h-12 flex items-center justify-center gap-2 rounded-sm text-primary bg-primary/5 hover:bg-primary/10 font-bold border-none"
          >
            <Plus className="h-5 w-5" />
            Add another Room
          </Button>
        )}
        <Button
          onClick={onClose}
          className="w-full h-14 rounded-sm bg-primary text-primary-foreground font-bold text-lg hover:bg-primary/90 transition-all shadow-lg active:scale-[0.98]"
        >
          Done
        </Button>
      </div>
    </div>
  );
};

export default RoomSelector;