import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface Props {
  value: string;
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
  className?: string;
}

const FlightFilterSection = ({
  value,
  title,
  children,
  defaultOpen = true,
  className,
}: Props) => {
  return (
    <Accordion
      type="single"
      collapsible
      defaultValue={defaultOpen ? value : undefined}
      className={cn(
        "rounded-sm border border-border bg-card shadow-sm",
        className
      )}
    >
      <AccordionItem value={value} className="border-none px-3">
        <AccordionTrigger className="pt-5 pb-3 text-sm font-bold hover:no-underline">
          {title}
        </AccordionTrigger>
        <AccordionContent className="pb-3">
          {children}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default FlightFilterSection;