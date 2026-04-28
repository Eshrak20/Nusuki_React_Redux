import { useMemo, useState } from "react";
import { motion } from "framer-motion";
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

  if (!filteredItems.length) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="space-y-4"
    >
      <Accordion
        type="multiple"
        value={openValues}
        onValueChange={setOpenValues}
        className="space-y-4"
      >
        {filteredItems.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              duration: 0.45,
              delay: index * 0.08,
              ease: "easeOut",
            }}
          >
            <AccordionItem
              value={item.title}
              className="
                overflow-hidden border border-border/70
                bg-card/80 px-5 shadow-sm backdrop-blur-xl
                transition-all duration-300
                hover:border-primary/40 hover:bg-card
                hover:shadow-lg hover:shadow-primary/5
              "
            >
              <AccordionTrigger
                className="
                  group py-5 text-left text-base font-semibold
                  text-foreground transition hover:no-underline
                "
              >
                <span className="flex items-center gap-3">
                  <span
                    className="
                      h-2.5 w-2.5 shrink-0 bg-primary
                      shadow-sm shadow-primary/40 transition-all duration-300
                      group-hover:scale-125
                    "
                  />
                  <span className="transition-colors duration-300 group-hover:text-primary">
                    {item.title}
                  </span>
                </span>
              </AccordionTrigger>

              <AccordionContent>
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="pb-5"
                >
                  <div
                    className="
                      holiday-html max-w-none border-l-2 border-primary/30
                      pl-4 text-sm leading-7 text-muted-foreground

                      [&_ul]:ml-5 [&_ul]:list-disc [&_ul]:space-y-2
                      [&_ol]:ml-5 [&_ol]:list-decimal [&_ol]:space-y-2
                      [&_li]:pl-1
                      [&_li_p]:m-0
                      [&_p]:my-2
                      [&_strong]:font-semibold [&_strong]:text-foreground
                      [&_a]:font-medium [&_a]:text-primary [&_a]:underline-offset-4
                      [&_a:hover]:underline
                    "
                    dangerouslySetInnerHTML={{ __html: item.content || "" }}
                  />
                </motion.div>
              </AccordionContent>
            </AccordionItem>
          </motion.div>
        ))}
      </Accordion>
    </motion.div>
  );
};

export default HolidayInfoAccordion;