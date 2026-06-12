import PnrPassengerAccordion from "./PnrPassengerAccordion";
import PnrSubmitFooter from "./PnrSubmitFooter";
import PnrCreatingLoader from "../PnrCreatingLoader";
import PnrContactInformation from "./PnrContactInformation";
import useBookingFlightPnrForm from "./useBookingFlightPnrForm";

import type { PnrFormState } from "@/types/flight/myTravellers.types";

type BookingFlightPNRFormProps = {
  flightId: string;
  searchId: string;
  initialForm: PnrFormState;
  showPassportFields: boolean;
  documentRequirementMessage?: string;
};

const BookingFlightPNRForm = ({
  flightId,
  searchId,
  initialForm,
  showPassportFields,
  documentRequirementMessage,
}: BookingFlightPNRFormProps) => {
  const pnrForm = useBookingFlightPnrForm({
    flightId,
    searchId,
    initialForm,
    showPassportFields,
  });

  return (
    <>
      <PnrCreatingLoader show={pnrForm.isCreatingPnr} />

      <div className="space-y-6">
        <PnrPassengerAccordion
          form={pnrForm.form}
          savedTravellers={pnrForm.savedTravellers}
          isLoadingSavedTravellers={pnrForm.isLoadingSavedTravellers}
          fileUploaded={pnrForm.fileUploaded}
          fileName={pnrForm.fileName}
          isScanning={pnrForm.isScanning}
          setFileUploaded={pnrForm.setFileUploaded}
          setFileName={pnrForm.setFileName}
          setIsScanning={pnrForm.setIsScanning}
          updateTraveller={pnrForm.updateTraveller}
          replaceTraveller={pnrForm.replaceTraveller}
          showPassportFields={showPassportFields}
          documentRequirementMessage={documentRequirementMessage}
          showValidationErrors={pnrForm.showValidationErrors}
          openTravellerAccordion={pnrForm.openTravellerAccordion}
          onOpenTravellerAccordionChange={
            pnrForm.setOpenTravellerAccordion
          }
          autoOpenFieldKey={pnrForm.autoOpenFieldKey}
          onAutoOpenHandled={() => pnrForm.setAutoOpenFieldKey(null)}
        />
      </div>

      <PnrContactInformation
        form={pnrForm.form}
        updateForm={pnrForm.updateForm}
        showValidationErrors={pnrForm.showValidationErrors}
      />

      <PnrSubmitFooter
        isCreatingPnr={pnrForm.isCreatingPnr}
        isScanning={pnrForm.isScanning}
        isFormInvalid={pnrForm.isFormInvalid}
        onSubmit={pnrForm.handleCreatePnr}
      />
    </>
  );
};

export default BookingFlightPNRForm;