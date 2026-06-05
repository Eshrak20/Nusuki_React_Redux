import type { FlightDetailResultItem } from "@/types/flight/flightTicket.types";
import {
  formatBDT,
  formatNumber,
  getPayableAmount,
  getPriceSummaryItems,
} from "./flightBooking.helpers";

interface Props {
  flight: FlightDetailResultItem;
}

const BookingPriceSidebar = ({ flight }: Props) => {
  const items = getPriceSummaryItems(flight);
  const payableAmount = getPayableAmount(flight);

  return (
    <div className="rounded-sm border border-[#d8dde7] bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#101827]">
      <h3 className="text-[22px] font-extrabold text-[#172f6d] dark:text-[#8fb4ff]">
        Price Details
      </h3>

      <p className="mt-4 text-[16px] text-[#222] dark:text-white/85">
        All prices are in{" "}
        <span className="font-bold text-[#2e9746] dark:text-[#41c96d]">
          Bangladeshi taka
        </span>
      </p>

      <div className="mt-10">
        <p className="text-[17px] font-bold text-[#1a2f6b] dark:text-[#8fb4ff]">
          Fare Summary
        </p>

        <div className="mt-4 space-y-3 text-[16px]">
          {items.map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between gap-4"
            >
              <span
                className={`font-bold text-black dark:text-white ${item.labelClassName ?? ""}`}
              >
                {item.label}
              </span>
              <span
                className={`font-bold text-black dark:text-white ${item.valueClassName ?? ""}`}
              >
                {formatNumber(item.value)}
              </span>
            </div>
          ))}
        </div>

        <div className="my-5 border-t-2 border-dotted border-[#17306f] dark:border-[#4b6cb7]" />

        <div className="flex items-center justify-between gap-3">
          <span className="text-[18px] font-extrabold text-[#17306f] dark:text-[#8fb4ff]">
            Payable Amount
          </span>

          <div className="rounded-sm border-2 border-[#2457a6] px-4 py-2 text-[20px] font-extrabold text-[#2570c9] dark:border-[#4b8dff] dark:text-[#6ea8ff]">
            {formatBDT(payableAmount)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPriceSidebar;