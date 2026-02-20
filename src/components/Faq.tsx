import type { FaqProps } from "@/types/types.faq";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

const Faq = ({ faqs }: FaqProps) => {
  return (
    <section className="relative w-full py-40 pb-40 md:py-48 overflow-hidden flex items-center justify-center min-h-150">
      {/* Full-width Background Image */}
      <div className="absolute inset-0 -z-10 w-full h-full bg-[url('/src/assets/reactAssets/Hajj_Umrah/Hajj.jpg')] bg-cover bg-center">
        <div className="absolute inset-0 bg-hajj/85 mix-blend-multiply" />
      </div>

      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        {/* Section Title */}
        <h2 className="mb-12 md:mb-16 text-center font-serif text-5xl md:text-5xl font-bold text-accent">
          Most Common Questions
        </h2>

        {/* Accordion */}
        <Accordion type="single" collapsible className="w-full space-y-3">
          {faqs.map((faq) => (
            <AccordionItem
              key={faq.id}
              value={faq.id.toString()}
              className="border-none"
            >
              {/* Trigger */}
              <AccordionTrigger
                className="flex justify-between items-center rounded-t-lg p-5 font-bold text-sm md:text-base tracking-tight shadow-md transition-all duration-300 no-underline hover:no-underline focus:no-underline focus:outline-none
                  bg-white text-hajj
                  data-[state=open]:bg-hajj data-[state=open]:text-white data-[state=open]:rounded-b-none"
              >
                {faq.question}
              </AccordionTrigger>

              {/* Content */}
              <AccordionContent className="bg-white/95 p-8 rounded-b-lg shadow-xl border-t border-gray-100 animate-in fade-in slide-in-from-top-2 duration-300 ease-out">
                <h4 className="mb-4 text-xs font-black tracking-[0.2em] text-hajj">
                  Essential Components of Comprehensive Umrah Packages
                </h4>
                <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                  {faq.answer}
                </p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default Faq;
