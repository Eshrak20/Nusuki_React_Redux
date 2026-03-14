import type { CountryVisaCardProps } from "@/types/visa/types.visa";
import { Clock, CalendarDays } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, type Variants } from "framer-motion";

/* ======================================================
   Motion Configuration
====================================================== */

const MotionLink = motion(Link);

const containerVariants: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.05,
        },
    },
};

const cardVariants: Variants = {
    hidden: { 
        opacity: 0, 
        y: 40, 
        scale: 0.96 
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 90,
            damping: 18,
        },
    },
};

/* ======================================================
   Main Component
====================================================== */

const CountryVisaCard = ({ visas }: CountryVisaCardProps) => {
    return (
        <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: "some" }}
            className="grid grid-cols-1 mx-6 lg:mx-0 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
            {visas.map((visa) => (
                <motion.div
                    key={visa.id}
                    variants={cardVariants}
                    // UPDATED: Added transition-all, duration-300, shadow-2xl, translate-y, and scale
                    className="bg-card text-card-foreground rounded-2xl lg:shadow-lg border overflow-hidden flex flex-col transition-all duration-300 ease-out hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.02] group/card"
                >
                    {/* Top Section / Header */}
                    <div className="relative h-32 flex flex-col items-center justify-center overflow-hidden">
                        
                        {/* Background Flag: Zoom effect triggers on card hover */}
                        <img
                            src={visa.country_flag_url}
                            alt=""
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover/card:scale-110"
                        />

                        {/* Simple Dark Overlay */}
                        <div className="absolute inset-0 bg-black/50" />

                        {/* Foreground Content */}
                        <div className="relative z-10 flex flex-col items-center gap-2">
                            {/* Sharp Foreground Flag */}
                            <div className="w-14 h-9 overflow-hidden rounded-[2px] shadow-lg border border-white/20 bg-white">
                                <img
                                    src={visa.country_flag_url}
                                    alt={`${visa.country} flag`}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Sharp Typography */}
                            <h3 className="text-white font-bold text-[16px] tracking-wide drop-shadow-md">
                                {visa.country}
                            </h3>
                        </div>
                    </div>

                    {/* Middle Section / Body */}
                    <div className="p-5 flex flex-col gap-3 grow bg-card relative z-20">
                        <h4 className="font-bold text-lg text-foreground">{visa.country}</h4>

                        <div className="space-y-2.5 text-[15px] text-muted-foreground">
                            <div className="flex items-center gap-2.5">
                                <Clock className="w-4 h-4 text-primary shrink-0" />
                                <span>{visa.processing_time}</span>
                            </div>
                            <div className="flex items-center gap-2.5">
                                <CalendarDays className="w-4 h-4 text-primary shrink-0" />
                                <span>Valid: {visa.visa_validity}</span>
                            </div>
                        </div>
                    </div>

                    <div className="border-t mx-5 opacity-50 relative z-20" />

                    {/* Bottom Section / Footer */}
                    <div className="px-5 py-4 mt-auto flex items-end justify-between bg-card relative z-20">
                        <div className="flex flex-col">
                            <span className="text-[13px] text-muted-foreground mb-0.5">From</span>
                            <span className="text-[19px] leading-none font-extrabold text-primary">
                                ৳{Number(visa.service_fee).toLocaleString()}
                            </span>
                        </div>

                        {/* Button */}
                        <MotionLink
                            to={`${visa.id}`}
                            whileTap={{ scale: 0.95 }}
                            className="relative overflow-hidden bg-primary text-primary-foreground px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors hover:bg-primary/90"
                        >
                            {/* The Glossy Shine Element */}
                            <span className="absolute inset-0 -translate-x-[150%] bg-linear-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-in-out group-hover/card:translate-x-[150%]" />
                            
                            <span className="relative z-10">View Details</span>
                        </MotionLink>
                    </div>
                </motion.div>
            ))}
        </motion.div>
    );
};

export default CountryVisaCard;