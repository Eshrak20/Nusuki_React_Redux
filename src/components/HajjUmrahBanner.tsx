import type { TitleProps } from "@/types/types.common";
import HajjUmrahBannerImg from "../assets/reactAssets/Hajj_Umrah/HajjUmrahBanner.webp";

const HajjUmrahBanner = ({ title }: TitleProps) => {
  return (
    <div className="relative w-full ">
      <img
        src={HajjUmrahBannerImg}
        alt="Hajj Umrah Banner"
        className="w-full lg:h-75 h-32 mt-20"
      />

      <h1 className="absolute inset-0 flex items-center justify-center text-white text-md md:text-4xl font-bold text-center">
        {title}
      </h1>
    </div>
  );
};

export default HajjUmrahBanner;
