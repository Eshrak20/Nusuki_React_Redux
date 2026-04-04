import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

const images: string[] = [
  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
  "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
  "https://images.unsplash.com/photo-1491553895911-0055eca6402d",
];

const ShopBanner = () => {
  return (
    <div className="relative w-full top-10 h-150 overflow-hidden mb-12 rounded-b-2xl shadow-lg">
      {/* Standard HTML style tag. 
        We use dangerouslySetInnerHTML to avoid React escaping characters. 
      */}
      <style>{`
        .swiper-pagination-bullet {
          background: white !important;
          opacity: 0.5 !important;
        }
        .swiper-pagination-bullet-active {
          background: white !important;
          opacity: 1 !important;
          width: 16px !important; /* Makes the active dot wider like your image */
          border-radius: 4px !important;
        }
      `}</style>

      <Swiper
        modules={[Autoplay, Pagination]}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        grabCursor={true}
        className="h-full w-full"
      >
        {images.map((src, index) => (
          <SwiperSlide key={index} className="h-full relative">
            <img
              src={`${src}?auto=format&fit=crop&w=1600&q=80`}
              alt={`banner-${index}`}
              draggable={false}
              className="w-full h-full object-cover select-none pointer-events-none"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/30 pointer-events-none" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ShopBanner;