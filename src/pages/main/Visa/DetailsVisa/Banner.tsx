import { Clock, Calendar, Home, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import type { DetBannerProps } from '@/types/visa/types.visa';

const Banner = ({ details }: DetBannerProps) => {
    // Simple fade-up animation
    const fadeUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    return (
        <section className="relative overflow-hidden bg-primary py-10 lg:pb-12 lg:pt-14">
            {/* Background Gradient matching the HelpDesk component */}
            <div className="absolute inset-0 z-0 bg-linear-to-r from-transparent to-black/40 mix-blend-multiply" />

            <div className="container relative z-10 mx-auto px-4 flex flex-col items-center text-center">

                {/* Breadcrumbs */}
                <motion.div
                    initial="hidden" animate="visible" variants={fadeUp}
                    className="mb-8 flex items-center gap-2 text-sm text-primary-foreground/70"
                >
                    <Home className="h-4 w-4" />
                    <Link to="/">Home</Link>
                    <ChevronRight className="h-3 w-3" />
                    <Link to="/visa">Visa Services</Link>
                    <ChevronRight className="h-3 w-3" />
                    <span className="font-semibold text-primary-foreground">{details.country}</span>
                </motion.div>

                {/* Flag */}
                <motion.img
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    src={details.country_flag_url}
                    alt={`${details.country} Flag`}
                    className="mb-6 h-16 w-24 rounded object-cover shadow-lg"
                />

                {/* Headings */}
                <motion.h1
                    initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.2 }}
                    className="mb-3 text-4xl font-bold tracking-tight text-primary-foreground lg:text-[42px]"
                >
                    {details.country}
                </motion.h1>

                <motion.p
                    initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.3 }}
                    className="mb-8 text-base text-primary-foreground/90 lg:text-lg"
                >
                    {details.country} Visa Processing Service
                </motion.p>

                {/* Info Pills */}
                <motion.div
                    initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.4 }}
                    className="flex flex-wrap items-center justify-center gap-4"
                >
                    {/* Processing Time Pill */}
                    <div className="flex items-center gap-2 rounded-full bg-primary-foreground/10 px-5 py-2.5 text-sm font-medium text-primary-foreground backdrop-blur-md ring-1 ring-primary-foreground/20">
                        <Clock className="h-4 w-4 text-primary-foreground/80" />
                        <span>{details.processing_time}</span>
                    </div>

                    {/* Validity Pill */}
                    <div className="flex items-center gap-2 rounded-full bg-primary-foreground/10 px-5 py-2.5 text-sm font-medium text-primary-foreground backdrop-blur-md ring-1 ring-primary-foreground/20">
                        <Calendar className="h-4 w-4 text-primary-foreground/80" />
                        <span>{details.visa_validity} Validity</span>
                    </div>
                </motion.div>

            </div>
        </section>
    );
};

export default Banner;