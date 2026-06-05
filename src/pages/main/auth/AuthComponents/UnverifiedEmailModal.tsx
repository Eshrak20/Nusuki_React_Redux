import { AlertCircle, MailCheck, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type UnverifiedEmailModalProps = {
  open: boolean;
  email: string;
  isLoading: boolean;
  onOpenChange: (open: boolean) => void;
  onResend: () => void;
};

const UnverifiedEmailModal = ({
  open,
  email,
  isLoading,
  onOpenChange,
  onResend,
}: UnverifiedEmailModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-105 rounded-sm border-0 bg-white p-0 shadow-xl dark:bg-slate-900 dark:ring-1 dark:ring-slate-800">
        <div className="relative px-5 pb-5 pt-6 sm:px-6">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="absolute right-4 top-4 rounded-full p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
            disabled={isLoading}
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>

          <DialogHeader className="space-y-3 text-left">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-amber-100 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400">
              <AlertCircle className="h-5 w-5" />
            </div>

            <div>
              <DialogTitle className="text-lg font-bold text-slate-950 dark:text-slate-50">
                Verify your email
              </DialogTitle>

              <DialogDescription className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-400">
                Your account is not verified yet. Please verify your email
                before logging in.
              </DialogDescription>
            </div>
          </DialogHeader>

          <div className="mt-4 rounded-sm border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300">
            <span className="font-semibold">Email:</span> {email}
          </div>

          <div className="mt-5 flex flex-col gap-2 sm:flex-row">
            <Button
              type="button"
              onClick={onResend}
              disabled={isLoading}
              className="h-9 flex-1 rounded-sm text-sm font-semibold"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Sending...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <MailCheck className="h-4 w-4" />
                  Resend code
                </span>
              )}
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
              className="h-9 flex-1 rounded-sm text-sm font-semibold"
            >
              Cancel
            </Button>
          </div>

          <p className="mt-3 text-center text-[11px] leading-4 text-slate-500 dark:text-slate-400">
            After receiving the OTP, you will be redirected to the email
            verification page.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UnverifiedEmailModal;