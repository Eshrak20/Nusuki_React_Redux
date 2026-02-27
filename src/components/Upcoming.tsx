import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Rocket } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

/**
 * Interface for the Upcoming component props
 * title: Main heading text
 * description: Sub-text explaining the status
 * buttonText: Label for the return button
 */
interface UpcomingProps {
  title?: string;
  description?: string;
  buttonText?: string;
}

const Upcoming: React.FC<UpcomingProps> = ({
  title = "Coming Soon",
  description = "We're currently building something amazing. This feature will be available shortly!",
  buttonText = "Go Back"
}) => {
  const navigate = useNavigate();

  return (
    <div className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden px-6 text-center">
      {/* Background Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -z-10 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[120px] dark:bg-primary/20" />

      {/* Animated Icon Container */}
      <motion.div
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="mb-8 flex h-24 w-24 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/20 dark:bg-primary/20"
      >
        <Rocket className="h-12 w-12 animate-pulse" />
      </motion.div>

      {/* Text Content */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-4"
      >
        <h2 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
          {title}
        </h2>
        <p className="mx-auto max-w-[500px] text-lg text-muted-foreground md:text-xl">
          {description}
        </p>
      </motion.div>

      {/* Navigation Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-10"
      >
        <button
          onClick={() => navigate(-1)}
          className="group inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground shadow-lg transition-all hover:bg-primary/90 hover:shadow-primary/25 active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-background"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          {buttonText}
        </button>
      </motion.div>
    </div>
  );
};

export default Upcoming;