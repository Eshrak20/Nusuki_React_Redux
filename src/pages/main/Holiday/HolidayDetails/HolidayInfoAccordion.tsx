import { useMemo, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface InfoItem {
  title: string;
  content?: string | null;
}

interface Props {
  items: InfoItem[];
}

const getInitialOpenValues = (values: string[]) => {
  if (typeof window === "undefined") return values;

  const isMobile = window.innerWidth < 768;
  return isMobile ? values.slice(0, 1) : values;
};

const HolidayInfoAccordion = ({ items }: Props) => {
  const filteredItems = useMemo(
    () => items.filter((item) => item.content),
    [items]
  );

  const allValues = useMemo(
    () => filteredItems.map((item) => item.title),
    [filteredItems]
  );

  const [openValues, setOpenValues] = useState<string[]>(() =>
    getInitialOpenValues(allValues)
  );

  return (
    <Accordion
      type="multiple"
      value={openValues}
      onValueChange={setOpenValues}
      className="space-y-3"
    >
      {filteredItems.map((item) => (
        <AccordionItem
          key={item.title}
          value={item.title}
          className="border bg-card px-5 shadow-sm"
        >
          <AccordionTrigger className="text-base font-semibold hover:no-underline">
            {item.title}
          </AccordionTrigger>

          <AccordionContent>
            <div
              className="
                holiday-html
                max-w-none text-sm leading-7 text-foreground
                [&_ul]:ml-5 [&_ul]:list-disc [&_ul]:space-y-2
                [&_ol]:ml-5 [&_ol]:list-decimal [&_ol]:space-y-2
                [&_li]:pl-1
                [&_li_p]:m-0
                [&_p]:my-2
                [&_strong]:font-semibold
              "
              dangerouslySetInnerHTML={{ __html: item.content || "" }}
            />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default HolidayInfoAccordion;