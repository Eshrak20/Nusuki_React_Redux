import { useMemo } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { getPassengerLabel } from "@/lib/pnrTravelerUtils";
import PnrTravelerForm from "./PnrTravelerForm";
import type {
  PnrFormState,
  PnrTravellerForm,
  SavedTraveller,
} from "@/types/flight/myTravellers.types";

type PnrPassengerAccordionProps = {
  form: PnrFormState;
  savedTravellers: SavedTraveller[];
  isLoadingSavedTravellers: boolean;

  fileUploaded: boolean;
  fileName: string;
  isScanning: boolean;

  setFileUploaded: React.Dispatch<React.SetStateAction<boolean>>;
  setFileName: React.Dispatch<React.SetStateAction<string>>;
  setIsScanning: React.Dispatch<React.SetStateAction<boolean>>;

  showPassportFields: boolean;
  documentRequirementMessage?: string;

  updateTraveller: <K extends keyof PnrTravellerForm>(
    travellerIndex: number,
    field: K,
    value: PnrTravellerForm[K],
  ) => void;

  replaceTraveller: (
    travellerIndex: number,
    traveller: PnrTravellerForm,
  ) => void;
};

const PnrPassengerAccordion = ({
  form,
  savedTravellers,
  isLoadingSavedTravellers,
  fileUploaded,
  fileName,
  isScanning,
  setFileUploaded,
  setFileName,
  setIsScanning,
  updateTraveller,
  replaceTraveller,
  showPassportFields,
  documentRequirementMessage,
}: PnrPassengerAccordionProps) => {
  const travellersWithLabelIndex = useMemo(() => {
    const counters = {
      ADT: 0,
      CHD: 0,
      INF: 0,
    };

    return form.travelers.map((traveller) => {
      const labelIndex =
        counters[traveller.passengerType as keyof typeof counters] ?? 0;

      if (traveller.passengerType in counters) {
        counters[traveller.passengerType as keyof typeof counters]++;
      }

      return {
        traveller,
        labelIndex,
      };
    });
  }, [form.travelers]);

  return (
    <div className="space-y-4">
      <Accordion
        type="single"
        collapsible
        defaultValue="traveller-0"
        className="w-full"
      >
        {travellersWithLabelIndex.map(({ traveller, labelIndex }, index) => (
          <AccordionItem
            key={`${traveller.passengerType}-${index}`}
            value={`traveller-${index}`}
            className="rounded-sm border bg-card"
          >
            <AccordionTrigger className="rounded-t-lg px-4 transition-colors hover:bg-muted/50 hover:no-underline">
              <span className="font-semibold uppercase text-card-foreground">
                {getPassengerLabel(traveller.passengerType, labelIndex)}
              </span>
            </AccordionTrigger>

            <AccordionContent className="space-y-6 p-4">
              <PnrTravelerForm
                travellerIndex={index}
                traveller={traveller}
                savedTravellers={savedTravellers.filter(
                  (item) => item.passenger_type === traveller.passengerType,
                )}
                isLoadingSavedTravellers={isLoadingSavedTravellers}
                fileUploaded={fileUploaded}
                fileName={fileName}
                isScanning={isScanning}
                setFileUploaded={setFileUploaded}
                setFileName={setFileName}
                setIsScanning={setIsScanning}
                updateTraveller={updateTraveller}
                replaceTraveller={replaceTraveller}
                showPassportFields={showPassportFields}
                documentRequirementMessage={documentRequirementMessage}
              />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default PnrPassengerAccordion;
