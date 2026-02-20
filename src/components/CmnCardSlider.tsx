import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { FaStar, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import type { CmnCardSliderProps } from "@/types/visa/types.cmnCardSliderList";
import "swiper/css/bundle";

const CmnCardSlider = ({ cmnCardSliderList }: CmnCardSliderProps) => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-10 relative group">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={1}
        loop={true}
        speed={800}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        navigation={{
          prevEl: ".custom-prev",
          nextEl: ".custom-next",
        }}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
      >
        {cmnCardSliderList?.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden mb-1">
              <div className="relative aspect-16/10 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.location}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>

              <div className="p-5">
                <h3 className="font-bold text-gray-900 text-lg mb-4">
                  {item.location}
                </h3>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <FaStar className="text-yellow-400 w-3.5 h-3.5" />
                    <span className="text-sm font-bold text-gray-800">
                      {item.rating}
                    </span>
                    <span className="text-xs text-gray-400">
                      ({item.reviews})
                    </span>
                  </div>
                  <button className="text-xs font-bold text-blue-600 uppercase hover:underline">
                    View Info
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation */}
      <button className="custom-prev absolute left-0 top-1/2 -translate-y-1/2 z-10 w-9 h-9 bg-white shadow-md border rounded-full flex items-center justify-center text-gray-600 hover:bg-blue-600 hover:text-white transition-all opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-2">
        <FaChevronLeft size={12} />
      </button>
      <button className="custom-next absolute right-0 top-1/2 -translate-y-1/2 z-10 w-9 h-9 bg-white shadow-md border rounded-full flex items-center justify-center text-gray-600 hover:bg-blue-600 hover:text-white transition-all opacity-0 group-hover:opacity-100 translate-x-4 group-hover:-translate-x-2">
        <FaChevronRight size={12} />
      </button>
    </div>
  );
};

export default CmnCardSlider;
