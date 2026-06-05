import { Mail, Phone, UserRound } from "lucide-react";
import type { HotelBookingDetailGuest } from "@/types/hotel/hotelBookingDetails.types";

type HotelBookingGuestListProps = {
  guests: HotelBookingDetailGuest[];
};

const HotelBookingGuestList = ({ guests }: HotelBookingGuestListProps) => {
  return (
    <div className="rounded-sm border bg-card p-5 text-card-foreground shadow-sm sm:p-6">
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-lg font-semibold">Guest Information</h3>

        <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          {guests.length} Guest(s)
        </span>
      </div>

      <div className="mt-4 space-y-3">
        {guests.map((guest) => (
          <div
            key={`${guest.room_index}-${guest.guest_index}`}
            className="rounded-sm border bg-background p-4"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex min-w-0 items-start gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <UserRound size={20} />
                </div>

                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="font-semibold text-foreground">
                      {guest.name || "Guest Name Not Available"}
                    </h4>

                    {guest.lead_guest && (
                      <span className="rounded-full bg-primary px-2 py-0.5 text-[11px] font-semibold text-primary-foreground">
                        Lead Guest
                      </span>
                    )}
                  </div>

                  <p className="mt-1 text-sm capitalize text-muted-foreground">
                    {guest.type} · Room {guest.room_index} · Guest{" "}
                    {guest.guest_index}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="flex min-w-0 items-center gap-2 text-sm">
                <Mail size={15} className="shrink-0 text-primary" />
                <span className="truncate text-muted-foreground">
                  {guest.email || "Email not available"}
                </span>
              </div>

              <div className="flex min-w-0 items-center gap-2 text-sm">
                <Phone size={15} className="shrink-0 text-primary" />
                <span className="truncate text-muted-foreground">
                  {guest.phone || "Phone not available"}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotelBookingGuestList;