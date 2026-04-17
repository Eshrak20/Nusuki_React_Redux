import bannerVideo from "../../src/assets/reactAssets/Education/32975-394513987.mp4";

const VideoBanner = ({ title, subtitle }: { title: string; subtitle: string }) => {
  return (
    <div className="relative h-75 mt-22 w-full overflow-hidden">
      {/* Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src={bannerVideo} type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/20 z-10"></div>

      {/* Content (Centered) */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-center text-white px-4">
        <h1 className="text-3xl lg:text-5xl font-extrabold mb-3">
          {title}
        </h1>
        <p className="text-lg lg:text-xl opacity-90 max-w-2xl">
          {subtitle}
        </p>
      </div>
    </div>
  );
};

export default VideoBanner;
