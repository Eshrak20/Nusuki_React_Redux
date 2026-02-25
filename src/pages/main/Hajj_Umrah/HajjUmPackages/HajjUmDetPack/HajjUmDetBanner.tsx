/* eslint-disable react-hooks/purity */
import { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface PackData {
  name: string;
  tagline: string;
  card_image: string;
  status?: string; // Optional: e.g., "Booking Open" or "Limited Seats"
}

interface Props {
  pack: PackData;
}
const HajjUmDetBanner = ({ pack }: Props) => {
  const [loaded, setLoaded] = useState(false);
  const { scrollY } = useScroll();

  // Parallax & Fade Effects
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const scale = useTransform(scrollY, [0, 500], [1, 1.15]);
  const opacity = useTransform(scrollY, [0, 200], [1, 0.5]);

  // Split name for the character animation
  const titleChars = pack.name.split("");

  return (
    <motion.section
      className="relative w-full h-[80vh] md:h-screen overflow-hidden pointer-events-none bg-neutral-950"
      style={{ opacity }}
    >
      {/* 1. Sophisticated Overlays */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        {/* Deep vignettes for text readability */}
        <div className="absolute inset-0 bg-linear-to-b from-black/80 via-black/20 to-black/90"></div>
        <div className="absolute inset-0 bg-linear-to-r from-black/40 via-transparent to-black/40"></div>

        {/* Spiritual Glow Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-[120px] animate-pulse"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold-600/10 rounded-full blur-[120px] animate-pulse delay-1000"
          style={{ backgroundColor: "rgba(212, 175, 55, 0.05)" }}
        ></div>
      </div>

      {/* 2. Background Image with Parallax */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{ y, scale }}
      >
        <img
          src={pack.card_image}
          alt={pack.name}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-in-out ${
            loaded
              ? "opacity-100 blur-0 scale-100"
              : "opacity-0 blur-xl scale-110"
          }`}
          onLoad={() => setLoaded(true)}
          style={{ objectPosition: "center 40%" }}
        />

        {/* Shimmer Placeholder */}
        {!loaded && (
          <div className="absolute inset-0 bg-neutral-900 animate-pulse" />
        )}
      </motion.div>

      {/* 3. Noise Texture for "Film" look */}
      <div
        className="absolute inset-0 z-10 opacity-[0.03] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* 4. Content Container */}
      <div className="relative z-30 h-full flex flex-col justify-center items-center text-center px-6">
        {/* Status Badge */}
        {pack.status && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <div className="inline-flex items-center gap-3 px-5 py-2 bg-white/5 backdrop-blur-md rounded-full border border-white/10">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-xs md:text-sm font-medium tracking-[0.2em] text-emerald-50/90 uppercase">
                {pack.status}
              </span>
            </div>
          </motion.div>
        )}

        {/* Animated Main Title */}
        <h1 className="flex flex-wrap justify-center gap-x-3 md:gap-x-6 text-5xl md:text-7xl lg:text-8xl  font-bold text-white mb-6">
          {titleChars.map((char, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 40, rotateX: -90 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{
                duration: 0.8,
                delay: index * 0.03,
                ease: [0.215, 0.61, 0.355, 1],
              }}
              className="inline-block"
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.8 }}
          className="text-lg md:text-xl lg:text-2xl text-white/70 font-light tracking-wide max-w-2xl italic"
        >
          {pack.tagline}
        </motion.p>

        {/* Elegant Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, delay: 1, ease: "easeInOut" }}
          className="h-px bg-linear-to-r from-transparent via-gold-500/50 to-transparent mt-10 w-full max-w-md"
          style={{ backgroundColor: "rgba(212, 175, 55, 0.3)" }}
        />
      </div>

      {/* 5. Floating Particles (Subtle Dust) */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            initial={{
              x: Math.random() * 100 + "%",
              y: Math.random() * 100 + "%",
            }}
            animate={{
              y: ["0%", "-20%"],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* 6. Bottom Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] text-white/40 tracking-[0.3em] uppercase">
          Explore Details
        </span>
        <div className="w-px h-12 bg-linear-to-b from-white/60 to-transparent"></div>
      </motion.div>
    </motion.section>
  );
};

export default HajjUmDetBanner;
