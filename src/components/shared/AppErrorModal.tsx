import { AlertCircle, RefreshCw, X } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type AppErrorModalProps = {
  open: boolean;
  title?: string;
  description?: string;
  fieldErrors?: string[];
  onOpenChange: (open: boolean) => void;
};

const AppErrorModal = ({
  open,
  title = "Something went wrong",
  description = "Please check your information and try again.",
  fieldErrors = [],
  onOpenChange,
}: AppErrorModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md overflow-hidden rounded-sm border-destructive/20 p-0 shadow-2xl">
        <div className="bg-gradient-to-br from-destructive/15 via-background to-background p-6">
          <DialogHeader className="space-y-4 text-left">
            <div className="flex h-14 w-14 items-center justify-center rounded-sm bg-destructive/10 text-destructive ring-1 ring-destructive/20">
              <AlertCircle className="h-7 w-7" />
            </div>

            <div className="space-y-2">
              <DialogTitle className="text-xl font-bold text-foreground">
                {title}
              </DialogTitle>

              <DialogDescription className="text-sm leading-6 text-muted-foreground">
                {description}
              </DialogDescription>
            </div>
          </DialogHeader>

          {fieldErrors.length > 0 && (
            <div className="mt-5 rounded-sm border border-destructive/15 bg-destructive/5 p-4">
              <p className="mb-3 text-sm font-semibold text-destructive">
                Please fix these fields:
              </p>

              <ul className="space-y-2">
                {fieldErrors.map((error, index) => (
                  <li
                    key={`${error}-${index}`}
                    className="flex gap-2 text-sm text-muted-foreground"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-destructive" />
                    <span>{error}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="rounded-sm"
            >
              <X className="mr-2 h-4 w-4" />
              Close
            </Button>

            <Button
              type="button"
              onClick={() => onOpenChange(false)}
              className="rounded-sm"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Try Again
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AppErrorModal;