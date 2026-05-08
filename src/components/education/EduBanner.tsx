import { motion, type Variants } from "framer-motion";
import { useState, useEffect } from "react";
import { GraduationCap, BookOpen, ArrowDown } from "lucide-react";
import bannerVideo from "../../../src/assets/reactAssets/Education/PlaneVideo.mp4";

const EduBanner = () => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      setMousePosition({
        x: (clientX / innerWidth - 0.5) * 20,
        y: (clientY / innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const floatingIcons = [
    { Icon: GraduationCap, delay: 0, x: "10%", y: "20%" },
    { Icon: BookOpen, delay: 2, x: "85%", y: "15%" },
    { Icon: GraduationCap, delay: 4, x: "15%", y: "75%" },
    { Icon: BookOpen, delay: 1, x: "80%", y: "70%" },
  ];
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: `${(i * 37) % 100}%`,
    top: `${(i * 53) % 100}%`,
    duration: 2 + ((i * 17) % 30) / 10,
    delay: ((i * 11) % 20) / 10,
  }));
  return (
    <div className="relative mt-20 h-[80vh] min-h-150 w-full overflow-hidden flex flex-col justify-center items-center px-8 md:px-20 text-center">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        onLoadedData={() => setIsVideoLoaded(true)}
        className={`
          absolute top-0 left-0 w-full h-full object-cover z-0
          transition-all duration-1000
          ${isVideoLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105"}
        `}
      >
        <source src={bannerVideo} type="video/mp4" />
      </video>

      {/* Fallback gradient while video loads */}
      <div
        className={`
        absolute inset-0 z-0 bg-linear-to-br from-primary via-primary/90 to-indigo-900
        transition-opacity duration-1000
        ${isVideoLoaded ? "opacity-0" : "opacity-100"}
      `}
      />

      {/* Primary Color Overlays */}
      <div className="absolute inset-0 z-10">
        <div className="absolute inset-0 bg-linear-to-br from-primary/75 via-primary/55 to-black/85" />

        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent" />

        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,hsl(var(--primary)/0.45)_100%)]" />

        <motion.div
          initial={{ x: "-100%", opacity: 0 }}
          animate={{ x: "200%", opacity: [0, 0.08, 0] }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
            repeatDelay: 3,
          }}
          className="absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent skew-x-12"
        />
      </div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 z-15 overflow-hidden pointer-events-none">
        {/* Top-left blob */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 45, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -top-32 -left-32 w-125 h-125 bg-primary/20 rounded-full blur-3xl"
        />

        {/* Bottom-right blob */}
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [45, 0, 45],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -bottom-32 -right-32 w-125 h-125 bg-primary/15 rounded-full blur-3xl"
        />

        {/* Floating particles */}
        <div className="absolute inset-0">
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute h-1 w-1 rounded-full bg-primary-foreground/20"
              style={{
                left: particle.left,
                top: particle.top,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                delay: particle.delay,
              }}
            />
          ))}
        </div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 z-10 opacity-[0.03]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `
              linear-gradient(to right, hsl(var(--primary-foreground)) 1px, transparent 1px),
              linear-gradient(to bottom, hsl(var(--primary-foreground)) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
            maskImage:
              "radial-gradient(ellipse at center, black 30%, transparent 70%)",
          }}
        />
      </div>

      {/* Floating Education Icons */}
      {floatingIcons.map(({ Icon, delay, x, y }, index) => (
        <motion.div
          key={index}
          className="absolute z-15 pointer-events-none"
          style={{ left: x, top: y }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 0.3, 0],
            scale: [0.8, 1, 0.8],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 6,
            delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Icon className="w-8 h-8 md:w-12 md:h-12 text-primary-foreground/20" />
        </motion.div>
      ))}

      {/* Main Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-20 text-white mb-12 flex flex-col items-center max-w-5xl"
        style={{
          transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`,
        }}
      >
        {/* Title */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-5xl lg:text-7xl font-black mb-6 tracking-tight mt-32"
        >
          <span className="bg-clip-text text-transparent bg-linear-to-r from-white via-primary-foreground dark:via-foreground to-white">
            Welcome to Nusuki Education!
          </span>
          {/* Title glow */}
          <span className="absolute inset-0 blur-3xl bg-primary/40 -z-10" />
        </motion.h1>

        {/* Subtitle with animated typing effect */}
        <motion.p
          variants={itemVariants}
          className="text-lg sm:text-xl lg:text-2xl text-primary-foreground/90 dark:text-foreground max-w-3xl leading-relaxed font-medium"
        >
          Choose your destination, find your dream institution and get abroad
          courses & tests at the best price
        </motion.p>

        {/* CTA Hint */}
        <motion.div
          variants={itemVariants}
          className="mt-12 flex flex-col items-center gap-2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="flex flex-col items-center gap-2 cursor-pointer"
            onClick={() =>
              window.scrollBy({ top: window.innerHeight, behavior: "smooth" })
            }
          >
            <span className="text-sm font-medium text-primary-foreground/70 dark:text-foreground">
              Explore More
            </span>
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full bg-primary-foreground/10 dark:bg-primary backdrop-blur-sm border border-primary-foreground/20"
            >
              <ArrowDown className="w-5 h-5 text-primary-foreground/80 dark:text-foreground" />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Bottom gradient transition */}
      <div className="absolute bottom-0 left-0 right-0 z-15">
        {/* multi-layer cinematic fade */}
        <div className="h-36 bg-linear-to-t from-black via-black/85 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-t from-primary/20 via-transparent to-transparent" />

        {/* elegant divider glow */}
        <div className="h-px bg-linear-to-r from-transparent via-primary/40 to-transparent opacity-80" />
      </div>
    </div>
  );
};

export default EduBanner;
