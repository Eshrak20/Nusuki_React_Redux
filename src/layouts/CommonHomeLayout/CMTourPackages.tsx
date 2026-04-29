import { useMemo } from "react";
import {
  MapPin,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import { useGetToursQuery } from "@/redux/api/holidayApi/holidayApi";
import HolidaySearchSkeleton from "@/components/skeletons/HolidaySearchSkeleton";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const CMTourPackages = () => {
  const queryParams = useMemo(
    () => ({
      tour_type_id: 1,
    }),
    []
  );

  const { data, isLoading, isError } = useGetToursQuery(queryParams);

  const tours = data?.data?.tours ?? [];

  if (isLoading) return <HolidaySearchSkeleton />;

  if (isError) {
    return (
      <div className="py-16 text-center text-destructive">
        Failed to load popular packages
      </div>
    );
  }

  if (tours.length === 0) return null;

  return (
    <section className="relative mx-auto max-w-7xl px-2 py-10 lg:px-4">
      <div className="mx-auto mb-10 max-w-3xl text-center">
        <h2 className="mb-4 text-3xl font-bold tracking-tight text-slate-900 dark:text-white lg:text-4xl">
          Popular Tour Packages
        </h2>

        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400 md:text-base">
          Explore our most popular holiday destinations and choose your next
          perfect trip.
        </p>
      </div>

      <div className="group/slider relative">
        <Swiper
          slidesPerView={3}
          spaceBetween={24}
          loop={tours.length > 3}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          navigation={{
            prevEl: ".prev-popular-tour",
            nextEl: ".next-popular-tour",
          }}
          breakpoints={{
            320: { slidesPerView: 1, spaceBetween: 16 },
            768: { slidesPerView: 2, spaceBetween: 20 },
            1280: { slidesPerView: 3, spaceBetween: 24 },
          }}
          modules={[Autoplay, Navigation, Pagination]}
          className="px-2 pb-12"
        >
          {tours.map((tour) => (
            <SwiperSlide key={tour.id}>
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35 }}
                className="group/card mb-4 overflow-hidden border bg-card shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={tour.bg_image_url}
                    alt={tour.display_name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover/card:scale-110"
                  />

                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="line-clamp-1 text-2xl font-bold text-white">
                      {tour.city_name}
                    </h3>

                    <p className="mt-1 flex items-center gap-1 text-sm text-white/85">
                      <MapPin className="h-4 w-4" />
                      {tour.country_name}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-5">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                      Popular Package
                    </p>

                    <p className="mt-1 text-sm font-medium text-muted-foreground">
                      {tour.display_name}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      window.open(
                        `/holiday/${tour.id}`,
                        "_blank",
                        "noopener,noreferrer"
                      )
                    }
                    className="flex h-12 w-12 items-center justify-center border bg-muted text-foreground transition-all duration-300 hover:bg-primary hover:text-muted"
                  >
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>

        <button className="prev-popular-tour absolute -left-5 top-[40%] z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border bg-white/95 text-slate-800 shadow-xl transition-all duration-300 hover:scale-110 hover:bg-primary hover:text-muted lg:flex">
          <ChevronLeft size={24} />
        </button>

        <button className="next-popular-tour absolute -right-5 top-[40%] z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border bg-white/95 text-slate-800 shadow-xl transition-all duration-300 hover:scale-110 hover:bg-primary hover:text-muted lg:flex">
          <ChevronRight size={24} />
        </button>
      </div>
    </section>
  );
};

export default CMTourPackages;