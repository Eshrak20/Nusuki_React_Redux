import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type BookingStatusBadgeProps = {
  status: string;
  type?: "booking" | "payment" | "ticket";
};

const statusStyles: Record<string, string> = {
  pnr_created:
    "border-emerald-500/25 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  unpaid:
    "border-amber-500/25 bg-amber-500/10 text-amber-700 dark:text-amber-300",
  cancelled:
    "border-red-500/25 bg-red-500/10 text-red-700 dark:text-red-300",
  voided:
    "border-zinc-500/25 bg-zinc-500/10 text-zinc-700 dark:text-zinc-300",
  paid:
    "border-emerald-500/25 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  ticketed:
    "border-primary/25 bg-primary/10 text-primary",
};

const formatStatus = (status: string) => {
  return status
    .replaceAll("_", " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

const BookingStatusBadge = ({ status }: BookingStatusBadgeProps) => {
  return (
    <Badge
      variant="outline"
      className={cn(
        "rounded-full px-3 py-1 text-xs font-semibold",
        statusStyles[status] ??
          "border-muted-foreground/20 bg-muted text-muted-foreground"
      )}
    >
      {formatStatus(status)}
    </Badge>
  );
};

export default BookingStatusBadge;