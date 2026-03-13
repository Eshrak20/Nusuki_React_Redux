import type { CountryVisaCardProps } from "@/types/visa/types.visa";
import { Clock, CalendarDays } from "lucide-react";
import { Link } from "react-router-dom"; 

const CountryVisaCard = ({ visas }: CountryVisaCardProps) => {
    return (
        <div className="grid grid-cols-1 mx-6 lg:mx-0 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {visas.map((visa) => (
                <div
                    key={visa.id}
                    className="bg-card text-card-foreground rounded-2xl shadow-sm border overflow-hidden flex flex-col transition-shadow hover:shadow-md"
                >
                    {/* Top Section / Header */}
                    <div className="relative h-30 flex flex-col items-center justify-center overflow-hidden">
                        {/* Background Image: Removed blur and scale to keep it sharp and accurate */}
                        <img
                            src={visa.country_flag_url}
                            alt={`${visa.country} background`}
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                        {/* Dark Overlay: Changed to a simple bg-black/40 to let the flag show clearly */}
                        <div className="absolute inset-0 bg-black/20" />

                        {/* Content over background */}
                        <div className="relative z-10 flex flex-col items-center gap-2 mt-1">
                            {/* Adjusted flag width slightly to match standard proportions */}
                            <div className="w-13 h-8.5 rounded-sm overflow-hidden shadow-sm">
                                <img
                                    src={visa.country_flag_url}
                                    alt={`${visa.country} flag`}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <h3 className="text-white font-bold text-[15px] tracking-wide">
                                {visa.country}
                            </h3>
                        </div>
                    </div>

                    {/* Middle Section / Body */}
                    <div className="p-5 flex flex-col gap-3 grow">
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

                    {/* Added the subtle divider line from your image */}
                    <div className="border-t mx-5 opacity-50" />

                    {/* Bottom Section / Footer */}
                    <div className="px-5 py-4 mt-auto flex items-end justify-between">
                        <div className="flex flex-col">
                            <span className="text-[13px] text-muted-foreground mb-0.5">From</span>
                            {/* Made the price slightly larger and bolder to match the design */}
                            <span className="text-[22px] leading-none font-extrabold text-primary">
                                ৳{Number(visa.service_fee).toLocaleString()}
                            </span>
                        </div>

                        <Link
                            to={`${visa.id}`}
                            className="bg-primary text-primary-foreground hover:bg-primary/90 px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors"
                        >
                            View Details
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CountryVisaCard;