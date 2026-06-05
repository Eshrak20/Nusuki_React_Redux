import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

type ScrollToTopButtonProps = {
  show: boolean;
  isSpecialRoute: boolean;
};

const ScrollToTopButton = ({ show, isSpecialRoute }: ScrollToTopButtonProps) => {
  return (
    <AnimatePresence>
      {show ? (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className={cn(
            "fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-sm",
            "text-primary-foreground shadow-2xl transition-all duration-300",
            isSpecialRoute
              ? "bg-hajj shadow-hajj/25 hover:shadow-hajj/40"
              : "bg-primary shadow-primary/25 hover:shadow-primary/40"
          )}
          aria-label="Scroll to top"
        >
          <motion.div
            animate={{ y: [0, -3, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <ArrowUp className="h-6 w-6" />
          </motion.div>

          <motion.div
            className="absolute inset-0 rounded-sm border-2 border-current"
            animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
          />
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
};

export default ScrollToTopButton;