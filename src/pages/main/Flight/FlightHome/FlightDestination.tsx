import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

// Swiper Styles
import 'swiper/css';
import 'swiper/css/pagination';
import type { TourDestination } from '@/types/flight/flightHome.types';

interface destinationProps {
    dests: TourDestination[]
}

const FlightDestination = ({ dests }: destinationProps) => {
    return (
        <section className="px-4 rounded-[2rem] ">
            {/* Destination Carousel */}
            <Swiper
                slidesPerView={4}
                spaceBetween={24}
                centeredSlides={false}
                grabCursor={true}
                loop={dests.length > 4}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                }}
                breakpoints={{
                    320: { slidesPerView: 1, spaceBetween: 16 },
                    640: { slidesPerView: 2, spaceBetween: 20 },
                    1024: { slidesPerView: 3, spaceBetween: 24 },
                    1280: { slidesPerView: 4, spaceBetween: 24 },
                }}
                modules={[Autoplay, Pagination]}
                className="pb-14 px-2!" // Space for pagination dots
            >
                {dests.map((destination) => (
                    <SwiperSlide key={destination.id}>
                        <div className="group relative h-95 w-full rounded-3xl overflow-hidden bg-white shadow-md transition-all duration-500 hover:shadow-xl hover:-translate-y-1">
                            {/* Image with subtle zoom on hover */}
                            <img
                                src={destination.image_url}
                                alt={destination.name}
                                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />

                            {/* Dark overlay that intensifies on hover */}
                            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

                            {/* Content positioned at bottom */}
                            <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col items-start">
                                <h3 className="text-2xl font-bold text-white mb-1 drop-shadow-sm">
                                    {destination.name}
                                </h3>
                                <div className="flex items-center justify-between w-full mt-2">
                                    <p className="text-white/80 text-sm">
                                        Starting at <span className="text-white font-bold text-lg">{destination.currency} {destination.starting_price}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Custom pagination style override */}
            <style dangerouslySetInnerHTML={{
                __html: `
                .swiper-pagination-bullet-active {
                    background: var(--primary, #3b82f6) !important;
                    width: 24px !important;
                    border-radius: 4px !important;
                }
            `}} />
        </section>
    );
};

export default FlightDestination;