import { AlertTriangle, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  pnr: string;
  isLoading: boolean;
  onConfirm: () => void;
};

const CancelTicketConfirmDialog = ({
  open,
  onOpenChange,
  pnr,
  isLoading,
  onConfirm,
}: Props) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10 text-red-600 dark:text-red-400">
            <AlertTriangle className="h-6 w-6" />
          </div>

          <DialogTitle>Are you sure?</DialogTitle>

          <DialogDescription>
            This will cancel or void the ticket for PNR{" "}
            <span className="font-bold text-foreground">{pnr}</span>. This
            action cannot be undone from this page.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
            className="rounded-xl"
          >
            No, Keep Ticket
          </Button>

          <Button
            type="button"
            variant="destructive"
            onClick={onConfirm}
            disabled={isLoading}
            className="rounded-xl font-bold"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Cancelling...
              </>
            ) : (
              "Yes, Cancel Ticket"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CancelTicketConfirmDialog;