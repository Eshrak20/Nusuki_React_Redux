import { Button } from "@/components/ui/button";

type PnrSubmitFooterProps = {
  isCreatingPnr: boolean;
  isScanning: boolean;
  isFormInvalid?: boolean;
  onSubmit: () => void;
};

const PnrSubmitFooter = ({
  isCreatingPnr,
  isScanning,
  onSubmit,
}: PnrSubmitFooterProps) => {
  return (
    <div className="border-t border-black/5 px-6 py-4 dark:border-white/10">
      <div className="mx-auto flex max-w-7xl justify-center">
        <Button
          onClick={onSubmit}
          disabled={isCreatingPnr || isScanning}
          className="h-11 min-w-57.5 rounded-sm bg-[#17306f] px-8 text-[16px] font-bold text-white hover:bg-[#102558] disabled:cursor-not-allowed disabled:opacity-60 dark:bg-[#1f4fa3] dark:hover:bg-[#1a438b]"
        >
          {isCreatingPnr ? "Creating PNR..." : "Next - Continue Booking"}
        </Button>
      </div>
    </div>
  );
};

export default PnrSubmitFooter;