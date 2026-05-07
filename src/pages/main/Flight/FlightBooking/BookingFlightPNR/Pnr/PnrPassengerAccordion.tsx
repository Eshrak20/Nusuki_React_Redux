import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { PnrFormState } from "../PassengerForm";
import PassengerForm from "../PassengerForm";


type PnrPassengerAccordionProps = {
  form: PnrFormState;
  fileUploaded: boolean;
  fileName: string;
  isScanning: boolean;
  setFileUploaded: React.Dispatch<React.SetStateAction<boolean>>;
  setFileName: React.Dispatch<React.SetStateAction<string>>;
  setIsScanning: React.Dispatch<React.SetStateAction<boolean>>;
  updateForm: <K extends keyof PnrFormState>(
    field: K,
    value: PnrFormState[K],
  ) => void;
};

const PnrPassengerAccordion = ({
  form,
  fileUploaded,
  fileName,
  isScanning,
  setFileUploaded,
  setFileName,
  setIsScanning,
  updateForm,
}: PnrPassengerAccordionProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-xl font-semibold">Passenger Details</h2>

        <div className="flex items-center gap-2">
          <Label
            htmlFor="expand-all"
            className="cursor-pointer text-sm font-medium"
          >
            Expand All
          </Label>

          <Checkbox id="expand-all" checked onCheckedChange={() => {}} />
        </div>
      </div>

      <Accordion
        type="single"
        collapsible
        defaultValue="adult-1"
        className="w-full"
      >
        <AccordionItem value="adult-1" className="rounded-lg border bg-card">
          <AccordionTrigger className="rounded-t-lg px-4 transition-colors hover:bg-muted/50 hover:no-underline">
            <span className="font-semibold uppercase text-card-foreground">
              Adult 1: (12 + yrs)
            </span>
          </AccordionTrigger>

          <AccordionContent className="space-y-6 p-4">
            <PassengerForm
              form={form}
              fileUploaded={fileUploaded}
              fileName={fileName}
              isScanning={isScanning}
              setFileUploaded={setFileUploaded}
              setFileName={setFileName}
              setIsScanning={setIsScanning}
              updateForm={updateForm}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default PnrPassengerAccordion;