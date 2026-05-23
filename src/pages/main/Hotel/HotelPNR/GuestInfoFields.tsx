import type { CreateHotelBookingGuest } from "@/types/hotel/hotelBooking.types";

type GuestInfoFieldsProps = {
  guests: CreateHotelBookingGuest[];
  guestCount : string |null;
  addGuest: () => void;
  removeGuest: (index: number) => void;
  updateGuest: (
    index: number,
    field: keyof CreateHotelBookingGuest,
    value: string,
  ) => void;
};

const GuestInfoFields = ({
  guests,
  guestCount,
  addGuest,
  removeGuest,
  updateGuest,
}: GuestInfoFieldsProps) => {
  console.log(guests);
  
  return (
    <div className="rounded-2xl border bg-card p-5 text-card-foreground shadow-sm sm:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold">Guest Information</h2>
          <p className="text-sm text-muted-foreground">
            Guest email and phone are optional.
          </p>
        </div>

        <button
          type="button"
          onClick={addGuest}
          className="h-10 rounded-xl border px-4 text-sm font-medium transition hover:bg-muted"
        >
          Add Guest
        </button>
      </div>

      <div className="mt-5 space-y-5">
        {guests.map((guest, index) => (
          <div key={index} className="rounded-2xl border bg-background p-4">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h3 className="font-medium">Guest {index + 1}</h3>

              {guests.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeGuest(index)}
                  className="text-sm font-medium text-destructive"
                >
                  Remove
                </button>
              )}
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-sm font-medium">Guest Type</label>
                <select
                  value={guest.type}
                  onChange={(event) =>
                    updateGuest(index, "type", event.target.value)
                  }
                  className="mt-2 h-11 w-full rounded-xl border bg-background px-3 text-sm outline-none transition focus:border-primary"
                >
                  <option value="adult">Adult</option>
                  <option value="child">Child</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium">First Name</label>
                <input
                  required
                  value={guest.first_name}
                  onChange={(event) =>
                    updateGuest(index, "first_name", event.target.value)
                  }
                  placeholder="First name"
                  className="mt-2 h-11 w-full rounded-xl border bg-background px-3 text-sm outline-none transition focus:border-primary"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Last Name</label>
                <input
                  required
                  value={guest.last_name}
                  onChange={(event) =>
                    updateGuest(index, "last_name", event.target.value)
                  }
                  placeholder="Last name"
                  className="mt-2 h-11 w-full rounded-xl border bg-background px-3 text-sm outline-none transition focus:border-primary"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Email Optional</label>
                <input
                  type="email"
                  value={guest.email || ""}
                  onChange={(event) =>
                    updateGuest(index, "email", event.target.value)
                  }
                  placeholder="Guest email"
                  className="mt-2 h-11 w-full rounded-xl border bg-background px-3 text-sm outline-none transition focus:border-primary"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Phone Optional</label>
                <input
                  value={guest.phone || ""}
                  onChange={(event) =>
                    updateGuest(index, "phone", event.target.value)
                  }
                  placeholder="Guest phone"
                  className="mt-2 h-11 w-full rounded-xl border bg-background px-3 text-sm outline-none transition focus:border-primary"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GuestInfoFields;