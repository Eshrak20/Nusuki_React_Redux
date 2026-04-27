import { motion } from "framer-motion";
import { useState } from "react";
import bannerVideo from "../../src/assets/reactAssets/Education/32975-394513987.mp4";

interface VideoBannerProps {
  title: string;
  subtitle: string;
}

const VideoBanner = ({ title, subtitle }: VideoBannerProps) => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  return (
    <div className="relative mt-20 h-[75vh] min-h-[500px] w-full overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        onLoadedData={() => setIsVideoLoaded(true)}
        className={`
          absolute top-0 left-0 w-full h-full object-cover z-0
          transition-opacity duration-1000
          ${isVideoLoaded ? 'opacity-100' : 'opacity-0'}
        `}
      >
        <source src={bannerVideo} type="video/mp4" />
      </video>

      {/* Fallback background while video loads */}
      <div className={`
        absolute inset-0 z-0 bg-gradient-to-br from-primary via-primary/90 to-purple-900
        transition-opacity duration-1000
        ${isVideoLoaded ? 'opacity-0' : 'opacity-100'}
      `} />

      {/* Primary Color Overlay with Gradient */}
      <div className="absolute inset-0 z-10">
        {/* Main overlay - using shadcn primary color */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/70 to-primary/90 backdrop-blur-[2px]" />
        
        {/* Secondary gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-transparent" />
        
        {/* Animated gradient overlay */}
        <div 
          className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-primary/20 animate-pulse"
          style={{ animationDuration: '4s' }}
        />
        
        {/* Radial gradient for vignette effect */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_30%,_rgba(var(--primary-rgb),_0.4)_100%)]" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 z-15 overflow-hidden">
        {/* Top-left decorative blur */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 0.6, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute -top-20 -left-20 w-96 h-96 bg-primary/30 rounded-full blur-3xl"
        />
        
        {/* Bottom-right decorative blur */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 0.4, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
          className="absolute -bottom-20 -right-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
        />
        
        {/* Center decorative glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-2xl" />
      </div>

      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 z-10 opacity-[0.07]">
        <div 
          className="h-full w-full"
          style={{
            backgroundImage: `
              linear-gradient(to right, hsl(var(--primary)) 1px, transparent 1px),
              linear-gradient(to bottom, hsl(var(--primary)) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto"
        >
          {/* Title with glow effect */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative text-3xl sm:text-4xl lg:text-6xl font-extrabold mb-6 text-white drop-shadow-lg"
          >
            <span className="relative z-10">{title}</span>
            {/* Text glow effect */}
            <span className="absolute inset-0 blur-2xl bg-primary/30 -z-10" />
          </motion.h1>

          {/* Subtitle with separator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            {/* Animated separator line */}
            <div className="flex items-center justify-center gap-4">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="h-0.5 w-16 bg-gradient-to-r from-transparent via-primary-foreground/50 to-transparent"
              />
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.5, delay: 0.8, type: "spring" }}
                className="w-2 h-2 bg-primary-foreground rounded-full shadow-lg shadow-primary-foreground/50"
              />
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="h-0.5 w-16 bg-gradient-to-r from-transparent via-primary-foreground/50 to-transparent"
              />
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-base sm:text-lg lg:text-2xl text-primary-foreground/90 max-w-2xl mx-auto leading-relaxed font-medium"
            >
              {subtitle}
            </motion.p>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom gradient fade to next section */}
      <div className="absolute bottom-0 left-0 right-0 z-15 h-32 bg-gradient-to-t from-background to-transparent" />

      {/* Subtle border glow at bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-15 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
    </div>
  );
};

export default VideoBanner;