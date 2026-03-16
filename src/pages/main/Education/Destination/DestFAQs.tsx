import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { FAQItem } from "@/types/education/type.country";
import { Plus, X } from "lucide-react";
import { useLocation } from "react-router-dom";

interface Props {
  faqs: FAQItem[];
  title?: string;
  description?: string;
}

const DestFAQs = ({
  faqs,
  title = "",
  description = ""
}: Props) => {

  const location = useLocation();
  const countryName = location.pathname.endsWith("/us") ? "in USA" :
    location.pathname.endsWith("/au") ? "in Australia" :
      location.pathname.endsWith("/nz") ? "in New Zealand" :
        location.pathname.endsWith("/ca") ? "in Canada" :
          location.pathname.endsWith("/gb") ? "in UK" :
            "Abroad";

  title = `Study ${countryName} : Scholarship & Application FAQ`;
  description = `Dreaming of studying ${countryName}? Here is a quick FAQ on scholarships and the application process to make your journey smoother.`;

  // CHANGED HERE: Set initial state to null instead of 0 so none are open by default
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (!faqs || faqs.length === 0) return null;

  return (
    <section className="w-full my-20">

      {/* Header Section */}
      <div className="max-w-4xl mx-auto text-center mb-12 space-y-4">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground leading-tight">
          {title}
        </h2>
        {description && (
          <p className="text-foreground/70 leading-relaxed">
            {description}
          </p>
        )}
      </div>

      {/* FAQ Main Container */}
      <div className="bg-muted/30 dark:bg-muted/10 border border-border/50 rounded-[2rem] p-4 md:p-8 lg:p-12 shadow-sm">
        <div className="flex flex-col gap-3 md:gap-4 max-w-5xl mx-auto">

          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            // Pad single digit numbers with a leading zero (e.g., "01", "02")
            const numberStr = String(i + 1).padStart(2, '0');

            return (
              <div
                key={i}
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className={`group cursor-pointer rounded-[1.5rem] md:rounded-[2rem] transition-all duration-300 overflow-hidden ${isOpen
                    ? "bg-card shadow-md border border-border"
                    : "bg-card hover:bg-muted/50 border border-transparent shadow-sm"
                  }`}
              >
                {/* Question Row */}
                <div className="flex items-center gap-4 md:gap-6 p-4 md:p-6">

                  {/* Number Badge */}
                  <div
                    className={`shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-bold text-sm md:text-base transition-colors duration-300 ${isOpen
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground group-hover:bg-primary/20 group-hover:text-primary"
                      }`}
                  >
                    {numberStr}
                  </div>

                  {/* Question Text */}
                  <h3
                    className={`flex-1 font-semibold text-base md:text-lg transition-colors duration-300 ${isOpen ? "text-foreground" : "text-foreground/80 group-hover:text-foreground"
                      }`}
                  >
                    {faq.question}
                  </h3>

                  {/* Toggle Icon */}
                  <div
                    className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${isOpen
                        ? "bg-foreground text-background rotate-180" // Dark circle with white X
                        : "bg-transparent text-muted-foreground group-hover:bg-muted group-hover:text-foreground"
                      }`}
                  >
                    {isOpen ? <X size={16} strokeWidth={3} /> : <Plus size={20} strokeWidth={2.5} />}
                  </div>
                </div>

                {/* Answer Content (Animated Expand/Collapse) */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="pl-18 md:pl-22 pr-6 md:pr-12 pb-6 pt-0">
                        <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
};

export default DestFAQs;