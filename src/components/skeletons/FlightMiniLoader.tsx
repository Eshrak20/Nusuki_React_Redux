import { motion } from "framer-motion";
import Lottie from "lottie-react";
import flightAnimation from "@/assets/Lottie/Plane.json";

export const FlightMiniLoader = () => {
  return (
    <div className="flex flex-col items-center">
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative h-28 w-28"
      >
        <Lottie
          animationData={flightAnimation}
          loop
          className="h-full w-full"
        />

        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute inset-0 rounded-full border border-dashed border-primary/30"
        />
      </motion.div>

      <div className="mt-4 w-48 overflow-hidden rounded-full bg-muted">
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: "200%" }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="h-1.5 w-20 bg-primary"
        />
      </div>
    </div>
  );
};