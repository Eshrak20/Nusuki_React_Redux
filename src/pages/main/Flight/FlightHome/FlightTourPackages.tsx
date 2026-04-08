import { useFlightTourListsQuery } from "@/redux/api/flightApi/flightTour";
import { Star, MapPin, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

// Swiper Styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const FlightTourPackages = () => {
  const { data } = useFlightTourListsQuery();

  const tours = data?.data?.data || [];

  return (
    <section className="px-4 max-w-350 mx-auto relative">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-2">
            Popular Tour Packages
          </h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-xl">
            Plan your dream gateway and choose from uncountable tour packages at ShareTrip. Book our holiday packages for the best deals on any international trip.
          </p>
        </div>
      </div>

      {/* Swiper Container */}
      <div className="relative group/slider">
        <Swiper
          slidesPerView={3}
          spaceBetween={30}
          loop={tours.length > 3}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          navigation={{
            prevEl: '.prev-tour',
            nextEl: '.next-tour',
          }}
          breakpoints={{
            320: { slidesPerView: 1, spaceBetween: 20 },
            768: { slidesPerView: 2, spaceBetween: 25 },
            1280: { slidesPerView: 3, spaceBetween: 30 },
          }}
          modules={[Autoplay, Navigation, Pagination]}
          className="pb-16 px-2"
        >
          {tours.map((tour) => (
            <SwiperSlide key={tour.id}>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="group/card bg-white dark:bg-slate-900 rounded-[2.5rem] overflow-hidden shadow-sm border border-slate-100 dark:border-slate-800 transition-all duration-500 mb-4 hover:shadow-xl"
              >
                {/* Image Container */}
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={tour.image_url}
                    alt={tour.package_title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110"
                  />

                  {/* Floating Rating Badge */}
                  <div className="absolute top-5 left-5 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-md">
                    <Star size={14} className="fill-yellow-400 text-yellow-400" />
                    <span className="text-xs font-bold text-slate-800 dark:text-white">
                      {tour.rating}
                    </span>
                    <span className="text-[10px] text-slate-500">
                      ({tour.review_count})
                    </span>
                  </div>

                  {/* Featured Tag */}
                  {tour?.is_featured === "1" && (
                    <div className="absolute bottom-5 right-5 bg-primary/95 text-white dark:text-black text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-2xl shadow-lg">
                      Featured
                    </div>
                  )}
                </div>

                {/* Content Container */}
                <div className="p-8">
                  <div className="flex items-center gap-2 text-slate-400 mb-3">
                    <MapPin size={14} className="text-primary" />
                    <span className="text-[11px] uppercase tracking-[0.15em] font-bold">
                      {tour.destination.name}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-6 line-clamp-1 group-hover/card:text-primary transition-colors">
                    {tour.package_title}
                  </h3>

                  <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-slate-800">
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase font-black tracking-wider mb-1">Starting From</p>
                      <p className="text-2xl font-black text-slate-900 dark:text-white">
                        ৳ {Number(tour.price).toLocaleString()}
                      </p>
                    </div>
                    <button className="h-14 w-14 rounded-[1.2rem] bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-900 dark:text-white group-hover/card:bg-primary group-hover/card:text-white transition-all duration-300 shadow-sm group-hover/card:shadow-primary/30">
                      <ArrowRight size={24} />
                    </button>
                  </div>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Buttons (Visible Default) */}
        <button className="prev-tour hidden absolute -left-5 md:-left-6 top-[40%] -translate-y-1/2 z-20 h-12 w-12 rounded-full bg-white/95 backdrop-blur-sm shadow-xl border border-slate-100 lg:flex items-center justify-center text-slate-800 hover:bg-primary hover:text-white hover:scale-110 transition-all duration-300">
          <ChevronLeft size={24} />
        </button>
        <button className="next-tour hidden absolute -right-5 md:-right-6 top-[40%] -translate-y-1/2 z-20 h-12 w-12 rounded-full bg-white/95 backdrop-blur-sm shadow-xl border border-slate-100 lg:flex items-center justify-center text-slate-800 hover:bg-primary hover:text-white hover:scale-110 transition-all duration-300">
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Global CSS for Bullet Points */}
      <style dangerouslySetInnerHTML={{
        __html: `
        .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: #cbd5e1;
          opacity: 1;
        }
        .swiper-pagination-bullet-active {
          width: 24px;
          border-radius: 4px;
          background: #3b82f6 !important;
          transition: all 0.3s ease;
        }
      `}} />
    </section>
  );
};

export default FlightTourPackages;