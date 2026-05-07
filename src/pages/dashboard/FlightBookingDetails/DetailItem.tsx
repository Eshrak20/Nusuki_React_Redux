import type { ReactNode, ElementType } from "react";

type DetailItemProps = {
  label: string;
  value: ReactNode;
  icon: ElementType;
};

const DetailItem = ({ label, value, icon: Icon }: DetailItemProps) => {
  return (
    <div className="rounded-2xl border bg-muted/30 p-4 dark:bg-muted/10">
      <div className="flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Icon className="h-4 w-4" />
        </div>

        <div className="min-w-0">
          <p className="text-xs font-medium text-muted-foreground">{label}</p>
          <div className="mt-1 wrap-break-word text-sm font-semibold text-foreground">
            {value}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailItem;