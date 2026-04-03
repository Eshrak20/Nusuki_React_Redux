import { useFlightTourCollectionListsQuery } from "@/redux/api/flightApi/flightTourCollection";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { ChevronLeft, ChevronRight, Compass } from "lucide-react";
import type { TourCollection } from "@/types/flight/flightHome.types";

// Swiper Styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const FlightCollection = () => {
    const { data } = useFlightTourCollectionListsQuery();
    const collections: TourCollection[] = data?.data?.data || [];

    return (
        <section className="relative py-16 px-4 overflow-hidden">
            {/* Minimalist Side Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-6">
                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-primary font-bold tracking-widest uppercase text-xs">
                        <Compass size={16} className="animate-pulse" />
                        <span>Curated Journals</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight">
                        Signature <span className="text-primary">Collections</span>
                    </h2>
                </div>
                <p className="text-slate-500 dark:text-slate-400 max-w-sm text-sm border-l-2 border-slate-200 dark:border-slate-800 pl-4">
                    Hand-picked journeys selected by our travel experts for those seeking more than just a vacation.
                </p>
            </div>

            <div className="relative group/slider">
                <Swiper
                    slidesPerView={3}
                    spaceBetween={30}
                    loop={collections.length > 3}
                    autoplay={{ delay: 4000, disableOnInteraction: false }}
                    navigation={{ prevEl: '.prev-coll', nextEl: '.next-coll' }}
                    breakpoints={{
                        320: { slidesPerView: 1 },
                        768: { slidesPerView: 2 },
                        1100: { slidesPerView: 3 },
                    }}
                    modules={[Autoplay, Navigation, Pagination]}
                    className="overflow-visible!"
                >
                    {collections.map((item) => (
                        <SwiperSlide key={item.id} className="py-8">
                            <a
                                href={item.button_link || "#"}
                                className="group/card block relative h-80 w-full rounded-[2.5rem] rounded-tr-none overflow-hidden transition-all duration-500 hover:-translate-y-2"
                            >
                                {/* Main Image */}
                                <img
                                    src={item.image_url}
                                    alt={item.title}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover/card:scale-110"
                                />

                                {/* Subtle Overlay */}
                                <div className="absolute inset-0 bg-slate-900/20 group-hover/card:bg-slate-900/10 transition-colors duration-500"></div>

                                {/* Top Floating Badge */}
                                <div className="absolute top-6 right-6 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-primary px-4 py-1.5 rounded-full text-xs font-black shadow-lg">
                                    {item.tour_count} DESTINATIONS
                                </div>

                                {/* Bottom Glass Content Box */}
                                <div className="absolute bottom-6 left-6 right-6 bg-white/20 dark:bg-slate-900/30 backdrop-blur-xl border border-white/30 dark:border-white/10 p-6 rounded-[2rem] shadow-2xl transition-all duration-500 group-hover/card:bg-white/40 dark:group-hover/card:bg-slate-800/50">
                                    <div className="flex justify-between items-center">
                                        <div className="space-y-1">
                                            <h3 className="text-2xl font-bold text-white drop-shadow-lg">
                                                {item.title}
                                            </h3>
                                            <p className="text-xs text-white/80 line-clamp-1 italic tracking-wide">
                                                {item.subtitle}
                                            </p>
                                        </div>
                                        <div className="h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center -rotate-45 group-hover/card:rotate-0 transition-transform duration-500 shadow-lg shadow-primary/30">
                                            <ChevronRight size={20} />
                                        </div>
                                    </div>
                                </div>

                                {/* Hover Glow Effect */}
                                <div className="absolute -inset-1 bg-primary/20 opacity-0 group-hover/card:opacity-100 blur-2xl transition-opacity duration-500 -z-10"></div>
                            </a>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Styled Navigation Buttons */}
                <button className="prev-coll hidden absolute -left-2.5 top-1/2 -translate-y-1/2 z-30 h-14 w-14 rounded-2xl bg-white dark:bg-slate-900 shadow-2xl lg:flex items-center justify-center text-slate-800 dark:text-white hover:bg-primary hover:text-white transition-all duration-300 border border-slate-100 dark:border-slate-800">
                    <ChevronLeft size={28} />
                </button>
                <button className="next-coll hidden absolute -right-2.5 top-1/2 -translate-y-1/2 z-30 h-14 w-14 rounded-2xl bg-white dark:bg-slate-900 shadow-2xl lg:flex items-center justify-center text-slate-800 dark:text-white hover:bg-primary hover:text-white transition-all duration-300 border border-slate-100 dark:border-slate-800">
                    <ChevronRight size={28} />
                </button>
            </div>
        </section>
    );
};

export default FlightCollection;