import { useCreateHotelBookingMutation } from "@/redux/api/hotelApi/hotelApi";
import type {
  CreateHotelBookingGuest,
  CreateHotelBookingPayment,
  HotelPaymentType,
} from "@/types/hotel/hotelBooking.types";
import { type FormEvent, useMemo, useState } from "react";

import ContactInfoFields from "./ContactInfoFields";
import GuestInfoFields from "./GuestInfoFields";
import PaymentInfoFields from "./PaymentInfoFields";
import HotelPNRSuccessModal from "./HotelPNRSuccessModal";
import type { HotelBookingSuccessResponse } from "@/types/hotel/hoteBookingSucess.types";

type HotelPNRFormProps = {
  searchId: string;
  adults: number | string | null;
  children: number | string | null;
  bookingKey: string;
};

const createEmptyAdultGuest = (): CreateHotelBookingGuest => ({
  type: "adult",
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
});

const createEmptyChildrenGuest = (): CreateHotelBookingGuest => ({
  type: "child",
  first_name: "",
  last_name: "",
});

const createAdultsByCount = (count: number): CreateHotelBookingGuest[] => {
  return Array.from({ length: count }, () => createEmptyAdultGuest());
};
const createChildrenByCount = (count: number): CreateHotelBookingGuest[] => {
  return Array.from({ length: count }, () => createEmptyChildrenGuest());
};

const parseGuestCount = (
  value: number | string | null,
  fallback: number,
) => {
  const parsedValue = Number(value);

  if (!Number.isFinite(parsedValue) || parsedValue < 0) {
    return fallback;
  }

  return parsedValue;
};


const HotelPNRForm = ({
  searchId,
  adults,
  children,
  bookingKey,
}: HotelPNRFormProps) => {
  const [createHotelBooking, { isLoading }] = useCreateHotelBookingMutation();

  const [successData, setSuccessData] =
    useState<HotelBookingSuccessResponse | null>(null);


   const totalAdults = useMemo(() => {
  const count = parseGuestCount(adults, 1);
  return count <= 0 ? 1 : count;
}, [adults]);

const totalChildren = useMemo(() => {
  return parseGuestCount(children, 0);
}, [children]);

const initialGuests = useMemo(
  () => [
    ...createAdultsByCount(totalAdults),
    ...createChildrenByCount(totalChildren),
  ],
  [totalAdults, totalChildren],
);

const [guests, setGuests] = useState<CreateHotelBookingGuest[]>(initialGuests);

  const [contact, setContact] = useState({
    email: "",
    phone: "",
  });


  const [payment, setPayment] = useState<CreateHotelBookingPayment>({
    type: "DEPOSIT",
    card_code: "VI",
    card_number: "",
    expiry_month: 12,
    expiry_year: "",
    cvv: "",
    holder_first_name: "",
    holder_last_name: "",
  });

  const addGuest = () => {
    setGuests((prev) => [...prev, createEmptyAdultGuest()]);
  };

  const removeGuest = (index: number) => {
    setGuests((prev) => {
      if (prev.length <= 1) return prev;

      return prev.filter((_, guestIndex) => guestIndex !== index);
    });
  };

  const updateGuest = (
    index: number,
    field: keyof CreateHotelBookingGuest,
    value: string,
  ) => {
    setGuests((prev) =>
      prev.map((guest, guestIndex) =>
        guestIndex === index ? { ...guest, [field]: value } : guest,
      ),
    );
  };

  const updatePayment = (
    field: keyof CreateHotelBookingPayment,
    value: string | number,
  ) => {
    setPayment((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const body = {
      search_id: searchId,
      booking_key: bookingKey,
      contact,
      guests: guests.map((guest) => ({
        ...guest,
        email: guest.email || undefined,
        phone: guest.phone || undefined,
      })),
      payment,
    };

    try {
      const response = await createHotelBooking(body).unwrap();
      setSuccessData(response);
    } catch (error) {
      console.error("Hotel booking failed:", error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="rounded-sm border bg-card p-5 text-card-foreground shadow-sm sm:p-6">
          <h2 className="text-lg font-semibold">Booking Information</h2>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-sm font-medium">Search ID</label>
              <input
                value={searchId}
                readOnly
                className="mt-2 h-11 w-full rounded-sm border bg-muted px-3 text-sm text-muted-foreground outline-none"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Booking Key</label>
              <input
                value={bookingKey}
                readOnly
                className="mt-2 h-11 w-full rounded-sm border bg-muted px-3 text-sm text-muted-foreground outline-none"
              />
            </div>
          </div>
        </div>

        <ContactInfoFields contact={contact} setContact={setContact} />

        <GuestInfoFields
          guests={guests}
          addGuest={addGuest}
          removeGuest={removeGuest}
          updateGuest={updateGuest}
        />

        <PaymentInfoFields
          payment={payment}
          updatePayment={updatePayment}
          updatePaymentType={(type: HotelPaymentType) =>
            setPayment((prev) => ({ ...prev, type }))
          }
        />

        <button
          type="submit"
          disabled={isLoading}
          className="h-12 w-full rounded-sm bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-sm transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? "Creating Booking..." : "Create Hotel Booking"}
        </button>
      </form>

      <HotelPNRSuccessModal
        open={!!successData}
        data={successData}
        onClose={() => setSuccessData(null)}
      />
    </>
  );
};

export default HotelPNRForm;