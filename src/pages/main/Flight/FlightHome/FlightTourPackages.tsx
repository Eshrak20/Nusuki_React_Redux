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
  const { data, isLoading, error } = useFlightTourListsQuery();

  if (isLoading) return (
    <div className="flex justify-center py-20">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>
  );
  
  if (error) return (
    <div className="text-center py-20 text-destructive font-medium">
      Failed to load tour packages. Please try again later.
    </div>
  );

  const tours = data?.data?.data || [];

  return (
    <section className="px-4 max-w-[1400px] mx-auto relative group">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-2">
            Popular Tour Packages
          </h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-xl">
            Explore our most loved travel packages curated specifically for your dream vacation and unforgettable memories.
          </p>
        </div>
      </div>

      {/* Swiper Container with Custom Navigation */}
      <div className="relative">
        <Swiper
          slidesPerView={3}
          spaceBetween={30}
          loop={tours.length > 3}
          autoplay={{
            delay: 4000,
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
          className="pb-16"
        >
          {tours.map((tour, index) => (
            <SwiperSlide key={tour.id}>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="group bg-white dark:bg-slate-900 rounded-[2.5rem] overflow-hidden shadow-sm border border-slate-100 dark:border-slate-800 transition-all duration-500 mb-4"
              >
                {/* Image Container */}
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={tour.image_url}
                    alt={tour.package_title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
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
                    <div className="absolute bottom-5 right-5 bg-primary/95 text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-2xl shadow-lg">
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
                  
                  <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-6 line-clamp-1 group-hover:text-primary transition-colors">
                    {tour.package_title}
                  </h3>

                  <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-slate-800">
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase font-black tracking-wider mb-1">Starting From</p>
                      <p className="text-2xl font-black text-slate-900 dark:text-white">
                        ৳ {Number(tour.price).toLocaleString()}
                      </p>
                    </div>
                    <button className="h-14 w-14 rounded-[1.2rem] bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-900 dark:text-white group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-primary/30">
                      <ArrowRight size={24} />
                    </button>
                  </div>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Buttons (Match your image style) */}
        <button className="prev-tour absolute left-[-20px] top-1/2 -translate-y-1/2 z-20 h-12 w-12 rounded-full bg-white/90 backdrop-blur shadow-xl border border-slate-100 flex items-center justify-center text-slate-800 hover:bg-primary hover:text-white transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:left-[-10px]">
          <ChevronLeft size={24} />
        </button>
        <button className="next-tour absolute right-[-20px] top-1/2 -translate-y-1/2 z-20 h-12 w-12 rounded-full bg-white/90 backdrop-blur shadow-xl border border-slate-100 flex items-center justify-center text-slate-800 hover:bg-primary hover:text-white transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:right-[-10px]">
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Global CSS for Bullet Points */}
      <style dangerouslySetInnerHTML={{ __html: `
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