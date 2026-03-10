import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import visaBanner from "../../../../assets/Images/visaBanner.jpg"
import { MdStickyNote2 } from "react-icons/md";


const VisaBanner = () => {
  // Animation Variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <section className="relative min-h-75 w-full overflow-hidden bg-linear-to-br from-primary via-primary/80 to-background py-16 lg:py-20">
      
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <img
          src={visaBanner}
          alt="Background"
          className="absolute top-0 w-full h-full object-cover opacity-20 mix-blend-overlay"
        />
        {/* Gradient Overlay for text readability */}
        <div className="absolute inset-0 bg-linear-to-r from-primary/60 via-transparent to-transparent lg:from-primary/40" />
      </div>

      <motion.div 
        className="container relative z-10 mx-auto px-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <div className="flex flex-col items-center text-center">
          
          {/* Animated Badge */}
          <motion.div variants={fadeInUp}>
            <Badge 
              variant="secondary" 
              className="mb-3 border-none bg-primary-foreground/10 px-4 py-1.5 text-primary-foreground backdrop-blur-md"
            >
              <span className="mr-1"><MdStickyNote2/></span> Hassle-Free Processing
            </Badge>
          </motion.div>

          {/* Animated Heading */}
          <motion.h1 
            variants={fadeInUp}
            className="mb-6 text-4xl font-bold tracking-tight text-primary-foreground lg:text-6xl"
          >
            Visa Services
          </motion.h1>

          {/* Animated Subtext */}
          <motion.p 
            variants={fadeInUp}
            className="mb-10 max-w-2xl text-lg text-primary-foreground/80 lg:text-xl"
          >
            Expert visa assistance for all major destinations. We handle the paperwork
            while you plan your journey.
          </motion.p>

          {/* Animated Search Bar */}
          <motion.div 
            variants={fadeInUp}
            className="relative w-full max-w-2xl px-2"
          >
            <div className="group relative flex items-center transition-all duration-300">
              <Input
                type="text"
                placeholder="Search by country name..."
                className="h-12 w-full rounded-full border-none bg-background/95 px-8 pr-16 text-foreground shadow-2xl backdrop-blur-sm ring-1 ring-white/20 transition-all focus-visible:ring-2 focus-visible:ring-primary-foreground lg:h-14"
              />
              <Button 
                size="icon" 
                className="absolute right-3  lg:h-10 lg:w-10 rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-105 active:scale-95"
              >
                <Search className="h-6 w-6" />
              </Button>
            </div>
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
};

export default VisaBanner;