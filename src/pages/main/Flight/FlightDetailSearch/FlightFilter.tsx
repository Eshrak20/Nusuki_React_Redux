import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

const airlines = [
  "US-Bangla Airlines",
  "China Southern Airlines",
  "Biman Bangladesh Airlines",
  "Batik Air",
  "Air India",
  "China Eastern Airlines",
  "Thai Airways International",
  "Malaysia Airlines",
  "Emirates",
  "flydubai",
  "Cathay Pacific Airways",
];

const FlightFilter = () => {
  return (
    <div className="w-full space-y-4">
      <Accordion
        type="multiple"
        defaultValue={["price", "airlines"]} // Keeping these open by default as per your images
        className="w-full space-y-3 border-none"
      >
        {/* Price Range Section */}
        <AccordionItem value="price" className="border rounded-lg bg-card px-4 py-1 shadow-sm border-border">
          <AccordionTrigger className="hover:no-underline font-bold text-sm text-foreground">
            Price Range
          </AccordionTrigger>
          <AccordionContent className="pt-4 pb-6 px-1">
            <Slider
              defaultValue={[27877, 579719]}
              max={600000}
              step={1000}
              className="mb-6"
            />
            <div className="flex justify-between items-center text-[13px] font-medium text-foreground">
              <span>৳ 27,877.95</span>
              <span>৳ 579,719.95</span>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Layover Duration */}
        <AccordionItem value="layover" className="border rounded-lg bg-card px-4 py-1 shadow-sm border-border">
          <AccordionTrigger className="hover:no-underline font-bold text-sm text-foreground">
            Layover Duration
          </AccordionTrigger>
          <AccordionContent>
            <p className="text-xs text-muted-foreground">Select duration options...</p>
          </AccordionContent>
        </AccordionItem>

        {/* Refutability (Refundable) */}
        <AccordionItem value="refund" className="border rounded-lg bg-card px-4 py-1 shadow-sm border-border">
          <AccordionTrigger className="hover:no-underline font-bold text-sm text-foreground">
            Refutability
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex items-center space-x-2 py-1">
              <Checkbox id="refundable" />
              <Label htmlFor="refundable" className="text-sm">Refundable</Label>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Stops */}
        <AccordionItem value="stops" className="border rounded-lg bg-card px-4 py-1 shadow-sm border-border">
          <AccordionTrigger className="hover:no-underline font-bold text-sm text-foreground">
            Stops
          </AccordionTrigger>
          <AccordionContent className="space-y-3">
            {["Non-stop", "1 Stop", "2+ Stops"].map((stop) => (
              <div key={stop} className="flex items-center space-x-2">
                <Checkbox id={stop} />
                <Label htmlFor={stop} className="text-sm font-normal">{stop}</Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>

        {/* Airlines Section */}
        <AccordionItem value="airlines" className="border rounded-lg bg-card px-4 py-1 shadow-sm border-border">
          <AccordionTrigger className="hover:no-underline font-bold text-sm text-foreground">
            Airlines
          </AccordionTrigger>
          <AccordionContent className="space-y-1 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
            {airlines.map((airline) => (
              <div
                key={airline}
                className="flex items-center space-x-3 p-2 rounded-md hover:bg-accent/50 transition-colors"
              >
                <Checkbox id={airline} className="border-muted-foreground/50" />
                <label
                  htmlFor={airline}
                  className="text-[13px] font-medium leading-none cursor-pointer text-foreground flex-1"
                >
                  {airline}
                </label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>

        {/* Layover City */}
        <AccordionItem value="city" className="border rounded-lg bg-card px-4 py-1 shadow-sm border-border">
          <AccordionTrigger className="hover:no-underline font-bold text-sm text-foreground">
            Layover City
          </AccordionTrigger>
          <AccordionContent>
            <p className="text-xs text-muted-foreground">City list...</p>
          </AccordionContent>
        </AccordionItem>

        {/* Flight Schedules */}
        <AccordionItem value="schedules" className="border rounded-lg bg-card px-4 py-1 shadow-sm border-border">
          <AccordionTrigger className="hover:no-underline font-bold text-sm text-foreground">
            Flight Schedules
          </AccordionTrigger>
          <AccordionContent>
             <p className="text-xs text-muted-foreground">Time slots...</p>
          </AccordionContent>
        </AccordionItem>

        {/* Aircraft */}
        <AccordionItem value="aircraft" className="border rounded-lg bg-card px-4 py-1 shadow-sm border-border">
          <AccordionTrigger className="hover:no-underline font-bold text-sm text-foreground">
            Aircraft
          </AccordionTrigger>
          <AccordionContent>
             <p className="text-xs text-muted-foreground">Model list...</p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default FlightFilter;