import { motion } from "framer-motion";
import Lottie from "lottie-react";
import flightErrorAnimation from "@/assets/Lottie/Plane.json";

export const FlightMiniLoader = () => {
  // Animation variants for staggered children
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/40 backdrop-blur-md">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative flex flex-col items-center gap-8 rounded-[3rem] border border-white/20 bg-white/10 p-12 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.2)] backdrop-blur-2xl dark:bg-black/20"
      >
        {/* Animated Ambient Glow */}
        <div className="absolute -z-10 h-64 w-64 animate-pulse rounded-full bg-primary/20 blur-[80px]" />

        {/* Lottie Container - Scaled up */}
        <motion.div 
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="relative h-48 w-48 drop-shadow-2xl"
        >
          <Lottie
            animationData={flightErrorAnimation}
            loop={true}
            className="h-full w-full"
          />
          {/* Circular Orbit Ring */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full border-2 border-dashed border-primary/30" 
          />
        </motion.div>

        {/* Textual Content */}
        <div className="text-center">
          <motion.h2
            variants={itemVariants}
            className="bg-linear-to-b from-foreground to-muted-foreground bg-clip-text text-3xl font-bold tracking-tight text-transparent"
          >
            Preparing for Takeoff
          </motion.h2>
          
          <motion.div variants={itemVariants} className="mt-2 space-y-1">
            <p className="text-lg font-medium text-primary/80">
              Scouring 500+ airlines...
            </p>
            <div className="flex items-center justify-center gap-1.5 text-sm text-muted-foreground/60">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-bounce" />
              <span>Checking real-time seat availability</span>
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-bounce [animation-delay:0.2s]" />
            </div>
          </motion.div>
        </div>

        {/* Minimal Progress Bar */}
        <motion.div 
          variants={itemVariants}
          className="h-1.5 w-64 overflow-hidden rounded-full bg-muted/30"
        >
          <motion.div 
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="h-full w-1/2 bg-linear-to-r from-transparent via-primary to-transparent"
          />
        </motion.div>
      </motion.div>
    </div>
  );
};