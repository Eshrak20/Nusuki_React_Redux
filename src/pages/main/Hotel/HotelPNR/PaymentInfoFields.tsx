import type { CreateHotelBookingPayment, HotelPaymentType } from "@/types/hotel/hotelBooking.types";


type PaymentInfoFieldsProps = {
  payment: CreateHotelBookingPayment;
  updatePayment: (
    field: keyof CreateHotelBookingPayment,
    value: string | number,
  ) => void;
  updatePaymentType: (type: HotelPaymentType) => void;
};

const PaymentInfoFields = ({
  payment,
  updatePayment,
  updatePaymentType,
}: PaymentInfoFieldsProps) => {
  return (
    <div className="rounded-2xl border bg-card p-5 text-card-foreground shadow-sm sm:p-6">
      <h2 className="text-lg font-semibold">Payment Information</h2>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div>
          <label className="text-sm font-medium">Payment Type</label>
          <select
            value={payment.type}
            onChange={(event) =>
              updatePaymentType(event.target.value as HotelPaymentType)
            }
            className="mt-2 h-11 w-full rounded-xl border bg-background px-3 text-sm outline-none transition focus:border-primary"
          >
            <option value="GUARANTEE">Guarantee</option>
            <option value="DEPOSIT">Deposit</option>
            <option value="PAY_LATER">Pay Later</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-medium">Card Code</label>
          <input
            required
            value={payment.card_code}
            onChange={(event) => updatePayment("card_code", event.target.value)}
            placeholder="VI"
            className="mt-2 h-11 w-full rounded-xl border bg-background px-3 text-sm outline-none transition focus:border-primary"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Card Number</label>
          <input
            required
            value={payment.card_number}
            onChange={(event) =>
              updatePayment("card_number", event.target.value)
            }
            placeholder="4111111111111111"
            className="mt-2 h-11 w-full rounded-xl border bg-background px-3 text-sm outline-none transition focus:border-primary"
          />
        </div>

        <div>
          <label className="text-sm font-medium">CVV</label>
          <input
            required
            value={payment.cvv}
            onChange={(event) => updatePayment("cvv", event.target.value)}
            placeholder="123"
            className="mt-2 h-11 w-full rounded-xl border bg-background px-3 text-sm outline-none transition focus:border-primary"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Expiry Month</label>
          <input
            required
            type="number"
            min={1}
            max={12}
            value={payment.expiry_month}
            onChange={(event) =>
              updatePayment("expiry_month", Number(event.target.value))
            }
            className="mt-2 h-11 w-full rounded-xl border bg-background px-3 text-sm outline-none transition focus:border-primary"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Expiry Year</label>
          <input
            required
            value={payment.expiry_year}
            onChange={(event) =>
              updatePayment("expiry_year", event.target.value)
            }
            placeholder="2028"
            className="mt-2 h-11 w-full rounded-xl border bg-background px-3 text-sm outline-none transition focus:border-primary"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Holder First Name</label>
          <input
            required
            value={payment.holder_first_name}
            onChange={(event) =>
              updatePayment("holder_first_name", event.target.value)
            }
            placeholder="Holder first name"
            className="mt-2 h-11 w-full rounded-xl border bg-background px-3 text-sm outline-none transition focus:border-primary"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Holder Last Name</label>
          <input
            required
            value={payment.holder_last_name}
            onChange={(event) =>
              updatePayment("holder_last_name", event.target.value)
            }
            placeholder="Holder last name"
            className="mt-2 h-11 w-full rounded-xl border bg-background px-3 text-sm outline-none transition focus:border-primary"
          />
        </div>
      </div>
    </div>
  );
};

export default PaymentInfoFields;