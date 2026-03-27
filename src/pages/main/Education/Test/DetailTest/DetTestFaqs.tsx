import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import type { Faq } from "@/types/education/type.tests";

interface DetTestFaqsProps {
    faqs: Faq[];
}

const DetTestFaqs = ({ faqs = [] }: DetTestFaqsProps) => {
    // Tracks which accordion is currently open. Null means all are closed.
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFaq = (index: number) => {
        setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
    };

    if (!faqs || faqs.length === 0) return null;

    return (
        <section className="w-full max-w-7xl mx-auto py-16 px-4 md:px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-10 tracking-tight">
                Common Questions
            </h2>

            <div className="space-y-1">
                {faqs.map((faq, index) => {
                    const isOpen = openIndex === index;

                    return (
                        <div 
                            key={index} 
                            // The border adapts to light/dark mode automatically
                            className="border-b border-border/60 dark:border-border overflow-hidden"
                        >
                            <button
                                onClick={() => toggleFaq(index)}
                                className="w-full flex items-start sm:items-center justify-between py-5 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm group"
                                aria-expanded={isOpen}
                            >
                                <span 
                                    className={`text-base sm:text-lg font-semibold transition-colors pr-6 ${
                                        isOpen 
                                            ? "text-primary" // Highlights primary color when open
                                            : "text-foreground group-hover:text-primary/80" 
                                    }`}
                                >
                                    {faq.question}
                                </span>
                                
                                <div className="mt-1 sm:mt-0 shrink-0 text-primary bg-primary/10 dark:bg-primary/20 p-1 rounded-full transition-transform duration-300">
                                    {isOpen ? (
                                        <Minus className="h-4 w-4 sm:h-5 sm:w-5" />
                                    ) : (
                                        <Plus className="h-4 w-4 sm:h-5 sm:w-5" />
                                    )}
                                </div>
                            </button>

                            <AnimatePresence initial={false}>
                                {isOpen && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                    >
                                        <div className="pb-6 pt-1 pr-8 text-sm sm:text-base text-muted-foreground leading-relaxed">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default DetTestFaqs;