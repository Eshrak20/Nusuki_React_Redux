import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import CouncellingForm from "./CouncellingForm";

interface Props {
  open: boolean;
  onClose: () => void;
}

const EduContactModal = ({ open, onClose }: Props) => {
  return (
    <Dialog open={open} onOpenChange={(value) => !value && onClose()}>
      <DialogContent className="max-h-[90vh] w-[calc(100vw-1.5rem)] overflow-hidden rounded-sm border-none bg-background p-0 sm:max-w-220 dark:bg-zinc-950">
        <DialogHeader className="bg-primary px-6 py-7 text-primary-foreground md:px-8">
          <DialogTitle className="text-center text-2xl font-semibold underline">
            Book Free Study Abroad Counselling
          </DialogTitle>
        </DialogHeader>

        <div className="max-h-[calc(90vh-100px)] overflow-y-auto p-6 md:p-8">
          <CouncellingForm onSuccess={onClose} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EduContactModal;