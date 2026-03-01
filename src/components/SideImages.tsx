import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useState } from "react";
import type { SideImagesProps } from "../types/hajj/types.visa";

const SideImages = ({ images }: SideImagesProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const springY = useSpring(y, { stiffness: 100, damping: 30 });

  return (
    <motion.div
      ref={containerRef}
      style={{ y: springY }}
      // Updated the classes here for better mobile responsiveness
      className={`relative flex flex-col gap-4 md:gap-6 lg:mt-7 ${images.length === 1
          ? "justify-center h-auto my-4 lg:my-0 lg:h-[75vh]"
          : ""
        }`}
    >
      {images?.map((img, index) => (
        <motion.div
          key={index}
          className="group relative overflow-hidden lg:rounded-xl border bg-card lg:shadow-2xl"
          initial={{ opacity: 0, x: 80, rotateY: 15, scale: 0.95 }}
          whileInView={{ opacity: 1, x: 0, rotateY: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, delay: index * 0.2 }}
        >
          <motion.div className="relative overflow-hidden">
            <motion.img
              src={img}
              alt={`Requirement visual ${index + 1}`}
              className="w-full h-auto object-cover lg:rounded-xl"
              animate={isInView ? { y: [0, -8, 0] } : {}}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.3,
              }}
            />

            <motion.div
              className="absolute inset-0 pointer-events-none rounded-xl"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </motion.div>
        </motion.div>
      ))}

      <motion.div
        className="absolute -z-10 inset-0 rounded-3xl"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      />
    </motion.div>
  );
};

export default SideImages;