import type { FlightResultItem } from "@/types/flight/flightResults.types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AvailabilityTab from "./AvailabilityTab";
import FlightSegmentTimeline from "../FlightSegmentTimeLine";
import RefundPolicyTab from "./RefundPolicyTab";
import { motion } from "framer-motion";
interface Props {
  flight: FlightResultItem;
}

const formatBDT = (amount: number | string) => {
  const value = Number(amount || 0);
  return `৳ ${value.toLocaleString("en-BD")}`;
};

const FlightTabsDetails = ({ flight }: Props) => {
  const passengerBreakdown = flight?.pricing?.passenger_breakdown || [];
  const pricing = flight?.pricing;

  const totalBase = pricing?.base || 0;
  const totalTax = pricing?.tax || 0;
  const totalPrice = pricing?.total || 0;
  const discount = pricing?.discount || 0;

  const ait =
    pricing?.tax_breakdown?.find(
      (item) =>
        item.code?.toUpperCase() === "AIT" ||
        item.description?.toLowerCase().includes("ait"),
    )?.amount || 0;

  const grandTotal = totalPrice - discount;

  return (
    <div className="border-t bg-background p-4 md:p-6">
      <Tabs defaultValue="details" className="w-full">
        <TabsList className="grid h-auto w-full grid-cols-2 gap-2 rounded-lg bg-muted p-1 md:grid-cols-4">
          <TabsTrigger
            value="details"
            className="rounded-md px-3 py-2 text-xs sm:text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Flight Details
          </TabsTrigger>

          <TabsTrigger
            value="fare"
            className="rounded-md px-3 py-2 text-xs sm:text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Fare Summery
          </TabsTrigger>

          <TabsTrigger
            value="availability"
            className="rounded-md px-3 py-2 text-xs sm:text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Availability
          </TabsTrigger>

          <TabsTrigger
            value="refund"
            className="rounded-md px-3 py-2 text-[11px] sm:text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Refund & Cancellation Policy
          </TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="mt-6">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <FlightSegmentTimeline segments={flight.segments} />
          </motion.div>
        </TabsContent>

        <TabsContent value="fare" className="mt-6">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="overflow-hidden rounded-xl border bg-card">
              <div className="grid grid-cols-1 lg:grid-cols-4">
                <div className="border-b lg:col-span-3 lg:border-b-0 lg:border-r">
                  <div className="border-b bg-muted/40 px-4 py-3 text-center">
                    <h3 className="text-base font-semibold text-primary">
                      Passenger Fare
                    </h3>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[520px] text-sm">
                      <thead className="bg-muted/60 text-muted-foreground">
                        <tr>
                          <th className="px-4 py-3 text-left font-semibold">
                            TYPE
                          </th>
                          <th className="px-4 py-3 text-left font-semibold">
                            BASE FARE
                          </th>
                          <th className="px-4 py-3 text-left font-semibold">
                            TAX
                          </th>
                          <th className="px-4 py-3 text-left font-semibold">
                            TOTAL PRICE
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {passengerBreakdown.length > 0 ? (
                          passengerBreakdown.map((item, index) => (
                            <tr
                              key={`${item.type}-${index}`}
                              className="border-t hover:bg-muted/20"
                            >
                              <td className="px-4 py-4 font-medium text-foreground">
                                {item.label || item.type}
                              </td>
                              <td className="px-4 py-4">
                                {formatBDT(item.base)}
                              </td>
                              <td className="px-4 py-4">
                                {formatBDT(item.tax)}
                              </td>
                              <td className="px-4 py-4 font-medium">
                                {formatBDT(item.total)}
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td
                              colSpan={4}
                              className="px-4 py-6 text-center text-muted-foreground"
                            >
                              No passenger fare breakdown available.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="lg:col-span-1">
                  <div className="border-b bg-muted/40 px-4 py-3 text-center">
                    <h3 className="text-base font-semibold text-primary">
                      Total Fare Summary
                    </h3>
                  </div>

                  <div className="space-y-3 px-4 py-4 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Base Fare</span>
                      <span className="font-medium">
                        {formatBDT(totalBase)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Tax</span>
                      <span className="font-medium">{formatBDT(totalTax)}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">AIT</span>
                      <span className="font-medium">{formatBDT(ait)}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Total Price</span>
                      <span className="font-medium">
                        {formatBDT(totalPrice)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Discount</span>
                      <span className="font-medium">{formatBDT(discount)}</span>
                    </div>

                    <div className="flex items-center justify-between border-t pt-3">
                      <span className="text-base font-semibold text-primary">
                        Total Amount
                      </span>
                      <span className="text-base font-bold text-primary">
                        {formatBDT(grandTotal)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </TabsContent>

        <TabsContent value="availability" className="mt-6">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <AvailabilityTab flight={flight} />
          </motion.div>
        </TabsContent>

        <TabsContent value="refund" className="mt-6">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <RefundPolicyTab />
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FlightTabsDetails;
