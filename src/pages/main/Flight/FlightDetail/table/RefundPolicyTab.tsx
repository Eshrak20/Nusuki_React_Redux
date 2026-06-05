import {
  AlertTriangle,
  BadgeInfo,
  CircleDollarSign,
  Headphones,
  ShieldCheck,
} from "lucide-react";

const RefundPolicyTab = () => {
  return (
    <div className="overflow-hidden rounded-sm border border-border bg-card shadow-sm">
      <div className="border-b bg-muted/30 px-4 py-4 text-center">
        <h3 className="text-sm font-semibold text-primary md:text-base">
          Refund & Cancellation Policy
        </h3>
      </div>

      <div className="space-y-4 px-4 py-4 text-sm">
        <div className="flex gap-3 rounded-xl border bg-background p-4">
          <ShieldCheck className="mt-0.5 h-5 w-5 text-primary" />
          <p className="text-foreground">
            Nusuki BD follows the airline&apos;s cancellation and reissue policy.
          </p>
        </div>

        <div className="flex gap-3 rounded-xl border border-yellow-200 bg-yellow-50 p-4 dark:border-yellow-500/20 dark:bg-yellow-500/10">
          <AlertTriangle className="mt-0.5 h-5 w-5 text-yellow-600 dark:text-yellow-400" />
          <p className="text-foreground">
            Convenience fee is non-refundable.
          </p>
        </div>

        <div className="flex gap-3 rounded-xl border border-yellow-200 bg-yellow-50 p-4 dark:border-yellow-500/20 dark:bg-yellow-500/10">
          <BadgeInfo className="mt-0.5 h-5 w-5 text-yellow-600 dark:text-yellow-400" />
          <p className="text-foreground">
            To cancel or reissue, travelers are advised to confirm with Nusuki
            BD at least 48 hours before travel. Otherwise, no-show charges may
            apply depending on airline rules.
          </p>
        </div>

        <div className="flex gap-3 rounded-xl border bg-background p-4">
          <Headphones className="mt-0.5 h-5 w-5 text-primary" />
          <p className="text-foreground">
            For cancel or reissue support, call{" "}
            <span className="font-semibold text-primary">+8801714742454</span>{" "}
            or message{" "}
            <a
              href="https://m.me/NusukiBD"
              target="_blank"
              rel="noreferrer"
              className="font-medium text-primary hover:underline"
            >
              Nusuki BD on Messenger
            </a>
            .
          </p>
        </div>

        <div className="flex gap-3 rounded-xl border bg-background p-4">
          <CircleDollarSign className="mt-0.5 h-5 w-5 text-primary" />
          <p className="text-foreground">
            Cancellation, reissue, and standard service charges may apply
            according to airline policy. Refunds, if applicable, are sent
            through the same payment channel and may take one to five working
            days to reflect.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicyTab;