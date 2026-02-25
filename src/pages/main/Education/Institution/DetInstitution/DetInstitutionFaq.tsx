import { motion, type Variants, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Typewriter } from "@/components/Typewriter";
import type { FAQSection } from "@/types/education/type.uniDet";

export interface DetInstitutionFaqProps {
  faq?: FAQSection;
}

const DetInstitutionFaq = ({ faq }: DetInstitutionFaqProps) => {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  if (!faq || !faq.faqDetail || faq.faqDetail.length === 0) {
    return null;
  }

  const toggleItem = (id: number) => {
    setOpenItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  const iconVariants: Variants = {
    initial: { scale: 0, rotate: -180 },
    animate: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15
      }
    }
  };

  const chevronVariants : Variants = {
    closed: { rotate: 0 },
    open: {
      rotate: 180,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15
      }
    }
  };

  const contentVariants : Variants = {
    collapsed: {
      height: 0,
      opacity: 0,
      transition: {
        height: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
        opacity: { duration: 0.2 }
      }
    },
    expanded: {
      height: "auto",
      opacity: 1,
      transition: {
        height: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
        opacity: { duration: 0.3, delay: 0.1 }
      }
    }
  };

  return (
    <section className="overflow-hidden">
      <motion.div
        className=""
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        {/* Header Section */}
        <motion.div variants={itemVariants} className="text-center mb-10">
          {faq.iconImage && (
            <motion.div
              variants={iconVariants}
              initial="initial"
              animate="animate"
              className="flex justify-center mb-4"
            >
              {/* <img
                src={faq.iconImage.imageUrl}
                alt={faq.iconImage.imageAltTag || "FAQ"}
                className="w-12 h-12 object-contain"
              /> */}
            </motion.div>
          )}

          <Typewriter
            text={faq.heading || "FAQ"}
            className="text-3xl font-bold tracking-tight sm:text-4xl mb-5"
            textClassName="text-foreground dark:text-foreground"
          />

          {faq.description && (
            <motion.div
              variants={itemVariants}
              className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto"
              dangerouslySetInnerHTML={{ __html: faq.description }}
            />
          )}
        </motion.div>

        {/* FAQ Items */}
        <motion.div
          variants={containerVariants}
          className="space-y-4"
        >
          {faq.faqDetail.map((faqItem, index) => (
            <motion.div
              key={faqItem.id}
              variants={itemVariants}
              custom={index}
              className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow"
            >
              <motion.button
                onClick={() => toggleItem(faqItem.id)}
                className="w-full flex justify-between items-center p-6 text-left focus:outline-none focus:ring-2 focus:ring-primary/20"
                whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
                whileTap={{ scale: 0.99 }}
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white pr-8">
                  {faqItem.title}
                </h3>
                <motion.span
                  variants={chevronVariants}
                  animate={openItems[faqItem.id] ? "open" : "closed"}
                  className="text-2xl text-gray-500 dark:text-gray-400 shrink-0"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </motion.span>
              </motion.button>

              <AnimatePresence initial={false}>
                {openItems[faqItem.id] && (
                  <motion.div
                    variants={contentVariants}
                    initial="collapsed"
                    animate="expanded"
                    exit="collapsed"
                    className="overflow-hidden"
                  >
                    <div className="p-6 pt-5 border-t border-gray-200 dark:border-gray-700">
                      <motion.div
                        initial={{ y: -10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1, duration: 0.3 }}
                        className="text-gray-700 dark:text-gray-300 prose prose-sm max-w-none"
                        dangerouslySetInnerHTML={{ __html: faqItem.description }}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default DetInstitutionFaq;